import { useTranslation } from "react-i18next";
import { ContentLayout } from "../../layouts/Content";



export const B2B = () => {
    
    const { t } = useTranslation();

    const email = 'brief@much-match.fun'

    return (
        <ContentLayout>

            <div className="p-4">
                <h2 className="text-5xl tracking-tighter leading-loose mb-16 pb-16 border-b"
                    dangerouslySetInnerHTML={{
                        __html: t('unique_tooling')
                    }}
                >
                </h2>
                
                <div className="ml-auto w-fit">
                    {t('tell_us_about_your_project')}: <a className="ml-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-2xl py-1" href={`mailto:${email}`}>{email}</a>
                </div>
            </div>

        </ContentLayout>
    )
}