import { createStackNavigator } from 'react-navigation-stack';
import Login from '../components/screens/Login';
import * as Utils from '../utility';
import Registration from '../components/screens/Registration';
import OtpVerification from '../components/screens/OtpVerification';
import ForgotPassword from '../components/screens/ForgotPassword';
import ForgotPasswordOtpVerification from '../components/screens/ForgotPasswordOtpVerification';
import ChangePassword from '../components/screens/ChangePassword';
import TermsAndConditionScreen from '../components/screens/OtherScreens/TermsAndCondition'
import { SCREEN_CHANGE_PASSWORD, SCREEN_TERMS_AND_CONDITION } from '../utility/constants';

const RouteConfig = {
    [Utils.Constants.KEY_LOGIN]: Login,
    [Utils.Constants.KEY_REGISTRATION]: Registration,
    [Utils.Constants.SCREEN_OTP_VERIFICATION]: OtpVerification,
    [Utils.Constants.SCREEN_FORGOT_PASSWORD]: ForgotPassword,
    [Utils.Constants.SCREEN_FORGOT_PASSWORD_OTP_VERIFICATION]: ForgotPasswordOtpVerification,
    [SCREEN_CHANGE_PASSWORD]: ChangePassword,
    [SCREEN_TERMS_AND_CONDITION]: TermsAndConditionScreen
};
const AuthNavigatorConfig = {
    initialRouteName: Utils.Constants.KEY_LOGIN,
    header: null,
    headerMode: 'none'
};

const AuthNavigator = createStackNavigator(RouteConfig, AuthNavigatorConfig)

export default AuthNavigator;
