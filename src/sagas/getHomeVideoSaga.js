import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* getHomeVideoAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_HOME_VIDEOS_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_HOME_VIDEOS_FAILURE })
    }
}

export function* getMoreHomeVideoAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_MORE_HOME_VIDEOS_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_MORE_HOME_VIDEOS_FAILURE })
    }
}