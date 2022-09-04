import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthState } from "../interfaces"
import { RootState } from "../store"



export const AuthMiddleware = (props: any) => {
    const auth = useSelector( (store: RootState) : AuthState =>  store.auth)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!auth.wasUserFetched) return
        if (!auth.isAuthenticated) {
            navigate(`/sign-in${location.pathname === '/' ? '' : '?welcome=false'}`)
        }
    }, [auth, navigate])



    return (
        <>
            {props.children}
        </>
    )
}