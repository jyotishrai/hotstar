import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* videoDownloadedAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_VIDEO_DOWNLOADED_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_VIDEO_DOWNLOADED_FAILURE })
    }
}
