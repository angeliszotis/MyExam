import React from 'react'
import { Box } from '@mui/system'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from './Center'
import useForm from "../hooks/useForm"
import { createAPIEndpoint, ENDPOINTS } from '../api'

const getFreshModel = () => ({
    email: '',
    password: ''
}
)



export default function Login() {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const login = e => {
        e.preventDefault();
        if (validate())
            createAPIEndpoint(ENDPOINTS.user)
                .post(values)
                .then(res => console.log(res))
                .catch(err => console.log(err))
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
                        Quiz app
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
                                label="Pass"
                                name="password"
                                variant="outlined"
                                value={values.password}
                                onChange={handleInputChange}
                                {...(errors.password && { error: true, helperText: errors.password })}
                                sx={{ width: '90%' }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}> Start
                            </Button>

                        </form>
                    </Box>
                </CardContent>

            </Card>
        </Center>

    )
}
