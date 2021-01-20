import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMAGE_VERIFIED } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck, isTextInputNotEmptyValidator, emailValidator, mobileNumberValidator } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { reportVideoAction, clearReportVideoAction, connectForBusinessPurposeAction, clearConnectForBusinessPurposeAction } from '../../../actions/action'
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

const { width, height } = Dimensions.get('window')

const reportOptions = [
    "Bad video quality", "Wrong content", "Abusive language", "Political content", "Terrorist content", "Personal Content"
]

const ConnectForBusinessPurpose = ({ navigation }) => {

    let nameRef = useRef(null);
    let emailRef = useRef(null);
    let mobileRef = useRef(null);
    let subjectRef = useRef(null);
    let messageRef = useRef(null);

    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

    const { connectForBusinessPurposeRes, fetching } = useSelector(state => ({
        connectForBusinessPurposeRes: state.connectForBusinessPurposeReducer.connectForBusinessPurposeRes,
        fetching: state.connectForBusinessPurposeReducer.fetching,
        error: state.connectForBusinessPurposeReducer.error,
    }), shallowEqual);

    useEffect(() => {

        if (connectForBusinessPurposeRes != undefined && connectForBusinessPurposeRes.error == false) {
            // alert(JSON.stringify(connectForBusinessPurposeRes))
            setIsSuccessModalVisible(true)
        } else if (connectForBusinessPurposeRes != undefined && connectForBusinessPurposeRes.error == true) {
            flashMessage(connectForBusinessPurposeRes.message, 'danger')
        }

    }, [connectForBusinessPurposeRes])

    function validate() {

        if (isTextInputNotEmptyValidator(name)) {
            flashMessage(Strings.please_enter_name, 'danger')
        }
        else if (isTextInputNotEmptyValidator(email)) {
            flashMessage(Strings.please_enter_email, 'danger')
        }
        else if (emailValidator(email) == false) {
            flashMessage(Strings.invalid_email, 'danger')
        }
        else if (isTextInputNotEmptyValidator(mobile)) {
            flashMessage(Strings.please_enter_mobile_number, 'danger')
        }
        else if (mobileNumberValidator(mobile) == false) {
            flashMessage(Strings.mobile_number_must_be_of_10_digits, 'danger')
        }
        else if (isTextInputNotEmptyValidator(subject)) {
            flashMessage(Strings.please_enter_subject, 'danger')
        }
        else if (isTextInputNotEmptyValidator(message)) {
            flashMessage(Strings.enter_your_message, 'danger')
        }
        else {
            submitDetails()
        }
    }

    function submitDetails() {
        let data = {
            name: name,
            contact_number: mobile,
            email: email,
            subject: subject,
            message: message

        }
        dispatch(connectForBusinessPurposeAction(data))
    }

    function closeSuccessModal() {
        setIsSuccessModalVisible(false)
        dispatch(clearConnectForBusinessPurposeAction())
        navigation.navigate(Utils.Constants.KEY_PROFILE_TAB)
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ height: 55 }}>
                <CommonHeaderTitleWithButton title={Strings.connect_for_business_purpose}></CommonHeaderTitleWithButton>
            </View>
            <ScrollView>
                <View style={{
                    marginHorizontal: 10,
                    //
                }}>
                    <CommonTextInput
                        title={Strings.name}
                        keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                        //style={{ marginTop: 0, flex: 1 }}
                        value={name}
                        onChangeText={(txt) => { setName(txt) }}
                        onSubmitEditing={() => { emailRef.focus() }}
                        returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                        refValue={ref => nameRef = ref}
                        keyboardType={'default'}
                    />
                </View>

                <View style={{
                    marginHorizontal: 10,
                    //
                }}>
                    <CommonTextInput
                        title={Strings.email_address}
                        keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                        //style={{ marginTop: 0, flex: 1 }}
                        value={email}
                        onChangeText={(txt) => { setEmail(txt) }}
                        onSubmitEditing={() => { mobileRef.focus() }}
                        returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                        refValue={ref => emailRef = ref}
                        keyboardType={'email-address'}
                    />
                </View>

                <View style={{
                    marginHorizontal: 10,
                    //
                }}>
                    <CommonTextInput
                        title={Strings.mobile_number}
                        keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                        //style={{ marginTop: 0, flex: 1 }}
                        value={mobile}
                        onChangeText={(txt) => { setMobile(txt) }}
                        onSubmitEditing={() => { subjectRef.focus() }}
                        returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                        refValue={ref => mobileRef = ref}
                        keyboardType={'number-pad'}
                    />
                </View>

                <View style={{
                    marginHorizontal: 10,
                    //
                }}>
                    <CommonTextInput
                        title={Strings.subject}
                        keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                        //style={{ marginTop: 0, flex: 1 }}
                        value={subject}
                        onChangeText={(txt) => { setSubject(txt) }}
                        onSubmitEditing={() => { messageRef.focus() }}
                        returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                        refValue={ref => subjectRef = ref}
                        keyboardType={'default'}
                    />
                </View>

                <View style={{
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: colors.grey300,
                    height: 150,
                    paddingHorizontal: 10,
                    marginHorizontal: 10,
                    marginTop: 10
                }}>
                    <TextInput
                        placeholder={Strings.enter_your_message}
                        multiline={true}
                        ref={ref => messageRef = ref}
                        value={message}
                        onChangeText={(txt) => { setMessage(txt) }}
                        returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                    />
                </View>

                <CommonButton
                    style={{
                        marginHorizontal: 10,
                        marginVertical: 20
                    }}
                    title={Strings.submit}
                    bold={'bold'}
                    onPress={validate}
                />

            </ScrollView>
            <CustomAlertModal
                visible={isSuccessModalVisible}
                image={IMAGE_VERIFIED}
                message={connectForBusinessPurposeRes != undefined && connectForBusinessPurposeRes.message}
                btnFirstText={Strings.ok}
                onYes={closeSuccessModal}
                onClose={closeSuccessModal}
            />
            {
                fetching &&
                <CustomLoader />
            }
        </View>
    );
}

export default ConnectForBusinessPurpose;