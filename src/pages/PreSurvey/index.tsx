import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSettings } from "../../store/features/settings";

export const PreSurvey = () => {

    const possibleValues = {
        questions: [2, 8, 10, 12, 14, 16, 18, 20],
        answers: [2, 3, 4, 5, 6, 7, 8]
    }

    const questionsQuantityRef = useRef<HTMLInputElement|null>(null)
    const answersQuantityRef = useRef<HTMLInputElement|null>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();

    const questionsQuantityHandler = (e: any) => {
        if (!questionsQuantityRef.current) return
        questionsQuantityRef.current.value = e.target.value
    }

    const answersQuantityHandler = (e: any) => {
        if (!answersQuantityRef.current) return
        answersQuantityRef.current.value = e.target.value
    }

    const goToSurvey = () => {
        const settings = {
            values: {
                questions: {
                    questionsQuantity: Number(questionsQuantityRef.current!.value),
                    answersQuantity: Number(answersQuantityRef.current!.value),
                }
            }
        }

        dispatch(setSettings(settings))
        navigate('/survey')
    }

    useEffect(() => {
        questionsQuantityRef.current!.value = String(10)
        answersQuantityRef.current!.value = String(4)
    })

    return (
        <>
            <div className="container text-center flex justify-between">
                <div className="w-2/12 p-4 flex items-center text-secondary-600 border-r border-secondary-600">
                    <Link
                        className=""
                        to="/"
                    >
                        назад
                    </Link>
                </div>

                <div className="w-10/12 flex justify-between flex-col">
                    <h2 className="font-bold text-secondary-600">{t('web__setting_accuracy')}</h2>

                    <section className="mt-16 flex justify-between w-1/2 mx-auto flex-col">
                    
                        <div className="flex flex-col items-start mb-16">
                            <div className="space-y-2 p-2">Количество вопросов</div>

                            <div className="flex flex-col space-y-2 p-2 w-80">
                                <input type="range" className="w-full" min={possibleValues.questions[0]} max={possibleValues.questions[possibleValues.questions.length-1]} step="2" ref={questionsQuantityRef} onChange={questionsQuantityHandler}/>
                                <ul className="flex justify-between w-full px-[10px]">
                                    {possibleValues.questions.map((val, key) => (
                                        <li className="flex justify-center relative" key={'q'+key}><span className="absolute">{val}</span></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col items-start">
                            <div className="space-y-2 p-2">Количество ответов</div>

                            <div className="flex flex-col space-y-2 p-2 w-80">
                                <input type="range" className="w-full" min={possibleValues.answers[0]} max={possibleValues.answers[possibleValues.answers.length-1]} step="1" ref={answersQuantityRef} onChange={answersQuantityHandler}/>
                                <ul className="flex justify-between w-full px-[10px]">
                                    {possibleValues.answers.map((val, key) => (
                                        <li className="flex justify-center relative" key={'a'+key}><span className="absolute">{val}</span></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </section>

                    <section className="mt-16">
                        <div>
                            <button
                                className="bg-primary-100 hover:bg-primary-500 text-white font-light py-2 px-6 rounded shadow-lg hover:shadow-xl transition duration-200"
                                onClick={goToSurvey}
                            >
                                начали!
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}