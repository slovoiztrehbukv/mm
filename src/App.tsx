import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import i18n from './i18n';
import { RoutesList } from './routes/List';
import { initUser } from './store/features/auth';

const App: React.FC = () => {
  'min-h-screen pb-6 px-2 md:px-0 text-main'.split(' ').forEach(c => {
    document.body.classList.add(c)
  })

  'absolute w-full h-fit p-10 z-200'.split(' ').forEach(c => {
    document.querySelector('#root')?.classList.add(c)
  })

  'w-full h-screen fixed z-100'.split(' ').forEach(c => {
    document.querySelector('#bg-overlay')?.classList.add(c)
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser(undefined))
  }, [dispatch])

  useEffect(() => {
    const defaultLocale = localStorage.getItem('locale') ?? 'ru'
    i18n.changeLanguage(defaultLocale)
    localStorage.setItem('locale', defaultLocale)
  }, [])
  

  return (
    <RoutesList />
  );
}

export default App;
