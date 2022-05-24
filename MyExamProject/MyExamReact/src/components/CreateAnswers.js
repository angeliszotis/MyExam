import { React, useState } from 'react'
import { Box } from '@mui/system'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from './Center'
import useForm from "../hooks/useForm"
import useStateContext from '../hooks/useStateContext'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { useNavigate } from 'react-router-dom'

const getFreshModel = () => ({

    name: '',
    description: '',
    numberOfQuestions: '',
    examstime: ''
}
)



export default function CreateAnswers() {

    const { context, setContext, resetContext } = useStateContext();
    const [inputField, setInputField] = useState([
        { correct: '', title: '', questionId: '' },
    ]);




    return (
        <Center>
            <Card sx={{ width: 400 }}>

                <CardContent sx={{ textAlign: 'center' }}>

                    <Typography variant="h5" sx={{ my: 3 }}>
                        Title of exam tbt
                        question tade linear
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90 %'
                        }
                    }}>

                    </Box>
                </CardContent>

            </Card>
        </Center>

    )
}
