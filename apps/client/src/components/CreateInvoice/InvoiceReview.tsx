import  {FC, useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import {GeneralInfo} from "./InvoiceGeneralInfo.tsx";
import {Details} from "./InvoiceDetails.tsx";
import {sendDataToServerHandler} from "../../handlers/send-data-to-server.handler.ts";
import {ClipLoader} from "react-spinners";

interface InvoiceReview {
    info: GeneralInfo
    details: Details
    activeStep: number
    setActiveStep: (val: number) => void
}


export const InvoiceReview: FC<InvoiceReview> = ({info, details, activeStep, setActiveStep}) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        sendDataToServerHandler({...info, ...details}).then(() => {
            setIsLoading(false)
        })
    }, []);


    const returnBackHandler = () => {
        setActiveStep(activeStep - 1)
    }

    if (isLoading) return <ClipLoader
        color='#0c66f7'
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
    return (
        <>
            <Typography variant="h5" gutterBottom>
                Спасибо что воспользовались помошником.
            </Typography>
            <Typography variant="subtitle1">
                Выберите куда сохранить счёт-фактуру. Копия отправлена на
                1438206@mail.ru {info.isSend ? info.email : ''}
            </Typography>
            <Button onClick={returnBackHandler}>Назад</Button>
        </>
    )
}