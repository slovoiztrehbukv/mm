import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../store';
import { initQuestions } from '../store/features/questions';
import { PreLoader } from "./PreLoader";
import { Question } from '../interfaces'


export const QuestionCard: React.FC = () => {

    const [loaded, setLoaded] = useState(false)
    const [activeQuestion, setActiveQuestion] = useState<Question>({
        id: 0,
        title: '',
        answers: [],
        userAnswer: 0
    })

    store.subscribe(() => {
        let questions = store.getState().questions.items
        if (!questions.length) return;

        setLoaded(true);
        setActiveQuestion(questions[0]);
    })

    return (
            <>
                {
                    loaded
                        ?
                    <div className='text-center p-8 mx-auto'>
                        <h2 className='mb-20'>{activeQuestion.title}</h2>

                        <div className='grid grid-rows-2 grid-flow-col gap-8'>
                            {activeQuestion.answers.map(a => (
                                <button
                                    className="px-12 py-4 mx-8 text-center disabled:bg-gray-600 disabled:cursor-not-allowed bg-primary-100 hover:bg-primary-500 text-white font-light rounded shadow-lg hover:shadow-xl transition duration-200"
                                >
                                    {a}
                                </button>
                            ))}
                        </div>
                    </div>
                        :
                    <PreLoader />
                }
            </>
    )
}