import * as Utils from '../utility';

export default function reportVideoReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_REPORT_VIDEO_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_REPORT_VIDEO_SUCCESS:
            return { ...state, fetching: false, error: null, reportVideoRes: action.payload };
            break;
        case Utils.ApiTypes.API_REPORT_VIDEO_FAILURE:
            return { ...state, fetching: false, error: action.error, reportVideoRes: null };
            break;
        case Utils.ApiTypes.API_REPORT_VIDEO_CLEAR:
            return { ...state, fetching: false, error: action.error, reportVideoRes: undefined };
            break;
        default:
            return state;
    }
}