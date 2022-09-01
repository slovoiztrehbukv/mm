import { useTranslation } from "react-i18next";
import { Layout } from "./Layout";

export const Questions = () => {

    const { t } = useTranslation();


    return (
        <Layout 
            content={(
                <div>
                    <h2>my questions here:</h2>

                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
            )}
        />
    )
}