import * as Utils from '../utility';

export default function getMyVideosReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_MY_VIDEOS_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_MY_VIDEOS_SUCCESS:
            return { ...state, fetching: false, error: null, myVideos: action.payload };
            break;
        case Utils.ApiTypes.API_GET_MY_VIDEOS_FAILURE:
            return { ...state, fetching: false, error: action.error, myVideos: null };
            break;
        case Utils.ApiTypes.API_GET_MY_VIDEOS_UPDATE:
            return { ...state, fetching: false, error: null, myVideos: action.payload };
            break;
        case Utils.ApiTypes.API_GET_MY_VIDEOS_CLEAR:
            return { ...state, fetching: false, error: action.error, myVideos: undefined };
            break;
        default:
            return state;
    }
}