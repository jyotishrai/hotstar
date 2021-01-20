import * as Utils from '../utility';

export default function searchReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_SEARCH_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_SEARCH_SUCCESS:
            return { ...state, fetching: false, error: null, searchVideoRes: action.payload };
            break;
        case Utils.ApiTypes.API_SEARCH_FAILURE:
            return { ...state, fetching: false, error: action.error, searchVideoRes: null };
            break;
        case Utils.ApiTypes.API_SEARCH_CLEAR:
            return { ...state, fetching: false, error: action.error, searchVideoRes: undefined };
            break;
        default:
            return state;
    }
}