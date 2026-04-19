import { GridColDef } from '@mui/x-data-grid-pro';
import { Product } from './types';

const columns: GridColDef<Product>[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'category', headerName: 'Category', width: 140 },
    {
        field: 'price',
        headerName: 'Price',
        width: 120,
        type: 'number',
        valueFormatter: (value: number) => `$${value.toFixed(2)}`,
    },
    {
        field: 'createdAt',
        headerName: 'Created',
        width: 140,
        type: 'string',
    },
];

export default columns;
