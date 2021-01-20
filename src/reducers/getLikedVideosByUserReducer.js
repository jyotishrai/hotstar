import * as Utils from '../utility';

export default function getLikedVideosByUserReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_LIKED_VIDEO_BY_USER_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_LIKED_VIDEO_BY_USER_SUCCESS:
            return { ...state, fetching: false, error: null, likedVideos: action.payload };
            break;
        case Utils.ApiTypes.API_GET_LIKED_VIDEO_BY_USER_FAILURE:
            return { ...state, fetching: false, error: action.error, likedVideos: null };
            break;
        case Utils.ApiTypes.API_GET_LIKED_VIDEO_BY_USER_UPDATE:
            return { ...state, fetching: false, error: null, likedVideos: action.payload };
            break;
        case Utils.ApiTypes.API_GET_LIKED_VIDEO_BY_USER_CLEAR:
            return { ...state, fetching: false, error: action.error, likedVideos: undefined };
            break;
        default:
            return state;
    }
}