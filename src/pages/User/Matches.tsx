import { useTranslation } from "react-i18next";
import { Layout } from "./Layout";

export const Matches = () => {

    const { t } = useTranslation();

    return (
        <Layout 
            content={(
                <div>
                    <h2>my matches here:</h2>

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