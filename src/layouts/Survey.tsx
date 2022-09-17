import { useSelector } from 'react-redux';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Batch } from '../interfaces';
import { RootState } from '../store';



export const SurveyLayout = (props: any) => {
    const mainClasses = 'text-secondary-600 w-11/12 tracking-tight lg:max-w-4xl mx-auto p-6 md:p-12 my-16 rounded-lg shadow-3xl duration-500 ease-in-out'

    const batch = useSelector( (store: RootState) : Batch =>  store.batch)
    const activeQuestion = batch.questions.find(q => !q.userAnswer && q.userAnswer !== 0)



    return (
        <>
            <Header />

            <main
                className={`${mainClasses} ${activeQuestion?.type === 'IMAGE' ? 'bg-transparent' : 'bg-white'}`}
            >

                {props.children}

            </main>

            <Footer />
        </>
    );
}
