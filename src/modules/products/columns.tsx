import { GridColDef } from '@mui/x-data-grid-pro';
import { Product } from './types';

const columns: GridColDef<Product>[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150, editable: true },
    { field: 'category', headerName: 'Category', width: 140, editable: true },
    {
        field: 'price',
        headerName: 'Price',
        width: 120,
        type: 'number',
        editable: true,
        valueFormatter: (value: number) =>
            value != null ? `$${value.toFixed(2)}` : '',
    },
    { field: 'createdAt', headerName: 'Created', width: 140, editable: true },
];

export default columns;
