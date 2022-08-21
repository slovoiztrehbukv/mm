import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SettingsState } from "../../../interfaces";
import { RootState } from "../../../store";

export const Telegram = () => {
    const code = useSelector( (store: RootState) : SettingsState =>  store.settings).values.tempAnswersCode
    const navigate = useNavigate()
    
    useEffect(() => { // TODO move this redirect to some global middleware 
        if (!code) navigate('/')
    }, [code])


    return (
        <>
            <div className="container p-12">
                <ul className="list-disc">
                    <li>
                        напиши <a href="https://t.me/MuchMatchBot">нашему боту <strong>@MuchMatchBot</strong></a> в телеграме и сообщи ему код: <strong>{code}</strong> (птсс. только тихо, только ему)
                    </li>

                    <li className="mt-18">
                        дальше он всё сделает
                    </li>
                </ul>
            </div>
        </>
    )
}