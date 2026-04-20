import { useMemo } from 'react';
import {
    DataGridPro,
    GridActionsCellItem,
    GridColDef,
    GridRowId,
    GridRowModel,
} from '@mui/x-data-grid-pro';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button } from '@mui/material';

import { ACTIONS_COL_FIELD } from './constants';
import { ExtendedRow, RowDef } from './types';

type Props<R extends RowDef> = {
    rows: ExtendedRow<R>[];
    columns: GridColDef<R>[];
    loading?: boolean;
    onRowAdded?: () => void;
    onRowDeleted?: (id: GridRowId) => void;
    onRowUpdated?: (updated: ExtendedRow<R>, old: ExtendedRow<R>) => ExtendedRow<R>;
};

export default function EditableDataGrid<R extends RowDef>({
    rows,
    columns,
    loading,
    onRowAdded,
    onRowDeleted,
    onRowUpdated,
}: Props<R>) {
    const enhancedColumns = useMemo<GridColDef<R>[]>(() => {
        if (!onRowDeleted) return columns;
        const actionsCol: GridColDef<R> = {
            field: ACTIONS_COL_FIELD,
            type: 'actions',
            headerName: '',
            width: 60,
            getActions: (params) => [
                <GridActionsCellItem
                    key="delete"
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => onRowDeleted(params.id)}
                />,
            ],
        };
        return [...columns, actionsCol];
    }, [columns, onRowDeleted]);

    const processRowUpdate = onRowUpdated
        ? (updated: GridRowModel, old: GridRowModel) =>
              onRowUpdated(updated as ExtendedRow<R>, old as ExtendedRow<R>)
        : undefined;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <DataGridPro
                    rows={rows}
                    columns={enhancedColumns}
                    loading={loading}
                    processRowUpdate={processRowUpdate}
                    editMode="cell"
                    disableRowSelectionOnClick
                />
            </Box>
            {onRowAdded && (
                <Box sx={{ mt: 1 }}>
                    <Button variant="outlined" onClick={onRowAdded}>
                        Add row
                    </Button>
                </Box>
            )}
        </Box>
    );
}
