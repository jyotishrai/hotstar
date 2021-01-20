import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* loginAction(action) {
    try {
        const data = yield callApis(action)
        //console.log('data fetch login ::::: ', data)
        yield put({ type: Utils.ApiTypes.API_LOGIN_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_LOGIN_FAILURE })
    }
}

export function* socialLoginAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_SOCIAL_LOGIN_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_SOCIAL_LOGIN_FAILURE })
    }
}