import { Link } from "react-router-dom";

export const Home = () => {

    return (
        <>
            <div className="container text-center">
                <h2>я ищу</h2>

                <section className="mt-16 flex justify-between w-1/2 mx-auto">
                    <Link
                        to="/prestart"
                        className="w-1/3 bg-primary-100 hover:bg-primary-500 text-white font-light py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                        type="submit"
                    >
                        друга
                    </Link>

                    <button
                        disabled
                        className="w-1/3 disabled:bg-gray-600 disabled:cursor-not-allowed bg-primary-100 hover:bg-primary-500 text-white font-light py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                        type="submit"
                        title="скоро..."
                    >
                        половинку
                    </button>

                </section>
            </div>
        </>
    )
}