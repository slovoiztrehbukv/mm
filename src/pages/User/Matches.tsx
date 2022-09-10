import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GQL } from "../../API/GQL";
import { Match } from "../../interfaces";
import { Layout } from "./Layout";

export const Matches = () => {

    const [matches, setMatches] = useState([])
    const { t } = useTranslation();

    GQL.getMyMatches().then(m => {
        setMatches(m.data.usersMatches)
    })

    return (
        <Layout 
            content={(
                <div>
                    <h2>my matches here:</h2>

                    <ul>
                        {matches!.map((m: Match) => (
                            <li>{m.user_1_id} {m.user_2_id} {m.accuracy}</li>
                        ))}
                    </ul>
                </div>
            )}
        />
    )
}