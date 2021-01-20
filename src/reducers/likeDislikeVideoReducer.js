import * as Utils from '../utility';

export default function likeDislikeVideoReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_LIKE_DISLIKE_VIDEO_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_LIKE_DISLIKE_VIDEO_SUCCESS:
            return { ...state, fetching: false, error: null, likeDislikeVideoRes: action.payload };
            break;
        case Utils.ApiTypes.API_LIKE_DISLIKE_VIDEO_FAILURE:
            return { ...state, fetching: false, error: action.error, likeDislikeVideoRes: null };
            break;
        case Utils.ApiTypes.API_LIKE_DISLIKE_VIDEO_CLEAR:
            return { ...state, fetching: false, error: action.error, likeDislikeVideoRes: undefined };
            break;
        default:
            return state;
    }
}