import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';


const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'owner', label: 'Owner', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'start', label: 'Start exam', minWidth: 100, align: 'center' },
];

export default function Exams() {

    const [qns, setQns] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { setContext } = useStateContext();
    const navigate = useNavigate()

    // const { context, useStateContext } = useStateContext()


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

    const startExam = (examId) => {
        console.log(examId)
        setContext({
            examid: examId
        })
        navigate('/quiz')
    }

    return (

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 800 }}>
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
                                    <TableCell onClick={() => startExam(data.id)} align='center' key={data.id}><PlayArrowOutlinedIcon>Start Exam</PlayArrowOutlinedIcon></TableCell >
                                </TableRow >

                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={qns.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );

}
