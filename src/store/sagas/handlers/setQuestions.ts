import { call, put } from "redux-saga/effects";
import { setQuestions } from "../../features/questions";
import { Question, QuestionsInitialAction } from "../../../interfaces";
import { API } from "../../../API";

export interface initQuestionsHandlerResponse {
    data: Question[]
}

export function* setQuestionsHandler(action: QuestionsInitialAction) {
    try {
        yield put({
            type: setQuestions.type,
            payload: action.payload
        })
    } catch (error) {
        console.error(error)
    }
}
