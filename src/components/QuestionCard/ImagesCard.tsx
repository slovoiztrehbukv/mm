import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { setBatch } from '../../store/features/batch';
import { Answer, Batch, Question, SettingsState } from '../../interfaces'
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const ImagesCard: React.FC<Question> = (question: Question) => {

    const btnClasses = 'w-48 h-12 text-center disabled:bg-gray-300 disabled:cursor-not-allowed bg-primary-600 text-white font-light rounded shadow-lg hover:shadow-xl transition duration-200'

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const batch = useSelector( (store: RootState) : Batch =>  store.batch)
    const [answerSelected, setAnswerSelected] = useState<number|null>(question.answers[0].id)

    const processCard = () => {
        const newQuestions = batch.questions.map(q => ({
            ...q,
            userAnswer: question!.id === q.id ? answerSelected : q.userAnswer
        }))
        dispatch(setBatch({
            id: batch.id,
            questions: newQuestions
        }))
    }

    const sliderSettings = {
        className: "center",
        centerMode: true,
        focusOnSelect: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 3,
        speed: 500,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    }

    return (
            <div className='text-center py-8 mx-auto w-full'>
                <h2 className='mb-20'>{question.title}</h2>

                <div className='w-full'>
                    <Slider {...sliderSettings}>
                        {question.answers.map((answer: Answer) => (
                            <div
                                className='img-wrapper'
                                onClick={() => setAnswerSelected(answer.id)}
                                key={answer.id}
                            >
                                <img
                                    
                                    src={answer.image!.url}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className='mt-24'>
                    <button
                        className={`${btnClasses} w-48 !bg-emerald-400 rounded-xl text-white font-normal  disabled:!bg-white disabled:!text-gray-300 disabled:!font-light`}
                        onClick={() => processCard()}
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
    )
}