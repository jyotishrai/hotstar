import * as Utils from '../utility';

export default function increaseViewsOfVideoReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_INCREASE_VIEW_OF_VIDEO_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_INCREASE_VIEW_OF_VIDEO_SUCCESS:
            return { ...state, fetching: false, error: null, increaseViewsRes: action.payload };
            break;
        case Utils.ApiTypes.API_INCREASE_VIEW_OF_VIDEO_FAILURE:
            return { ...state, fetching: false, error: action.error, increaseViewsRes: null };
            break;
        case Utils.ApiTypes.API_INCREASE_VIEW_OF_VIDEO_CLEAR:
            return { ...state, fetching: false, error: action.error, increaseViewsRes: undefined };
            break;
        default:
            return state;
    }
}