import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionCard } from "../../components/QuestionCard";
import { Question } from "../../interfaces";
import { RootState } from "../../store";
import { initQuestions } from "../../store/features/questions";
import { useNavigate } from "react-router-dom";

export const Survey = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const questions = useSelector( (store: RootState) : Question[] =>  store.questions.items)

    const allQuestionsAnswered = questions.length && questions.filter(q => q.userAnswer === null).length === 0

    useEffect(() => {
        dispatch(initQuestions([]))
    }, [])

    useEffect(() => {
        if (allQuestionsAnswered) navigate('/survey/contact-method')
    }, [allQuestionsAnswered])

    return (
        <>
            <div className="container text-center flex justify-between">
                <QuestionCard />
            </div>
        </>
    )
}