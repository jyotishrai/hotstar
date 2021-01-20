import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* getReportedVideoByUserAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_REPORTED_VIDEO_BY_USER_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_REPORTED_VIDEO_BY_USER_FAILURE })
    }
}
