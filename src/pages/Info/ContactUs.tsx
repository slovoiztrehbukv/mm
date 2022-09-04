import { useTranslation } from "react-i18next";
import { ContentLayout } from "../../layouts/Content";



export const ContactUs = () => {
    
    const { t } = useTranslation();

    const infoEmail = 'info@much-match.fun'
    const briefEmail = 'brief@much-match.fun'

    return (
        <ContentLayout>

            <div className="p-4">
                <div className="mb-12 text-6xl">
                    {t('our_contacts')}
                </div>

                <div className="flex flex-col gap-4 w-fit">
                    <a className="ml-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-2xl py-1" href={`mailto:${infoEmail}`}>{infoEmail}</a>
                    <a className="ml-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-2xl py-1" href={`mailto:${briefEmail}`}>{briefEmail}</a>
                </div>
            </div>

        </ContentLayout>
    )
}