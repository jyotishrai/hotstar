import * as Utils from '../utility';

export default function loginReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_LOGIN_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_LOGIN_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.payload };
            break;
        case Utils.ApiTypes.API_LOGIN_FAILURE:
            return { ...state, fetching: false, error: action.error, data: null };
            break;
        case Utils.ApiTypes.API_LOGIN_CLEAR:
            return { ...state, fetching: false, error: action.error, data: undefined };
            break;

        case Utils.ApiTypes.API_SOCIAL_LOGIN_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_SOCIAL_LOGIN_SUCCESS:
            return { ...state, fetching: false, error: null, socialLoginRes: action.payload };
            break;
        case Utils.ApiTypes.API_SOCIAL_LOGIN_SUCCESS:
            return { ...state, fetching: false, error: action.error, socialLoginRes: null };
            break;
        case Utils.ApiTypes.API_SOCIAL_LOGIN_CLEAR:
            return { ...state, fetching: false, error: action.error, socialLoginRes: undefined };
            break;

        default:
            return state;
    }
}