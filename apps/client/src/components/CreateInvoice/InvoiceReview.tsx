import {FC, useEffect} from "react";
import {Typography} from "@mui/material";
import {GeneralInfo} from "./InvoiceGeneralInfo.tsx";
import {Details} from "./InvoiceDetails.tsx";
import {sendDataToServerHandler} from "../../handlers/send-data-to-server.handler.ts";

interface InvoiceReview {
    info: GeneralInfo
    details: Details
}

export const InvoiceReview: FC<InvoiceReview> = ({info, details}) => {
    useEffect(() => {
        sendDataToServerHandler({...info, ...details}).then(res => {
            console.log(res)
        })
    }, []);
    return (
        <>

            <Typography variant="h5" gutterBottom>
                Спасибо что воспользовались помошником.
            </Typography>
            <Typography variant="subtitle1">
                Выберите куда сохранить счёт-фактуру. Копия отправлена на
                1438206@mail.ru {info.isSend ? info.email : ''}
            </Typography>
        </>)
}