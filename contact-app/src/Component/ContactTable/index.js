import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    DataGrid,
    GridActionsCellItem,
} from '@mui/x-data-grid';
export default function FullFeaturedCrudGrid(props) {
    useEffect(() => {
        setRows(props.rowData);
    })
    const [rows, setRows] = useState([]);

    const handleEditClick = (data) => () => {
        props.getRowData(data)
    };

    const handleDeleteClick = (id) => () => {
        props.deleteAction(id);
    };

    const columns = [
        { field: 'firstName', headerName: 'First Name', width: 150, editable: true },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150,
            editable: true,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: true
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: (data) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(data.row)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(data.row.id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
            />
        </>
    );
}
