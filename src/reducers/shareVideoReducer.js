import * as Utils from '../utility';

export default function shareVideoReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_SHARE_VIDEO_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_SHARE_VIDEO_SUCCESS:
            return { ...state, fetching: false, error: null, shareVideoRes: action.payload };
            break;
        case Utils.ApiTypes.API_SHARE_VIDEO_FAILURE:
            return { ...state, fetching: false, error: action.error, shareVideoRes: null };
            break;
        case Utils.ApiTypes.API_SHARE_VIDEO_CLEAR:
            return { ...state, fetching: false, error: action.error, shareVideoRes: undefined };
            break;
        default:
            return state;
    }
}