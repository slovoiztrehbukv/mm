import { all, takeEvery } from "redux-saga/effects";
import { initQuestions } from "../features/questions";
import { initQuestionsHandler } from "./handlers/initQuestions";

function* watchInitQuestions() {
    yield takeEvery(initQuestions, initQuestionsHandler)
}

export function* watcherSaga() {
    yield all([
        watchInitQuestions()
    ])
}