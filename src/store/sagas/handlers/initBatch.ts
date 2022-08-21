import { call, put, select } from "redux-saga/effects";
import { setBatch } from "../../features/batch";
import { Question, QuestionsInitialAction, SettingsState } from "../../../interfaces";
import { GQL } from "../../../API/GQL";
import { RootState } from "../..";

export interface initBatchHandlerResponse {
    data: {
        batch: {
            questions: Question[]
        }
    }
}

export function* initBatchHandler(action: QuestionsInitialAction) {
    try {
        const settings: SettingsState  = yield select((store: RootState) => store.settings)
        action.payload = {...action.payload, ...settings.values.questions}
        const response: initBatchHandlerResponse = yield call(GQL.getQuestions, action.payload)
        const { data } = response

        let payload = JSON.parse(JSON.stringify(data.batch))
        payload.questions = payload.questions.map((q: Question) => ({...q, userAnswer: null}))
        yield put({
            payload,
            type: setBatch.type,
        })
    } catch (error) {
        console.error(error)
    }
}
