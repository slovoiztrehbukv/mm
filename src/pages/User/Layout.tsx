import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom"
import { ContentLayout } from "../../layouts/Content";

export const Layout = (props: any) => {

    const { t } = useTranslation();

    const menuItems = [
        {
            to: '/my/profile',
            title: t('my_profile'),
        },
        {
            to: '/my/matches',
            title: t('my_matches'),
        },
        {
            to: '/my/questions',
            title: t('my_questions'),
        }
    ]

    return (
        <ContentLayout>

            <div className="flex py-4">
                <aside className="w-64 sidebar-menu bg-primary-600 text-white rounded-md py-4">
                    <div className="overflow-y-auto px-3">
                        <ul className="space-y-2">
                            {
                                menuItems.map(item => (
                                    <li key={item.title}>
                                        <NavLink to={item.to}>{item.title}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </aside>

                <div className="w-full p-4 content">
                    {props.content}
                </div>
            </div>

        </ContentLayout>
    )
}