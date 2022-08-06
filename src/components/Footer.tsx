import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import transitionClasses from '../transitions/presets/fadeFromLeft';

export const Footer: React.FC = () => {

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
            <footer className="opacity-0 max-w-lg mx-auto flex justify-center text-white font-light">
                <a href="#" className="hover:underline">связь</a>
                <span className="mx-3">•</span>
                <a href="#" className="hover:underline">политика</a>
            </footer>
        </CSSTransition>
    )
}
