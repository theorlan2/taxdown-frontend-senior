import { put, takeLatest, call } from "redux-saga/effects";
//
import fetchApi from "@/services/baseApi";
import { StatusFetch } from "@/models/enums";
import { LoginType, SingUpType } from "@/models/auth/auth.model";
import { ActionPayload } from "@/models/shared";
import { Auth } from "@/store/feactures/auth/authState.model";
import { authSagasActions } from "./auth.actions";
import { saveAuth, setIsLogged, statusAuthErrorFetch, statusAuthFetch } from "@/store/feactures/auth/auth.slice";


function* initLogin(action: ActionPayload<LoginType>) {
    yield put(statusAuthFetch(StatusFetch.LOADING));
    try {
        const response: Auth = yield call(fetchApi.post<LoginType, Auth>, "/login", action.payload);
        if (response.accessToken) {
            yield put(saveAuth(response));
            yield put(setIsLogged(true));
            yield put(statusAuthFetch(StatusFetch.SUCCESS));
        }
    } catch (e: any) {
        yield put(statusAuthFetch(StatusFetch.ERROR));
        yield put(statusAuthErrorFetch(e.message));
    }
}

function* initSingUp(action: ActionPayload<SingUpType>) {
    yield put(statusAuthFetch(StatusFetch.LOADING));
    try {
        const response: Auth = yield call(fetchApi.post<SingUpType, Auth>, "/register", action.payload);
        if (response.accessToken) {
            yield put(saveAuth(response));
            yield put(setIsLogged(true));
            yield put(statusAuthFetch(StatusFetch.SUCCESS));
        }
    } catch (e: any) {
        yield put(statusAuthFetch(StatusFetch.ERROR));
        yield put(statusAuthErrorFetch(e.message));
    }
}


export default function* root(): Generator<any> {
    return [
        yield takeLatest<string, any>(authSagasActions.FETCH_AUTH_LOGIN, initLogin),
        yield takeLatest<string, any>(authSagasActions.FETCH_AUTH_SING_UP, initSingUp),
    ];
}