import { Routes, Route, useNavigate } from "react-router-dom"
import { SignIn } from "../pages/Auth/SignIn"
import { SignOut } from "../pages/Auth/SignOut"
import { SignUp } from "../pages/Auth/SignUp"
import { Profile } from "../pages/User/Profile"
import { ContactMethod } from "../pages/ContactMethod"
import { Email } from "../pages/ContactMethod/Email"
import { Fb } from "../pages/ContactMethod/Fb"
import { Instagram } from "../pages/ContactMethod/Instagram"
import { Phone } from "../pages/ContactMethod/Phone"
import { Telegram } from "../pages/ContactMethod/Telegram"
import { Vk } from "../pages/ContactMethod/Vk"
import { Home } from "../pages/Home"
import { B2B } from "../pages/Info/B2B"
import { ContactUs } from "../pages/Info/ContactUs"
import { Policy } from "../pages/Info/Policy"
import { PreSurvey } from "../pages/PreSurvey"
import { Survey } from "../pages/Survey"
import { Matches } from "../pages/User/Matches"
import { Questions } from "../pages/User/Questions"
import { Page404 } from "../pages/404"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { AuthState } from "../interfaces"
import { useEffect } from "react"
import { AuthMiddleware } from "../middlewares/Auth"

export const RoutesList = () => {
    const auth = useSelector( (store: RootState) : AuthState =>  store.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.wasUserFetched) return
        if (!auth.isAuthenticated) {
            navigate('/sign-in')
        }
    }, [auth])
    return (
        <Routes>
            <Route path="/" element={<AuthMiddleware> <Home /> </AuthMiddleware>}></Route>

            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/sign-out" element={<AuthMiddleware> <SignOut /> </AuthMiddleware>}></Route>
            <Route path="/sign-up" element={<AuthMiddleware> <SignUp /> </AuthMiddleware>}></Route>
            
            <Route path="/my/profile" element={<AuthMiddleware> <Profile /> </AuthMiddleware>}></Route>
            <Route path="/my/matches" element={<AuthMiddleware> <Matches /> </AuthMiddleware>}></Route>
            <Route path="/my/questions" element={<AuthMiddleware> <Questions /> </AuthMiddleware>}></Route>

            <Route path="/info/b2b" element={<AuthMiddleware> <B2B /> </AuthMiddleware>}></Route>
            <Route path="/info/contact-us" element={<AuthMiddleware> <ContactUs /> </AuthMiddleware>}></Route>
            <Route path="/info/policy" element={<AuthMiddleware> <Policy /> </AuthMiddleware>}></Route>

            <Route path="/pre-survey" element={<AuthMiddleware> <PreSurvey /> </AuthMiddleware>}></Route>

            <Route path="/survey" element={<AuthMiddleware> <Survey /> </AuthMiddleware>}></Route>

            <Route path="/survey/contact-method" element={<AuthMiddleware> <ContactMethod /> </AuthMiddleware>}></Route>

            <Route path="/survey/contact-method/telegram" element={<AuthMiddleware> <Telegram /> </AuthMiddleware>}></Route>
            <Route path="/survey/contact-method/instagram" element={<AuthMiddleware> <Instagram /> </AuthMiddleware>}></Route>
            <Route path="/survey/contact-method/vk" element={<AuthMiddleware> <Vk /> </AuthMiddleware>}></Route>
            <Route path="/survey/contact-method/fb" element={<AuthMiddleware> <Fb /> </AuthMiddleware>}></Route>
            <Route path="/survey/contact-method/phone" element={<AuthMiddleware> <Phone /> </AuthMiddleware>}></Route>
            <Route path="/survey/contact-method/email" element={<AuthMiddleware> <Email /> </AuthMiddleware>}></Route>

            <Route path="*" element={<Page404 />}></Route>
        </Routes>
    )
}