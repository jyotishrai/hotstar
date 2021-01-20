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
import {
    verifyOtpAction,
    resendOtpAction,
    clearVerifyOtpAction,
    clearResendOtpAction
} from '../../actions/action';
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
import { stylesForgotPassword } from '../../utility/styles';
import OtpVerificationModal from '../modals/OtpVerificationModal';


const ForgotPasswordOtpVerification = ({ navigation }) => {

    Strings.setLanguage('en');

    const { forgotPasswordRes, fetching } = useSelector(state => ({
        forgotPasswordRes: state.forgotPasswordReducer.forgotPasswordRes,
        fetching: state.forgotPasswordReducer.fetching,
        error: state.forgotPasswordReducer.error,
    }), shallowEqual);

    const dispatch = useDispatch();
    let mobileRef = useRef(null);

    const [mobileNumber, setMobileNumber] = useState('')
    const [data, setData] = useState(undefined)
    const [OTP, setOTP] = useState('')

    useEffect(() => {

        let otpData = navigation.state.params.data
        setData(otpData)
        let mobileNumber = navigation.state.params.mobile_number
        setMobileNumber(mobileNumber)

    }, [])

    const validateOtp = () => {
        if (OTP == '' || OTP.length < 4) {
            flashMessage(Strings.enter_valid_otp, 'danger')
        }
        else {
            if (OTP != data.otp) {
                flashMessage(Strings.invaid_OTP, 'danger')
            } else {
                onOtpVerificationDone()
            }
        }
    }

    function onOtpVerificationDone() {
        navigation.navigate(Utils.Constants.SCREEN_CHANGE_PASSWORD, { data: data })
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.FADE_GREY }}>
            <StatusBar backgroundColor={colors.ACCENT_COLOR} />
            <CommonHeader
                leftIcon={Utils.ImgPath.IMG_BACK}
                leftIconPress={() => navigation.pop()}
                title={Strings.otp_varification}
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

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, marginVertical: 10 }} >

                            <RegularText
                                title={'+91 ' + mobileNumber}
                                textStyle={{
                                    textAlign: 'left',
                                }} />
                            {/* <TouchableOpacity
                                activeOpacity={.5}
                                onPress={() => resendOtp()}
                            >
                                <RegularText
                                    title={Strings.resend_otp}
                                    textStyle={{
                                        textAlign: 'left', color: colors.headerColor1
                                    }} />
                            </TouchableOpacity> */}

                        </View>

                        <View style={{ backgroundColor: colors.green100, marginHorizontal: 20, height: 30, justifyContent: 'center' }}>
                            <RegularText
                                title={Strings.please_enter_otp_sent_to_yout_mobile_no}
                                textStyle={{
                                    textAlign: 'center', color: colors.green700
                                }}
                                style={{ marginVertical: 15 }}
                            />
                        </View>
                        <RegularText
                            title={'00:05 sec left'}
                            textStyle={{
                                textAlign: 'center', color: colors.grey700
                            }}
                            style={{ marginTop: 25 }}
                        />

                        <RegularText
                            title={'Enter Otp : ' + (data != undefined ? data.otp : '')}
                            textStyle={{
                                textAlign: 'center', color: colors.grey700
                            }}
                            style={{ marginTop: 10 }}
                        />

                        <RegularText
                            title={Strings.enter_otp_below}
                            textStyle={{
                                textAlign: 'center',
                                fontSize: 18
                            }} font={FONT_FAMILY_HEEBO_BOLD}
                            style={{ marginTop: 25 }}
                        />

                        <View style={{
                            marginHorizontal: 40,
                            marginTop: 25
                        }}>
                            <OtpInputs
                                handleChange={otp => {
                                    setOTP(otp)
                                    if (otp.length >= 5) {
                                    }
                                }}
                                clearTextOnFocus //={this.state.focus}
                                selectTextOnFocus={false}
                                inputStyles={{
                                    textAlign: 'center',
                                    width: 55,
                                    height: DIMENS.btnH,
                                    borderRadius: 5,
                                    shadowColor: 'black',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 1.5,
                                    borderBottomWidth: 1
                                }}
                            />
                        </View>

                        <View style={{ marginHorizontal: 40 }}>
                            <CommonButton
                                style={stylesForgotPassword.button}
                                title={Strings.submit}
                                onPress={validateOtp}
                                font={Utils.Typography.FONT_FAMILY_BOLD}
                            />
                        </View>

                    </ScrollView>

                </KeyboardAvoidingView>
            </View>
            {fetching != undefined && fetching && <CustomLoader loading={fetching} />}
        </View>
    )
}



export default ForgotPasswordOtpVerification;