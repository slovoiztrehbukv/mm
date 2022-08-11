export const Telegram = () => {
    const code = Math.round(Math.random() * 100) + '' + Math.round(Math.random() * 100);
    
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