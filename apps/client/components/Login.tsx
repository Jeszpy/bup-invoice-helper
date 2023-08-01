import React, {FC} from "react";
import {HttpStatusCodes} from "../constants/http-status-codes";
import {toast} from "react-toastify";
import {LocalStorageItems} from "../constants/local-storage-items";
import {httpErrorHandler} from "../helpers/http-error-handler";
import {Avatar, Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {blue} from "@mui/material/colors";

interface ILogin {
    setIsLogin: (val: boolean) => void
}

export const Login: FC<ILogin> = ({setIsLogin}) => {

    const pwdField = "password"

    const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            const password = data.get(pwdField)
            const res: Response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({password})
            })
            if (res.status === HttpStatusCodes.UNAUTHORIZED) return toast.error("Вы ввели неверный пароль")
            const {token} = await res.json()
            localStorage.setItem(LocalStorageItems.TOKEN, token)
            setIsLogin(true)
            return toast.success("Вы успешно вошли в систему")
        } catch (e) {
            console.log(e)
            return httpErrorHandler()
        }
    }


    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: blue[700]}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Введите пароль
                    </Typography>
                    <Box component="form" onSubmit={loginHandler} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name={pwdField}
                            type={pwdField}
                            id={pwdField}
                            autoFocus={true}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}