import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SettingsState } from "../../../interfaces";
import { RootState } from "../../../store";

export const Vk = () => {
    const code = useSelector( (store: RootState) : SettingsState =>  store.settings).values.tempAnswersCode
    const navigate = useNavigate()
    
    useEffect(() => { // TODO move this redirect to some global middleware 
        if (!code) navigate('/')
    }, [code])
    
    return (
        <>
            <div className="container p-12">
                напиши нашему боту вконтакте <strong>[СКОРО БУДЕТ]</strong> и сообщи ему код: <strong>{code}</strong> (птсс. только тихо, только ему)
            </div>
        </>
    )
}