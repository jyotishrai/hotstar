import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* hireMeAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_HIRE_ME_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_HIRE_ME_FAILURE })
    }
}
