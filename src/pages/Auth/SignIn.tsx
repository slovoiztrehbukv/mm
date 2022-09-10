import notie from "notie"
import '../../notie.min.css';
import { useRef } from "react"
import AxiosMethods from '../../API/axios/methods';
import { GQL } from "../../API/GQL"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/features/auth";
import { LoginLayout } from "../../layouts/Login";
import { stringQueryParamsToObject } from "../../helpers";
import { useTranslation } from "react-i18next";
import { InstagramIcon, TelegramIcon, VKIcon } from "../../images/icons";
import { colors } from "../../config/colors";
import { IconProps } from "../../interfaces";

export const SignIn = () => {


    const loginRef = useRef<HTMLInputElement|null>(null)
    const passwordRef = useRef<HTMLInputElement|null>(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslation();

    const externalAuthMethods = [
        {
            code: 'vk',
            icon: VKIcon,
            linkTo: '/auth/redirect/vk',
        },
        {
            code: 'tlg',
            icon: TelegramIcon,
            linkTo: '/auth/redirect/telegram',
        },
        {
            code: 'inst',
            icon: InstagramIcon,
            linkTo: '/auth/redirect/instagram',
        },
    ]

    const logIn = async (e: any) => {
        e.preventDefault()

        const result = await GQL.logIn({
            login: loginRef.current?.value!,
            password: passwordRef.current?.value!
        })

        const logedInUser = result.data.logIn.user

        if (!logedInUser)  {
            notie.alert({
                text: 'неа',
                type: 'error',
            })

            return
        }

        dispatch(setAuth({
            user: logedInUser,
            isAuthenticated: true,
            wasUserFetched: true,
        }))

        navigate('/')
    }

    const initCookie = async () => {
        await AxiosMethods.logIn()
    }

    const $_GET = stringQueryParamsToObject(useLocation().search)



    let welcome = true

    if ($_GET.welcome && $_GET.welcome === 'false') welcome = false



    return (
        <LoginLayout welcome={welcome}>

        <div
            className="bg-white text-secondary-600  max-w-lg mx-auto p-8 md:p-12 mt-16 rounded-lg shadow-2xl">
            <section>
                <a className="text-gray-300" href="/">я только спросить</a>
                <h3 className="font-normal text-xl">надо залогиниться. без этого не получится</h3>
            </section>

            <section className="mt-16">
                <form
                    onSubmit={e => logIn(e)}
                    className="flex flex-col"
                >

                    <div className="flex justify-between w-1/3 mx-auto">
                        {externalAuthMethods.map(m => {
                            const renderIcon = (Icon: React.FC<IconProps>, disabled: boolean = false) => {
                                return (<Icon fill={disabled ? '#eee' : colors.primary[500]}/>)
                            }
                            
                            return (
                                <Link key={m.code} to={m.linkTo} target="_blank" onClick={initCookie}>{renderIcon(m.icon)}</Link>
                            )
                        })}
                    </div>

                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                        <p className="text-center font-semibold mx-4 mb-0">{t('or')}</p>
                    </div>

                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-sm font-light mb-2 ml-3" htmlFor="login">логин</label>
                        <input
                            ref={loginRef}
                            type="text"
                            id="login"
                            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-600 transition duration-500 px-3 pb-1"/>
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-sm font-light mb-2 ml-3" htmlFor="password">пароль</label>
                        <input
                            ref={passwordRef}
                            type="password"
                            id="password"
                            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-600 transition duration-500 px-3 pb-1"/>
                    </div>
                    <div className="flex justify-end mt-8">
                        <a
                            href="/"
                            className="text-sm text-secondary-100 hover:text-secondary-700 hover:underline mb-6 font-light">а я пароль забыл</a>
                    </div>
                    <button
                        className="bg-primary-100 hover:bg-primary-500 text-white font-light py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                        type="submit">зайти</button>
                </form>
            </section>
        </div>

        <div className="max-w-lg mx-auto text-center mt-6 mb-32">
            <p className="text-white font-light">
                <span>у меня нет аккаунта,</span>
                <Link to="/sign-up" className="font-bold hover:underline"> создайте мне</Link>
            </p>
        </div>

        </LoginLayout>
    )
}