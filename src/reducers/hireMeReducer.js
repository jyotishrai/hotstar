import * as Utils from '../utility';

export default function hireMeReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_HIRE_ME_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_HIRE_ME_SUCCESS:
            return { ...state, fetching: false, error: null, hireMeRes: action.payload };
            break;
        case Utils.ApiTypes.API_HIRE_ME_FAILURE:
            return { ...state, fetching: false, error: action.error, hireMeRes: null };
            break;
        case Utils.ApiTypes.API_HIRE_ME_CLEAR:
            return { ...state, fetching: false, error: action.error, hireMeRes: undefined };
            break;
        default:
            return state;
    }
}