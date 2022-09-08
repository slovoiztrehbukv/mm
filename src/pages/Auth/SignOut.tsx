import { useEffect } from "react"
import AxiosMethods from "../../API/axios/methods";


export const SignOut = () => {
    useEffect(() => {
        AxiosMethods
            .logOut()
            .then(() => {
                window.location.href = '/sign-in'
            })
    }, [])

    

    return <></>
}