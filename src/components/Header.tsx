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

export const Header: React.FC = () => {

    const [ready, setReady] = useState(false);
    const [language, setLanguage] = useState('ru');
    const { t } = useTranslation();
    const user = useSelector( (store: RootState) : AuthState =>  store.auth)

    setTimeout(() => setReady(true), 700)

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

    const TargetMenu = () => {
        return !user.isAuthenticated
            ?
        (
            <>
                <NavLink to="/sign-in"> <>{t('login')}</> </NavLink>
                <NavLink to="/info/b2b"> <>{t('to_business')}</> </NavLink>
            </>
        )
            :
        (
            <>
                <NavLink to="/info/b2b"> <>{t('to_business')}</> </NavLink>
                <Link to="/my/profile"> <>{t('user_profile')}</> </Link>
                <NavLink to="/sign-out"> <>{t('logout')}</> </NavLink>
            </>
        )
    }


    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])

    return (
        <CSSTransition
            in={ready}
            timeout={200}
            classNames={{
                ...transitionClasses,
            }}
        >
            <header className="pt-8 font-light tracking-tight scale-[12] translate-y-72 w-full lg:max-w-4xl mx-auto">
                

                <div className='flex justify-between'>
                    <div className="ml-12 flex w-fit mr-auto gap-8 justify-center text-white font-light align-items">
                        <nav className='header-menu'>
                            <TargetMenu />
                        </nav>
                    </div>
                    
                    <div className='w-fit ml-auto gap-8 text-white font-light align-items'>
                        {languages.map(language => (
                            <button key={language.code} className={`mx-2 transition duration-300 opacity-20 hover:opacity-100 fi fi-${language.flagCode}`} onClick={() => setLanguage(language.code)}></button>
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
}