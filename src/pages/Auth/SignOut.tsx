import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AxiosMethods from "../../API/axios/methods";
import { setAuth } from "../../store/features/auth";


export const SignOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        AxiosMethods
            .logOut()
            .then(() => {
                navigate('/')

                dispatch(setAuth({
                    user: undefined,
                    isAuthenticated: false,
                }))
            })
    }, [dispatch, navigate])

    

    return <></>
}