import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { ContactMethod } from '../pages/ContactMethod';
import { Email } from '../pages/ContactMethod/Email';
import { Fb } from '../pages/ContactMethod/Fb';
import { Instagram } from '../pages/ContactMethod/Instagram';
import { Phone } from '../pages/ContactMethod/Phone';
import { Telegram } from '../pages/ContactMethod/Telegram';
import { Vk } from '../pages/ContactMethod/Vk';
import { Home } from '../pages/Home';
import { PreSurvey } from '../pages/PreSurvey';
import { Survey } from '../pages/Survey';
import transitionClasses from '../transitions/presets/fadeFromLeft';
import { Footer } from './Footer';

export const Main : React.FC = () => {

    const [ready, setReady] = useState(false)
    
    setTimeout(() => setReady(true), 500)
    

    return (
        <CSSTransition
            in={ready}
            timeout={300}
            classNames={{...transitionClasses}}
        >
            <div className='opacity-0'>
                <main
                    className="bg-white text-secondary-600  max-w-4xl mx-auto p-8 md:p-12 my-16 rounded-lg shadow-3xl">
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Home />}></Route>

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
                        </BrowserRouter>
                </main>
            </div>
        </CSSTransition>
    )
}
