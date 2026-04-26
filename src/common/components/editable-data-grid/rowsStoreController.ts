import { v4 as uuidv4 } from 'uuid';
import { GridRowId } from '@mui/x-data-grid-pro';

import { ChangeSet, ExtendedRow, RowDef, RowUpdateProcessor } from './types';

export type RowsState<R extends RowDef> = {
    initialRows: R[];
    rows: ExtendedRow<R>[];
    changeSet: ChangeSet<R>;
    isDirty: boolean;
};

export const isChangeSetDirty = <R extends RowDef>(cs: ChangeSet<R>) =>
    cs.added.length > 0 || cs.updated.length > 0 || cs.deleted.length > 0;

const isShallowEqual = (a: Record<string, unknown>, b: Record<string, unknown>) => {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of Array.from(keys)) {
        if (a[k] !== b[k]) return false;
    }
    return true;
};

const getChangedFields = <R extends RowDef>(
    updated: ExtendedRow<R>,
    old: ExtendedRow<R>,
): (keyof R)[] => {
    const keys = new Set([...Object.keys(updated), ...Object.keys(old)]);
    const changed: string[] = [];
    for (const k of Array.from(keys)) {
        if ((updated as Record<string, unknown>)[k] !== (old as Record<string, unknown>)[k]) {
            changed.push(k);
        }
    }
    return changed as (keyof R)[];
};

const replaceById = <T extends RowDef>(arr: T[], row: T): T[] =>
    arr.map((r) => (r.id === row.id ? row : r));

const removeById = <T extends RowDef>(arr: T[], id: GridRowId): T[] =>
    arr.filter((r) => r.id !== id);

export function addRow<R extends RowDef>(
    state: RowsState<R>,
    newRow: Partial<R>,
): { newState: RowsState<R>; processedRow: ExtendedRow<R> } {
    const id = uuidv4();
    const rowWithId = { ...(newRow as R), id, _isNew: true } as ExtendedRow<R>;

    const rows = [...state.rows, rowWithId];
    const changeSet: ChangeSet<R> = {
        ...state.changeSet,
        added: [...state.changeSet.added, rowWithId],
    };

    return {
        newState: { ...state, rows, changeSet, isDirty: isChangeSetDirty(changeSet) },
        processedRow: rowWithId,
    };
}

export function updateRow<R extends RowDef>(
    state: RowsState<R>,
    updated: ExtendedRow<R>,
    old: ExtendedRow<R>,
    processRowUpdate?: RowUpdateProcessor<R>,
): { newState: RowsState<R>; processedRow: ExtendedRow<R> } {
    if (isShallowEqual(updated as Record<string, unknown>, old as Record<string, unknown>)) {
        return { newState: state, processedRow: updated };
    }

    const changedFields = getChangedFields(updated, old);
    let processed = updated;
    if (processRowUpdate) {
        processed = processRowUpdate({
            previousRow: old,
            updatedRow: updated,
            isNew: updated._isNew === true,
            changedFields,
        });
    }

    const rows = replaceById(state.rows, processed);
    const { changeSet } = state;

    const newAdded = processed._isNew
        ? replaceById(changeSet.added, processed)
        : changeSet.added;

    const newUpdated = processed._isNew
        ? changeSet.updated
        : [...changeSet.updated.filter((r) => r.id !== processed.id), processed];

    const newChangeSet: ChangeSet<R> = {
        ...changeSet,
        added: newAdded,
        updated: newUpdated,
    };

    return {
        newState: {
            ...state,
            rows,
            changeSet: newChangeSet,
            isDirty: isChangeSetDirty(newChangeSet),
        },
        processedRow: processed,
    };
}

export function removeRow<R extends RowDef>(
    state: RowsState<R>,
    id: GridRowId,
): RowsState<R> {
    const toRemove = state.rows.find((r) => r.id === id);
    if (!toRemove) return state;

    const rows = removeById(state.rows, id);
    const { changeSet } = state;

    const newAdded = toRemove._isNew ? removeById(changeSet.added, id) : changeSet.added;
    const newUpdated = toRemove._isNew ? changeSet.updated : removeById(changeSet.updated, id);
    const newDeleted = toRemove._isNew ? changeSet.deleted : [...changeSet.deleted, id];

    const newChangeSet: ChangeSet<R> = {
        added: newAdded,
        updated: newUpdated,
        deleted: newDeleted,
    };

    return {
        ...state,
        rows,
        changeSet: newChangeSet,
        isDirty: isChangeSetDirty(newChangeSet),
    };
}

export function discardChanges<R extends RowDef>(state: RowsState<R>): RowsState<R> {
    return {
        ...state,
        rows: state.initialRows.map((row) => ({ ...row, _isNew: false }) as ExtendedRow<R>),
        changeSet: { added: [], updated: [], deleted: [] },
        isDirty: false,
    };
}

export function reset<R extends RowDef>(state: RowsState<R>, rows: R[]): RowsState<R> {
    return {
        ...state,
        initialRows: rows,
        rows: rows.map((row) => ({ ...row, _isNew: false }) as ExtendedRow<R>),
        changeSet: { added: [], updated: [], deleted: [] },
        isDirty: false,
    };
}
