import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput, Keyboard } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMAGE_VERIFIED } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck, isTextInputNotEmptyValidator, emailValidator, mobileNumberValidator } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { hireMeAction, clearHireMeAction } from '../../../actions/action'
import RegularText from '../../common/RegularText';
import colors from '../../../utility/Colors';
import CommonHeaderTitleWithButton from '../../common/CommonHeaderTitleWithButton';
import Strings from '../../../translation/language';
import { Chip } from 'react-native-paper';
import CommonButton from '../../common/CommonButton';
import CommonTextInput from '../../common/CommonSimpleTextInput';
import CustomAlertModal from '../../modals/customAlertModal'
import CustomLoader from '../../common/CustomLoader'
import flashMessage from '../../common/CustomFlashAlert';

const { width, height } = Dimensions.get('window')

const HireMeScreen = ({ navigation }) => {

    let nameRef = useRef(null);
    let mobileRef = useRef(null);
    let emailRef = useRef(null);
    let addressRef = useRef(null);
    let companyRef = useRef(null);
    let commentRef = useRef(null);

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

    const [userId, setUserId] = useState(undefined)

    const [name, setName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [company, setCompany] = useState('')
    const [comment, setComment] = useState('')

    const dispatch = useDispatch();

    const { hireMeRes, fetching, error } = useSelector(state => ({
        hireMeRes: state.hireMeReducer.hireMeRes,
        fetching: state.hireMeReducer.fetching,
        error: state.hireMeReducer.error
    }), shallowEqual);

    useEffect(() => {

        if (navigation.state.params.userId != undefined) {
            let userId = navigation.state.params.userId
            setUserId(userId)
        }

        if (hireMeRes != undefined && hireMeRes.error == false) {
            setIsSuccessModalVisible(true)
        }

        return () => {
            dispatch(clearHireMeAction())
        }

    }, [hireMeRes])

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
        else if (isTextInputNotEmptyValidator(mobileNumber)) {
            flashMessage(Strings.please_enter_mobile_number, 'danger')
        }
        else if (mobileNumberValidator(mobileNumber) == false) {
            flashMessage(Strings.mobile_number_must_be_of_10_digits, 'danger')
        }
        else if (isTextInputNotEmptyValidator(address)) {
            flashMessage(Strings.please_enter_address, 'danger')
        }
        else if (isTextInputNotEmptyValidator(company)) {
            flashMessage(Strings.please_enter_address, 'danger')
        }
        else if (isTextInputNotEmptyValidator(comment)) {
            flashMessage(Strings.please_enter_address, 'danger')
        }
        else {
            submitDetails()
        }
    }

    function submitDetails() {
        let detail = {
            user_id: userId,
            name: name,
            mobile_number: mobileNumber,
            email: email,
            address: address,
            company_name: company,
            comment: comment,
        }
        dispatch(hireMeAction(detail))
    }

    function onCloseSuccessModal() {
        setIsSuccessModalVisible(false)
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ height: 55 }}>
                <CommonHeaderTitleWithButton title={Strings.hire_me}></CommonHeaderTitleWithButton>
            </View>
            <ScrollView>
                <View style={{
                    marginHorizontal: 10,
                }}>
                    <CommonTextInput
                        title={Strings.name}
                        keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                        //style={{ marginTop: 0, flex: 1 }}
                        value={name}
                        onChangeText={(txt) => { setName(txt) }}
                        onSubmitEditing={() => { mobileRef.focus() }}
                        returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                        refValue={ref => nameRef = ref}
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
                        value={mobileNumber}
                        onChangeText={(txt) => { setMobileNumber(txt) }}
                        onSubmitEditing={() => { emailRef.focus() }}
                        returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                        refValue={ref => mobileRef = ref}
                        keyboardType={'number-pad'}
                    />
                </View>
                <View style={{
                    marginHorizontal: 10,

                }}>
                    <CommonTextInput
                        title={Strings.email}
                        keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                        //style={{ marginTop: 0, flex: 1 }}
                        value={email}
                        onChangeText={(txt) => { setEmail(txt) }}
                        onSubmitEditing={() => { addressRef.focus() }}
                        returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                        refValue={ref => emailRef = ref}
                        keyboardType={'email-address'}
                    />
                </View>
                <View style={{
                    marginHorizontal: 10,

                }}>
                    <CommonTextInput
                        title={Strings.address}
                        keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                        //style={{ marginTop: 0, flex: 1 }}
                        value={address}
                        onChangeText={(txt) => { setAddress(txt) }}
                        onSubmitEditing={() => { companyRef.focus() }}
                        returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                        refValue={ref => addressRef = ref}
                    />
                </View>
                <View style={{
                    marginHorizontal: 10,

                }}>
                    <CommonTextInput
                        title={Strings.company_name}
                        keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                        //style={{ marginTop: 0, flex: 1 }}
                        value={company}
                        onChangeText={(txt) => { setCompany(txt) }}
                        onSubmitEditing={() => { commentRef.focus() }}
                        returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                        refValue={ref => companyRef = ref}
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
                        ref={ref => commentRef = ref}
                        value={comment}
                        onChangeText={(txt) => { setComment(txt) }}
                        //onSubmitEditing={() => { Keyboard }}
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
            {
                fetching &&
                <CustomLoader />
            }
            <CustomAlertModal
                visible={isSuccessModalVisible}
                onYes={onCloseSuccessModal}
                onClose={onCloseSuccessModal}
                message={Strings.congratulations_you_have_hired_successfully}
                //  image={IMAGE_VERIFIED}
                btnFirstText={Strings.ok}
            />
        </View>
    );
}

export default HireMeScreen;