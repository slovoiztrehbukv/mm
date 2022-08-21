import { useSearchParams } from "react-router-dom";

export const Telegram = () => {
    const [ queryParams ] = useSearchParams();
    const code = queryParams.get('code');
    
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