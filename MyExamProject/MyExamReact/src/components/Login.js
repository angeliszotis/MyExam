import React, { useEffect } from 'react'
import { Box } from '@mui/system'
import { Link, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from './Center'
import useForm from "../hooks/useForm"
import useStateContext from '../hooks/useStateContext'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { useNavigate } from 'react-router-dom'

const getFreshModel = () => ({
    email: '',
    password: ''
}
)



export default function Login() {

    const { context, setContext, resetContext } = useStateContext();
    const navigate = useNavigate()
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        resetContext()
    }, [])

    const login = e => {
        e.preventDefault();
        if (validate()) {
            createAPIEndpoint(ENDPOINTS.login)
                .post(values)
                .then(res => {
                    setContext({
                        id: res.data.id
                    })
                    navigate('exams')
                    console.log(context)
                }
                )
                .catch(err => console.log(err)
                )
        }
    }

    const validate = () => {
        let temp = {}

        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
        temp.password = values.password != "" ? "" : "This field is required."
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
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
                        <form noValidate autoComplete="off" onSubmit={login}>
                            <TextField
                                label="@Email"
                                name="email"
                                variant="outlined"
                                value={values.email}
                                onChange={handleInputChange}
                                {...(errors.email && { error: true, helperText: errors.email })}
                                sx={{ width: '90%' }}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                variant="outlined"
                                type="password"
                                value={values.password}
                                onChange={handleInputChange}
                                {...(errors.password && { error: true, helperText: errors.password })}
                                sx={{ width: '90%' }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}> Login
                            </Button>
                            <Link component="button" underline='hover' onClick={() => navigate('/register')} variant="h6" sx={{ my: 3 }}>
                                Click here to register
                            </Link>

                        </form>
                    </Box>
                </CardContent>

            </Card>
        </Center>

    )
}
