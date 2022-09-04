import React from "react"
import { ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"
import { PathRouteProps, Route, useNavigate } from "react-router-dom"
import { AuthState } from "../interfaces"
import { RootState } from "../store"



export const AuthMiddleware = (props: any) => {
    const auth = useSelector( (store: RootState) : AuthState =>  store.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.wasUserFetched) return
        if (!auth.isAuthenticated) {
            navigate('/sign-in')
        }
    }, [auth, navigate])
    return (
        React.createElement('div', null, ...props.children)
    )
}