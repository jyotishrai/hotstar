import * as Utils from '../utility';

export default function registerReducer(state = {}, action) {

    switch (action.type) {

        // country list
        case Utils.ApiTypes.API_GET_COUNTRY_LIST_METHOD:
            return { ...state, fetching: false, error: null };
            break;
        case Utils.ApiTypes.API_GET_COUNTRY_LIST_SUCCESS:
            return { ...state, fetching: false, error: null, countryData: action.payload };
            break;
        case Utils.ApiTypes.API_GET_COUNTRY_LIST_FAILURE:
            return { ...state, fetching: false, error: action.error, countryData: null };
            break;

        //state list
        case Utils.ApiTypes.API_GET_STATE_LIST_METHOD:
            return { ...state, fetching: false, error: null };
            break;
        case Utils.ApiTypes.API_GET_STATE_LIST_SUCCESS:
            return { ...state, fetching: false, error: null, stateData: action.payload };
            break;
        case Utils.ApiTypes.API_GET_STATE_LIST_FAILURE:
            return { ...state, fetching: false, error: action.error, stateData: null };
            break;

        //city list
        case Utils.ApiTypes.API_GET_CITY_LIST_METHOD:
            return { ...state, fetching: false, error: null };
            break;
        case Utils.ApiTypes.API_GET_CITY_LIST_SUCCESS:
            return { ...state, fetching: false, error: null, cityData: action.payload };
            break;
        case Utils.ApiTypes.API_GET_CITY_LIST_FAILURE:
            return { ...state, fetching: false, error: action.error, cityData: null };
            break;

        //register
        case Utils.ApiTypes.API_REGISTER_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_REGISTER_SUCCESS:
            return { ...state, fetching: false, error: null, registerData: action.payload };
            break;
        case Utils.ApiTypes.API_REGISTER_FAILURE:
            return { ...state, fetching: false, error: action.error, registerData: null };
            break;

        //verify otp
        case Utils.ApiTypes.API_VERIFY_OTP_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_VERIFY_OTP_SUCCESS:
            return { ...state, fetching: false, error: null, verifyOtp: action.payload };
            break;
        case Utils.ApiTypes.API_VERIFY_OTP_FAILURE:
            return { ...state, fetching: false, error: action.error, verifyOtp: null };
            break;
        case Utils.ApiTypes.API_VERIFY_OTP_CLEAR:
            return { ...state, fetching: false, error: action.error, verifyOtp: undefined };
            break;

        //resend otp
        case Utils.ApiTypes.API_RESEND_OTP_METHOD:
            return { ...state, fetching: false, error: null };
            break;
        case Utils.ApiTypes.API_RESEND_OTP_SUCCESS:
            return { ...state, fetching: false, error: null, reSendOtpData: action.payload };
            break;
        case Utils.ApiTypes.API_RESEND_OTP_FAILURE:
            return { ...state, fetching: false, error: action.error, reSendOtpData: null };
            break;
        case Utils.ApiTypes.API_RESEND_OTP_CLEAR:
            return { ...state, fetching: false, error: action.error, reSendOtpData: undefined };
            break;

        default:
            return state;
    }
}