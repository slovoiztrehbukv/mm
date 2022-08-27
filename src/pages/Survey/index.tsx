import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionCard } from "../../components/QuestionCard";
import { Batch, Question } from "../../interfaces";
import { RootState } from "../../store";
import { initBatch } from "../../store/features/batch";
import { useNavigate } from "react-router-dom";

export const Survey = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const batch = useSelector( (store: RootState) : Batch =>  store.batch)

    const allQuestionsAnswered = batch.questions.length && batch.questions.filter(q => q.userAnswer === null).length === 0

    useEffect(() => {
        dispatch(initBatch([]))
    }, [])

    useEffect(() => {
        if (allQuestionsAnswered) navigate('/survey/contact-method')
    }, [allQuestionsAnswered])

    return (
        <>
            <div className="container text-center flex justify-between w-full">
                <QuestionCard />
            </div>
        </>
    )
}