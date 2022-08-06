import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  'body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 text-main'.split(' ').forEach(c => {
    document.body.classList.add(c)
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
