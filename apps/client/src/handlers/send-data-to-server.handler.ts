import {GeneralInfo} from "../components/CreateInvoice/InvoiceGeneralInfo.tsx";
import {Details} from "../components/CreateInvoice/InvoiceDetails.tsx";
import {HttpStatusCodes} from "../constants/http-status-codes.ts";
import {toast} from "react-toastify";
import {httpErrorHandler} from "../helpers/http-error-handler.ts";
import FileDownload from 'js-file-download'

interface IDataToServer extends  GeneralInfo, Details{

}

export const sendDataToServerHandler = async (data: IDataToServer) => {
    try {
        const res = await fetch('/api/invoices/create-invoice', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...data, email: data.isSend ? data.email : null})
        })
        if(res.status === HttpStatusCodes.BAD_REQUEST) {
            console.log(res.body)
            toast.warn('Пожалуйста, проверьте что вы прафильно заполнили все формы')
            return null
        }
        return FileDownload(await res.arrayBuffer(), 'any.xlsx')
    } catch (e) {
        console.log(e)
        httpErrorHandler()
        return null
    }

}