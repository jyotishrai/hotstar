import * as Utils from '../utility';

export default function getVideoCategoriesReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_VIDEO_CATEGORIES_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_VIDEO_CATEGORIES_SUCCESS:
            return { ...state, fetching: false, error: null, videoCategories: action.payload };
            break;
        case Utils.ApiTypes.API_GET_VIDEO_CATEGORIES_FAILURE:
            return { ...state, fetching: false, error: action.error, videoCategories: null };
            break;
        case Utils.ApiTypes.API_GET_VIDEO_CATEGORIES_CLEAR:
            return { ...state, fetching: false, error: action.error, videoCategories: undefined };
            break;
        default:
            return state;
    }
}