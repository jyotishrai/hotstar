import * as Utils from '../utility';

export default function getVideoUserProfileDataReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_VIDEO_USER_PROFILE_DATA_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_VIDEO_USER_PROFILE_DATA_SUCCESS:
            return { ...state, fetching: false, error: null, videoUserProfileData: action.payload };
            break;
        case Utils.ApiTypes.API_GET_VIDEO_USER_PROFILE_DATA_FAILURE:
            return { ...state, fetching: false, error: action.error, videoUserProfileData: null };
            break;
        case Utils.ApiTypes.API_GET_VIDEO_USER_PROFILE_DATA_UPDATE:
            return { ...state, fetching: false, error: null, videoUserProfileData: action.payload };
            break;
        case Utils.ApiTypes.API_GET_VIDEO_USER_PROFILE_DATA_CLEAR:
            return { ...state, fetching: false, error: action.error, videoUserProfileData: undefined };
            break;
        default:
            return state;
    }
}