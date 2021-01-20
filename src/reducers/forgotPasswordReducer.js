import * as Utils from '../utility';

export default function forgotPasswordReducer(state = {}, action) {

    switch (action.type) {

        //send otp
        case Utils.ApiTypes.API_FORGOT_PASSWORD_SEND_OTP_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_SEND_OTP_SUCCESS:
            return { ...state, fetching: false, error: null, forgotOtp: action.payload };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_SEND_OTP_FAILURE:
            return { ...state, fetching: false, error: action.error, forgotOtp: null };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_SEND_OTP_CLEAR:
            return { ...state, fetching: false, error: action.error, forgotOtp: undefined };
            break;

        //set new password
        case Utils.ApiTypes.API_FORGOT_PASSWORD_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_SUCCESS:
            return { ...state, fetching: false, error: null, forgotPasswordRes: action.payload };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_FAILURE:
            return { ...state, fetching: false, error: action.error, forgotPasswordRes: null };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_CLEAR:
            return { ...state, fetching: false, error: action.error, forgotPasswordRes: undefined };
            break;
        default:
            return state;
    }
}