import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { QuestionCard } from "../../components/QuestionCard";
import { initQuestions } from "../../store/features/questions";

export const Survey = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initQuestions([]))
    }, [dispatch])

    return (
        <>
            <div className="container text-center flex justify-between">
                <QuestionCard />
            </div>
        </>
    )
}