import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* uploadVideoAction(action) {
    try {
        const data = yield callApis(action)
        //console.log('data fetch login ::::: ', data)
        yield put({ type: Utils.ApiTypes.API_UPLOAD_VIDEO_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_UPLOAD_VIDEO_FAILURE })
    }
}
