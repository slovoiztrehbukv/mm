import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CSSTransition } from 'react-transition-group';
import transitionClasses from '../transitions/presets/fadeFromLeft';



export const LoginLayout = (props: any) => {
    const [ready, setReady] = useState(false)
        
    setTimeout(() => setReady(true), 500)



    return (
        <>
            <Header welcome={props.welcome}/>
        
            {
                props.welcome
                    ?
                (
                    <CSSTransition
                        in={ready}
                        timeout={300}
                        classNames={{...transitionClasses}}
                    >
                        <div className='opacity-0'>

                            {props.children}
                            
                        </div>
                    </CSSTransition>
                )
                    :
                (
                    <>
                        {props.children}
                    </>
                )
            }
            

            <Footer welcome={props.welcome}/>
        </>
    );
}
