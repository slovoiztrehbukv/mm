import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../store';
import { setQuestions } from '../store/features/questions';
import { PreLoader } from "./PreLoader";
import { Answer, Question } from '../interfaces'


export const QuestionCard: React.FC = () => {

    const btnClasses = 'px-12 py-4 mx-8 text-center disabled:bg-gray-600 disabled:cursor-not-allowed bg-primary-100 text-white font-light rounded shadow-lg hover:shadow-xl transition duration-200'

    const dispatch = useDispatch()

    const questions = useSelector( (store: RootState) : Question[] =>  store.questions.items)
    const [answerSelected, setAnswerSelected] = useState<number|null>(null)

    const activeQuestion = questions.find(q => !q.userAnswer && q.userAnswer !== 0)

    const processCard = () => {
        const newQuestions = questions.map(q => ({
            ...q,
            userAnswer: activeQuestion!.id === q.id ? answerSelected : q.userAnswer
        }))
        dispatch(setQuestions(newQuestions))
        setAnswerSelected(null)
    }

    return (
            <>
                {
                    activeQuestion
                        ?
                    <div className='text-center p-8 mx-auto'>
                        <h2 className='mb-20'>{activeQuestion.title}</h2>

                        <div className='grid grid-rows-2 grid-flow-col gap-8'>
                            {activeQuestion.answers.map((answer: Answer) => (
                                <button
                                    key={answer.id}
                                    className={answerSelected === answer.id ? `${btnClasses} bg-emerald-500` : btnClasses}
                                    onClick={() => setAnswerSelected(answer.id)}
                                >
                                    {answer.value}
                                </button>
                            ))}
                        </div>

                        <div className='mt-24'>
                            <button
                                disabled={answerSelected === null}
                                className={`${btnClasses} py-2 px-14 bg-transparent rounded-xl text-emerald-500 disabled:text-slate-700 `}
                                onClick={() => processCard()}
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