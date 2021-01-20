import * as Utils from '../utility';

export default function editProfileReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_EDIT_PROFILE_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_EDIT_PROFILE_SUCCESS:
            return { ...state, fetching: false, error: null, editProfileRes: action.payload };
            break;
        case Utils.ApiTypes.API_EDIT_PROFILE_FAILURE:
            return { ...state, fetching: false, error: action.error, editProfileRes: null };
            break;
        case Utils.ApiTypes.API_EDIT_PROFILE_CLEAR:
            return { ...state, fetching: false, error: action.error, editProfileRes: undefined };
            break;

        case Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_SEND_OTP_METHOD:
            return { ...state, editemailfetching: true, error: null };
            break;
        case Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_SEND_OTP_SUCCESS:
            return { ...state, editemailfetching: false, error: null, editEmailMobileSendOtpRes: action.payload };
            break;
        case Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_SEND_OTP_FAILURE:
            return { ...state, editemailfetching: false, error: action.error, editEmailMobileSendOtpRes: null };
            break;
        case Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_SEND_OTP_CLEAR:
            return { ...state, editemailfetching: false, error: action.error, editEmailMobileSendOtpRes: undefined };
            break;

        case Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_VERIFY_OTP_METHOD:
            return { ...state, editemailfetching: true, error: null };
            break;
        case Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_VERIFY_OTP_SUCCESS:
            return { ...state, editemailfetching: false, error: null, editEmailMobileVerifyOtpRes: action.payload };
            break;
        case Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_VERIFY_OTP_FAILURE:
            return { ...state, editemailfetching: false, error: action.error, editEmailMobileVerifyOtpRes: null };
            break;
        case Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_VERIFY_OTP_CLEAR:
            return { ...state, editemailfetching: false, error: action.error, editEmailMobileVerifyOtpRes: undefined };
            break;
        default:
            return state;
    }
}