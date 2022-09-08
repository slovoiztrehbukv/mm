import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { setBatch } from '../../store/features/batch';
import { Answer, Batch, Question, SettingsState } from '../../interfaces'
import { useTranslation } from 'react-i18next';


export const TextCard: React.FC<Question> = (question: Question) => {

    const btnClasses = 'w-48 h-12 text-center disabled:bg-gray-300 disabled:cursor-not-allowed bg-primary-600 text-white font-light rounded shadow-lg hover:shadow-xl transition duration-200'

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const batch = useSelector( (store: RootState) : Batch =>  store.batch)
    const settings = useSelector( (store: RootState) : SettingsState =>  store.settings)
    const [answerSelected, setAnswerSelected] = useState<number|null>(null)

    const processCard = () => {
        const newQuestions = batch.questions.map(q => ({
            ...q,
            userAnswer: question!.id === q.id ? answerSelected : q.userAnswer
        }))
        dispatch(setBatch({
            id: batch.id,
            questions: newQuestions
        }))
        setAnswerSelected(null)
    }

    let gridClasses = ''

    switch(settings.values.questions.answersQuantity) {
        case 3:
        case 6: {
            gridClasses = 'md:grid-cols-3'
            break
        }

        default: {
            gridClasses = 'md:grid-cols-2'
        }
    }

    return (
            <div className='text-center p-8 mx-auto'>
                <h2 className='mb-20'>{question.title}</h2>

                <div className={`grid grid-cols-1 gap-8 ${gridClasses}`}>
                    {question.answers.map((answer: Answer) => (
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
    )
}