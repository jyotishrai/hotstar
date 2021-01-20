import * as Utils from '../utility';

export default function getCommentedVideosByUserReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_COMMENTED_VIDEO_BY_USER_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_COMMENTED_VIDEO_BY_USER_SUCCESS:
            return { ...state, fetching: false, error: null, commentedVideos: action.payload };
            break;
        case Utils.ApiTypes.API_GET_COMMENTED_VIDEO_BY_USER_FAILURE:
            return { ...state, fetching: false, error: action.error, commentedVideos: null };
            break;
        case Utils.ApiTypes.API_GET_COMMENTED_VIDEO_BY_USER_UPDATE:
            return { ...state, fetching: false, error: action.error, commentedVideos: action.payload };
            break;
        case Utils.ApiTypes.API_GET_COMMENTED_VIDEO_BY_USER_CLEAR:
            return { ...state, fetching: false, error: action.error, commentedVideos: undefined };
            break;
        default:
            return state;
    }
}