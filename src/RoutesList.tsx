import { Routes, Route } from "react-router-dom"
import { SignIn } from "./pages/Auth/SignIn"
import { SignOut } from "./pages/Auth/SignOut"
import { SignUp } from "./pages/Auth/SignUp"
import { Profile } from "./pages/User/Profile"
import { ContactMethod } from "./pages/ContactMethod"
import { Email } from "./pages/ContactMethod/Email"
import { Fb } from "./pages/ContactMethod/Fb"
import { Instagram } from "./pages/ContactMethod/Instagram"
import { Phone } from "./pages/ContactMethod/Phone"
import { Telegram } from "./pages/ContactMethod/Telegram"
import { Vk } from "./pages/ContactMethod/Vk"
import { Home } from "./pages/Home"
import { B2B } from "./pages/Info/B2B"
import { ContactUs } from "./pages/Info/ContactUs"
import { Policy } from "./pages/Info/Policy"
import { PreSurvey } from "./pages/PreSurvey"
import { Survey } from "./pages/Survey"
import { Matches } from "./pages/User/Matches"
import { Questions } from "./pages/User/Questions"

export const RoutesList = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/sign-out" element={<SignOut />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            
            <Route path="/my/profile" element={<Profile />}></Route>
            <Route path="/my/matches" element={<Matches />}></Route>
            <Route path="/my/questions" element={<Questions />}></Route>

            <Route path="/info/b2b" element={<B2B />}></Route>
            <Route path="/info/contact-us" element={<ContactUs />}></Route>
            <Route path="/info/policy" element={<Policy />}></Route>

            <Route path="/pre-survey" element={<PreSurvey />}></Route>

            <Route path="/survey" element={<Survey />}></Route>

            <Route path="/survey/contact-method" element={<ContactMethod />}></Route>

            <Route path="/survey/contact-method/telegram" element={<Telegram />}></Route>
            <Route path="/survey/contact-method/instagram" element={<Instagram />}></Route>
            <Route path="/survey/contact-method/vk" element={<Vk />}></Route>
            <Route path="/survey/contact-method/fb" element={<Fb />}></Route>
            <Route path="/survey/contact-method/phone" element={<Phone />}></Route>
            <Route path="/survey/contact-method/email" element={<Email />}></Route>
        </Routes>
    )
}