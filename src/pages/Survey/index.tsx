import { useDispatch } from "react-redux";
import { QuestionCard } from "../../components/QuestionCard";
import { initQuestions } from "../../store/features/questions";

export const Survey = () => {

    useDispatch()(initQuestions([]))

    return (
        <>
            <div className="container text-center flex justify-between">
                <QuestionCard />
            </div>
        </>
    )
}