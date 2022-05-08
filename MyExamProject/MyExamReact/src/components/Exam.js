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

export default function Exam() {


    const { context, setContext } = useStateContext()
    const [qns, setQns] = useState([])
    const [qnIndex, setQnIndex] = useState(0)


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
        qns.length != 0
            ? <Card>
                <CardContent>
                    {qns[qnIndex].id}
                    <List>
                        {qns.map((data, idx) => (
                            <ListItemButton >
                                <div>{data.name}</div>
                                <div>{data.description}</div>
                                <div>{data.owner}</div>
                                <div>{data.date}</div>
                            </ListItemButton >

                        ))}
                    </List>
                </CardContent>
            </Card>
            : null

    )

}
