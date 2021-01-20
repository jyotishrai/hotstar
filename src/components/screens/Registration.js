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
    StatusBar,
    PermissionsAndroid
} from 'react-native';
import * as Utils from '../../utility';
import CommonTextInput from '../common/CommonTextInput';
import CommonText from '../common/CommonText';
import CommonButton from '../common/CommonButton';
import CommonLocationView from '../common/CommonLocationView';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    getCountryListAction,
    getStateListAction,
    getCityListAction,
    registerAction
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
import { IMAGE_ACTIVE_CHECKBOX, IMG_ADD, IMG_CAMERA, IMG_RADIO_ACTIVE, IMG_RADIO_INACTIVE, IMG_CURRENT_LOCATION, IMG_EYE, IMG_DOWN_ARROW, IMG_CHECKBOX, IMAGE_PHOTO } from '../../utility/imageRes';
import { OpenGallary, OpenCamera } from '../common/CommonImagePicker'
import CustomImagePickerModal from '../modals/customImagePickerModal';
import CommonPickerModal from '../modals/CommonPickerModal';
import * as constants from '../../utility/constants';
import { FONT_FAMILY_HEEBO_REGULAR } from '../../utility/Typography';
import { textInputNotEmptyValidator, isTextInputNotEmptyValidator, emailValidator, passwordValidator, mobileNumberValidator } from '../../utility/Utils';

const { height } = Dimensions.get('window')

const Registration = ({ navigation }) => {

    Strings.setLanguage('en');

    const dispatch = useDispatch();
    let nameRef = useRef(null);
    let emailRef = useRef(null);
    let mobileRef = useRef(null);
    let addressRef = useRef(null);
    let pincodeRef = useRef(null);
    let passwordRef = useRef(null);
    let cpasswordRef = useRef(null);

    const [isChecked, setIsChecked] = useState(false);
    const [isImagePickerModal, setIsImagePickerModal] = useState(false)
    const [isCountryModalVisible, setIsCountryModalVisible] = useState(false)
    const [isStateModalVisible, setIsStateModalVisible] = useState(false)
    const [isCityModalVisible, setIsCityModalVisible] = useState(false)
    const [isCompanyTypeModalVisible, setIsCompanyTypeModalVisible] = useState(false)
    const [isDateTimePickerShow, setIsDateTimePickerShow] = useState(false)

    const [selectedLogo, setSelectedLogo] = useState(undefined)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [address, setAddress] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [searchData, setSearchData] = useState(undefined)

    const { countryData, stateData, cityData, registerData, fetching } = useSelector(state => ({
        countryData: state.registerReducer.countryData,
        stateData: state.registerReducer.stateData,
        cityData: state.registerReducer.cityData,
        registerData: state.registerReducer.registerData,
        fetching: state.registerReducer.fetching,
    }), shallowEqual);

    //alert(JSON.stringify(registerData))

    useEffect(() => {

        getCountry()

        if (registerData != undefined) {
            if (registerData.error) {
                flashMessage(registerData.message, 'danger')
            }
            else {
                moveToVerifyOtpScreen()
            }
        }

    }, [registerData])

    //image picker functions
    function onpenImagePicker() {
        setIsImagePickerModal(true)
    }

    function onCloseImagePickerModal() {
        setIsImagePickerModal(false)
    }

    async function onCameraClick() {
        setIsImagePickerModal(false)
        OpenCamera((selectedImageUri) => {
            setSelectedLogo(selectedImageUri)
        })
    }

    function onGallaryClick() {
        setIsImagePickerModal(false)
        OpenGallary((selectedImageUri) => {
            setSelectedLogo(selectedImageUri)
        })
    }

    //location functions
    const getCountry = async () => {
        dispatch(getCountryListAction())
    }

    const getState = async (id) => {
        dispatch(getStateListAction({ [constants.KEY_COUNTRY_ID]: id }))
    }

    const getCity = async (id) => {
        dispatch(getCityListAction({ [constants.KEY_STATE_ID]: id }))
    }

    function onCountryPress(item) {
        setIsCountryModalVisible(false)
        setSelectedCountry(item)
        setSearchData(undefined)
        getState(item.id)
    }

    function onStatePress(item) {
        setIsStateModalVisible(false)
        setSelectedState(item)
        setSearchData(undefined)
        getCity(item.id)
    }

    function onCityPress(item) {
        setIsCityModalVisible(false)
        setSearchData(undefined)
        setSelectedCity(item)
    }

    function searchCountry(txt) {
        let country = countryData.response;
        const newData = country.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        setSearchData(newData)
    }

    function searchState(txt) {
        let state = stateData.response;
        const newData = state.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        setSearchData(newData)
    }

    function searchCity(txt) {
        let city = cityData.response;
        const newData = city.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        setSearchData(newData)
    }

    //validate all entries
    function validator() {
        if (selectedLogo == undefined) {
            flashMessage(Strings.please_select_profile_image, 'danger')
        }
        else if (isTextInputNotEmptyValidator(name)) {
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
        else if (selectedCountry == '') {
            flashMessage(Strings.please_select_country, 'danger')
        }
        else if (selectedState == '') {
            flashMessage(Strings.please_select_state, 'danger')
        }
        else if (selectedCity == '') {
            flashMessage(Strings.please_select_city, 'danger')
        }
        else if (isTextInputNotEmptyValidator(pincode)) {
            flashMessage(Strings.please_enter_pincode, 'danger')
        }
        else if (isTextInputNotEmptyValidator(password)) {
            flashMessage(Strings.please_enter_password, 'danger')
        }
        else if (isTextInputNotEmptyValidator(confirmPassword)) {
            flashMessage(Strings.please_re_enter_password, 'danger')
        }
        else if (password != confirmPassword) {
            flashMessage(Strings.password_not_matched, 'danger')
        }
        else if (isChecked == false) {
            flashMessage(Strings.please_agree_terms_and_conditions, 'danger')
        }
        else {
            registerUser()
        }
    }

    //register function
    const registerUser = () => {

        let userData = {
            [Utils.Constants.KEY_IMAGE]: selectedLogo,
            [Utils.Constants.KEY_FULL_NAME]: name,
            [Utils.Constants.KEY_EMAIL]: email,
            [Utils.Constants.KEY_PHONE_NUMBER]: mobileNumber,
            [Utils.Constants.KEY_ADDRESS]: address,
            [Utils.Constants.KEY_COUNTRY]: selectedCountry.id,
            [Utils.Constants.KEY_STATE]: selectedState.id,
            [Utils.Constants.KEY_CITY]: selectedCity.id,
            [Utils.Constants.KEY_PINCODE]: pincode,
            [Utils.Constants.KEY_PASSWORD]: password,
        }

        dispatch(registerAction(userData))

    }

    function moveToVerifyOtpScreen() {
        navigation.navigate(Utils.Constants.SCREEN_OTP_VERIFICATION, { registerResonse: registerData, mobile: mobileNumber })
    }

    //signin button
    function onPressSignIn() {
        navigation.navigate(Utils.Constants.KEY_LOGIN)
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar backgroundColor={colors.STATUS_BAR_COLOR} />
            <View style={styles.bottomV}>
                <CommonHeader
                    leftIcon={Utils.ImgPath.IMG_BACK}
                    leftIconPress={() => navigation.pop()}
                    title={Strings.sign_up}
                    fontSize={18}
                    fontFamily={Utils.Typography.FONT_FAMILY_REGULAR}
                    backgroundColor={colors.transparent}
                    textColor={colors.white}
                    tintColor={colors.white}
                    font={Utils.Typography.FONT_FAMILY_HEEBO_REGULAR}
                />
                <KeyboardAvoidingView style={{ flex: 1, height: '100%' }} enabled>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {/* IMAGE PICKER */}

                        <View style={{
                            flex: 1, marginHorizontal: 15, paddingVertical: 20, justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity style={{
                                height: 80, width: 80, backgroundColor: colors.white,
                                borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: .5,
                                borderColor: colors.grey500
                            }}
                                onPress={() => onpenImagePicker()}>
                                {selectedLogo != undefined ?
                                    <Image
                                        style={{ height: 80, width: 80, borderRadius: 50 }}
                                        source={{ uri: selectedLogo.uri }} /> :
                                    <Image
                                        style={{ height: 80, width: 80, borderRadius: 50 }}
                                        source={IMAGE_PHOTO} />
                                }
                                <Image
                                    style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24 }}
                                    resizeMode='contain'
                                    source={IMG_ADD} />
                            </TouchableOpacity>
                        </View>



                        {/* INPUT FIELDS */}


                        <View style={[styles.txtInputBg, { flexDirection: 'row' }]}>
                            <CommonTextInput
                                title={Strings.name}
                                keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                                style={{ marginTop: 0, flex: 1 }}
                                value={name}
                                onChangeText={(txt) => { setName(txt) }}
                                onSubmitEditing={() => { emailRef.focus() }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                                refValue={ref => nameRef = ref}
                            />
                        </View>
                        <View style={[styles.txtInputBg, { flexDirection: 'row' }]}>
                            <CommonTextInput
                                title={Strings.email}
                                keyboardType={Utils.Constants.KB_TYPE_EMAIL}
                                style={{ marginTop: 0, flex: 1 }}
                                value={email}
                                onChangeText={(txt) => { setEmail(txt) }}
                                onSubmitEditing={() => { mobileRef.focus() }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                                refValue={ref => emailRef = ref}
                            />
                        </View>

                        <View style={[styles.txtInputBg, { flexDirection: 'row' }]}>
                            <CommonTextInput
                                title={Strings.mobile_number}
                                keyboardType={Utils.Constants.KB_TYPE_PHONE}
                                style={{ marginTop: 0, flex: 1 }}
                                value={mobileNumber}
                                onChangeText={(txt) => { setMobileNumber(txt) }}
                                onSubmitEditing={() => { addressRef.focus() }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                                refValue={ref => mobileRef = ref}
                            />
                        </View>

                        <View style={[styles.txtInputBg, { flexDirection: 'row' }]}>
                            <CommonTextInput
                                title={Strings.address_line}
                                keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                                style={{ marginTop: 0, flex: 1 }}
                                value={address}
                                onChangeText={(txt) => { setAddress(txt) }}
                                // onSubmitEditing={() => { add2.focus() }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                                refValue={ref => addressRef = ref}
                            />
                        </View>

                        <View style={[styles.txtInputBg, { flexDirection: 'row' }]}>
                            <CommonTextInput
                                title={Strings.country}
                                keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                                style={{ marginTop: 0, flex: 1 }}
                                value={selectedCountry.name}
                                onChangeText={(txt) => { setSelectedCountry(txt) }}
                                //onSubmitEditing={() => { passwordRef.focus() }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                                icon={IMG_DOWN_ARROW}
                                isShowRightIcon={true}
                                editable={false}
                                onPressRightIcon={() => setIsCountryModalVisible(true)}
                            />
                        </View>

                        <View style={[styles.txtInputBg, { flex: 1, }]}>
                            <CommonTextInput
                                title={Strings.state}
                                keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                                style={{ marginTop: 0, flex: 1 }}
                                value={selectedState.name}
                                onChangeText={(txt) => { setSelectedState(txt) }}
                                //onSubmitEditing={() => { passwordRef.focus() }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                                icon={IMG_DOWN_ARROW}
                                isShowRightIcon={true}
                                editable={false}
                                onPressRightIcon={() => setIsStateModalVisible(true)}
                            />
                        </View>

                        <View style={[styles.txtInputBg, { flex: 1, }]}>
                            <CommonTextInput
                                title={Strings.city}
                                keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                                style={{ marginTop: 0, flex: 1 }}
                                value={selectedCity.name}
                                onChangeText={(txt) => { setSelectedCity(txt) }}
                                //onSubmitEditing={() => { passwordRef.focus() }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                                icon={IMG_DOWN_ARROW}
                                isShowRightIcon={true}
                                editable={false}
                                onPressRightIcon={() => setIsCityModalVisible(true)}
                            />
                        </View>

                        <View style={[styles.txtInputBg, { flexDirection: 'row' }]}>
                            <CommonTextInput
                                title={Strings.pincode}
                                keyboardType={Utils.Constants.KB_TYPE_PHONE}
                                style={{ marginTop: 0, flex: 1 }}
                                value={pincode}
                                onChangeText={(txt) => { setPincode(txt) }}
                                //onSubmitEditing={() => { Keyboard.dismiss() }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                                onSubmitEditing={() => { passwordRef.focus() }}
                            />
                        </View>

                        <View style={[styles.txtInputBg, { marginTop: 5, }]}>
                            <CommonTextInput
                                title={Strings.password}
                                keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                                style={{ marginTop: 0 }}
                                refValue={ref => passwordRef = ref}
                                value={password}
                                isTxtShow={true}
                                isShown={true}
                                onChangeText={(txt) => { setPassword(txt) }}
                                onSubmitEditing={() => { cpasswordRef.focus() }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_NEXT}
                            />
                        </View>

                        <View style={[styles.txtInputBg, { marginTop: 5, }]}>
                            <CommonTextInput
                                title={Strings.confirm_password}
                                keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                                style={{ marginTop: 0 }}
                                refValue={ref => cpasswordRef = ref}
                                value={confirmPassword}
                                isTxtShow={true}
                                isShown={true}
                                onChangeText={(txt) => { setConfirmPassword(txt) }}
                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                returnKeyType={Utils.Constants.KB_RETURN_TYPE_DONE}
                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            marginLeft: 15,
                            paddingHorizontal: 10,
                            marginVertical: 15
                        }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => setIsChecked(!isChecked)}>
                                {
                                    isChecked ?
                                        <Image resizeMode='contain' source={IMAGE_ACTIVE_CHECKBOX} /> :
                                        <Image resizeMode='contain' source={IMG_CHECKBOX} />
                                }
                            </TouchableOpacity>

                            <RegularText
                                style={{ marginHorizontal: 10 }}
                                title={Strings.agree_terms_condition}
                            />
                        </View>

                        <View style={{ marginHorizontal: 15 }}>
                            <CommonButton
                                style={styles.button}
                                title={Strings.sign_up}
                                onPress={validator}
                                showIcon={true}
                                font={Utils.Typography.FONT_FAMILY_BOLD}
                            />
                        </View>

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity activeOpacity={.7} onPress={() => onPressSignIn()}>
                                <Text style={{ fontFamily: FONT_FAMILY_HEEBO_REGULAR }}>{Strings.already_have_an_account + "? "}
                                    <Text style={{ color: colors.ACCENT_COLOR, fontFamily: FONT_FAMILY_HEEBO_REGULAR }}>
                                        {Strings.sign_in}</Text> </Text>

                            </TouchableOpacity>
                        </View>

                        <CustomImagePickerModal
                            visible={isImagePickerModal}
                            onClose={onCloseImagePickerModal}
                            onCameraClick={onCameraClick}
                            onGallaryClick={onGallaryClick}
                        />
                        <CommonPickerModal
                            visible={isCountryModalVisible}
                            searchPlaceholder={Strings.search_country}
                            data={searchData == undefined ? countryData != undefined ? countryData.response : undefined : searchData}
                            onItemPress={onCountryPress}
                            onClose={() => setIsCountryModalVisible(false)}
                            onChangeText={searchCountry}
                        />
                        <CommonPickerModal
                            visible={isStateModalVisible}
                            searchPlaceholder={Strings.search_state}
                            data={searchData == undefined ? stateData != undefined ? stateData.response : undefined : searchData}
                            onItemPress={onStatePress}
                            onClose={() => setIsStateModalVisible(false)}
                            onChangeText={searchState}
                        />
                        <CommonPickerModal
                            visible={isCityModalVisible}
                            searchPlaceholder={Strings.search_city}
                            data={searchData == undefined ? cityData != undefined ? cityData.response : undefined : searchData}
                            onItemPress={onCityPress}
                            onClose={() => setIsCityModalVisible(false)}
                            onChangeText={searchCity}
                        />
                    </ScrollView>

                </KeyboardAvoidingView>
            </View>
            {fetching != undefined && fetching && <CustomLoader loading={fetching} />}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginBottom: 50,
        color: colors.black,
        marginTop: 5
    },
    imgBack: {
        alignSelf: 'flex-start',
        paddingLeft: 20,
        padding: 10
    },
    img: {
        width: 25,
        height: 25,
        resizeMode: 'center'
    },
    topV: {

        backgroundColor: colors.white,
        alignItems: 'center'
    },
    bottomV: {
        flex: 1,
        // height: '100%',
    },
    logoBg: {
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logoV: {
        width: 120,
        height: 120,
        backgroundColor: "white",
        resizeMode: 'center'
    },
    txtInputBg: {
        marginHorizontal: 5,
        justifyContent: 'center',
        padding: 10
    },
    txtSign: {
        color: 'white',
        fontSize: 20,
        marginTop: 30
    },
    fgtPass: {
        color: colors.BLUE_COLOR,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 25
    },
    accountContain: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -25

    }

});

export default Registration;