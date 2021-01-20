import * as Utils from '../utility';

export function loginAction(action) {
    return {
        type: Utils.ApiTypes.API_LOGIN_METHOD,
        payload: action
    }
}

export function clearLoginDataAction() {
    return {
        type: Utils.ApiTypes.API_LOGIN_CLEAR,
    }
}

export function getCountryListAction() {
    return {
        type: Utils.ApiTypes.API_GET_COUNTRY_LIST_METHOD
    }
}

export function getStateListAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_STATE_LIST_METHOD,
        payload: action
    }
}

export function getCityListAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_CITY_LIST_METHOD,
        payload: action
    }
}

export function registerAction(action) {
    return {
        type: Utils.ApiTypes.API_REGISTER_METHOD,
        payload: action
    }
}

export function verifyOtpAction(action) {
    return {
        type: Utils.ApiTypes.API_VERIFY_OTP_METHOD,
        payload: action
    }
}

export function clearVerifyOtpAction() {
    return {
        type: Utils.ApiTypes.API_VERIFY_OTP_CLEAR,
        payload: undefined
    }
}

export function resendOtpAction(action) {
    return {
        type: Utils.ApiTypes.API_RESEND_OTP_METHOD,
        payload: action
    }
}

export function clearResendOtpAction() {
    return {
        type: Utils.ApiTypes.API_RESEND_OTP_CLEAR,
        payload: undefined
    }
}

export function getVideoCategoriesAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_VIDEO_CATEGORIES_METHOD,
        payload: action
    }
}

export function clearVideoCategoriesAction() {
    return {
        type: Utils.ApiTypes.API_GET_VIDEO_CATEGORIES_CLEAR,
    }
}

export function uploadVideoAction(action) {
    return {
        type: Utils.ApiTypes.API_UPLOAD_VIDEO_METHOD,
        payload: action
    }
}

export function clearUploadVideoAction() {
    return {
        type: Utils.ApiTypes.API_UPLOAD_VIDEO_CLEAR,
    }
}

export function getMyVideosAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_MY_VIDEOS_METHOD,
        payload: action
    }
}

export function updateMyVideosAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_MY_VIDEOS_UPDATE,
        payload: action
    }
}

export function likeDislikeVideoAction(action) {
    return {
        type: Utils.ApiTypes.API_LIKE_DISLIKE_VIDEO_METHOD,
        payload: action
    }
}

export function clearLikeDislikeVideoAction() {
    return {
        type: Utils.ApiTypes.API_LIKE_DISLIKE_VIDEO_CLEAR,
    }
}

export function getAllCommentsOfVideoAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_COMMENTS_OF_VIDEO_METHOD,
        payload: action
    }
}

export function addCommentOnVideoAction(action) {
    return {
        type: Utils.ApiTypes.API_ADD_COMMENT_ON_VIDEO_METHOD,
        payload: action
    }
}

export function clearAddCommentOnVideoAction() {
    return {
        type: Utils.ApiTypes.API_ADD_COMMENT_ON_VIDEO_CLEAR
    }
}

export function getHomeVideoAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_HOME_VIDEOS_METHOD,
        payload: action
    }
}

export function clearHomeVideoAction() {
    return {
        type: Utils.ApiTypes.API_GET_HOME_VIDEOS_CLEAR,
    }
}

export function getMoreHomeVideoAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_MORE_HOME_VIDEOS_METHOD,
        payload: action
    }
}

export function updateHomeVideoAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_HOME_VIDEOS_UPDATE,
        payload: action
    }
}

export function getProfileTabDataAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_PROFILE_TAB_DATA_METHOD,
        payload: action
    }
}

export function clearProfileTabDataAction() {
    return {
        type: Utils.ApiTypes.API_GET_PROFILE_TAB_DATA_CLEAR,
    }
}

export function editProfileAction(action) {
    return {
        type: Utils.ApiTypes.API_EDIT_PROFILE_METHOD,
        payload: action
    }
}

export function clearEditProfileAction() {
    return {
        type: Utils.ApiTypes.API_EDIT_PROFILE_CLEAR,
    }
}

export function reportVideoAction(action) {
    return {
        type: Utils.ApiTypes.API_REPORT_VIDEO_METHOD,
        payload: action
    }
}

export function clearReportVideoAction() {
    return {
        type: Utils.ApiTypes.API_REPORT_VIDEO_CLEAR,
    }
}

export function getLikedVideosByUserAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_LIKED_VIDEO_BY_USER_METHOD,
        payload: action
    }
}

export function updateLikedVideosByUserAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_LIKED_VIDEO_BY_USER_UPDATE,
        payload: action
    }
}

export function getCommentedVideosByUserAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_COMMENTED_VIDEO_BY_USER_METHOD,
        payload: action
    }
}

export function updateCommentedVideosByUserAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_COMMENTED_VIDEO_BY_USER_UPDATE,
        payload: action
    }
}

export function hireMeAction(action) {
    return {
        type: Utils.ApiTypes.API_HIRE_ME_METHOD,
        payload: action
    }
}

export function clearHireMeAction() {
    return {
        type: Utils.ApiTypes.API_HIRE_ME_CLEAR,
    }
}

export function getReportedVideosByUserAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_REPORTED_VIDEO_BY_USER_METHOD,
        payload: action
    }
}

export function getVideoUserProfileAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_VIDEO_USER_PROFILE_DATA_METHOD,
        payload: action
    }
}

export function updateVideoUserProfileAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_VIDEO_USER_PROFILE_DATA_UPDATE,
        payload: action
    }
}

export function clearVideoUserProfileAction() {
    return {
        type: Utils.ApiTypes.API_GET_VIDEO_USER_PROFILE_DATA_CLEAR
    }
}

export function deleteUserVideoAction(action) {
    return {
        type: Utils.ApiTypes.API_DELETE_USER_VIDEO_METHOD,
        payload: action
    }
}

export function clearDeleteUserVideoAction() {
    return {
        type: Utils.ApiTypes.API_DELETE_USER_VIDEO_CLEAR,
    }
}

export function increaseViewOfVidepAction(action) {
    return {
        type: Utils.ApiTypes.API_INCREASE_VIEW_OF_VIDEO_METHOD,
        payload: action
    }
}

export function clearIncreaseViewOfVidepAction() {
    return {
        type: Utils.ApiTypes.API_INCREASE_VIEW_OF_VIDEO_CLEAR,
    }
}

export function shareVideoAction(action) {
    return {
        type: Utils.ApiTypes.API_SHARE_VIDEO_METHOD,
        payload: action
    }
}

export function clearShareVideoAction() {
    return {
        type: Utils.ApiTypes.API_SHARE_VIDEO_CLEAR
    }
}

export function getSharedVideoByUserAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_SHARED_VIDEO_BY_USER_METHOD,
        payload: action
    }
}

export function searchAction(action) {
    return {
        type: Utils.ApiTypes.API_SEARCH_METHOD,
        payload: action
    }
}

export function clearSearchAction() {
    return {
        type: Utils.ApiTypes.API_SEARCH_CLEAR,
    }
}

export function videoDownloadedAction(action) {
    return {
        type: Utils.ApiTypes.API_VIDEO_DOWNLOADED_METHOD,
        payload: action
    }
}

export function clearVideoDownloadedAction() {
    return {
        type: Utils.ApiTypes.API_VIDEO_DOWNLOADED_CLEAR,
    }
}

export function getSearchPageDataAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_SEARCH_PAGE_DATA_METHOD,
        payload: action
    }
}

export function forgotPasswordSendOtpAction(action) {
    return {
        type: Utils.ApiTypes.API_FORGOT_PASSWORD_SEND_OTP_METHOD,
        payload: action
    }
}

export function clearForgotPasswordSendOtpAction() {
    return {
        type: Utils.ApiTypes.API_FORGOT_PASSWORD_SEND_OTP_CLEAR,
    }
}

export function forgotPasswordAction(action) {
    return {
        type: Utils.ApiTypes.API_FORGOT_PASSWORD_METHOD,
        payload: action
    }
}

export function clearForgotPasswordAction() {
    return {
        type: Utils.ApiTypes.API_FORGOT_PASSWORD_CLEAR,
    }
}

export function getNotificationAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_NOTIFICATION_METHOD,
        payload: action
    }
}

export function getGallaryCategoriesAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_GALLARY_CATEGORY_METHOD,
        payload: action
    }
}

export function clearGetGallaryCategoriesAction() {
    return {
        type: Utils.ApiTypes.API_GET_GALLARY_CATEGORY_CLEAR,
    }
}

export function getGallaryVideosAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_GALLARY_VIDEOS_METHOD,
        payload: action
    }
}

export function cleargetGallaryVideosAction() {
    return {
        type: Utils.ApiTypes.API_GET_GALLARY_VIDEOS_CLEAR,
    }
}

export function socialLoginAction(action) {
    return {
        type: Utils.ApiTypes.API_SOCIAL_LOGIN_METHOD,
        payload: action
    }
}

export function clearSocialLoginAction() {
    return {
        type: Utils.ApiTypes.API_SOCIAL_LOGIN_CLEAR,
    }
}

export function connectForBusinessPurposeAction(action) {
    return {
        type: Utils.ApiTypes.API_CONNECT_FOR_BUSINESS_PURPOSE_METHOD,
        payload: action
    }
}

export function clearConnectForBusinessPurposeAction() {
    return {
        type: Utils.ApiTypes.API_CONNECT_FOR_BUSINESS_PURPOSE_CLEAR,
    }
}

export function editEmailMobileSendOtpAction(action) {
    return {
        type: Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_SEND_OTP_METHOD,
        payload: action
    }
}

export function clearEditEmailMobileSendOtpAction() {
    return {
        type: Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_SEND_OTP_CLEAR,
    }
}

export function editEmailMobileVerifyOtpAction(action) {
    return {
        type: Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_VERIFY_OTP_METHOD,
        payload: action
    }
}

export function clearEditEmailMobileVerifyOtpAction() {
    return {
        type: Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_VERIFY_OTP_CLEAR,
    }
}