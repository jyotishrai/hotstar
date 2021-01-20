import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMAGE_VERIFIED } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck, isTextInputNotEmptyValidator, emailValidator, mobileNumberValidator } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { reportVideoAction, clearReportVideoAction, connectForBusinessPurposeAction, clearConnectForBusinessPurposeAction, editEmailMobileVerifyOtpAction, clearEditEmailMobileSendOtpAction, clearEditEmailMobileVerifyOtpAction } from '../../../actions/action'
import RegularText from '../../common/RegularText';
import colors from '../../../utility/Colors';
import CommonHeaderTitleWithButton from '../../common/CommonHeaderTitleWithButton';
import Strings from '../../../translation/language';
import { Chip } from 'react-native-paper';
import CommonButton from '../../common/CommonButton';
import CustomAlertModal from '../../modals/customAlertModal';
import CustomLoader from '../../common/CustomLoader'
import CommonTextInput from '../../common/CommonSimpleTextInput';
import flashMessage from '../../common/CustomFlashAlert';
import OtpInputs from 'react-native-otp-inputs';
import { stylesForgotPassword } from '../../../utility/styles';
import { FONT_FAMILY_BOLD } from '../../../utility/Typography';
import { DIMENS, KEY_PROFILE_TAB, KEY_USER_DATA } from '../../../utility/constants';
import { storeItem } from '../../../utility/CustomAsyncStorage';

const { width, height } = Dimensions.get('window')

const EditEmailMobileOtpVerifyScreen = ({ navigation }) => {

    Strings.setLanguage('en');

    const { editEmailMobileVerifyOtpRes, fetching } = useSelector(state => ({
        editEmailMobileVerifyOtpRes: state.editProfileReducer.editEmailMobileVerifyOtpRes,
        fetching: state.editProfileReducer.editemailfetching,
        error: state.editProfileReducer.error,
    }), shallowEqual);

    const dispatch = useDispatch();
    let mobileRef = useRef(null);

    const [mobile, setMobile] = useState(undefined)
    const [otpData, setOtpData] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [OTP, setOTP] = useState('');
    const [serverOtp, setServerOtp] = useState('')
    const [currentOtp, setCurrentOtp] = useState('')
    const [isOtpVerificationModalVisible, setIsOtpVerificationModalVisible] = useState(false)

    useEffect(() => {
        let otp = navigation.state.params.otpData
        let mobile = navigation.state.params.mobile
        let email = navigation.state.params.email
        setOtpData(otp)
        setMobile(mobile)
        setEmail(email)

        dispatch(clearEditEmailMobileSendOtpAction())

        if (editEmailMobileVerifyOtpRes != undefined) {
            if (editEmailMobileVerifyOtpRes.error) {
                flashMessage(editEmailMobileVerifyOtpRes.message, 'danger')
                dispatch(clearEditEmailMobileVerifyOtpAction())
            }
            else {
                moveToProfileTab()
            }
        }

        return () => {
            // dispatch(clearResendOtpAction({}))
            // dispatch(clearVerifyOtpAction({}))
        }

    }, [editEmailMobileVerifyOtpRes])

    const validateOtp = () => {
        if (OTP == '' || OTP.length < 4) {
            flashMessage(Strings.enter_valid_otp, 'danger')
        }
        else {
            verifyOTP()
        }
    }

    const verifyOTP = () => {

        let otpData = {
            otp: OTP,
            user_id: navigation.state.params.otpData.user_id,
            email: email,
            phone_number: mobile
        }

        dispatch(editEmailMobileVerifyOtpAction(otpData))
    }

    function moveToProfileTab() {
        flashMessage(editEmailMobileVerifyOtpRes.message, 'success')

        global[KEY_USER_DATA] = editEmailMobileVerifyOtpRes.response
        storeItem(KEY_USER_DATA, editEmailMobileVerifyOtpRes.response).then(() => {
            dispatch(clearEditEmailMobileVerifyOtpAction())
            navigation.navigate(KEY_PROFILE_TAB)
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.FADE_GREY }}>
            <CommonHeaderTitleWithButton title={navigation.state.params.type == 'e' ? Strings.change_email_address : Strings.change_mobile_number}></CommonHeaderTitleWithButton>
            <View style={stylesForgotPassword.bottomV}>
                <KeyboardAvoidingView style={{ flex: 1, height: '100%' }} enabled>
                    <ScrollView>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, marginVertical: 10 }} >

                            <RegularText
                                title={mobile != undefined ? '+91 ' + mobile : ''}
                                textStyle={{
                                    textAlign: 'left',
                                    color: colors.black
                                }} />

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
                            title={otpData != undefined ? 'OTP - ' + otpData.otp : ''}
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
                            }} font={FONT_FAMILY_BOLD}
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
            {fetching != undefined && fetching && <CustomLoader />}
        </View>
    )
}



export default EditEmailMobileOtpVerifyScreen;