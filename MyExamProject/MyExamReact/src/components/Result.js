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
    const [qns, setQns] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        createAPIEndpoint(ENDPOINTS.question)
            .fetchById(1)
            .then(res => {
                setQns(res.data)
                console.log(res.data)
            })
            .catch(err => { console.log(err); })

        const ids = context.selectedOptions.map(x => x.answerId)
        createAPIEndpoint(ENDPOINTS.result)
            .post(ids)
            .then(res => {
                calculateScore(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    // console.log(context.examid)
    //     useEffect(() => {
    // 
    //     }, [])

    const calculateScore = correctAnswers => {
        console.log(correctAnswers.length * 100 / qns.length)
        setScore(correctAnswers.length * 100 / qns.length)
    }

    const restart = () => {
        setContext({
            timeTaken: 0,
            selectedOptions: []
        })
        navigate("/quiz")
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
                            <Typography variant="span" color={green[500]}>
                                {score}
                            </Typography>%
                        </Typography>
                        <Typography variant="h6">
                            Took {getFormatedTime(context.timeTaken) + ' mins'}
                        </Typography>
                        <Button variant="contained"
                            sx={{ mx: 1 }}
                            size="small"
                            onClick={restart}>
                            Re-try
                        </Button>

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