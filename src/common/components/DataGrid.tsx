import { DataGridPro, DataGridProProps } from '@mui/x-data-grid-pro';

type DataGridProps = DataGridProProps;

export default function DataGrid(props: DataGridProps) {
    return (
        <DataGridPro
            disableRowSelectionOnClick
            pagination
            pageSizeOptions={[10, 25, 50]}
            initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
            }}
            {...props}
        />
    );
}
