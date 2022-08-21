import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';



export const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const goToPreSurvey = (lookingFor: string = 'soulmate') => {
        navigate(`/pre-survey?looking_for=${lookingFor}`)
    }
    return (
        <>
            <div className="container text-center">
                <h2 className="text-gray-700 font-light">{t('web__im_looking_for')}</h2>

                <section className="mt-16 flex flex-col md:flex-row gap-12 justify-between w-11/12 mx-auto">
                    <button
                        className="w-full lg:w-1/3 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed bg-primary-600 hover:bg-primary-100 text-white font-light py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                        onClick={() => goToPreSurvey()}
                    >
                        {t('friend_genitive')}
                    </button>

                    <button
                        className="w-full lg:w-1/3 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed bg-primary-600 hover:bg-primary-100 text-white font-light py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                        onClick={() => goToPreSurvey('friend_by_interest')}
                    >
                        {t('friend_by_interest_genitive')}
                    </button>

                    <button
                        disabled
                        className="w-full lg:w-1/3 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed bg-primary-100 hover:bg-primary-500 text-white font-light py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                        title={t('soon') + '...'}
                    >
                        {t('love_genitive')}
                    </button>

                </section>
            </div>
        </>
    )
}