import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CSSTransition } from 'react-transition-group';
import transitionClasses from './transitions/presets/fadeFromLeft';
import { RoutesList } from './RoutesList';
import { useSelector } from 'react-redux';
import { Batch } from './interfaces';
import { RootState } from './store';

const App: React.FC = () => {
  'min-h-screen pb-6 px-2 md:px-0 text-main'.split(' ').forEach(c => {
    document.body.classList.add(c)
  })

  'w-full h-screen fixed'.split(' ').forEach(c => {
    document.querySelector('#bg-overlay')?.classList.add(c)
  })

  const batch = useSelector( (store: RootState) : Batch =>  store.batch)
  const activeQuestion = batch.questions.find(q => !q.userAnswer && q.userAnswer !== 0)

  const [ready, setReady] = useState(false)
    
  setTimeout(() => setReady(true), 500)

  return (
      <>
        <Header />
      
        <CSSTransition
              in={ready}
              timeout={300}
              classNames={{...transitionClasses}}
          >
            <div className='opacity-0'>
              <main
                  className={`text-secondary-600 w-11/12 tracking-tight lg:max-w-4xl mx-auto p-6 md:p-12 my-16 rounded-lg shadow-3xl duration-500 ease-in-out ${activeQuestion?.type === 'IMAGE' ? 'bg-transparent' : 'bg-white'}`}
              >

                <RoutesList />
                
              </main>
            </div>
          </CSSTransition>

          <Footer />
      </>
  );
}

export default App;
