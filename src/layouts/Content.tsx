import { Header } from '../components/Header';
import { Footer } from '../components/Footer';



export const ContentLayout = (props: any) => {
    const mainClasses = 'bg-white text-secondary-600 w-11/12 tracking-tight lg:max-w-4xl mx-auto p-6 md:p-12 my-16 rounded-lg shadow-3xl duration-500 ease-in-out'


    
    return (
        <>
            <Header />

            <main
                className={`${mainClasses}`}
            >

                {props.children}
            
            </main>

            <Footer />
        </>
    );
}
