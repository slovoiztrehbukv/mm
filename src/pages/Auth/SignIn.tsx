import notie from "notie"
import '../../notie.min.css';
import { useRef } from "react"
import { GQL } from "../../API/GQL"
import { useNavigate } from "react-router-dom";


export const SignIn = () => {

    const loginRef = useRef<HTMLInputElement|null>(null)
    const passwordRef = useRef<HTMLInputElement|null>(null)
    const navigate = useNavigate()

    const signIn = async () => {
        const result = await GQL.signIn({
            login: loginRef.current?.value!,
            password: passwordRef.current?.value!
        })

        if (!result.data.auth.success!)  {
            notie.alert({
                text: 'неа'
            })

            return
        }

        navigate('/')
    }

    return (
        <form className="w-full max-w-sm mx-auto font-light">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-light md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        логин
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-secondary-500"
                        id="inline-full-name"
                        type="text"
                        placeholder="author@mm.fun"
                        ref={loginRef}
                    />
                </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-light md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                        пароль
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-secondary-500"
                        id="inline-password"
                        type="password"
                        placeholder="******************"
                        ref={passwordRef}
                    />
                </div>
                </div>
                <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button
                        className="shadow bg-secondary-500 hover:bg-secondary-400 focus:shadow-outline focus:outline-none text-white font-light py-2 px-4 rounded" type="button"
                        onClick={() => signIn()}
                    >
                        зайти
                    </button>
                </div>
            </div>
        </form>
    )
}