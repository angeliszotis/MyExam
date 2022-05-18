import React from 'react'
import { Box } from '@mui/system'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from './Center'
import useForm from "../hooks/useForm"
import useStateContext from '../hooks/useStateContext'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { useNavigate } from 'react-router-dom'

const getFreshModel = () => ({
    asdf: '',
    name: '',
    description: '',
    examstime: ''
}
)



export default function CreateExam() {

    const { context, setContext, resetContext } = useStateContext();
    const navigate = useNavigate()
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const createExam = e => {
        values.usersId = '1';
        console.log(values)
        e.preventDefault();
        createAPIEndpoint(ENDPOINTS.exam)
            .post(values)
            .then(res => {
                console.log('i am here')

            }
            )
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }



    return (
        <Center>
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>

                    <Typography variant="h3" sx={{ my: 3 }}>
                        My exam
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90 %'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={createExam}>
                            <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                value={values.Name}
                                onChange={handleInputChange}
                                {...(errors.name && { error: true, helperText: errors.name })}
                                sx={{ width: '90%' }}
                            />
                            <TextField
                                label="Description of Exam"
                                name="description"
                                variant="outlined"
                                value={values.Description}
                                onChange={handleInputChange}
                                {...(errors.description && { error: true, helperText: errors.description })}
                                sx={{ width: '90%' }}
                            />
                            <TextField
                                label="Exams Time"
                                name="examstime"
                                variant="outlined"
                                value={values.Examstime}
                                onChange={handleInputChange}
                                {...(errors.examstime && { error: true, helperText: errors.examstime })}
                                sx={{ width: '90%' }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}> Register
                            </Button>


                        </form>
                    </Box>
                </CardContent>

            </Card>
        </Center>

    )
}
