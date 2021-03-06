import * as Utils from '../utility';

export default function getNotificationReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_NOTIFICATION_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_NOTIFICATION_SUCCESS:
            return { ...state, fetching: false, error: null, notificationData: action.payload };
            break;
        case Utils.ApiTypes.API_GET_NOTIFICATION_FAILURE:
            return { ...state, fetching: false, error: action.error, notificationData: null };
            break;
        case Utils.ApiTypes.API_GET_NOTIFICATION_CLEAR:
            return { ...state, fetching: false, error: action.error, notificationData: undefined };
            break;
        default:
            return state;
    }
}