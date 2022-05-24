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
import useForm from "../hooks/useForm"


const getFreshModel = () => ({
    questionsNumber: ''
}
)

const columns = [
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'difficulty', label: 'Difficulty', minWidth: 100 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'start', label: 'Add question to exam', minWidth: 100, align: 'center' },
];

export default function Exams() {

    const [qns, setQns] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { context, setContext } = useStateContext()
    const navigate = useNavigate()
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    // const { context, useStateContext } = useStateContext()


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {

        createAPIEndpoint(ENDPOINTS.question)
            .fetch()
            .then(res => {
                setQns(res.data)
                // console.log(res.data)
            })
            .catch(err => { console.log(err); })


    }, [])

    const addQuestion = (questionId) => {
        // console.log(examId)
        createAPIEndpoint(ENDPOINTS.examhasquestion)
            .post({
                'questionId': questionId,
                'examId': context.examid
            })
            .then(res => {

                console.log(context)
            }
            )
            .catch(err => console.log(err)
            )
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
                                <TableRow key={idx}>
                                    <TableCell >{data.title}</TableCell >
                                    <TableCell >{data.difficulty}</TableCell >
                                    <TableCell >{data.type}</TableCell >
                                    <TableCell >{data.date}</TableCell >
                                    <TableCell onClick={() => addQuestion(data.id)} align='center' key={data.id}><PlayArrowOutlinedIcon>Add question to exam</PlayArrowOutlinedIcon></TableCell >
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
