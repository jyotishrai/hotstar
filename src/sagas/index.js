import { all, takeLatest } from 'redux-saga/effects';
import * as Utils from '../utility';
import { getCountryListAction, getStateListAction, getCityListAction, registerAction, resendOtpAction, verifyOtpAction } from './registerSaga'
import { loginAction, socialLoginAction } from './loginSaga'
import { getVideoCategoriesAction } from './getVideoCategoriesSaga';
import { uploadVideoAction } from './uploadVideoSaga';
import { getMyVideoAction } from './getMyVideosSaga';
import { likeDislikeVideoAction } from './likeDislikeVideoSaga';
import { addCommentsOnVideoAction, getAllCommentsOfVideoAction } from './videoCommentSaga'
import { getHomeVideoAction, getMoreHomeVideoAction } from './getHomeVideoSaga'
import { getProfileTabDataAction } from './getProfileTabDataSaga';
import { editProfileAction, editEmailMobileSendOtpAction, editEmailMobileVerifyOtpAction } from './editProfileSaga'
import { reportVideoAction } from './reportVideoSaga'
import { getLikedVideoByUserAction } from './getLikedVideoByUserSaga';
import { getCommentedVideoByUserAction } from './getCommentedVideoByUserSaga';
import { hireMeAction } from './hireMeSaga';
import { getReportedVideoByUserAction } from './getReportedVideoByUserSaga';
import { getVideoUserProfileDataAction } from './getVideoUserProfileDataSaga';
import { deleteUserVideoAction } from './deleteUserVideoSaga';
import { increaseViewsOfVideoAction } from './increaseViewsOfVideoSaga';
import { shareVideoAction } from './shareVideoSaga';
import { getSharedVideoByUserAction } from './getSharedVideosByUserSaga';
import { searchAction } from './searchSaga';
import { videoDownloadedAction } from './videoDownloadedSaga';
import { getSearchPageDataAction } from './getSearchPageDataSaga';
import { forgotPasswordSendOtpAction, forgotPasswordAction } from './forgotPasswordSaga';
import { getNotificationAction } from './getNotificationSaga';
import { getGallaryCategoriesAction, getGallaryVideosAction } from './gallarySaga';
import { connectForBusinessPurposeAction } from './connectForBusinessPurposeSaga';

function* watchLoginAction() {
    yield takeLatest(Utils.ApiTypes.API_LOGIN_METHOD, loginAction)
}

function* watchGetCountryListAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_COUNTRY_LIST_METHOD, getCountryListAction)
}

function* watchGetStateListAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_STATE_LIST_METHOD, getStateListAction)
}

function* watchGetCityListAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_CITY_LIST_METHOD, getCityListAction)
}

function* watchRegisterAction() {
    yield takeLatest(Utils.ApiTypes.API_REGISTER_METHOD, registerAction)
}

function* watchVerifyOtpAction() {
    yield takeLatest(Utils.ApiTypes.API_VERIFY_OTP_METHOD, verifyOtpAction)
}

function* watchResendOtpAction() {
    yield takeLatest(Utils.ApiTypes.API_RESEND_OTP_METHOD, resendOtpAction)
}

function* watchGetVideoCategoriesAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_VIDEO_CATEGORIES_METHOD, getVideoCategoriesAction)
}

function* watchUploadVideoAction() {
    yield takeLatest(Utils.ApiTypes.API_UPLOAD_VIDEO_METHOD, uploadVideoAction)
}

function* watchGetMyVideosAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_MY_VIDEOS_METHOD, getMyVideoAction)
}

function* watchLikeDislikeVideoAction() {
    yield takeLatest(Utils.ApiTypes.API_LIKE_DISLIKE_VIDEO_METHOD, likeDislikeVideoAction)
}

function* watchGetAllCommentsOfVideoAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_COMMENTS_OF_VIDEO_METHOD, getAllCommentsOfVideoAction)
}

function* watchAddCommentOnVideoAction() {
    yield takeLatest(Utils.ApiTypes.API_ADD_COMMENT_ON_VIDEO_METHOD, addCommentsOnVideoAction)
}

function* watchGetHomeVideoAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_HOME_VIDEOS_METHOD, getHomeVideoAction)
}

function* watchGetMoreHomeVideoAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_MORE_HOME_VIDEOS_METHOD, getMoreHomeVideoAction)
}

function* watchGetProfileTabDataAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_PROFILE_TAB_DATA_METHOD, getProfileTabDataAction)
}

function* watchEditProfileAction() {
    yield takeLatest(Utils.ApiTypes.API_EDIT_PROFILE_METHOD, editProfileAction)
}

function* watchReportVideoAction() {
    yield takeLatest(Utils.ApiTypes.API_REPORT_VIDEO_METHOD, reportVideoAction)
}

function* watchGetLikedVideoByUserAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_LIKED_VIDEO_BY_USER_METHOD, getLikedVideoByUserAction)
}

function* watchGetCommentedVideoByUserAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_COMMENTED_VIDEO_BY_USER_METHOD, getCommentedVideoByUserAction)
}

function* watchHireMeAction() {
    yield takeLatest(Utils.ApiTypes.API_HIRE_ME_METHOD, hireMeAction)
}

function* watchGetReportedVideoByUserAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_REPORTED_VIDEO_BY_USER_METHOD, getReportedVideoByUserAction)
}

function* watchGetVideoUserProfileDataAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_VIDEO_USER_PROFILE_DATA_METHOD, getVideoUserProfileDataAction)
}

function* watchDeleteUserVideoAction() {
    yield takeLatest(Utils.ApiTypes.API_DELETE_USER_VIDEO_METHOD, deleteUserVideoAction)
}

function* watchIncreaseViewsOfVideoAction() {
    yield takeLatest(Utils.ApiTypes.API_INCREASE_VIEW_OF_VIDEO_METHOD, increaseViewsOfVideoAction)
}

function* watchShareVideoAction() {
    yield takeLatest(Utils.ApiTypes.API_SHARE_VIDEO_METHOD, shareVideoAction)
}

function* watchGetSharedVideoByUserAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_SHARED_VIDEO_BY_USER_METHOD, getSharedVideoByUserAction)
}

function* watchSearchAction() {
    yield takeLatest(Utils.ApiTypes.API_SEARCH_METHOD, searchAction)
}

function* watchVideoDownloadedAction() {
    yield takeLatest(Utils.ApiTypes.API_VIDEO_DOWNLOADED_METHOD, videoDownloadedAction)
}

function* watchGetSearchPageDataAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_SEARCH_PAGE_DATA_METHOD, getSearchPageDataAction)
}

function* watchForgotPasswordSendOtpAction() {
    yield takeLatest(Utils.ApiTypes.API_FORGOT_PASSWORD_SEND_OTP_METHOD, forgotPasswordSendOtpAction)
}

function* watchForgotPasswordAction() {
    yield takeLatest(Utils.ApiTypes.API_FORGOT_PASSWORD_METHOD, forgotPasswordAction)
}

function* watchGetNotificationAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_NOTIFICATION_METHOD, getNotificationAction)
}

function* watchGetGallaryCategoriesAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_GALLARY_CATEGORY_METHOD, getGallaryCategoriesAction)
}

function* watchGetGallaryVideosAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_GALLARY_VIDEOS_METHOD, getGallaryVideosAction)
}

function* watchSocialLoginAction() {
    yield takeLatest(Utils.ApiTypes.API_SOCIAL_LOGIN_METHOD, socialLoginAction)
}

function* watchConnectForBusinessPurposeAction() {
    yield takeLatest(Utils.ApiTypes.API_CONNECT_FOR_BUSINESS_PURPOSE_METHOD, connectForBusinessPurposeAction)
}

function* watchEditEmailMobileSendOtpAction() {
    yield takeLatest(Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_SEND_OTP_METHOD, editEmailMobileSendOtpAction)
}

function* watchEditEmailMobileVerifyOtpAction() {
    yield takeLatest(Utils.ApiTypes.API_EDIT_EMAIL_MOBILE_VERIFY_OTP_METHOD, editEmailMobileVerifyOtpAction)
}

function* rootSaga() {
    yield all([
        watchLoginAction(),
        watchGetCountryListAction(),
        watchGetStateListAction(),
        watchGetCityListAction(),
        watchRegisterAction(),
        watchVerifyOtpAction(),
        watchResendOtpAction(),
        watchGetVideoCategoriesAction(),
        watchUploadVideoAction(),
        watchGetMyVideosAction(),
        watchLikeDislikeVideoAction(),
        watchGetAllCommentsOfVideoAction(),
        watchAddCommentOnVideoAction(),
        watchGetHomeVideoAction(),
        watchGetProfileTabDataAction(),
        watchEditProfileAction(),
        watchReportVideoAction(),
        watchGetLikedVideoByUserAction(),
        watchGetCommentedVideoByUserAction(),
        watchHireMeAction(),
        watchGetReportedVideoByUserAction(),
        watchGetVideoUserProfileDataAction(),
        watchDeleteUserVideoAction(),
        watchIncreaseViewsOfVideoAction(),
        watchShareVideoAction(),
        watchGetSharedVideoByUserAction(),
        watchSearchAction(),
        watchVideoDownloadedAction(),
        watchGetSearchPageDataAction(),
        watchForgotPasswordSendOtpAction(),
        watchForgotPasswordAction(),
        watchGetNotificationAction(),
        watchGetGallaryCategoriesAction(),
        watchGetGallaryVideosAction(),
        watchSocialLoginAction(),
        watchGetMoreHomeVideoAction(),
        watchConnectForBusinessPurposeAction(),
        watchEditEmailMobileSendOtpAction(),
        watchEditEmailMobileVerifyOtpAction()
    ])
}

export default rootSaga;