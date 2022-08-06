import React, { useState } from 'react';
import { LogoContainer } from './logo';
import { CSSTransition } from 'react-transition-group';
import transitionClasses from '../transitions/presets/bigToNormal';

export const Header: React.FC = () => {

    const [ready, setReady] = useState(false);
    setTimeout(() => setReady(true), 700)

    
    return (
        <CSSTransition
            in={ready}
            timeout={200}
            classNames={{
                ...transitionClasses,
            }}
        >
            <header className="max-w-lg mx-auto font-light scale-[12] w-fit translate-y-72">
                <a href="#">
                    <LogoContainer />
                </a>
            </header>
        </CSSTransition>
    )
}