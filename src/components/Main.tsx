import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import { RootState } from '../store';
import transitionClasses from '../transitions/presets/fadeFromLeft';
import { Question, setQuestions } from '../store/features/questions';

export const Main : React.FC = () => {

    const [ready, setReady] = useState(false)
    
    const questions = useSelector((state: RootState) => state.questions.items)
    const dispatch = useDispatch()


    setTimeout(() => setReady(true), 500)


    setTimeout(() => dispatch(setQuestions([
        {
            id: 1,
            title: 'q1',
            answers: [],
            userAnswer: null
        }
    ])), 1500)



    return (
        <CSSTransition
            in={ready}
            timeout={300}
            classNames={{...transitionClasses}}
        >
            <div className='opacity-0'>
                {/* delme */}
                {questions.map((q: Question) => (<h1>{q.title}</h1>))}
                {/* ^ delme ^ */}
                <main
                    className="bg-white text-secondary-600  max-w-lg mx-auto p-8 md:p-12 my-16 rounded-lg shadow-2xl">
                    <section>
                        <a className="text-gray-300" href="#">я только спросить</a>
                        <h3 className="font-normal text-2xl">надо залогиниться</h3>
                    </section>

                    <section className="mt-16">
                        <form className="flex flex-col" method="POST" action="#">
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-sm font-light mb-2 ml-3" htmlFor="email">эл. почта</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-600 transition duration-500 px-3 pb-3"/>
                            </div>
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-sm font-light mb-2 ml-3" htmlFor="password">пароль</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-600 transition duration-500 px-3 pb-3"/>
                            </div>
                            <div className="flex justify-end">
                                <a
                                    href="#"
                                    className="text-sm text-secondary-100 hover:text-secondary-700 hover:underline mb-6 font-light">я забыл пароль</a>
                            </div>
                            <button
                                className="bg-primary-100 hover:bg-primary-500 text-white font-light py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                                type="submit">войти</button>
                        </form>
                    </section>
                </main>

                <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                    <p className="text-white font-light">
                        <span>у меня нет аккаунта,</span>
                        <a href="#" className="font-bold hover:underline"> создайте мне</a>
                    </p>
                </div>
            </div>
        </CSSTransition>
    )
}