import React, { useEffect, useState } from 'react'
import { Box, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import useStateContext from '../hooks/useStateContext'

const steps = ['Step 1', 'Step2', 'Step 3'];
const stepDescription = ['Description 1', 'Description 2', 'Description 3'];

const ProgressStepper = ({ steps, stepDescription }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const totalSteps = steps.length;
    const completedSteps = Object.keys(completed).length;
    const allStepsCompleted = completedSteps === totalSteps;

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleNext = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    }

    return (
        <Box sx={{ witdth: '100%' }}>
            <div>
                <Stepper orientation='horizontal' activeStep={activeStep}>
                    {steps.map((step, index) => (
                        <Step key={step}
                            completed={completed[index]}>
                            <StepLabel>
                                {step}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <div>
                    {allStepsCompleted ?
                        (<><Typography>
                            All Steps Completed
                        </Typography>
                            <Button onClick={handleReset}
                                variant="contained"
                            >
                                Reset
                            </Button>
                        </>)
                        : (
                            <>
                                <Typography>
                                    {stepDescription[activeStep]}
                                </Typography>
                                <Button onClick={handleBack}
                                    sx={{ m: 1 }}
                                    variant="contained"
                                    disable={activeStep === 0}
                                >
                                    Back
                                </Button>
                                <Button onClick={handleNext}
                                    variant="contained"
                                >
                                    {completedSteps === totalSteps - 1 ? 'Finish' : 'next'}
                                </Button>

                            </>
                        )
                    }
                </div>

            </div>

        </Box>

    )
}

export default ProgressStepper