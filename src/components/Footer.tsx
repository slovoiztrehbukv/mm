import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import transitionClasses from '../transitions/presets/fadeFromLeft';
import { TelegramIcon } from '../images/icons/social/telegram';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const Footer = (props: any) => {

    const [ready, setReady] = useState(false);
    const { t } = useTranslation();

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
                <footer className="opacity-0">
                    <nav className='footer-menu max-w-lg mx-auto flex justify-center text-white font-light align-items'>
                        <a href="https://t.me/MuchMatchBot" target="_blank" rel="noreferrer">
                            <TelegramIcon />
                        </a>
                        <span className="mx-3">•</span>
                        <NavLink to="/info/b2b"> <>{t('to_business')}</> </NavLink>
                        <span className="mx-3">•</span>
                        <NavLink to="/info/contact-us"> <>{t('menu__contacts')}</> </NavLink>
                        <span className="mx-3">•</span>
                        <NavLink to="/info/policy"> <>{t('menu__policy')}</> </NavLink>
                    </nav>
                </footer>
            </CSSTransition>
        )

            :

        (
            <footer>
                <nav className='footer-menu max-w-lg mx-auto flex justify-center text-white font-light align-items'>
                    <a href="https://t.me/MuchMatchBot" target="_blank" rel="noreferrer">
                        <TelegramIcon />
                    </a>
                    <span className="mx-3">•</span>
                    <NavLink to="/info/b2b"> <>{t('to_business')}</> </NavLink>
                    <span className="mx-3">•</span>
                    <NavLink to="/info/contact-us"> <>{t('menu__contacts')}</> </NavLink>
                    <span className="mx-3">•</span>
                    <NavLink to="/info/policy"> <>{t('menu__policy')}</> </NavLink>
                    <span className="mx-3">•</span>
                    <NavLink to="/info/thanks">спасибо</NavLink>
                </nav>
            </footer>
        )
    )
}
