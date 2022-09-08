import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AuthState } from "../../interfaces";
import { RootState } from "../../store";
import { Layout } from "./Layout";

export const Profile = () => {

    const { t } = useTranslation();
    const auth = useSelector( (store: RootState) : AuthState =>  store.auth)

    const nameRef = useRef<HTMLInputElement|null>(null)
    const loginRef = useRef<HTMLInputElement|null>(null)

    return (
        <Layout 
            content={(
                <div>
                    <div className="p-8 rounded shadow-xl bg-white">
                        <form>
                            <div className="md:flex mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-lighter md:text-left mb-3 md:mb-0 pr-4" htmlFor="profile-login">
                                        логин
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="form-input block w-full focus:bg-white p-2" id="profile-login" type="text" ref={loginRef} defaultValue={auth.user?.login}/>
                                </div>
                            </div>

                            <div className="md:flex mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-lighter md:text-left mb-3 md:mb-0 pr-4" htmlFor="profile-name">
                                        имя
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="form-input block w-full focus:bg-white p-2" id="profile-name" type="text" ref={nameRef} defaultValue={auth.user?.name} />
                                </div>
                            </div>

                            <div className="md:flex md:items-center mt-24">
                                <div className="md:w-1/3"></div>
                                <div className="md:w-2/3">
                                    <button className="shadow bg-primary-200 hover:bg-primary-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                        сохранить
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        />
    )
}