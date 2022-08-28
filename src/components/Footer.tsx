import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import transitionClasses from '../transitions/presets/fadeFromLeft';
import { TelegramIcon } from '../images/icons/social/telegram';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {

    const [ready, setReady] = useState(false);
    const { t } = useTranslation();

    setTimeout(() => setReady(true), 700)

    return (
        <CSSTransition
            in={ready}
            timeout={200}
            classNames={{
                ...transitionClasses,
            }}
        >
            <footer className="opacity-0 max-w-lg mx-auto flex justify-center text-white font-light align-items">
                <a href="https://t.me/MuchMatchBot" target="_blank">
                    <TelegramIcon />
                </a>
                <span className="mx-3">•</span>
                <Link className="hover:underline" to="/info/contact-us">{t('menu__contacts')}</Link>    
                <span className="mx-3">•</span>
                <Link className="hover:underline" to="/info/policy">{t('menu__policy')}</Link>    
            </footer>
        </CSSTransition>
    )
}
