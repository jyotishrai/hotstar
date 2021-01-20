import * as Utils from '../utility';

export default function getSharedVideoByUserReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_SHARED_VIDEO_BY_USER_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_SHARED_VIDEO_BY_USER_SUCCESS:
            return { ...state, fetching: false, error: null, sharedVideos: action.payload };
            break;
        case Utils.ApiTypes.API_GET_SHARED_VIDEO_BY_USER_FAILURE:
            return { ...state, fetching: false, error: action.error, sharedVideos: null };
            break;
        case Utils.ApiTypes.API_GET_SHARED_VIDEO_BY_USER_CLEAR:
            return { ...state, fetching: false, error: action.error, sharedVideos: undefined };
            break;
        default:
            return state;
    }
}