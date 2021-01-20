import * as Utils from '../utility';

export default function videoDownloadedReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_VIDEO_DOWNLOADED_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_VIDEO_DOWNLOADED_SUCCESS:
            return { ...state, fetching: false, error: null, videoDownloadedRes: action.payload };
            break;
        case Utils.ApiTypes.API_VIDEO_DOWNLOADED_FAILURE:
            return { ...state, fetching: false, error: action.error, videoDownloadedRes: null };
            break;
        case Utils.ApiTypes.API_VIDEO_DOWNLOADED_CLEAR:
            return { ...state, fetching: false, error: action.error, videoDownloadedRes: undefined };
            break;
        default:
            return state;
    }
}