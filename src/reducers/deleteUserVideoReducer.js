import * as Utils from '../utility';

export default function deleteUserVideoReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_DELETE_USER_VIDEO_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_DELETE_USER_VIDEO_SUCCESS:
            return { ...state, fetching: false, error: null, deleteVideoRes: action.payload };
            break;
        case Utils.ApiTypes.API_DELETE_USER_VIDEO_FAILURE:
            return { ...state, fetching: false, error: action.error, deleteVideoRes: null };
            break;
        case Utils.ApiTypes.API_DELETE_USER_VIDEO_CLEAR:
            return { ...state, fetching: false, error: action.error, deleteVideoRes: undefined };
            break;
        default:
            return state;
    }
}