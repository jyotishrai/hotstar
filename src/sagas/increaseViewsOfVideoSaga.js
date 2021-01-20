import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* increaseViewsOfVideoAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_INCREASE_VIEW_OF_VIDEO_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_INCREASE_VIEW_OF_VIDEO_FAILURE })
    }
}
