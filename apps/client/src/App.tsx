import {JSX, useEffect, useState} from 'react'
import './App.css'
import {refreshTokenHandler} from "../handlers/refresh-token.handler.ts";
import {Login} from "../components/Login.tsx";


function App(): JSX.Element {
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        refreshTokenHandler().then(data => setIsLogin(data))
    }, [])

    return isLogin ? <h1>create invoice</h1> : <Login setIsLogin={setIsLogin}/>

}

export default App
