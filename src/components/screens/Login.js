import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Dimensions,
    CheckBox,
    Keyboard,
    StatusBar, ImageBackground
} from 'react-native';
import * as Utils from '../../utility';
import CommonTextInput from '../common/CommonTextInput';
import CommonText from '../common/CommonText';
import CommonButton from '../common/CommonButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loginAction, socialLoginAction, clearSocialLoginAction } from '../../actions/action';
import CustomLoader from '../common/CustomLoader';
import flashMessage from '../common/CustomFlashAlert';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';
import colors from '../../utility/Colors';
import Strings from '../../translation/language'
import RegularText from '../common/RegularText';
import { DIMENS, KEY_HOME_TAB, KEY_REGISTRATION, SCREEN_FORGOT_PASSWORD, SCREEN_OTP_VERIFICATION, DEVICE_ID, DEVICE_TOKEN, USER_TOKEN, SCREEN_TERMS_AND_CONDITION } from '../../utility/constants';
import { IMG_EYE, IMAGE_FB, IMAGE_FB_1, IMAGE_G_1 } from '../../utility/imageRes';
import { stylesLogin } from '../../utility/styles';
import { FONT_FAMILY_HEEBO_REGULAR } from '../../utility/Typography';
import { emailValidator, passwordValidator, isTextInputNotEmptyValidator } from '../../utility/Utils';
import { setUserData, storeItem, USER_DATA } from '../../utility/CustomAsyncStorage'
import FirebaseClient from '../../FirebaseClient/FirebaseClient'
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';

const { height } = Dimensions.get('window')
const circle_w = 70;

const Login = ({ navigation }) => {

    Strings.setLanguage('en');
    const dispatch = useDispatch();

    const { loginRes, socialLoginRes, fetching } = useSelector(state => ({
        loginRes: state.loginReducer.data,
        socialLoginRes: state.loginReducer.socialLoginRes,
        fetching: state.loginReducer.fetching,
        error: state.loginReducer.error,
    }), shallowEqual);

    let emailRef = useRef(null);
    let passwordRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    async function checkPermission() {
        const enabled = await FirebaseClient.messaging().hasPermission();
        if (enabled) {
            getToken();
        } else {
            requestPermission();
        }
    }

    async function getToken() {
        try {
            var token = await FirebaseClient.messaging().getToken();
            setToken(token)
        } catch (error) {
            alert(error)
        }
        console.log('Device Token: ', token);
    }

    async function requestPermission() {
        try {
            await FirebaseClient.messaging().requestPermission();
            getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }

    function validation() {
        if (isTextInputNotEmptyValidator(email)) {
            flashMessage(Strings.please_enter_email, "danger")
        }
        else if (emailValidator(email)) {
            if (passwordValidator(password)) {
                loginClick()
            }
        }
        else {
            flashMessage(Strings.invalid_email, "danger")
        }
    }

    const loginClick = () => {

        dispatch(loginAction({
            username: email,
            password: password
        }))

        //navigation.navigate(SCREEN_OTP_VERIFICATION)
    }
    //alert(JSON.stringify(loginRes))
    useEffect(() => {

        checkPermission();

        GoogleSignin.configure({ webClientId: '762802647346-u7kd5hn8o8ctile8ji2vcqc846358ov9.apps.googleusercontent.com', offlineAccess: true, });


        //if (loginRes === undefined) { return }

        if (loginRes != undefined) {
            if (loginRes.error) {
                flashMessage(loginRes.message, "danger")
                return;
            } else {
                saveUserInfo(loginRes)
            }
        } else if (socialLoginRes != undefined) {
            if (socialLoginRes.error) {
                flashMessage(socialLoginRes.message, "danger")
                dispatch(clearSocialLoginAction())
                GoogleSignin.revokeAccess();
                GoogleSignin.signOut();
                return;
            } else {
                saveUserInfo(socialLoginRes)
            }
        }

    }, [loginRes, socialLoginRes])

    function saveUserInfo(userData) {

        let deviceToken = token;
        let userToken = userData.data.user_token;
        let deviceId = DeviceInfo.getUniqueId();

        let userInfo = userData.data;

        storeItem(DEVICE_TOKEN, deviceToken)
        storeItem(DEVICE_ID, deviceId)
        storeItem(USER_TOKEN, userToken)
        setUserData(userInfo)

        global[DEVICE_TOKEN] = deviceToken;
        global[USER_TOKEN] = userToken;
        global[DEVICE_ID] = deviceId;
        global[USER_DATA] = userInfo;
        //alert(JSON.stringify(userInfo))
        moveToHome(userData)
    }

    function moveToHome(userData) {
        flashMessage(userData.message, "success")
        navigation.navigate(Utils.Constants.KEY_HOME_TAB);
    }

    function onPressSignUp() {
        navigation.navigate(KEY_REGISTRATION)
    }

    function onPressForgotPassword() {
        navigation.navigate(SCREEN_FORGOT_PASSWORD)
    }

    function onPressTermsAndCondition() {
        navigation.navigate(SCREEN_TERMS_AND_CONDITION)
    }

    function onPressFbLogin() {

        LoginManager.logInWithPermissions(["email", "public_profile", "user_friends"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + data.accessToken)
                                .then((response) => response.json())
                                .then((json) => {
                                    socialLogin(json.email, json.name, json.id, 'F')
                                })
                                .catch(() => {
                                    reject('ERROR GETTING DATA FROM FACEBOOK')
                                })
                        }
                    )
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );

    }

    async function googleSignin() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            socialLogin(userInfo.user.email, userInfo.user.name, userInfo.user.id, 'G')
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    async function socialLogin(email, full_name, social_id, social_type) {
        let data = {
            email: email,
            full_name: full_name,
            social_id: social_id,
            social_type: social_type
        }
        dispatch(socialLoginAction(data))
    }

    return (

        <ImageBackground style={{ flex: 1, backgroundColor: colors.FADE_GREY }} source={Utils.ImgPath.IMG_BG}
        >
            <StatusBar backgroundColor={colors.FADE_GREY} />

            <View style={stylesLogin.bottomV}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, }} showsVerticalScrollIndicator={false} >
                    <KeyboardAvoidingView style={{ flex: 1, height: '100%' }} enabled>

                        <View style={{ flex: 1 }}>
                            <Image source={Utils.ImgPath.IMG_LOGO} resizeMode={'contain'} style={{ alignSelf: 'center', marginTop: 20 }}></Image>

                            <View style={[stylesLogin.txtInputBg, { marginTop: 30, }]}>

                                <CommonTextInput
                                    title={Strings.email_address}
                                    keyboardType={Utils.Constants.KB_TYPE_EMAIL}
                                    maxLength={30}
                                    style={{ marginTop: 0, flex: 1 }}
                                    refValue={ref => emailRef = ref}
                                    value={email}
                                    onChangeText={(txt) => { setEmail(txt) }}
                                    onSubmitEditing={() => { passwordRef.focus() }}
                                    returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                                    icon={IMG_EYE}
                                />
                            </View>

                            <View style={[stylesLogin.txtInputBg, { marginTop: 5, }]}>
                                <CommonTextInput
                                    title={Strings.password}
                                    keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                                    style={{ marginTop: 0 }}
                                    refValue={ref => passwordRef = ref}
                                    value={password}
                                    isTxtShow={true}
                                    isShown={true}
                                    onChangeText={(txt) => { setPassword(txt) }}
                                    onSubmitEditing={() => { }}
                                    returnKeyType={Utils.Constants.KB_RETURN_TYPE_DONE}
                                />
                            </View>

                            <View style={{ marginHorizontal: 20 }}>
                                <CommonButton
                                    style={stylesLogin.button}
                                    title={Strings.login.toUpperCase()}
                                    onPress={() => validation()}
                                    showIcon={true}
                                    font={Utils.Typography.FONT_FAMILY_BOLD}
                                />
                            </View>

                            <View style={[stylesLogin.txtInputBg, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <TouchableOpacity activeOpacity={.7}
                                    onPress={() => onPressForgotPassword()}>
                                    <RegularText
                                        style={{ marginHorizontal: 10 }}
                                        textStyle={{ color: colors.ACCENT_COLOR }}
                                        title={Strings.forgot_password}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={.7}
                                    onPress={() => onPressSignUp()}>
                                    <Text style={{ fontFamily: FONT_FAMILY_HEEBO_REGULAR }}>{Strings.new_user + "? "}
                                        <Text style={{ color: colors.ACCENT_COLOR, fontFamily: FONT_FAMILY_HEEBO_REGULAR }}>
                                            {Strings.sign_up}</Text> </Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end', backgroundColor: colors.APP_GRAY_TRANS, marginTop: 50
                        }}>
                            <View style={{
                                backgroundColor: colors.white, width: 30, height: 30, borderRadius: 15, borderWidth: 1,
                                borderColor: colors.APP_GRAY, alignSelf: 'center', justifyContent: 'center', marginTop: -15
                            }}>
                                <RegularText
                                    style={{ color: colors.textColor, alignItems: 'center', }}
                                    title={Strings.or} />
                            </View>
                            <View style={{

                                width: '100%',
                                height: 130,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                bottom: 0,
                                //position: 'absolute',
                                zIndex: 0
                            }}>
                                <RegularText
                                    style={{ marginHorizontal: 10 }}
                                    textStyle={{ fontSize: 12 }}
                                    title={Strings.login_mean_you_agree}
                                />
                                <TouchableOpacity activeOpacity={.6} onPress={() => onPressTermsAndCondition()}>
                                    <RegularText
                                        style={{
                                            marginHorizontal: 10, marginTop: 6, borderBottomWidth: 1,
                                            borderBottomColor: colors.grey500
                                        }}
                                        textStyle={{ fontSize: 12 }}
                                        title={Strings.terms_and_condition}
                                    />
                                </TouchableOpacity>

                                <View style={{
                                    flexDirection: 'row', marginTop: 10, marginHorizontal: 20,
                                    justifyContent: 'space-between',
                                }}>

                                    <TouchableOpacity
                                    // onPress={() => onPressFbLogin()}
                                    >
                                        <Image source={IMAGE_FB_1} style={{ marginRight: 10, marginLeft: 0 }}></Image>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => googleSignin()} >
                                        <Image source={IMAGE_G_1} style={{ marginRight: 0, marginLeft: 10 }}></Image>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
            {
                fetching != undefined && fetching &&
                <View style={{ position: 'absolute' }}>
                    <CustomLoader loading={fetching} />
                </View>
            }

        </ImageBackground>
    )
}

export default Login;