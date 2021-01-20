import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* deleteUserVideoAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_DELETE_USER_VIDEO_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_DELETE_USER_VIDEO_FAILURE })
    }
}
