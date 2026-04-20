import { useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

import EditableDataGrid from '../../common/components/editable-data-grid/EditableDataGrid';
import useProductStore from './store';
import { Product as ProductType } from './types';

const EMPTY_ROW: Partial<ProductType> = {
    name: '',
    category: '',
    price: 0,
    createdAt: '',
};

export default function Product() {
    const rows = useProductStore((s) => s.rows);
    const allColumns = useProductStore((s) => s.allColumns);
    const loading = useProductStore((s) => s.loading);
    const isDirty = useProductStore((s) => s.isDirty);
    const addRow = useProductStore((s) => s.addRow);
    const updateRow = useProductStore((s) => s.updateRow);
    const removeRow = useProductStore((s) => s.removeRow);
    const discardChanges = useProductStore((s) => s.discardChanges);
    const getProducts = useProductStore((s) => s.getProducts);
    const saveProducts = useProductStore((s) => s.saveProducts);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <Box sx={{ p: 2 }}>
            <Stack
                direction="row"
                sx={{
                    mb: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5">Products</Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        disabled={!isDirty}
                        onClick={discardChanges}
                    >
                        Discard
                    </Button>
                    <Button
                        variant="contained"
                        disabled={!isDirty}
                        onClick={saveProducts}
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
            <Box sx={{ height: 500 }}>
                <EditableDataGrid
                    rows={rows}
                    columns={allColumns}
                    loading={loading}
                    onRowAdded={() => addRow(EMPTY_ROW)}
                    onRowDeleted={removeRow}
                    onRowUpdated={updateRow}
                />
            </Box>
        </Box>
    );
}
