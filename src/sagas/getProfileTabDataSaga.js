import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* getProfileTabDataAction(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_PROFILE_TAB_DATA_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_PROFILE_TAB_DATA_FAILURE })
    }
}
