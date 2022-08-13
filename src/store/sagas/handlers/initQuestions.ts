import { call, put, select } from "redux-saga/effects";
import { setQuestions } from "../../features/questions";
import { Question, QuestionsInitialAction, SettingsState } from "../../../interfaces";
import { GQL } from "../../../API/GQL";
import { RootState } from "../..";
import { useSelector } from "react-redux";

export interface initQuestionsHandlerResponse {
    data: {
        questions: Question[]
    }
}

export function* initQuestionsHandler(action: QuestionsInitialAction) {
    try {
        const settings: SettingsState  = yield select((store: RootState) => store.settings)
        action.payload = {...action.payload, ...settings.values.questions}
        const response: initQuestionsHandlerResponse = yield call(GQL.getQuestions, action.payload)
        const { data } = response

        yield put({
            type: setQuestions.type,
            payload: data.questions.map(q => ({...q, userAnswer: null}))
        })
    } catch (error) {
        console.error(error)
    }
}
