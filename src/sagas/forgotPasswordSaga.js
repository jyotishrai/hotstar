import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* forgotPasswordSendOtpAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_FORGOT_PASSWORD_SEND_OTP_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_FORGOT_PASSWORD_SEND_OTP_FAILURE })
    }
}

export function* forgotPasswordAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_FORGOT_PASSWORD_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_FORGOT_PASSWORD_FAILURE })
    }
}