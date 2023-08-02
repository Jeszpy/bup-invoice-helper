import {toast} from "react-toastify";


export const httpErrorHandler = () => {
    return toast.error(`Произошла непредвиденная ошибка. Сообщете об этом разработчику.`)
}