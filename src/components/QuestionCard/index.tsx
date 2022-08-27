import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PreLoader } from "./../PreLoader";
import { Batch } from '../../interfaces'
import { TextCard } from './TextCard';
import { ImagesCard } from './ImagesCard';


export const QuestionCard: React.FC = () => {

    const batch = useSelector( (store: RootState) : Batch =>  store.batch)
    const activeQuestion = batch.questions.find(q => !q.userAnswer && q.userAnswer !== 0)

    function TargetCard() {
        if (!activeQuestion) return 

        switch(activeQuestion!.type) {
            case 'TEXT': {
                return <TextCard {...activeQuestion} />
            }
    
            case 'IMAGE': {
                return <ImagesCard {...activeQuestion} />
            }
        }
    }

    return (
            <>
                {
                    activeQuestion
                        ?
                    TargetCard()
                        :
                    <PreLoader />
                }
            </>
    )
}