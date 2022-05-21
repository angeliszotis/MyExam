import React from 'react'
import { Box } from '@mui/system'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
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

    const login = e => {
        e.preventDefault();
        if (validate()) {
            createAPIEndpoint(ENDPOINTS.register)
                .post(values)
                .then(res => {
                    setContext({
                        id: res.data.id
                    })

                    console.log(res.data)
                    console.log(context)
                    navigate('/exams')

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
                                label="First Name"
                                name="FirstName"
                                variant="outlined"
                                value={values.FirstName}
                                onChange={handleInputChange}
                                {...(errors.email && { error: true, helperText: errors.email })}
                                sx={{ width: '90%' }}
                            />
                            <TextField
                                label="Last Name"
                                name="LastName"
                                variant="outlined"
                                value={values.LastName}
                                onChange={handleInputChange}
                                {...(errors.email && { error: true, helperText: errors.email })}
                                sx={{ width: '90%' }}
                            />
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
                                sx={{ width: '90%' }}> Register
                            </Button>


                        </form>
                    </Box>
                </CardContent>

            </Card>
        </Center>

    )
}
