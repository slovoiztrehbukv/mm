import React, { useEffect, useState } from 'react';
import { LogoContainer } from './logo';
import { CSSTransition } from 'react-transition-group';
import transitionClasses from '../transitions/presets/bigToNormal';
import i18n from '../i18n';
import '/node_modules/flag-icons/css/flag-icons.min.css'
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AuthState } from '../interfaces';
import { UserIcon } from '../images/icons/user';

export const Header = (props: any) => {

    const languages = [
        {
            code: 'ru',
            flagCode: 'ru'
        },
        {
            code: 'en',
            flagCode: 'gb'
        },
        {
            code: 'cn',
            flagCode: 'cn'
        },
    ]

    const [ready, setReady] = useState(false);
    const [language, setLanguage] = useState(localStorage.getItem('locale') ?? 'ru');
    const { t } = useTranslation();
    const user = useSelector( (store: RootState) : AuthState =>  store.auth)

    const TargetMenu = () => {
        return !user.isAuthenticated
            ?
        (
            <>
                <NavLink to="/sign-in?welcome=false"> <>{t('login')}</> </NavLink>
            </>
        )
            :
        (
            <>
                <Link to="/my/profile" className='flex items-end gap-4'> <UserIcon /> {user.user?.name} </Link>
                <NavLink to="/sign-out"> <>{t('logout')}</> </NavLink>
            </>
        )
    }

    useEffect(() => {
        i18n.changeLanguage(language)
        localStorage.setItem('locale', language)
        document.title = t('site_title')
    }, [language])

    setTimeout(() => setReady(true), 700)



    return (
        props.welcome
        
            ?

        (
            <CSSTransition
                in={ready}
                timeout={200}
                classNames={{
                    ...transitionClasses,
                }}
            >
                <header className="pt-8 font-light tracking-tight scale-[12] translate-y-72 w-full lg:max-w-4xl mx-auto">
                    

                    <div className='flex justify-between items-end'>
                        <div className="flex w-fit mr-auto gap-8 justify-end text-white font-light align-items">
                            <nav className='header-menu flex items-end gap-4'>
                                <TargetMenu />
                            </nav>
                        </div>
                        
                        <div className='mr-2 w-fit ml-auto gap-8 text-white font-light align-items'>
                            {languages.map(lang => (
                                <button key={lang.code} className={`mx-2 transition duration-300 ${lang.code === language ? 'opacity-70' : 'opacity-20'} hover:opacity-100 fi fi-${lang.flagCode}`} onClick={() => setLanguage(lang.code)}></button>
                            ))}
                        </div>
                    </div>
                    
                    <div className='w-fit mx-auto'>
                        <LogoContainer
                            name={t('font_logo')}
                        />
                    </div>
                </header>
            </CSSTransition>
        )

            :

        (
            <header className="pt-8 font-light tracking-tight w-full lg:max-w-4xl mx-auto">

                    <div className='flex justify-between items-end'>
                        <div className="ml-2 flex w-fit mr-auto gap-8 justify-end text-white font-light align-items">
                            <nav className='header-menu flex items-end gap-4'>
                                <TargetMenu />
                            </nav>
                        </div>
                        
                        <div className='mr-2 w-fit ml-auto gap-8 text-white font-light align-items'>
                            {languages.map(lang => (
                                <button key={lang.code} className={`mx-2 transition duration-300 ${lang.code === language ? 'opacity-70' : 'opacity-20'} hover:opacity-100 fi fi-${lang.flagCode}`} onClick={() => setLanguage(lang.code)}></button>
                            ))}
                        </div>
                    </div>
                    
                    <div className='w-fit mx-auto'>
                        <LogoContainer
                            name={t('font_logo')}
                        />
                    </div>
            </header>
        )
    )
}