import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Dimensions,
    StatusBar
} from 'react-native';
import * as Utils from '../../utility';
import CommonButton from '../common/CommonButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loginAction, forgotPasswordAction, clearForgotPasswordAction } from '../../actions/action';
import CustomLoader from '../common/CustomLoader';
import flashMessage from '../common/CustomFlashAlert';
import { getDeviceId } from 'react-native-device-info';
import firebase from 'react-native-firebase';
import colors from '../../utility/Colors';
import Strings from '../../translation/language'
import RegularText from '../common/RegularText';
import { DIMENS, KEY_LOGIN } from '../../utility/constants';
import CommonHeader from '../common/CommonHeader';
import OtpInputs from 'react-native-otp-inputs';
import { FONT_FAMILY_HEEBO_BOLD } from '../../utility/Typography';
import { stylesForgotPassword } from '../../utility/styles'
import CommonTextInput from '../common/CommonTextInput';


const ChangePassword = ({ navigation }) => {

    Strings.setLanguage('en');
    const dispatch = useDispatch();

    const [data, setData] = useState(undefined)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { forgotPasswordRes, fetching } = useSelector(state => ({
        forgotPasswordRes: state.forgotPasswordReducer.forgotPasswordRes,
        fetching: state.forgotPasswordReducer.fetching,
        error: state.forgotPasswordReducer.error,
    }), shallowEqual);


    useEffect(() => {
        let data = navigation.state.params.data;
        setData(data)
        if (forgotPasswordRes != undefined) {
            flashMessage(forgotPasswordRes.message, 'success')
            navigation.navigate(KEY_LOGIN)
        }

        return () => {
            dispatch(clearForgotPasswordAction({}))
        }
    }, [forgotPasswordRes])

    function validate() {
        if (password == '') {
            flashMessage(Strings.please_enter_password, 'danger')
        }
        else if (confirmPassword == '') {
            flashMessage(Strings.please_re_enter_password, 'danger')
        }
        else if (password != confirmPassword) {
            flashMessage(Strings.password_not_matched, 'danger')
        }
        else {
            onChangePassword()
        }
    }

    function onChangePassword() {
        let info = {
            user_id: data.user_id,
            otp: data.otp,
            password: password,
        }
        dispatch(forgotPasswordAction(info))
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.FADE_GREY }}>
            <CommonHeader
                leftIcon={Utils.ImgPath.IMG_BACK}
                leftIconPress={() => navigation.pop()}
                title={Strings.change_paddword}
                fontSize={18}
                fontFamily={Utils.Typography.FONT_FAMILY_REGULAR}
                backgroundColor={colors.transparent}
                textColor={colors.white}
                tintColor={colors.white}
                font={Utils.Typography.FONT_FAMILY_HEEBO_REGULAR}
            />
            <View style={stylesForgotPassword.bottomV}>
                <KeyboardAvoidingView style={{ flex: 1, height: '100%' }} enabled>
                    <ScrollView>

                        <View style={{
                            marginHorizontal: 20,
                            marginTop: 30
                        }}>

                            <View style={[stylesForgotPassword.txtInputBg, { flexDirection: 'row' }]}>
                                <CommonTextInput
                                    title={Strings.password}
                                    keyboardType={Utils.Constants.KB_TYPE_EMAIL}
                                    style={{ marginTop: 0, flex: 1 }}
                                    //value={email}
                                    onChangeText={(txt) => { setPassword(txt) }}
                                    onSubmitEditing={() => { }}
                                    returnKeyType={Utils.Constants.KB_RETURN_TYPE_DONE}
                                />
                            </View>

                            <View style={[stylesForgotPassword.txtInputBg, { flexDirection: 'row' }]}>
                                <CommonTextInput
                                    title={Strings.confirm_password}
                                    keyboardType={Utils.Constants.KB_TYPE_EMAIL}
                                    style={{ marginTop: 0, flex: 1 }}
                                    //value={email}
                                    onChangeText={(txt) => { setConfirmPassword(txt) }}
                                    onSubmitEditing={() => { }}
                                    returnKeyType={Utils.Constants.KB_RETURN_TYPE_DONE}
                                />
                            </View>

                        </View>

                        <View style={{ marginHorizontal: 40 }}>
                            <CommonButton
                                style={stylesForgotPassword.button}
                                title={Strings.done}
                                onPress={validate}
                                font={Utils.Typography.FONT_FAMILY_BOLD}
                            />
                        </View>

                    </ScrollView>

                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

export default ChangePassword;