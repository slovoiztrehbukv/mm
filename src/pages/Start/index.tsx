import { useDispatch } from "react-redux";
import { QuestionCard } from "../../components/QuestionCard";
import { initQuestions } from "../../store/features/questions";

export const Start = () => {

    useDispatch()(initQuestions([]))

    return (
        <>
            <div className="container text-center flex justify-between">
                <QuestionCard />
            </div>
        </>
    )
}