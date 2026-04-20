import { GridRowId } from '@mui/x-data-grid-pro';

import {
    addRow,
    discardChanges,
    removeRow,
    reset,
    RowsState,
    updateRow,
} from './rowsStoreController';
import { CreateStoreSlice, ExtendedRow, RowDef, RowUpdateProcessor } from './types';

type RowsActions<R extends RowDef> = {
    addRow: (newRow: Partial<R>) => ExtendedRow<R>;
    updateRow: (updated: ExtendedRow<R>, old: ExtendedRow<R>) => ExtendedRow<R>;
    removeRow: (id: GridRowId) => void;
    discardChanges: () => void;
    reset: (rows: R[]) => void;
};

export type RowsSlice<R extends RowDef> = RowsState<R> & RowsActions<R>;

export default function createRowsSlice<R extends RowDef>(
    initialRows: R[] = [],
    processRowUpdate?: RowUpdateProcessor<R>,
): CreateStoreSlice<RowsSlice<R>> {
    return (set, get) => ({
        initialRows,
        rows: initialRows.map((row) => ({ ...row, _isNew: false }) as ExtendedRow<R>),
        changeSet: { added: [], updated: [], deleted: [] },
        isDirty: false,

        addRow: (newRow) => {
            const { newState, processedRow } = addRow(get(), newRow);
            set(newState);
            return processedRow;
        },

        updateRow: (updated, old) => {
            const { newState, processedRow } = updateRow(get(), updated, old, processRowUpdate);
            set(newState);
            return processedRow;
        },

        removeRow: (id) => {
            set(removeRow(get(), id));
        },

        discardChanges: () => {
            set(discardChanges(get()));
        },

        reset: (rows) => {
            set(reset(get(), rows));
        },
    });
}
