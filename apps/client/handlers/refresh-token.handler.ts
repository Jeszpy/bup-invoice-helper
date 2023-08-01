import {LocalStorageItems} from "../constants/local-storage-items.ts";
import {HttpStatusCodes} from "../constants/http-status-codes.ts";


export const refreshTokenHandler = async () => {
    const token = localStorage.getItem(LocalStorageItems.TOKEN)
    if (!token) return false

    const res = await fetch('/api/auth/refreshToken', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token})
        })

    if(res.status === HttpStatusCodes.UNAUTHORIZED || res.status === HttpStatusCodes.BAD_REQUEST) return false
    const data = await res.json()
    localStorage.setItem(LocalStorageItems.TOKEN, data.token)
    return true
}