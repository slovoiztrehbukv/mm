import { takeEvery } from "redux-saga/effects";
import { initQuestions } from "../features/questions";
import { initQuestionsHandler } from "./handlers/initQuestions";

export function* watcherSaga() {
    yield takeEvery(initQuestions, initQuestionsHandler)
}