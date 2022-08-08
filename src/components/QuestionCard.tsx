import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../store';
import { setQuestions as commitSetQuestions, updateQuestions } from '../store/features/questions';
import { PreLoader } from "./PreLoader";
import { Question } from '../interfaces'


export const QuestionCard: React.FC = () => {

    const btnClasses = 'px-12 py-4 mx-8 text-center disabled:bg-gray-600 disabled:cursor-not-allowed bg-primary-100 text-white font-light rounded shadow-lg hover:shadow-xl transition duration-200'

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const [questions, setQuestions] = useState<Question[]>([])
    const [answerSelected, setAnswerSelected] = useState<null|number>(null) // means index in answers: []
    const [activeQuestion, setActiveQuestion] = useState<Question|undefined>(undefined)

    const processCurrentCard = () => {
        let newQuestions = JSON.parse(JSON.stringify(questions));

        newQuestions.forEach((q: Question) => {
            if (q.id === activeQuestion?.id) {
                q.userAnswer = answerSelected
            }
        })

        dispatch(updateQuestions(newQuestions))
    }

    
    store.subscribe(() => {
        setQuestions(store.getState().questions.items)
        if (!questions.length) return

        setLoaded(true)
        setActiveQuestion(questions.find(q => typeof q.userAnswer === 'undefined' || q.userAnswer === null))
    })

    return (
            <>
                {
                    loaded
                        ?
                    <div className='text-center p-8 mx-auto'>
                        <h2 className='mb-20'>{activeQuestion!.title}</h2>

                        <div className='grid grid-rows-2 grid-flow-col gap-8'>
                            {activeQuestion!.answers.map((value, index) => (
                                <button
                                    key={index}
                                    className={answerSelected === index ? `${btnClasses} bg-emerald-500` : btnClasses}
                                    onClick={() => setAnswerSelected(index)}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>

                        <div className='mt-24'>
                            <button
                                disabled={answerSelected === null}
                                className={`${btnClasses} py-2 px-14 bg-transparent rounded-xl text-emerald-500 disabled:text-slate-700 `}
                                onClick={() => processCurrentCard()}
                            >
                                следующий
                            </button>
                        </div>
                    </div>
                        :
                    <PreLoader />
                }
            </>
    )
}