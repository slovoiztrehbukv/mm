import { all, takeEvery } from "redux-saga/effects";
import { initBatch } from "../features/batch";
import { initUser } from "../features/auth";
import { initBatchHandler } from "./handlers/initBatch";
import { initUserHandler } from "./handlers/initUser";

function* watchInitQuestions() {
    yield takeEvery(initBatch, initBatchHandler)
}

function* watchInitUser() {
    yield takeEvery(initUser, initUserHandler)
}

export function* watcherSaga() {
    yield all([
        watchInitQuestions(),
        watchInitUser(),
    ])
}