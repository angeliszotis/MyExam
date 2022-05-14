import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router'
import { Card, CardContent, CardMedia, CardHeader, List, ListItemButton, Typography, Box, LinearProgress } from '@mui/material'
import { getFormatedTime } from '../helper'

export default function Quiz() {

    const [qns, setQns] = useState([])
    const [answer, setAnswer] = useState([])
    const [qnIndex, setQnIndex] = useState(0)
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

        setContext({
            timeTaken: 0,
            selectedOptions: []
        })

        createAPIEndpoint(ENDPOINTS.question)
            .fetchById(context.examid)
            .then(res => {
                setQns(res.data)
                startTimer()
                createAPIEndpoint(ENDPOINTS.answer)
                    .fetchById(res.data[0].id)
                    .then(res => {
                        setAnswer(res.data)
                    })
                    .catch(err => { console.log(err); })
            })
            .catch(err => { console.log(err); })




    }, [])

    const updateAnswer = (qnId, AnsId, dataPoints) => {

        // console.log(qnId)
        // console.log(qns.length + 'is ' + 'length is ' + length)

        const temp = [...context.selectedOptions]
        temp.push({
            questionId: qnId,
            answerId: AnsId,
            answerPoints: dataPoints

        })
        if (qnId < qns.length) {
            setContext({ selectedOptions: [...temp] })
            setQnIndex(qnIndex + 1)
            createAPIEndpoint(ENDPOINTS.answer)
                .fetchById(qnId + 1)
                .then(res => {
                    setAnswer(res.data)
                    // console.log(res.data)
                })
                .catch(err => { console.log(err); })
        }
        else {
            let questionsCount = qnIndex + 1
            setContext({ selectedOptions: [...temp], timeTaken, questionsCount })
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
                    title={'Question ' + (qnIndex + 1) + ' of ' + qns.length}
                    action={<Typography>{getFormatedTime(timeTaken)}</Typography>} />
                <Box>
                    <LinearProgress variant="determinate" value={(qns[qnIndex].id) * 100 / qns.length} />
                </Box>

                <CardContent>
                    <Typography variant="h6">
                        {qns[qnIndex].title}
                    </Typography>
                    <List>
                        {answer.map((data, idx) => (

                            <ListItemButton disableRipple key={idx} onClick={() => updateAnswer(data.questionId, data.id, data.points)}>
                                <div>
                                    <b>{String.fromCharCode(65 + idx) + " . "}</b>{data.title} {data.questionId}
                                </div>

                            </ListItemButton>
                        ))}
                    </List>

                </CardContent>
            </Card>
            : <Typography variant="h8">
                This exam is not setted up
            </Typography>
    )
}
