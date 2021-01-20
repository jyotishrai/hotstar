import * as Utils from '../utility';

export default function videoCommentReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_COMMENTS_OF_VIDEO_METHOD:
            return { ...state, fetching: false, error: null };
            break;
        case Utils.ApiTypes.API_GET_COMMENTS_OF_VIDEO_SUCCESS:
            return { ...state, fetching: false, error: null, videoComments: action.payload };
            break;
        case Utils.ApiTypes.API_GET_COMMENTS_OF_VIDEO_FAILURE:
            return { ...state, fetching: false, error: action.error, videoComments: null };
            break;
        case Utils.ApiTypes.API_GET_COMMENTS_OF_VIDEO_CLEAR:
            return { ...state, fetching: false, error: action.error, videoComments: undefined };
            break;

        case Utils.ApiTypes.API_ADD_COMMENT_ON_VIDEO_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_ADD_COMMENT_ON_VIDEO_SUCCESS:
            return { ...state, fetching: false, error: null, addCommentRes: action.payload };
            break;
        case Utils.ApiTypes.API_ADD_COMMENT_ON_VIDEO_SUCCESS:
            return { ...state, fetching: false, error: action.error, addCommentRes: null };
            break;
        case Utils.ApiTypes.API_ADD_COMMENT_ON_VIDEO_CLEAR:
            return { ...state, fetching: false, error: action.error, addCommentRes: undefined };
            break;

        default:
            return state;
    }
}