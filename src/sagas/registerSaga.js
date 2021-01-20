import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* getCountryListAction(action) {
    try {
        const data = yield callApis(action)
        //console.log('country data fetch ::::: ', data)
        yield put({ type: Utils.ApiTypes.API_GET_COUNTRY_LIST_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_COUNTRY_LIST_FAILURE })
    }
}

export function* getStateListAction(action) {
    try {
        const data = yield callApis(action)
        //console.log('country data fetch ::::: ', data)
        yield put({ type: Utils.ApiTypes.API_GET_STATE_LIST_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_STATE_LIST_FAILURE })
    }
}

export function* getCityListAction(action) {
    try {
        const data = yield callApis(action)
        //console.log('country data fetch ::::: ', data)
        yield put({ type: Utils.ApiTypes.API_GET_CITY_LIST_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_CITY_LIST_FAILURE })
    }
}

export function* registerAction(action) {
    try {
        const data = yield callApis(action)
        //console.log('country data fetch ::::: ', data)
        yield put({ type: Utils.ApiTypes.API_REGISTER_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_REGISTER_FAILURE })
    }
}

export function* verifyOtpAction(action) {
    try {
        const data = yield callApis(action)
        //console.log('country data fetch ::::: ', data)
        yield put({ type: Utils.ApiTypes.API_VERIFY_OTP_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_VERIFY_OTP_FAILURE })
    }
}

export function* resendOtpAction(action) {
    try {
        const data = yield callApis(action)
        //console.log('country data fetch ::::: ', data)
        yield put({ type: Utils.ApiTypes.API_RESEND_OTP_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_RESEND_OTP_FAILURE })
    }
}

