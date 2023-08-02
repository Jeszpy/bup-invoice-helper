import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {FC} from "react";
import Checkbox from "@mui/material/Checkbox";
import {TextareaAutosize} from "@mui/material";


interface GeneralInfo {
    title: string,
    requisites: string,
    isSend: boolean,
    email: string
}

interface IGeneralInfo {
    info: GeneralInfo
    setInfo: (val: GeneralInfo) => void
}

export const InvoiceGeneralInfo: FC<IGeneralInfo> = ({info, setInfo}) => {

    const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({...info, title: event.target.value})
    }

    const requisitesHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInfo({...info, requisites: event.target.value})
    }

    const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({...info, email: event.target.value})
    }

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Пожалуйста, заполните форму
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        value={info.title}
                        id="title"
                        name="title"
                        label="Название организации"
                        fullWidth
                        variant="standard"
                        onChange={titleHandler}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextareaAutosize

                        inputMode='text'
                        required
                        minRows={7}
                        style={{minWidth: '100%', background: 'white', color: 'black', fontSize: 16}}
                        id="requisites"
                        name="requisites"
                        placeholder='Реквизиты организации'
                        value={info.requisites}
                        onChange={requisitesHandler}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h6">Отправить счёт-фактуру по Email?</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Checkbox color="primary" name="isSend" checked={info.isSend}
                              onClick={() => setInfo({...info, isSend: !info.isSend})}/>
                </Grid>
                <Grid item xs={12} sx={{visibility: info.isSend ? 'visible' : 'hidden'}}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Введите email адрес заказчика"
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        value={info.email}
                        onChange={emailHandler}
                    />
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </>
    );
}