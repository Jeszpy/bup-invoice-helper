import {Box, Button, Container, CssBaseline, Paper, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {FC, useState} from "react";
import {InvoiceGeneralInfo} from "./InvoiceGeneralInfo.tsx";
import {InvoiceDetails} from "./InvoiceDetails.tsx";
import {toast} from "react-toastify";
import {InvoiceReview} from "./InvoiceReview.tsx";


const steps = ['Общая информация', 'Детали заказа']; //'Review your order'


// function getStepContent(step: number) {
//     switch (step) {
//         case 0:
//             return <InvoiceGeneralInfo/>;
//         case 1:
//             return <InvoiceDetails />;
//         // case 2:
//         //     return <Review />;
//         default:
//             throw new Error('Unknown step');
//     }
// }

const validationError = (activeStep: number) => {
    toast.warn(`Пожалуйста, заполните правильно поля на странице - ${steps[activeStep]}`)
    return
}

export const CreateInvoice: FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [info, setInfo] = useState({
        title: '',
        requisites: '',
        isSend: false,
        email: '',
    })
    const [details, setDetails] = useState({
        cardsCount: 0,
        cardsPrice: 0.5
    })

    const validateInfo = () => {
        const checkTitle = !info.title.trim()
        const checkRequisites = !info.requisites.trim()
        const checkEmail = info.isSend && (!info.email.trim() || !info.email.includes('@'))
        return !(checkTitle || checkRequisites || checkEmail);
    }

    const validateDetails = () => {
        return !(details.cardsCount <= 0 || details.cardsPrice <= 0)
    }

    const handleNext = () => {
        if(activeStep === 0) {
            validateInfo() ? setActiveStep(activeStep + 1) : validationError(activeStep)
        }
        if(activeStep === 1) {
            validateDetails() ? setActiveStep(activeStep + 1) : validationError(activeStep)
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <>
            <CssBaseline/>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Выписка счёт-фактуры
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <InvoiceReview info={info} details={details}/>
                    ) : (
                        <>
                            {/*{getStepContent(activeStep)}*/}
                            {activeStep === 0 && <InvoiceGeneralInfo info={info} setInfo={setInfo}/>}
                            {activeStep === 1 && <InvoiceDetails details={details} setDetails={setDetails}/>}
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                        Назад
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{mt: 3, ml: 1}}
                                >
                                    {activeStep === steps.length - 1 ? 'Получить счёт-фактуру' : 'Далее'}
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Container>
        </>
    )

}