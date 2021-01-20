import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import getVideoCategoriesReducer from './getVideoCategoriesReducer';
import uploadVideoReducer from './uploadVideoReducer';
import getMyVideosReducer from './getMyVideosReducer';
import likeDislikeVideoReducer from './likeDislikeVideoReducer';
import videoCommentReducer from './videoCommentReducer';
import getHomeVideoReducer from './getHomeVideoReducer';
import getProfileTabDataReducer from './getProfileTabDataReducer';
import editProfileReducer from './editProfileReducer';
import reportVideoReducer from './reportVideoReducer';
import getLikedVideosByUserReducer from './getLikedVideosByUserReducer';
import getCommentedVideosByUserReducer from './getCommentedVideosByUserReducer';
import hireMeReducer from './hireMeReducer';
import getReportedVideosByUserReducer from './getReportedVideosByUserReducer';
import getVideoUserProfileDataReducer from './getVideoUserProfileDataReducer';
import deleteUserVideoReducer from './deleteUserVideoReducer';
import increaseViewsOfVideoReducer from './increaseViewsOfVideoReducer';
import shareVideoReducer from './shareVideoReducer';
import getSharedVideoByUserReducer from './getSharedVideoByUserReducer';
import searchReducer from './searchReducer';
import videoDownloadedReducer from './videoDownloadedReducer';
import getSearchPageDataReducer from './getSearchPageDataReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import getNotificationReducer from './getNotificationReducer';
import gallaryReducer from './gallaryReducer';
import connectForBusinessPurposeReducer from './connectForBusinessPurposeReducer';

const rootReducer = combineReducers({
    loginReducer,
    registerReducer,
    getVideoCategoriesReducer,
    uploadVideoReducer,
    getMyVideosReducer,
    likeDislikeVideoReducer,
    videoCommentReducer,
    getHomeVideoReducer,
    getProfileTabDataReducer,
    editProfileReducer,
    reportVideoReducer,
    getLikedVideosByUserReducer,
    getCommentedVideosByUserReducer,
    hireMeReducer,
    getReportedVideosByUserReducer,
    getVideoUserProfileDataReducer,
    deleteUserVideoReducer,
    increaseViewsOfVideoReducer,
    shareVideoReducer,
    getSharedVideoByUserReducer,
    searchReducer,
    videoDownloadedReducer,
    getSearchPageDataReducer,
    forgotPasswordReducer,
    getNotificationReducer,
    gallaryReducer,
    connectForBusinessPurposeReducer
});

export default rootReducer;