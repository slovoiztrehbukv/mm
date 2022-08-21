import React, { useEffect, useState } from 'react';
import { LogoContainer } from './logo';
import { CSSTransition } from 'react-transition-group';
import transitionClasses from '../transitions/presets/bigToNormal';
import i18n from '../i18n';
import '/node_modules/flag-icons/css/flag-icons.min.css'
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {

    const [ready, setReady] = useState(false);
    const [language, setLanguage] = useState('ru');

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
            <header className="font-light scale-[12] translate-y-72 max-w-4xl mx-auto">
                <div className='mb-8 w-fit ml-auto gap-8 justify-center text-white font-light align-items'>
                    {languages.map(language => (
                        <button key={language.code} className={`mx-2 transition duration-300 opacity-20 hover:opacity-100 fi fi-${language.flagCode}`} onClick={() => setLanguage(language.code)}></button>
                    ))}
                </div>
                
                <div className='w-fit mx-auto'>
                        <LogoContainer />
                </div>
            </header>
        </CSSTransition>
    )
}