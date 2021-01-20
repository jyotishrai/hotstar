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
import { loginAction, forgotPasswordSendOtpAction, clearForgotPasswordSendOtpAction } from '../../actions/action';
import CustomLoader from '../common/CustomLoader';
import flashMessage from '../common/CustomFlashAlert';
import { getDeviceId } from 'react-native-device-info';
import firebase from 'react-native-firebase';
import colors from '../../utility/Colors';
import Strings from '../../translation/language'
import RegularText from '../common/RegularText';
import { DIMENS } from '../../utility/constants';
import CommonHeader from '../common/CommonHeader';
import OtpInputs from 'react-native-otp-inputs';
import { FONT_FAMILY_HEEBO_BOLD } from '../../utility/Typography';
import { stylesForgotPassword } from '../../utility/styles'
import CommonTextInput from '../common/CommonSimpleTextInput';


const ForgotPassword = ({ navigation }) => {

    Strings.setLanguage('en');

    const dispatch = useDispatch();

    const [mobileNumber, setMobileNumber] = useState('')


    const { forgotOtp, fetching } = useSelector(state => ({
        forgotOtp: state.forgotPasswordReducer.forgotOtp,
        fetching: state.forgotPasswordReducer.fetching,
        error: state.forgotPasswordReducer.error,
    }), shallowEqual);

    useEffect(() => {

        if (forgotOtp != undefined && forgotOtp.error == false) {
            navigation.navigate(
                Utils.Constants.SCREEN_FORGOT_PASSWORD_OTP_VERIFICATION,
                {
                    data: forgotOtp.data,
                    mobile_number: mobileNumber
                }
            )
        }

        return () => {
            dispatch(clearForgotPasswordSendOtpAction({}))
        }

    }, [forgotOtp])

    const onSubmit = () => {
        // navigation.navigate(
        //     Utils.Constants.SCREEN_FORGOT_PASSWORD_OTP_VERIFICATION,
        // )
        let data = {
            phone_number: mobileNumber
        }
        dispatch(forgotPasswordSendOtpAction(data))
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar backgroundColor={colors.ACCENT_COLOR} />
            <CommonHeader
                leftIcon={Utils.ImgPath.IMG_BACK}
                leftIconPress={() => navigation.pop()}
                title={Strings.forgot_password_txt}
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


                        <RegularText
                            title={Strings.enter_your_mobile_number_below}
                            textStyle={{
                                textAlign: 'center', fontSize: 20
                            }} font={FONT_FAMILY_HEEBO_BOLD}
                            style={{ marginTop: 30 }}
                            numberOfLines={1}
                        />

                        <RegularText
                            title={Strings.to_retrive_your_account}
                            textStyle={{
                                textAlign: 'center',
                            }}
                            style={{}}
                        />



                        <View style={{
                            marginHorizontal: 20,
                            marginTop: 30
                        }}>
                            <View style={[stylesForgotPassword.txtInputBg, { flexDirection: 'row' }]}>
                                <CommonTextInput
                                    title={Strings.mobile_number}
                                    keyboardType={Utils.Constants.KB_TYPE_NUMBER}
                                    style={{ marginTop: 0, flex: 1 }}
                                    value={mobileNumber}
                                    onChangeText={(txt) => { setMobileNumber(txt) }}
                                    onSubmitEditing={() => { }}
                                    returnKeyType={Utils.Constants.KB_RETURN_TYPE_DONE}
                                />
                            </View>
                        </View>

                        <View style={{ marginHorizontal: 40, marginTop: -15 }}>
                            <CommonButton
                                style={stylesForgotPassword.button}
                                title={Strings.submit}
                                onPress={onSubmit}
                                font={Utils.Typography.FONT_FAMILY_BOLD}
                            />
                        </View>

                    </ScrollView>

                </KeyboardAvoidingView>
            </View>
            {
                fetching &&
                <CustomLoader />
            }
        </View>
    )
}



export default ForgotPassword;