import { Alert, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { getFormatedTime } from '../helper';
import useStateContext from '../hooks/useStateContext'
import { green, red } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import { ExpandMoreSharp } from '@mui/icons-material';



export default function Result() {
    const { context, setContext } = useStateContext()
    const [score, setScore] = useState(0)
    const [qns, setQns] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0);
    const [gradeBool, setGradeBool] = React.useState(0);


    useEffect(() => {

        createAPIEndpoint(ENDPOINTS.question)
            .fetchById(context.examid)
            .then(res => {
                setQns(res.data.length)
                console.log(res.data)
                const ids = context.selectedOptions.map(x => x.answerId)
                createAPIEndpoint(ENDPOINTS.result)
                    .post(ids)
                    .then(res => {
                        calculateScore(res.data)

                        // console.log(res.data)
                    })
                    .catch(err => console.log(err))
            }, [])
            .catch(err => { console.log(err); })
    })

    const calculateScore = (correctAnswers) => {
        setScore((correctAnswers.length * 100 / qns).toFixed(1))
        // console.log("score is " + score)
        // console.log("userid is " + context.id)
        // console.log("examdi is " + context.examid)

    }



    const insertGrade = () => {
        createAPIEndpoint(ENDPOINTS.grade)
            .post({
                'grade1': score,
                'usersId': context.id,
                'examId': context.examid

            })
            .then(res => {
            }
            )
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        setGradeBool(true)
    }

    const updateFeedback = (newValue) => {
        createAPIEndpoint(ENDPOINTS.feedback)
            .post({
                'examId': context.examid,
                'vote': newValue
            })
            .then(res => {
                setContext({
                    // id: res.data.id
                })
                // navigate('exams')
                // console.log(context)
            }
            )
            .catch(err => console.log(err)
            )
    }

    return (
        <>
            <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
                        <Typography variant="h4">Congratulations!</Typography>
                        <Typography variant="h6">
                            Your grade is
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            <Typography variant="span" color={score > 50 ? green[500] : red[500]}>
                                {score} {score > 50 ? '% passed' : '% failed'}
                            </Typography>
                        </Typography>
                        <Typography variant="h6">
                            Took {getFormatedTime(context.timeTaken) + ' mins'}
                        </Typography>
                        <Button variant="contained"
                            sx={{ mx: 1 }}
                            disabled={gradeBool}
                            size="small"
                            onClick={() => insertGrade()}>
                            Submit grade
                        </Button>
                        <Typography component="legend">Controlled</Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            disabled={value > 0}
                            onChange={(event, newValue) => {
                                updateFeedback(newValue);
                                setValue(newValue);
                            }}
                        />
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 220, height: 250 }}
                    image="./finish.png"
                />

            </Card>
            {/* <Answer qnAnswers={qnAnswers} /> */}
        </>
    )


}