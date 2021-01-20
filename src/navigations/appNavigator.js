import { createStackNavigator } from 'react-navigation-stack';
import * as Utils from '../utility';
import BottomNavigator from './BottomNavigator';
import TermsAndCondition from '../components/screens/OtherScreens/TermsAndCondition';
import PrivacyPolicy from '../components/screens/OtherScreens/PrivacyPolicy';
import ContactUsForBranding from '../components/screens/OtherScreens/ContactUsForBranding';
import AboutUs from '../components/screens/OtherScreens/AboutUs';
import ReportAProblem from '../components/screens/OtherScreens/ReportAProblem';
import SelectVideoScreen from '../components/screens/AddVideoScreens/SelectVideoScreen'
import { SCREEN_SELECT_VIDEO, SCREEN_ADD_TAGS, SCREEN_EDIT_PROFILE, SCREEN_SHOW_VIDEO, SCREEN_REPORT_VIDEO, SCREEN_VIDEO_USER_PROFILE, SCREEN_HIRE_ME, SCREEN_MY_VIDEOS, SCREEN_LIKED_VIDEOS, SCREEN_COMMENTED_VIDEOS, SCREEN_REPORTED_VIDEOS, SCREEN_SETTING, SCREEN_CHANGE_PASSWORD, SCREEN_SHARED_VIDEOS, SEARCH_RESULT_SCREEN, SCREEN_VIDEO_USER_ABOUT, SCREEN_VIEW_ALL, SCREEN_NOTIFICATIONS, SCREEN_GALLARY, SCREEN_CONNECT_FOR_BUSINESS_PURPOSE, SCREEN_EDIT_EMAIL_SEND_MOBILE_OTP, SCREEN_EDIT_EMAIL_VERIFY_MOBILE_OTP, SCREEN_HOME } from '../utility/constants';
import AddTagsScreen from '../components/screens/AddVideoScreens/AddTagsScreen';
import EditProfileScreen from '../components/screens/ProfileTabScreens/EditProfile';
import ShowVideoScreen from '../components/screens/ShowVideo/ShowVideoScreen';
import ReportVideoScreen from '../components/screens/ShowVideo/ReportVideoScreen';
import VideoUserProfileScreen from '../components/screens/ShowVideo/VideoUserProfileScreen';
import HireMeScreen from '../components/screens/ShowVideo/HireMeScreen';
import MyVideos from '../components/screens/ProfileTabScreens/MyVideos';
import LikedVideos from '../components/screens/ProfileTabScreens/LikedVideos';
import CommentedVideos from '../components/screens/ProfileTabScreens/CommentedVideos';
import ReportedVideos from '../components/screens/ProfileTabScreens/ReportedVideos';
import SettingScreen from '../components/screens/ProfileTabScreens/SettingScreen';
import SharedVideos from '../components/screens/ProfileTabScreens/SharedVideos'
import SearchResultScreen from '../components/screens/HomeTabs/Search/SearchResultScreen';
import VideoUserAboutScreen from '../components/screens/ShowVideo/VideoUserAboutScreen';
import ViewAllScreen from '../components/screens/HomeTabs/Search/ViewAllScreen';
import NotificationScreen from '../components/screens/ProfileTabScreens/NotificationScreen';
import GallaryScreen from '../components/screens/ProfileTabScreens/GallaryScreen';
import ConnectForBusinessPurpose from '../components/screens/ProfileTabScreens/ConnectForBusinessPurpose';
import EditEmailMobileSendOtpScreen from '../components/screens/ProfileTabScreens/EditEmailMobileSendOtpScreen';
import EditEmailMobileVerifyOtpScreen from '../components/screens/ProfileTabScreens/EditEmailMobileVerifyOtpScreen';
import Home from '../components/screens/HomeTabs/Home/Home';

const RouteConfig = {
  [Utils.Constants.KEY_DRAWER]: BottomNavigator,
  [Utils.Constants.SCREEN_TERMS_AND_CONDITION]: TermsAndCondition,
  [Utils.Constants.SCREEN_PRIVACY_POLICY]: PrivacyPolicy,
  [Utils.Constants.SCREEN_CONTACT_US_FOR_BRANDING]: ContactUsForBranding,
  [Utils.Constants.SCREEN_ABOUT_US]: AboutUs,
  [Utils.Constants.SCREEN_REPORT_A_PROBLEM]: ReportAProblem,
  [SCREEN_HOME] : Home,
  [SCREEN_SELECT_VIDEO]: SelectVideoScreen,
  [SCREEN_ADD_TAGS]: AddTagsScreen,
  [SCREEN_EDIT_PROFILE]: EditProfileScreen,
  [SCREEN_SHOW_VIDEO]: ShowVideoScreen,
  [SCREEN_REPORT_VIDEO]: ReportVideoScreen,
  [SCREEN_VIDEO_USER_PROFILE]: VideoUserProfileScreen,
  [SCREEN_HIRE_ME]: HireMeScreen,
  [SCREEN_MY_VIDEOS]: MyVideos,
  [SCREEN_LIKED_VIDEOS]: LikedVideos,
  [SCREEN_COMMENTED_VIDEOS]: CommentedVideos,
  [SCREEN_REPORTED_VIDEOS]: ReportedVideos,
  [SCREEN_SETTING]: SettingScreen,
  [SCREEN_SHARED_VIDEOS]: SharedVideos,
  [SEARCH_RESULT_SCREEN]: SearchResultScreen,
  [SCREEN_VIDEO_USER_ABOUT]: VideoUserAboutScreen,
  [SCREEN_VIEW_ALL]: ViewAllScreen,
  [SCREEN_NOTIFICATIONS]: NotificationScreen,
  [SCREEN_GALLARY]: GallaryScreen,
  [SCREEN_CONNECT_FOR_BUSINESS_PURPOSE]: ConnectForBusinessPurpose,
  [SCREEN_EDIT_EMAIL_SEND_MOBILE_OTP]: EditEmailMobileSendOtpScreen,
  [SCREEN_EDIT_EMAIL_VERIFY_MOBILE_OTP]: EditEmailMobileVerifyOtpScreen,
};

const APPNavigatorConfig = {
  initialRouteName: Utils.Constants.KEY_DRAWER,
  header: null,
  headerMode: 'none'
};

const APPNavigator = createStackNavigator(RouteConfig, APPNavigatorConfig)

export default APPNavigator;
