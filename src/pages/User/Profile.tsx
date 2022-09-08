import notie from "notie";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GQL } from "../../API/GQL";
import { AuthState } from "../../interfaces";
import { RootState } from "../../store";
import { setAuth } from "../../store/features/auth";
import { Layout } from "./Layout";

export const Profile = () => {

    const { t } = useTranslation();
    const auth = useSelector( (store: RootState) : AuthState =>  store.auth)
    const dispatch = useDispatch()


    const loginRef = useRef<HTMLInputElement|null>(null)
    const nameRef = useRef<HTMLInputElement|null>(null)

    const save = async (e: any) => {
        e.preventDefault()

        const login = loginRef.current?.value!
        const name = nameRef.current?.value!
        
        const result = await GQL.userProfileSave({
            login,
            name
        })

        if (!result.data.userProfileUpdate.success!)  {
            notie.alert({
                text: 'неа, не сохранилось'
            })

            return
        }

        dispatch(setAuth({
            ...auth,
            user: {
                ...auth.user,
                login,
                name
            }
        }))
    }

    return (
        <Layout 
            content={(
                <div>
                    <div className="p-8 rounded shadow-xl bg-white">
                        <form
                            onSubmit={e => save(e)}
                        >
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
                                    <button className="shadow bg-primary-200 hover:bg-primary-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
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