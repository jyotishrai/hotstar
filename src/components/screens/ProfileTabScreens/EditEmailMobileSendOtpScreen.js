import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMAGE_VERIFIED } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck, isTextInputNotEmptyValidator, emailValidator, mobileNumberValidator } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { reportVideoAction, clearReportVideoAction, connectForBusinessPurposeAction, clearConnectForBusinessPurposeAction, editEmailMobileSendOtpAction } from '../../../actions/action'
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
import { KEY_USER_DATA, SCREEN_EDIT_EMAIL_VERIFY_MOBILE_OTP } from '../../../utility/constants';

const { width, height } = Dimensions.get('window')

const reportOptions = [
    "Bad video quality", "Wrong content", "Abusive language", "Political content", "Terrorist content", "Personal Content"
]

const EditEmailMobileSendOtpScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

    // alert(JSON.stringify(global[KEY_USER_DATA]))

    const { editEmailMobileSendOtpRes, fetching } = useSelector(state => ({
        editEmailMobileSendOtpRes: state.editProfileReducer.editEmailMobileSendOtpRes,
        fetching: state.editProfileReducer.editemailfetching,
        error: state.editProfileReducer.error,
    }), shallowEqual);

    useEffect(() => {

        if (editEmailMobileSendOtpRes != undefined && editEmailMobileSendOtpRes.error == false) {
            // alert(JSON.stringify(editEmailMobileSendOtpRes))
            moveToOtpVerification()
        } else if (editEmailMobileSendOtpRes != undefined && editEmailMobileSendOtpRes.error == true) {
            flashMessage(editEmailMobileSendOtpRes.message, 'danger')
        }

    }, [editEmailMobileSendOtpRes])

    function validate() {

        if (navigation.state.params.type == 'e' ? isTextInputNotEmptyValidator(email) : isTextInputNotEmptyValidator(mobile)) {
            flashMessage(navigation.state.params.type == 'e' ? Strings.please_enter_email : Strings.please_enter_mobile_number, 'danger')
        }
        else if (navigation.state.params.type == 'e' ? email == global[KEY_USER_DATA].email : mobile == global[KEY_USER_DATA].phone_number) {
            flashMessage(navigation.state.params.type == 'e' ? Strings.please_enter_a_different_email_address : Strings.please_enter_a_different_mobile_number, 'danger')
        }
        else {
            navigation.state.params.type == 'e' ?
                submitEmailDetails()
                :
                submitMobileDetails()
        }
    }

    function submitEmailDetails() {
        let data = {
            type: navigation.state.params.type,
        }
        dispatch(editEmailMobileSendOtpAction(data))
    }

    function submitMobileDetails() {
        let data = {
            type: navigation.state.params.type,
            phone_number: global[KEY_USER_DATA].phone_number
        }
        dispatch(editEmailMobileSendOtpAction(data))
    }

    function moveToOtpVerification() {
        navigation.state.params.type == 'e' ?
            navigation.navigate(SCREEN_EDIT_EMAIL_VERIFY_MOBILE_OTP, { email: email, mobile: '', otpData: editEmailMobileSendOtpRes.data })
            :
            navigation.navigate(SCREEN_EDIT_EMAIL_VERIFY_MOBILE_OTP, { email: '', mobile: mobile, otpData: editEmailMobileSendOtpRes.data })
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ height: 55 }}>
                <CommonHeaderTitleWithButton title={navigation.state.params.type == 'e' ? Strings.change_email_address : Strings.change_mobile_number}></CommonHeaderTitleWithButton>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', }}>
                <View style={{
                    marginHorizontal: 10,
                }}>
                    {
                        navigation.state.params.type == 'e' ?
                            <CommonTextInput
                                title={Strings.enter_new_email}
                                keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                                value={email}
                                onChangeText={(txt) => { setEmail(txt) }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_DONE}
                                keyboardType={'email-address'}
                            />
                            :
                            <CommonTextInput
                                title={Strings.enter_new_mobile_number}
                                keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                                value={mobile}
                                onChangeText={(txt) => { setMobile(txt) }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_DONE}
                                keyboardType={'phone-pad'}
                            />
                    }

                </View>

                <CommonButton
                    style={{
                        marginHorizontal: 10,
                        marginVertical: 50
                    }}
                    title={Strings.submit}
                    bold={'bold'}
                    onPress={validate}
                />

            </ScrollView>
            {
                fetching &&
                <CustomLoader />
            }
        </View>
    );
}

export default EditEmailMobileSendOtpScreen;