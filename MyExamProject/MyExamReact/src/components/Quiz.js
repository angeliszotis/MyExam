import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router'
import { Card, CardContent, CardMedia, CardHeader, List, ListItemButton, Typography, Box, LinearProgress } from '@mui/material'
import { getFormatedTime } from '../helper'

export default function Quiz() {

    const [qns, setQns] = useState([])
    const [answer, setAnswer] = useState([])
    const [qnIndex, setQnIndex] = useState(1)
    const [answerIndex, setAnswerIndex] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0)
    const { context, setContext } = useStateContext()
    const navigate = useNavigate()

    let timer;

    const startTimer = () => {
        timer = setInterval(() => {
            setTimeTaken(prev => prev + 1)
        }, [1000])
    }
    useEffect(() => {

        createAPIEndpoint(ENDPOINTS.question)
            .fetchById(context.examid)
            .then(res => {
                setQns(res.data)
                startTimer()
                // console.log(qns);
            })
            .catch(err => { console.log(err); })

        createAPIEndpoint(ENDPOINTS.answer)
            .fetchById(qnIndex)
            .then(res => {
                setAnswer(res.data)
                // console.log(res.data)
            })
            .catch(err => { console.log(err); })


    }, [])

    const updateAnswer = (qnId, optionIdx) => {
        console.log(qnIndex)
        console.log(qns.length)

        const temp = [...context.selectedOptions]
        temp.push({
            questionId: qnId,
            selected: optionIdx
        })
        if (qnIndex + 1 < qns.length) {
            setContext({ selectedOptions: [...temp] })
            setQnIndex(qnIndex + 1)
            createAPIEndpoint(ENDPOINTS.answer)
                .fetchById(optionIdx + 1)
                .then(res => {
                    setAnswer(res.data)
                    console.log(res.data)
                })
                .catch(err => { console.log(err); })
        }
        else {
            setContext({ selectedOptions: [...temp], timeTaken })
            navigate("/result")
        }
    }

    return (
        qns.length != 0
            ?

            <Card
                sx={{
                    maxWidth: 640, mx: 'auto', mt: 5,
                    '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
                }}>
                <CardHeader
                    title={'Question ' + (qnIndex + 1)}
                    action={<Typography>{getFormatedTime(timeTaken)}</Typography>} />
                <Box>
                    <LinearProgress variant="determinate" value={(qnIndex + 1) * 100 / qns.length} />
                </Box>

                <CardContent>
                    <Typography variant="h6">
                        {qns[qnIndex].title}
                    </Typography>
                    <List>
                        {answer.map((data, idx) => (

                            <ListItemButton disableRipple key={idx} onClick={() => updateAnswer(qns[qnIndex].id, idx)}>
                                <div>
                                    <b>{String.fromCharCode(65 + idx) + " . "}</b>{data.title}
                                </div>

                            </ListItemButton>
                        ))}
                    </List>

                </CardContent>
            </Card>
            : null
    )
}
