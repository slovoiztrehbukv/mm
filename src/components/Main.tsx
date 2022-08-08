import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Home } from '../pages/Home';
import { PreSurvey } from '../pages/PreSurvey';
import { Survey } from '../pages/Survey';
import transitionClasses from '../transitions/presets/fadeFromLeft';

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
                            </Routes>
                        </BrowserRouter>
                </main>
            </div>
        </CSSTransition>
    )
}
