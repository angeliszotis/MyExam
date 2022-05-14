import { Alert, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { getFormatedTime } from '../helper';
import useStateContext from '../hooks/useStateContext'
import { green } from '@mui/material/colors';


export default function Result() {
    const { context, setContext } = useStateContext()
    const [score, setScore] = useState(0)
    const [qnAnswers, setQnAnswers] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const ids = context.selectedOptions.map(x => x.questionId)
        createAPIEndpoint(ENDPOINTS.result)
            .post(ids)
            .then(res => {
                console.log(res.data)
                const qna = context.selectedOptions
                    .map(x => ({
                        ...x,
                        ...(res.data.find(y => y.qnId == x.qnId))
                    }))
                setQnAnswers(qna)


            })
            .catch(err => console.log(err))
    }, [])


}