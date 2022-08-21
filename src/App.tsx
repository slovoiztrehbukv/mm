import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  'min-h-screen pb-6 px-2 md:px-0 text-main'.split(' ').forEach(c => {
    document.body.classList.add(c)
  })

  'w-full h-screen fixed'.split(' ').forEach(c => {
    document.querySelector('#bg-overlay')?.classList.add(c)
  })

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
