import * as Utils from '../utility';

export default function getHomeVideoReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_HOME_VIDEOS_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_HOME_VIDEOS_SUCCESS:
            return { ...state, fetching: false, error: null, homeVideo: action.payload.response };
            break;
        case Utils.ApiTypes.API_GET_HOME_VIDEOS_FAILURE:
            return { ...state, fetching: false, error: action.error, homeVideo: null };
            break;
        case Utils.ApiTypes.API_GET_HOME_VIDEOS_UPDATE:
            return { ...state, fetching: false, error: action.error, homeVideo: action.payload };
            break;
        case Utils.ApiTypes.API_GET_HOME_VIDEOS_CLEAR:
            return { ...state, fetching: false, error: action.error, homeVideo: undefined };
            break;

        // case Utils.ApiTypes.API_GET_MORE_HOME_VIDEOS_METHOD:
        //     return { ...state, fetching: true, error: null };
        //     break;
        // case Utils.ApiTypes.API_GET_MORE_HOME_VIDEOS_SUCCESS:
        //     return { ...state, fetching: false, error: null, moreVideos: [...state.homeVideo.response, ...action.payload.response] };
        //     break;
        // case Utils.ApiTypes.API_GET_MORE_HOME_VIDEOS_FAILURE:
        //     return { ...state, fetching: false, error: action.error, moreVideos: null };
        //     break;
        // case Utils.ApiTypes.API_GET_MORE_HOME_VIDEOS_UPDATE:
        //     return { ...state, fetching: false, error: action.error, moreVideos: action.payload };
        //     break;
        // case Utils.ApiTypes.API_GET_MORE_HOME_VIDEOS_CLEAR:
        //     return { ...state, fetching: false, error: action.error, moreVideos: undefined };
        //     break;

        default:
            return state;
    }
}