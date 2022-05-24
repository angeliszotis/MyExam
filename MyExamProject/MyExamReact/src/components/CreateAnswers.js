import { React, useState } from 'react'
import { Box } from '@mui/system'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Center from './Center'
import useForm from "../hooks/useForm"
import useStateContext from '../hooks/useStateContext'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { useNavigate } from 'react-router-dom'
// import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
// import Button from '@material-ui/core/Button';
// import RemoveIcon from '@material-ui/icons/Remove';
// import AddIcon from '@material-ui/icons/Add';
// import Icon from '@material-ui/core/Icon';

const getFreshModel = () => ({

    name: '',
    description: '',
    numberOfQuestions: '',
    examstime: ''
}
)

const randomNumber = () => {

    const min = 1;
    const max = 100000000;
    const rand = min + Math.random() * (max - min);
    return parseInt(rand);

}


export default function CreateAnswers() {
    // const classes = useStyles()
    const { context, setContext, resetContext } = useStateContext();
    const [inputFields, setInputFields] = useState([
        { id: randomNumber(), correct: '', title: '', questionId: context.questionId },
    ]);

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);



    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("InputFields", inputFields);
        createAPIEndpoint(ENDPOINTS.addanswer)
            .post(inputFields)
            .then(res => {

                // console.log(context)
            }
            )
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

    };

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFields(newInputFields);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: randomNumber(), correct: '', title: '', questionId: context.questionId }])
    }

    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }



    return (
        <Center>
            <Card sx={{ width: 600 }}>

                <CardContent sx={{ textAlign: 'center' }}>

                    <Typography variant="h5" sx={{ my: 3 }}>
                        {context.title}
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90 %'
                        }
                    }}>

                        <form onSubmit={handleSubmit}>
                            {inputFields.map(inputField => (
                                <div>
                                    <div key={inputField.id}>
                                        <TextField
                                            name="title"
                                            label="Answer"
                                            variant="filled"
                                            value={inputField.title}
                                            onChange={event => handleChangeInput(inputField.id, event)}
                                        />
                                        <TextField
                                            name="correct"
                                            label="Correct=1 , False= 0"
                                            variant="filled"
                                            value={inputField.correct}
                                            onChange={event => handleChangeInput(inputField.id, event)}
                                        />
                                    </div>
                                    <div>
                                        <Button onClick={() => handleRemoveFields(inputField.id)}>
                                            Remove
                                        </Button>
                                        <Button onClick={handleAddFields}>
                                            Add
                                        </Button>
                                    </div>
                                </div>


                            ))}

                            <Button

                                variant="contained"
                                color="primary"
                                type="submit"

                                onClick={handleSubmit}
                            >Send</Button>
                        </form>
                    </Box>
                </CardContent>

            </Card>
        </Center>

    )
}
