import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* editProfileAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_EDIT_PROFILE_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_EDIT_PROFILE_FAILURE })
    }
}

export function* editEmailMobileSendOtpAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_SEND_OTP_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_SEND_OTP_FAILURE })
    }
}

export function* editEmailMobileVerifyOtpAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_VERIFY_OTP_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_VERIFY_OTP_FAILURE })
    }
}