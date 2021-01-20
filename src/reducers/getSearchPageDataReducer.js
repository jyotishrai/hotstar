import * as Utils from '../utility';

export default function getSearchPageDataReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_SEARCH_PAGE_DATA_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_SEARCH_PAGE_DATA_SUCCESS:
            return { ...state, fetching: false, error: null, searchPageData: action.payload };
            break;
        case Utils.ApiTypes.API_GET_SEARCH_PAGE_DATA_FAILURE:
            return { ...state, fetching: false, error: action.error, searchPageData: null };
            break;
        case Utils.ApiTypes.API_GET_SEARCH_PAGE_DATA_CLEAR:
            return { ...state, fetching: false, error: action.error, searchPageData: undefined };
            break;
        default:
            return state;
    }
}