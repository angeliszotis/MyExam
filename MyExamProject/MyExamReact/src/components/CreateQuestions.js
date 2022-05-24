import React from 'react'
import { Box } from '@mui/system'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from './Center'
import useForm from "../hooks/useForm"
import useStateContext from '../hooks/useStateContext'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { useNavigate } from 'react-router-dom'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ProgressStepper from '../helper/ProgressStepper'

const getFreshModel = () => ({
    questionsNumber: ''
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

    const createQuestions = e => {
        e.preventDefault();
        createAPIEndpoint(ENDPOINTS.question)
            .post(values)
            .then(res => {
                setContext({
                    questionsNumber: values.difficulty,
                    questionId: res.data.id,
                    title: res.data.title

                })
                navigate('/createanswers')
                console.log(context)
            }
            )
            .catch(err => console.log(err)
            )


    }



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
                        <form noValidate autoComplete="off" onSubmit={createQuestions}>
                            <TextField
                                label="Put the question here"
                                name="title"
                                variant="outlined"
                                value={values.title}
                                onChange={handleInputChange}
                                {...(errors.title && { error: true, helperText: errors.title })}
                                sx={{ width: '90%' }}
                            />
                            <TextField
                                label="Number of answers (difficulty 1-5)"
                                name="difficulty"
                                variant="outlined"
                                value={values.difficulty}
                                onChange={handleInputChange}
                                {...(errors.difficulty && { error: true, helperText: errors.difficulty })}
                                sx={{ width: '90%' }}
                            />
                            {/* <FormLabel id="demo-radio-buttons-group-label">Type of question</FormLabel> */}
                            {/* <RadioGroup
                                style={{ display: 'block' }}
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="radio"
                                name="type"
                            >
                                <FormControlLabel value="radio" control={<Radio />} label="Radio" />
                                <FormControlLabel value="checkbox" control={<Radio />} label="Checkbox" />
                            </RadioGroup> */}

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%', m: 1 }}> Create question
                            </Button>


                        </form>
                    </Box>
                </CardContent>

            </Card>
        </Center>

    )
}
