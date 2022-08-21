import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SettingsState } from "../../../interfaces";
import { RootState } from "../../../store";

export const Vk = () => {
    const code = useSelector( (store: RootState) : SettingsState =>  store.settings).values.tempAnswersCode
    const navigate = useNavigate()
    const { t } = useTranslation();
    
    useEffect(() => { // TODO move this redirect to some global middleware 
        if (!code) navigate('/')
    }, [code])
    
    return (
        <>
            <div
                className="container p-12"
                dangerouslySetInnerHTML={{
                    __html: t('web__write_to_our_bot_vk') + ': <strong className="underline">' + code + '</strong>' + t('web__write_to_our_bot_top_secret')
                }}>
            </div>
        </>
    )
}