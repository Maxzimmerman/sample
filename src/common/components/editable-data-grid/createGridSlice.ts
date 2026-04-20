import { GridColDef } from '@mui/x-data-grid-pro';

import { CreateStoreSlice, RowDef } from './types';

type GridState<R extends RowDef> = {
    allColumns: GridColDef<R>[];
};

type GridActions<R extends RowDef> = {
    updateColumnWidth: (field: string, width: number) => void;
};

export type GridSlice<R extends RowDef> = GridState<R> & GridActions<R>;

export default function createGridSlice<R extends RowDef>(
    initial: GridState<R>,
): CreateStoreSlice<GridSlice<R>> {
    return (set, get) => ({
        ...initial,
        updateColumnWidth: (field, width) => {
            const { allColumns } = get() as GridSlice<R>;
            set({
                allColumns: allColumns.map((c) =>
                    c.field === field ? { ...c, width } : c,
                ),
            });
        },
    });
}
