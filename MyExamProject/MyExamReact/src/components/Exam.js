import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api'
import useStateContext from '../hooks/useStateContext'
import { Card, CardContent, CardMedia, CardHeader, List, ListItemButton, Typography, Box, LinearProgress } from '@mui/material'
import { getFormatedTime } from '../helper'
import { useNavigate } from 'react-router'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'description', label: 'Description', minWidth: 100 },
    {
        id: 'owner',
        label: 'Owner',
        minWidth: 20,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'date',
        label: 'Date',
        minWidth: 200,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'start',
        label: 'Start exam',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];


export default function Exam() {


    const { context, setContext } = useStateContext()
    const [qns, setQns] = useState([])
    const [qnIndex, setQnIndex] = useState(0)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {

        createAPIEndpoint(ENDPOINTS.exam)
            .fetch()
            .then(res => {
                setQns(res.data)
                console.log(res.data)
            })
            .catch(err => { console.log(err); })


    }, [])
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {qns
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((data, idx) => (
                                <TableRow >
                                    <TableCell >{data.name}</TableCell >
                                    <TableCell >{data.description}</TableCell >
                                    <TableCell >{data.owner}</TableCell >
                                    <TableCell >{data.date}</TableCell >
                                </TableRow >

                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={qns.length}
                rowsPerPage={qns}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );

}
