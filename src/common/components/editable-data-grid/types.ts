import { GridValidRowModel } from '@mui/x-data-grid-pro';
import { StateCreator } from 'zustand';

export type RowDef = GridValidRowModel;

export type ExtendedRow<R extends RowDef> = R & { _isNew?: boolean };

export type ChangeSet<R extends RowDef> = {
    added: ExtendedRow<R>[];
    updated: ExtendedRow<R>[];
    deleted: (string | number)[];
};

export type ProcessRowUpdateParams<R extends RowDef> = {
    previousRow: ExtendedRow<R>;
    updatedRow: ExtendedRow<R>;
    isNew: boolean;
    changedFields: (keyof R)[];
};

export type RowUpdateProcessor<R extends RowDef> = (
    params: ProcessRowUpdateParams<R>,
) => ExtendedRow<R>;

export type CreateStoreSlice<Slice> = StateCreator<any, [], [], Slice>;
