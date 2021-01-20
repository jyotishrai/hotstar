const BASE_URL = 'http://172.104.186.169/brfantasy-old/audition_tube/api/' //'http://205.147.102.6/p/sites/audition_tube/api/'

//1
export const API_LOGIN_METHOD = BASE_URL + 'users/login.json';
export const API_LOGIN_SUCCESS = "api_login_success";
export const API_LOGIN_FAILURE = "api_login_failure";
export const API_LOGIN_CLEAR = "api_login_clear"

//2
export const API_GET_COUNTRY_LIST_METHOD = BASE_URL + 'users/countryList.json';
export const API_GET_COUNTRY_LIST_SUCCESS = "api_get_country_list_success";
export const API_GET_COUNTRY_LIST_FAILURE = "api_get_country_list_failure";
export const API_GET_COUNTRY_LIST_CLEAR = "api_get_country_list_clear"

//3
export const API_GET_STATE_LIST_METHOD = BASE_URL + 'users/stateListByCountry.json';
export const API_GET_STATE_LIST_SUCCESS = "api_get_state_list_success";
export const API_GET_STATE_LIST_FAILURE = "api_get_state_list_failure";
export const API_GET_STATE_LIST_CLEAR = "api_get_state_list_clear"

//4
export const API_GET_CITY_LIST_METHOD = BASE_URL + 'users/cityListByState.json';
export const API_GET_CITY_LIST_SUCCESS = "api_get_city_list_success";
export const API_GET_CITY_LIST_FAILURE = "api_get_city_list_failure";
export const API_GET_CITY_LIST_CLEAR = "api_get_city_list_clear";

//5
export const API_REGISTER_METHOD = BASE_URL + 'users/signup.json';
export const API_REGISTER_SUCCESS = "api_register_success";
export const API_REGISTER_FAILURE = "api_register_failure";
export const API_REGISTER_CLEAR = "api_register_clear"

//6
export const API_VERIFY_OTP_METHOD = BASE_URL + 'users/otpverify.json';
export const API_VERIFY_OTP_SUCCESS = "api_verify_otp_success";
export const API_VERIFY_OTP_FAILURE = "api_verify_otp_failure";
export const API_VERIFY_OTP_CLEAR = "api_verify_otp_clear"

//7
export const API_RESEND_OTP_METHOD = BASE_URL + 'users/resendotp.json';
export const API_RESEND_OTP_SUCCESS = "api_re_send_otp_success";
export const API_RESEND_OTP_FAILURE = "api_re_send_otp_failure";
export const API_RESEND_OTP_CLEAR = "api_re_send_otp_clear"

//8
export const API_GET_VIDEO_CATEGORIES_METHOD = BASE_URL + 'users/getCategory.json';
export const API_GET_VIDEO_CATEGORIES_SUCCESS = "api_get_video_categories_success";
export const API_GET_VIDEO_CATEGORIES_FAILURE = "api_get_video_categories_failure";
export const API_GET_VIDEO_CATEGORIES_CLEAR = "api_get_video_categories_clear"

//9
export const API_UPLOAD_VIDEO_METHOD = BASE_URL + 'users/videoUpload.json';
export const API_UPLOAD_VIDEO_SUCCESS = "api_upload_video_success";
export const API_UPLOAD_VIDEO_FAILURE = "api_upload_video_failure";
export const API_UPLOAD_VIDEO_CLEAR = "api_upload_video_clear";

//10
export const API_GET_MY_VIDEOS_METHOD = BASE_URL + 'users/getUserVideos.json';
export const API_GET_MY_VIDEOS_SUCCESS = "api_get_my_videos_success";
export const API_GET_MY_VIDEOS_FAILURE = "api_get_my_videos_failure";
export const API_GET_MY_VIDEOS_CLEAR = "api_get_my_videos_clear";
export const API_GET_MY_VIDEOS_UPDATE = "api_get_my_videos_update";

//11
export const API_LIKE_DISLIKE_VIDEO_METHOD = BASE_URL + 'users/likeDislikeVideo.json';
export const API_LIKE_DISLIKE_VIDEO_SUCCESS = "api_like_dislike_video_success";
export const API_LIKE_DISLIKE_VIDEO_FAILURE = "api_like_dislike_video_failure";
export const API_LIKE_DISLIKE_VIDEO_CLEAR = "api_like_dislike_video_clear";

//12
export const API_GET_COMMENTS_OF_VIDEO_METHOD = BASE_URL + 'users/allVideoComment.json';
export const API_GET_COMMENTS_OF_VIDEO_SUCCESS = "api_get_comments_of_video_success";
export const API_GET_COMMENTS_OF_VIDEO_FAILURE = "api_get_comments_of_video_failure";
export const API_GET_COMMENTS_OF_VIDEO_CLEAR = "api_get_comments_of_video_clear";

//13
export const API_ADD_COMMENT_ON_VIDEO_METHOD = BASE_URL + 'users/commentVideo.json';
export const API_ADD_COMMENT_ON_VIDEO_SUCCESS = "api_add_comments_on_video_success";
export const API_ADD_COMMENT_ON_VIDEO_FAILURE = "api_add_comments_on_video_failure";
export const API_ADD_COMMENT_ON_VIDEO_CLEAR = "api_add_comments_on_video_clear";

//14
export const API_GET_HOME_VIDEOS_METHOD = BASE_URL + 'users/getAllVideos.json';
export const API_GET_HOME_VIDEOS_SUCCESS = "api_get_home_videos_success";
export const API_GET_HOME_VIDEOS_FAILURE = "api_get_home_videos_failure";
export const API_GET_HOME_VIDEOS_CLEAR = "api_get_home_videos_clear";
export const API_GET_HOME_VIDEOS_UPDATE = "api_get_home_videos_update";

//15
export const API_GET_PROFILE_TAB_DATA_METHOD = BASE_URL + 'users/likeCommentVideoCount.json';
export const API_GET_PROFILE_TAB_DATA_SUCCESS = "api_get_profile_tab_data_success";
export const API_GET_PROFILE_TAB_DATA_FAILURE = "api_get_profile_tab_data_failure";
export const API_GET_PROFILE_TAB_DATA_CLEAR = "api_get_profile_tab_data_clear";

//16
export const API_EDIT_PROFILE_METHOD = BASE_URL + 'users/editProfile.json';
export const API_EDIT_PROFILE_SUCCESS = "api_edit_profile_success";
export const API_EDIT_PROFILE_FAILURE = "api_edit_profile_failure";
export const API_EDIT_PROFILE_CLEAR = "api_edit_profile_clear";

//17
export const API_REPORT_VIDEO_METHOD = BASE_URL + 'users/reportVideo.json';
export const API_REPORT_VIDEO_SUCCESS = "api_report_video_success";
export const API_REPORT_VIDEO_FAILURE = "api_report_video_failure";
export const API_REPORT_VIDEO_CLEAR = "api_report_video_clear";

//18
export const API_GET_LIKED_VIDEO_BY_USER_METHOD = BASE_URL + 'users/getAllLikedVideosByUser.json';
export const API_GET_LIKED_VIDEO_BY_USER_SUCCESS = "api_get_liked_video_by_user_success";
export const API_GET_LIKED_VIDEO_BY_USER_FAILURE = "api_get_liked_video_by_user_failure";
export const API_GET_LIKED_VIDEO_BY_USER_CLEAR = "api_get_liked_video_by_user_clear";
export const API_GET_LIKED_VIDEO_BY_USER_UPDATE = "api_get_liked_video_by_user_update";

//19
export const API_GET_COMMENTED_VIDEO_BY_USER_METHOD = BASE_URL + 'users/getAllCommentedVideosByUser.json';
export const API_GET_COMMENTED_VIDEO_BY_USER_SUCCESS = "api_get_commented_video_by_user_success";
export const API_GET_COMMENTED_VIDEO_BY_USER_FAILURE = "api_get_commented_video_by_user_failure";
export const API_GET_COMMENTED_VIDEO_BY_USER_CLEAR = "api_get_commented_video_by_user_clear";
export const API_GET_COMMENTED_VIDEO_BY_USER_UPDATE = "api_get_commented_video_by_user_update";

//20
export const API_HIRE_ME_METHOD = BASE_URL + 'users/hireMe.json';
export const API_HIRE_ME_SUCCESS = "api_hire_me_success";
export const API_HIRE_ME_FAILURE = "api_hire_me_failure";
export const API_HIRE_ME_CLEAR = "api_hire_me_clear";

//21
export const API_GET_REPORTED_VIDEO_BY_USER_METHOD = BASE_URL + 'users/getAllReportedVideosByUser.json';
export const API_GET_REPORTED_VIDEO_BY_USER_SUCCESS = "api_get_reported_video_by_user_success";
export const API_GET_REPORTED_VIDEO_BY_USER_FAILURE = "api_get_reported_video_by_user_failure";
export const API_GET_REPORTED_VIDEO_BY_USER_CLEAR = "api_get_reported_video_by_user_clear";
export const API_GET_REPORTED_VIDEO_BY_USER_UPDATE = "api_get_reported_video_by_user_update";

//22
export const API_GET_VIDEO_USER_PROFILE_DATA_METHOD = BASE_URL + 'users/viewUserProfile.json';
export const API_GET_VIDEO_USER_PROFILE_DATA_SUCCESS = "api_get_video_user_profile_data_success";
export const API_GET_VIDEO_USER_PROFILE_DATA_FAILURE = "api_get_video_user_profile_data_failure";
export const API_GET_VIDEO_USER_PROFILE_DATA_CLEAR = "api_get_video_user_profile_data_clear";
export const API_GET_VIDEO_USER_PROFILE_DATA_UPDATE = "api_get_video_user_profile_data_update";

//23
export const API_DELETE_USER_VIDEO_METHOD = BASE_URL + 'users/deleteVideo.json';
export const API_DELETE_USER_VIDEO_SUCCESS = "api_delete_user_video_success";
export const API_DELETE_USER_VIDEO_FAILURE = "api_delete_user_video_failure";
export const API_DELETE_USER_VIDEO_CLEAR = "api_delete_user_video_clear";
export const API_DELETE_USER_VIDEO_UPDATE = "api_delete_user_video_update";

//24
export const API_INCREASE_VIEW_OF_VIDEO_METHOD = BASE_URL + 'users/videoViews.json';
export const API_INCREASE_VIEW_OF_VIDEO_SUCCESS = "api_increase_view_of_video_success";
export const API_INCREASE_VIEW_OF_VIDEO_FAILURE = "api_increase_view_of_video_failure";
export const API_INCREASE_VIEW_OF_VIDEO_CLEAR = "api_increase_view_of_video_clear";
export const API_INCREASE_VIEW_OF_VIDEO_UPDATE = "api_increase_view_of_video_update";

//25
export const API_SHARE_VIDEO_METHOD = BASE_URL + 'users/videoShare.json';
export const API_SHARE_VIDEO_SUCCESS = "api_share_video_success";
export const API_SHARE_VIDEO_FAILURE = "api_share_video_failure";
export const API_SHARE_VIDEO_CLEAR = "api_share_video_clear";
export const API_SHARE_VIDEO_UPDATE = "api_share_video_update";

//26
export const API_GET_SHARED_VIDEO_BY_USER_METHOD = BASE_URL + 'users/getAllSharedVideosByUser.json';
export const API_GET_SHARED_VIDEO_BY_USER_SUCCESS = "api_get_shared_video_by_user_success";
export const API_GET_SHARED_VIDEO_BY_USER_FAILURE = "api_get_shared_video_by_user_failure";
export const API_GET_SHARED_VIDEO_BY_USER_CLEAR = "api_get_shared_video_by_user_clear";
export const API_GET_SHARED_VIDEO_BY_USER_UPDATE = "api_get_shared_video_by_user_update";

//27
export const API_SEARCH_METHOD = BASE_URL + 'users/search.json';
export const API_SEARCH_SUCCESS = "api_search_success";
export const API_SEARCH_FAILURE = "api_search_failure";
export const API_SEARCH_CLEAR = "api_search_clear";
export const API_SEARCH_UPDATE = "api_search_update";

//28
export const API_VIDEO_DOWNLOADED_METHOD = BASE_URL + 'users/videoDownload.json';
export const API_VIDEO_DOWNLOADED_SUCCESS = "api_video_downloaded_success";
export const API_VIDEO_DOWNLOADED_FAILURE = "api_video_downloaded_failure";
export const API_VIDEO_DOWNLOADED_CLEAR = "api_video_downloaded_clear";
export const API_VIDEO_DOWNLOADED_UPDATE = "api_video_downloaded_update";

//29
export const API_GET_SEARCH_PAGE_DATA_METHOD = BASE_URL + 'users/mostViewsLikedDownloaded.json';
export const API_GET_SEARCH_PAGE_DATA_SUCCESS = "api_get_search_page_data_success";
export const API_GET_SEARCH_PAGE_DATA_FAILURE = "api_get_search_page_data_failure";
export const API_GET_SEARCH_PAGE_DATA_CLEAR = "api_get_search_page_data_clear";
export const API_GET_SEARCH_PAGE_DATA_UPDATE = "api_get_search_page_data_update";

//30
export const API_FORGOT_PASSWORD_SEND_OTP_METHOD = BASE_URL + 'users/forgotPasswordOtpSend.json';
export const API_FORGOT_PASSWORD_SEND_OTP_SUCCESS = "api_forgot_password_send_otp_success";
export const API_FORGOT_PASSWORD_SEND_OTP_FAILURE = "api_forgot_password_send_otp_failure";
export const API_FORGOT_PASSWORD_SEND_OTP_CLEAR = "api_forgot_password_send_otp_clear";
export const API_FORGOT_PASSWORD_SEND_OTP_UPDATE = "api_forgot_password_send_otp_update";

//31
export const API_FORGOT_PASSWORD_METHOD = BASE_URL + 'users/forgotPassword.json';
export const API_FORGOT_PASSWORD_SUCCESS = "api_forgot_password_success";
export const API_FORGOT_PASSWORD_FAILURE = "api_forgot_password_failure";
export const API_FORGOT_PASSWORD_CLEAR = "api_forgot_password_clear";
export const API_FORGOT_PASSWORD_UPDATE = "api_forgot_password_update";

//32
export const API_GET_NOTIFICATION_METHOD = BASE_URL + 'users/getUserNotification.json';
export const API_GET_NOTIFICATION_SUCCESS = "api_get_notification_success";
export const API_GET_NOTIFICATION_FAILURE = "api_get_notification_failure";
export const API_GET_NOTIFICATION_CLEAR = "api_get_notification_clear";
export const API_GET_NOTIFICATION_UPDATE = "api_get_notification_update";

//33
export const API_GET_GALLARY_CATEGORY_METHOD = BASE_URL + 'users/getCategory.json';
export const API_GET_GALLARY_CATEGORY_SUCCESS = "api_get_gallary_categories_success";
export const API_GET_GALLARY_CATEGORY_FAILURE = "api_get_gallary_categories_failure";
export const API_GET_GALLARY_CATEGORY_CLEAR = "api_get_gallary_categories_clear";
export const API_GET_GALLARY_CATEGORY_UPDATE = "api_get_gallary_categories_update";

//34
export const API_GET_GALLARY_VIDEOS_METHOD = BASE_URL + 'users/homeGallery.json';
export const API_GET_GALLARY_VIDEOS_SUCCESS = "api_get_gallary_videos_success";
export const API_GET_GALLARY_VIDEOS_FAILURE = "api_get_gallary_videos_failure";
export const API_GET_GALLARY_VIDEOS_CLEAR = "api_get_gallary_videos_clear";
export const API_GET_GALLARY_VIDEOS_UPDATE = "api_get_gallary_videos_update";

//35
export const API_SOCIAL_LOGIN_METHOD = BASE_URL + 'users/socialLogin.json';
export const API_SOCIAL_LOGIN_SUCCESS = "api_social_login_success";
export const API_SOCIAL_LOGIN_FAILURE = "api_social_login_failure";
export const API_SOCIAL_LOGIN_CLEAR = "api_social_login_clear";
export const API_SOCIAL_LOGIN_UPDATE = "api_social_login_update";

//36
export const API_GET_MORE_HOME_VIDEOS_METHOD = BASE_URL + 'users/getAllVideos.json';
export const API_GET_MORE_HOME_VIDEOS_SUCCESS = "api_get_more_home_videos_success";
export const API_GET_MORE_HOME_VIDEOS_FAILURE = "api_get_more_home_videos_failure";
export const API_GET_MORE_HOME_VIDEOS_CLEAR = "api_get_more_home_videos_clear";
export const API_GET_MORE_HOME_VIDEOS_UPDATE = "api_get_more_home_videos_update";

//37
export const API_CONNECT_FOR_BUSINESS_PURPOSE_METHOD = BASE_URL + 'users/connectForBusinessPurpose.json';
export const API_CONNECT_FOR_BUSINESS_PURPOSE_SUCCESS = "api_connect_for_business_purpose_success";
export const API_CONNECT_FOR_BUSINESS_PURPOSE_FAILURE = "api_connect_for_business_purpose_failure";
export const API_CONNECT_FOR_BUSINESS_PURPOSE_CLEAR = "api_connect_for_business_purpose_clear";
export const API_CONNECT_FOR_BUSINESS_PURPOSE_UPDATE = "api_connect_for_business_purpose_update";

//38
export const API_EDIT_EMAIL_MOBILE_SEND_OTP_METHOD = BASE_URL + 'users/emailMobileChangeOtp.json';
export const API_EDIT_EMAIL_MOBILE_SEND_OTP_SUCCESS = "api_edit_email_mobile_send_otp_success";
export const API_EDIT_EMAIL_MOBILE_SEND_OTP_FAILURE = "api_edit_email_mobile_send_otp_failure";
export const API_EDIT_EMAIL_MOBILE_SEND_OTP_CLEAR = "api_edit_email_mobile_send_otp_clear";
export const API_EDIT_EMAIL_MOBILE_SEND_OTP_UPDATE = "api_edit_email_mobile_send_otp_update";

//39
export const API_EDIT_EMAIL_MOBILE_VERIFY_OTP_METHOD = BASE_URL + 'users/emailMobileChangeOtpVerify.json';
export const API_EDIT_EMAIL_MOBILE_VERIFY_OTP_SUCCESS = "api_edit_email_mobile_verify_otp_success";
export const API_EDIT_EMAIL_MOBILE_VERIFY_OTP_FAILURE = "api_edit_email_mobile_verify_otp_failure";
export const API_EDIT_EMAIL_MOBILE_VERIFY_OTP_CLEAR = "api_edit_email_mobile_verify_otp_clear";
export const API_EDIT_EMAIL_MOBILE_VERIFY_OTP_UPDATE = "api_edit_email_mobile_verify_otp_update";