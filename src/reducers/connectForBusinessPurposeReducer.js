import * as Utils from '../utility';

export default function connectForBusinessPurposeReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_CONNECT_FOR_BUSINESS_PURPOSE_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_CONNECT_FOR_BUSINESS_PURPOSE_SUCCESS:
            return { ...state, fetching: false, error: null, connectForBusinessPurposeRes: action.payload };
            break;
        case Utils.ApiTypes.API_CONNECT_FOR_BUSINESS_PURPOSE_FAILURE:
            return { ...state, fetching: false, error: action.error, connectForBusinessPurposeRes: null };
            break;
        case Utils.ApiTypes.API_CONNECT_FOR_BUSINESS_PURPOSE_CLEAR:
            return { ...state, fetching: false, error: action.error, connectForBusinessPurposeRes: undefined };
            break;
        default:
            return state;
    }
}