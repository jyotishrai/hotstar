import * as Utils from '../utility';

export default function uploadVideoReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_UPLOAD_VIDEO_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_UPLOAD_VIDEO_SUCCESS:
            return { ...state, fetching: false, error: null, uploadVideo: action.payload };
            break;
        case Utils.ApiTypes.API_UPLOAD_VIDEO_FAILURE:
            return { ...state, fetching: false, error: action.error, uploadVideo: null };
            break;
        case Utils.ApiTypes.API_UPLOAD_VIDEO_CLEAR:
            return { ...state, fetching: false, error: action.error, uploadVideo: undefined };
            break;
        default:
            return state;
    }
}