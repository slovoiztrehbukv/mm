import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LogoContainer } from './components/logo';

const App: React.FC = () => {
  'body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 text-main'.split(' ').forEach(c => {
    document.body.classList.add(c)
  })

  return (
    <>
      <header className="max-w-lg mx-auto">
          <a href="#">
            <LogoContainer />
          </a>
      </header>

      <main className="bg-white text-secondary-600  max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
              <h3 className="font-bold text-2xl">Надо залогиниться</h3>
          </section>

          <section className="mt-16">
              <form className="flex flex-col" method="POST" action="#">
                  <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label className="block text-sm font-bold mb-2 ml-3" htmlFor="email">Эл. почта</label>
                      <input type="text" id="email" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-600 transition duration-500 px-3 pb-3" />
                  </div>
                  <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label className="block text-sm font-bold mb-2 ml-3" htmlFor="password">Пароль</label>
                      <input type="password" id="password" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-600 transition duration-500 px-3 pb-3" />
                  </div>
                  <div className="flex justify-end">
                      <a href="#" className="text-sm text-secondary-100 hover:text-secondary-700 hover:underline mb-6">Я забыл пароль</a>
                  </div>
                  <button className="bg-primary-100 hover:bg-primary-500 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Войти</button>
              </form>
          </section>
      </main>

      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
          <p className="text-white">У меня нет аккаунта. <a href="#" className="font-bold hover:underline">Создать</a></p>
      </div>

      <footer className="max-w-lg mx-auto flex justify-center text-white">
          <a href="#" className="hover:underline">Связь</a>
          <span className="mx-3">•</span>
          <a href="#" className="hover:underline">Политика</a>
      </footer>
    </>
  );
}

export default App;
