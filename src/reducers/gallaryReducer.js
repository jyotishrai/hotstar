import * as Utils from '../utility';

export default function gallaryReducer(state = { gallaryVideos: { response: [] } }, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_GALLARY_CATEGORY_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_GALLARY_CATEGORY_SUCCESS:
            return { ...state, fetching: false, error: null, gallaryCategories: action.payload };
            break;
        case Utils.ApiTypes.API_GET_GALLARY_CATEGORY_FAILURE:
            return { ...state, fetching: false, error: action.error, gallaryCategories: null };
            break;
        case Utils.ApiTypes.API_GET_GALLARY_CATEGORY_CLEAR:
            return { ...state, fetching: false, error: action.error, gallaryCategories: undefined };
            break;

        case Utils.ApiTypes.API_GET_GALLARY_VIDEOS_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_GALLARY_VIDEOS_SUCCESS: {
            let moreData = {
                "code": action.payload.code,
                "error": action.payload.error,
                "next_videos": action.payload.next_videos,
                "response": [...state.gallaryVideos.response, ...action.payload.response],
            }
            return { ...state, fetching: false, error: null, gallaryVideos: moreData };
            // break;
        }
        case Utils.ApiTypes.API_GET_GALLARY_VIDEOS_FAILURE:
            return { ...state, fetching: false, error: action.error, gallaryVideos: null };
            break;
        case Utils.ApiTypes.API_GET_GALLARY_VIDEOS_CLEAR:
            return { ...state, fetching: false, error: action.error, gallaryVideos: { response: [] } };
            break;

        default:
            return state;
    }
}