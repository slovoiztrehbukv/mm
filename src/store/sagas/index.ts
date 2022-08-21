import { all, takeEvery } from "redux-saga/effects";
import { initBatch } from "../features/batch";
import { initBatchHandler } from "./handlers/initBatch";

function* watchInitQuestions() {
    yield takeEvery(initBatch, initBatchHandler)
}

export function* watcherSaga() {
    yield all([
        watchInitQuestions()
    ])
}