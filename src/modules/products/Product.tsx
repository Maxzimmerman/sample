import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import DataGrid from '../../common/components/DataGrid';
import useProductStore from './store';
import columns from './columns';

export default function Product() {
    const { products, loading, getProducts } = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Products
            </Typography>
            <Box sx={{ height: 500 }}>
                <DataGrid
                    rows={products}
                    columns={columns}
                    loading={loading}
                />
            </Box>
        </Box>
    );
}
