import { call, put } from "redux-saga/effects";
import { setQuestions } from "../../features/questions";
import { Question, QuestionsInitialAction } from "../../../interfaces";
import { API } from "../../../API";

export interface initQuestionsHandlerResponse {
    data: Question[]
}

export function* initQuestionsHandler(action: QuestionsInitialAction) {
    try {
        const response: initQuestionsHandlerResponse = yield call(API.getQuestions, action.payload)
        const { data } = response

        yield put({
            type: setQuestions.type,
            payload: data
        })
    } catch (error) {
        console.error(error)
    }
}
