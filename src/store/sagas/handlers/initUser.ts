import { call, put, select } from "redux-saga/effects";
import { setAuth } from "../../features/auth";
import { Question, QuestionsInitialAction, SettingsState, User } from "../../../interfaces";
import { GQL } from "../../../API/GQL";

export interface initUserHandlerResponse {
    data: {
        me: User
    }
}

export function* initUserHandler(action: QuestionsInitialAction) {
    try {
        const response: initUserHandlerResponse = yield call(GQL.getCurrentUser)
        const { data } = response

        let payload = JSON.parse(JSON.stringify(data))

        if (!payload.me.id) throw new Error('empty user')

        yield put({
            payload: {
                user: payload.me,
                isAuthenticated: true,
            },
            type: setAuth.type,
        })
    } catch (error) {
        yield put({
            payload: {
                user: undefined,
                isAuthenticated: false,
            },
            type: setAuth.type,
        })
    }
}
