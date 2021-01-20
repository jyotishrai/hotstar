import * as Utils from '../utility';

export default function getProfileTabDataReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_PROFILE_TAB_DATA_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_PROFILE_TAB_DATA_SUCCESS:
            return { ...state, fetching: false, error: null, profileTabData: action.payload };
            break;
        case Utils.ApiTypes.API_GET_PROFILE_TAB_DATA_FAILURE:
            return { ...state, fetching: false, error: action.error, profileTabData: null };
            break;
        case Utils.ApiTypes.API_GET_PROFILE_TAB_DATA_CLEAR:
            return { ...state, fetching: false, error: action.error, profileTabData: undefined };
            break;
        default:
            return state;
    }
}