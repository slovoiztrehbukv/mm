import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { QuestionsInitialActionPayload } from '../interfaces';
import { Home } from '../pages/Home';
import { PreStart } from '../pages/PreStart';
import { Start } from '../pages/Start';
import { initQuestions } from '../store/features/questions';
import transitionClasses from '../transitions/presets/fadeFromLeft';

export const Main : React.FC = () => {

    const [ready, setReady] = useState(false)
    
    const dispatch = useDispatch()

    const loadQuestions = (payload: QuestionsInitialActionPayload = {})  => {
        dispatch(initQuestions(payload))
    }
   
    useEffect(() => {
        setTimeout(() => {
            loadQuestions({
                questionsQuantity: 20
            })
        }, 1500)
    })

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
                                <Route path="/prestart" element={<PreStart />}></Route>
                                <Route path="/start" element={<Start />}></Route>
                            </Routes>
                        </BrowserRouter>
                </main>
            </div>
        </CSSTransition>
    )
}

function dispatch() {
    throw new Error('Function not implemented.');
}
