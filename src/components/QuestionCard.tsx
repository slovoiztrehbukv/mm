import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../store';
import { setQuestions } from '../store/features/questions';
import { PreLoader } from "./PreLoader";
import { Answer, Question } from '../interfaces'
import { useTranslation } from 'react-i18next';


export const QuestionCard: React.FC = () => {

    const btnClasses = 'w-48 h-12 text-center disabled:bg-gray-300 disabled:cursor-not-allowed bg-primary-600 text-white font-light rounded shadow-lg hover:shadow-xl transition duration-200'

    const dispatch = useDispatch()
    const { t } = useTranslation()

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
                                    className={`${btnClasses} ${answerSelected && (answerSelected === answer.id ? '!bg-emerald-400' : '!bg-gray-200 ')}`}
                                    onClick={() => answerSelected && answerSelected === answer.id ? setAnswerSelected(null) : setAnswerSelected(answer.id)}
                                >
                                    {answer.value}
                                </button>
                            ))}
                        </div>

                        <div className='mt-24'>
                            <button
                                disabled={answerSelected === null}
                                className={`${btnClasses} w-48 !bg-emerald-400 rounded-xl text-white font-normal  disabled:!bg-white disabled:!text-gray-300 disabled:!font-light`}
                                onClick={() => processCard()}
                            >
                                {t('next')}
                            </button>
                        </div>
                    </div>
                        :
                    <PreLoader />
                }
            </>
    )
}