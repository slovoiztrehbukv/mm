import { useTranslation } from "react-i18next";
import { Layout } from "./Layout";

export const Profile = () => {

    const { t } = useTranslation();


    return (
        <Layout 
            content={(
                <div>
                    <h2>my profile data:</h2>

                    <ul>
                        <li>name</li>
                        <li>email</li>
                        <li>phone</li>
                    </ul>
                </div>
            )}
        />
    )
}