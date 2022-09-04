import { useTranslation } from "react-i18next";
import { ContentLayout } from "../../layouts/Content";



export const Policy = () => {
    
    const { t } = useTranslation();


    
    return (
        <ContentLayout>

            <div className="p-4">
                <div className="mb-12 text-6xl">
                    {t('our_policy')}
                </div>

                <div className="flex flex-col gap-4 w-fit">
                    <ul>
                        <li>такая то</li>
                        <li>и такая</li>
                    </ul>
                </div>
            </div>

        </ContentLayout>
    )
}