import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* getAllCommentsOfVideoAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_COMMENTS_OF_VIDEO_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_COMMENTS_OF_VIDEO_FAILURE })
    }
}

export function* addCommentsOnVideoAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_ADD_COMMENT_ON_VIDEO_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_ADD_COMMENT_ON_VIDEO_FAILURE })
    }
}
