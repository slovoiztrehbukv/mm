import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GQL } from "../../API/GQL";
import { Category } from "../../interfaces";
import { setSettings } from "../../store/features/settings";

export const PreSurvey = () => {


    const possibleValues = {
        questions: [2, 8, 10, 12, 14, 16, 18, 20],
        answers: [2, 3, 4, 5, 6]
    }

    const questionsQuantityRef = useRef<HTMLInputElement|null>(null)
    const answersQuantityRef = useRef<HTMLInputElement|null>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [ queryParams ] = useSearchParams();
    const [categories, setCategories] = useState<Category[]>([])


    const lookingForFriendByInterest = queryParams.get('looking_for') === 'friend_by_interest'

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

    GQL.getCategories()
        .then(response => setCategories(response.data.categories))

    return (
        <>
            <div className="container text-center flex justify-between">
                <div className="w-2/12 p-4 flex items-center text-primary-200 border-r border-gray-100">
                    <Link
                        className=""
                        to="/"
                    >
                        {t('back')}
                    </Link>
                </div>

                <div className="w-10/12 flex justify-between flex-col">
                    <h2 className="font-semibold text-primary-200">{t('web__setting_accuracy')}</h2>

                    <section className="mt-16 flex justify-between w-1/2 mx-auto flex-col">
                    
                        <div className="flex flex-col items-start mb-16">
                            <div className="space-y-2 p-2">{t('questions_quantity')}</div>

                            <div className="flex flex-col space-y-2 p-2 w-80">
                                <input type="range" className="w-full" min={possibleValues.questions[0]} max={possibleValues.questions[possibleValues.questions.length-1]} step="2" ref={questionsQuantityRef} onChange={questionsQuantityHandler}/>
                                <ul className="flex justify-between w-full px-[10px]">
                                    {possibleValues.questions.map((val, key) => (
                                        <li className="flex justify-center relative" key={'q'+key}><span className="absolute">{val}</span></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col items-start mb-16">
                            <div className="space-y-2 p-2">{t('answers_quantity')}</div>

                            <div className="flex flex-col space-y-2 p-2 w-80">
                                <input type="range" className="w-full" min={possibleValues.answers[0]} max={possibleValues.answers[possibleValues.answers.length-1]} step="1" ref={answersQuantityRef} onChange={answersQuantityHandler}/>
                                <ul className="flex justify-between w-full px-[10px]">
                                    {possibleValues.answers.map((val, key) => (
                                        <li className="flex justify-center relative" key={'a'+key}><span className="absolute">{val}</span></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={`flex flex-col items-start ${lookingForFriendByInterest ? '' : 'hidden'}`}>
                            <label htmlFor="questions_category" className="space-y-2 p-2">{t('area_of_interests')}</label>

                            <div className="flex flex-col space-y-2 p-2 w-80">
                                <select id="questions_category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{t('category_' + category.title)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </section>

                    <section className="mt-16">
                        <div>
                            <button
                                className="bg-primary-100 hover:bg-primary-500 text-white font-light py-2 px-6 rounded shadow-lg hover:shadow-xl transition duration-200"
                                onClick={goToSurvey}
                            >
                                {t('start')}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}