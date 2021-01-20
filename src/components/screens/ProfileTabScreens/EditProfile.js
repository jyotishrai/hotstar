import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, TextInput, ScrollView } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMAGE_USER, IMAGE_CAMERA, IMAGE_RADIO_INACTIVE, IMAGE_RADIO_ACTIVE, IMAGE_DOWN, IMAGE_PHOTO, IMAGE_VERIFIED, IMAGE_EDIT } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    editProfileAction,
    getCountryListAction,
    getStateListAction,
    getCityListAction,
    getVideoCategoriesAction,
    clearEditProfileAction
} from '../../../actions/action'
import RegularText from '../../common/RegularText';
import colors from '../../../utility/Colors';
import CommonHeaderTitleWithButton from '../../common/CommonHeaderTitleWithButton';
import Strings from '../../../translation/language';
import { VideoPicker } from '../../common/CommonVideoPicker';
import { Chip } from 'react-native-paper'
import { FONT_FAMILY_BOLD } from '../../../utility/Typography';
import CommonTextInput from '../../common/CommonTextInput';
import CommonButton from '../../common/CommonButton'
import { KEY_APP, KEY_HOME_TAB, KEY_USER_DATA } from '../../../utility/constants';
import { getUserData, setUserData, storeItem } from '../../../utility/CustomAsyncStorage';
import CommonPickerModal from '../../modals/CommonPickerModal'
import CommonCatPickerModal from '../../modals/CommonCatPickerModal'
import DateTimePicker from '@react-native-community/datetimepicker'
import { convertDateTime } from '../../../utility/Utils'
import CommonImagePicker from '../../common/CommonImagePicker'
import CustomImagePickerModal from '../../modals/customImagePickerModal';
import CommonLoader from '../../common/CustomLoader'
import CustomAlertModal from '../../modals/customAlertModal'
import { OpenGallary, OpenCamera } from '../../common/CommonImagePicker'
import flashMessage from '../../common/CustomFlashAlert';
const { width, height } = Dimensions.get('window')

const Row = ({ title, placeholder, editable, isButton, onPress, value, onChangeText }) => {
    return (
        <View style={{ flexDirection: 'row', padding: 5, borderBottomColor: colors.grey300, borderBottomWidth: 1, marginHorizontal: 20, alignItems: 'center' }}>
            <View style={{ flex: 3 }}>
                <RegularText title={title} />
            </View>
            <TouchableOpacity
                style={{ flex: 7 }}
                activeOpacity={1}
                onPress={() => onPress()}
            >
                <TextInput
                    placeholder={placeholder}
                    editable={editable}
                    value={value}
                    style={{ color: colors.black }}
                    onChangeText={value => onChangeText(value)}
                />
            </TouchableOpacity>
            {isButton != undefined && <Image source={IMAGE_DOWN} />}
        </View>
    )
}

const EmailMobileRow = ({ title, placeholder, editable, isButton, onPress, value, onChangeText }) => {
    return (
        <View style={{ flexDirection: 'row', padding: 5, borderBottomColor: colors.grey300, borderBottomWidth: 1, marginHorizontal: 20, alignItems: 'center' }}>
            <View style={{ flex: 3 }}>
                <RegularText title={title} />
            </View>
            <View style={{ flex: 7 }}>
                <TextInput
                    placeholder={placeholder}
                    editable={editable}
                    value={value}
                    style={{ color: colors.black }}
                    onChangeText={value => onChangeText(value)}
                />
            </View>
            <TouchableOpacity onPress={() => onPress()}>
                <RegularText
                    title={Strings.edit}
                />
            </TouchableOpacity>
        </View>
    )
}

const heightData = [
    { name: '3 feet 0 inch' }, { name: '3 feet 1 inch' }, { name: '3 feet 2 inch' }, { name: '3 feet 3 inch' }, { name: '3 feet 4 inch' }, { name: '3 feet 5 inch' }, { name: '3 feet 6 inch' }, { name: '3 feet 7 inch' }, { name: '3 feet 8 inch' }, { name: '3 feet 9 inch' }, { name: '3 feet 10 inch' }, { name: '3 feet 11 inch' }, { name: '3 feet 12 inch' },
    { name: '4 feet 0 inch' }, { name: '4 feet 1 inch' }, { name: '4 feet 2 inch' }, { name: '4 feet 3 inch' }, { name: '4 feet 4 inch' }, { name: '4 feet 5 inch' }, { name: '4 feet 6 inch' }, { name: '4 feet 7 inch' }, { name: '4 feet 8 inch' }, { name: '4 feet 9 inch' }, { name: '4 feet 10 inch' }, { name: '4 feet 11 inch' }, { name: '4 feet 12 inch' },
    { name: '5 feet 0 inch' }, { name: '5 feet 1 inch' }, { name: '5 feet 2 inch' }, { name: '5 feet 3 inch' }, { name: '5 feet 4 inch' }, { name: '5 feet 5 inch' }, { name: '5 feet 6 inch' }, { name: '5 feet 7 inch' }, { name: '5 feet 8 inch' }, { name: '5 feet 9 inch' }, { name: '5 feet 10 inch' }, { name: '5 feet 11 inch' }, { name: '5 feet 12 inch' },
    { name: '6 feet 0 inch' }, { name: '6 feet 1 inch' }, { name: '6 feet 2 inch' }, { name: '6 feet 3 inch' }, { name: '6 feet 4 inch' }, { name: '6 feet 5 inch' }, { name: '6 feet 6 inch' }, { name: '6 feet 7 inch' }, { name: '6 feet 8 inch' }, { name: '6 feet 9 inch' }, { name: '6 feet 10 inch' }, { name: '6 feet 11 inch' }, { name: '6 feet 12 inch' },
    { name: '7 feet 0 inch' }, { name: '7 feet 1 inch' }, { name: '7 feet 2 inch' }, { name: '7 feet 3 inch' }, { name: '7 feet 4 inch' }, { name: '7 feet 5 inch' }, { name: '7 feet 6 inch' }, { name: '7 feet 7 inch' }, { name: '7 feet 8 inch' }, { name: '7 feet 9 inch' }, { name: '7 feet 10 inch' }, { name: '7 feet 11 inch' }, { name: '7 feet 12 inch' }
]

const EditProfileScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [genderData, setGenderData] = useState([
        {
            genderType: Strings.male,
            isChecked: false
        },
        {
            genderType: Strings.female,
            isChecked: false
        },
        {
            genderType: Strings.other,
            isChecked: false
        }
    ])
    const [reRender, setReRender] = useState(false)
    const [serverUserData, setServerUserData] = useState(undefined)

    const [searchData, setSearchData] = useState(undefined)

    const [userImage, setUserImage] = useState('')
    const [userNickName, setUserNickName] = useState('')
    const [userPhoneNumber, setUserPhoneNumber] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userHieght, setUserHeight] = useState('')
    const [userGender, setUserGender] = useState('')
    const [userDob, setUserDob] = useState('')
    const [userInterest, setUserInterest] = useState('')
    const [userCountry, setUserCountry] = useState('')
    const [userState, setUserState] = useState('')
    const [userCity, setUserCity] = useState('')
    const [userAbout, setUserAbout] = useState('')

    const [isImagePickerModal, setIsImagePickerModal] = useState(false)
    const [isHeightModalVisible, setIsHeightModalVisible] = useState(false)
    const [isCountryModalVisible, setIsCountryModalVisible] = useState(false)
    const [isStateModalVisible, setIsStateModalVisible] = useState(false)
    const [isCityModalVisible, setIsCityModalVisible] = useState(false)
    const [isInterestedModalVisible, setIsInterestedModalVisible] = useState(false)
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

    const { countryData, stateData, cityData, category, editProfileRes, fetching } = useSelector(state => ({
        countryData: state.registerReducer.countryData,
        stateData: state.registerReducer.stateData,
        cityData: state.registerReducer.cityData,
        category: state.getVideoCategoriesReducer.videoCategories,
        editProfileRes: state.editProfileReducer.editProfileRes,
        fetching: state.editProfileReducer.fetching,
        error: state.editProfileReducer.error,
    }), shallowEqual);

    useEffect(() => {
        getUser()
        getCountry()
        getCategory()

        if (editProfileRes != undefined && editProfileRes.error == false) {
            // setUserData(editProfileRes.data)
            // alert(JSON.stringify(editProfileRes))
            storeItem(KEY_USER_DATA, editProfileRes.data).then(() => {
                getUser()
            })
            global[KEY_USER_DATA] = editProfileRes.data
            setIsSuccessModalVisible(true)
        }
        else if (editProfileRes != undefined && editProfileRes.error == true) {
            flashMessage(editProfileRes.message, 'danger')
        }

        return () => {
            dispatch(clearEditProfileAction({}))
        }

    }, [editProfileRes])

    function getUser() {
        Utils.CustomStorage.retrieveItem(Utils.CustomStorage.USER_DATA).then((data) => {
            // alert(JSON.stringify(data))
            setServerUserData(data)
            setUserImage(data.image == '' ? undefined : { uri: data.image, type: "image/jpeg", name: data.image, base64: undefined })
            setUserNickName(data.full_name)
            setUserPhoneNumber(data.phone_number == 'null' ? '' : data.phone_number)
            setUserEmail(data.email)
            setUserHeight({ id: 0, name: data.height == "null" ? '' : data.height })
            setUserDob(data.dob)
            setUserInterest({ id: 0, category_name: data.intrested_in == 'null' ? '' : data.intrested_in })
            setUserCountry({ id: data.country, name: data.country_name })
            setUserState({ id: data.state, name: data.state_name })
            setUserCity({ id: data.city, name: data.city_name })
            setUserAbout(data.about_me == 'null' ? '' : data.about_me)

            let gender = genderData

            if (data.gender == 'male' || data.gender == 'Male') {

                gender[0].isChecked = true
                gender[1].isChecked = false
                gender[2].isChecked = false

                setGenderData(gender)
                setReRender(!reRender)
                setUserGender(gender[0].genderType)

            } else if (data.gender == 'female' || data.gender == 'Female') {

                gender[0].isChecked = false
                gender[1].isChecked = true
                gender[2].isChecked = false

                setGenderData(gender)
                setReRender(!reRender)
                setUserGender(gender[1].genderType)

            } else if (data.gender == 'other' || data.gender == 'Other') {

                gender[0].isChecked = false
                gender[1].isChecked = false
                gender[2].isChecked = true

                setGenderData(gender)
                setReRender(!reRender)
                setUserGender(gender[2].genderType)

            }
        }).catch((error) => {

        })
    }

    //image picker
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
            setUserImage(selectedImageUri)
        })
    }

    function onGallaryClick() {
        setIsImagePickerModal(false)
        OpenGallary((selectedImageUri) => {
            setUserImage(selectedImageUri)
        })
    }

    //location functions
    const getCountry = async () => {
        dispatch(getCountryListAction())
    }

    const getState = async (id) => {
        dispatch(getStateListAction({ [Utils.Constants.KEY_COUNTRY_ID]: id }))
    }

    const getCity = async (id) => {
        dispatch(getCityListAction({ [Utils.Constants.KEY_STATE_ID]: id }))
    }

    function onCountryPress() {
        setIsCountryModalVisible(true)
    }

    function onSelectCountry(item) {
        setIsCountryModalVisible(false)
        setUserCountry(item)
        setSearchData(undefined)
        getState(item.id)
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

    function onStatePress() {
        // alert(JSON.stringify(countryData))
        if (countryData == undefined && userCountry.id == 'null' || userCountry.id == null || userCountry.id == '' || userCountry.id == undefined) {
            flashMessage(Strings.please_select_country, 'danger')
        }
        else {
            setIsStateModalVisible(true)
        }
    }

    function onSelectState(item) {
        setIsStateModalVisible(false)
        setUserState(item)
        setSearchData(undefined)
        getCity(item.id)
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

    function onCityPress() {
        if (userState.id == 'null' || userState.id == null || userState.id == '' || userState.id == undefined) {
            flashMessage(Strings.please_select_state, 'danger')
        }
        else {
            setIsCityModalVisible(true)
        }
    }

    function onSelectCity(item) {
        setIsCityModalVisible(false)
        setSearchData(undefined)
        setUserCity(item)
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

    //category function
    function getCategory() {
        dispatch(getVideoCategoriesAction({ page: 0 }))
    }

    function onCategoryPress() {
        setIsInterestedModalVisible(true)
    }

    function onSelectCategory(item) {
        setIsInterestedModalVisible(false)
        setSearchData(undefined)
        setUserInterest(item)
    }

    function searchCategory(txt) {
        let cat = category.response;
        const newData = cat.filter(function (item) {
            const itemData = item.category_name ? item.category_name.toUpperCase() : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        setSearchData(newData)
    }

    //nick name functions
    function onChangeNickName(name) {
        setUserNickName(name)
    }

    //heigth modal functions
    function onPressHeight() {
        setIsHeightModalVisible(true)
    }

    function onPressHeightItem(item) {
        setUserHeight(item)
        setIsHeightModalVisible(false)
    }

    function onChangeHeightText(txt) {
        let cat = heightData;
        const newData = cat.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        setSearchData(newData)
    }

    function onCloseHeightModal() {
        setIsHeightModalVisible(false)
        setSearchData(undefined)
    }

    // dob modal functions
    function onPressDob() {
        setIsDatePickerVisible(true)
    }

    function onSelectDob(item) {
        setIsDatePickerVisible(false)
        let dob = convertDateTime(item.nativeEvent.timestamp, 'YYYY-MM-DD')
        setUserDob(dob)
    }

    function onChangeAboutText(text) {
        setUserAbout(text)
    }

    function onSelectGender(item, index) {
        //alert(JSON.stringify(item.genderType))
        let gender = genderData
        for (let i = 0; i < gender.length; i++) {
            if (index == i) {
                gender[i].isChecked = true
            } else {
                gender[i].isChecked = false
            }
        }
        setUserGender(item.genderType)
        setGenderData(gender)
        setReRender(!reRender)
    }

    function onSaveProfile() {

        let userNewData = {
            full_name: userNickName,
            gender: userGender,
            height: userHieght.name,
            dob: userDob,
            intrested_in: userInterest.category_name,
            country: userCountry.id,
            state: userState.id,
            city: userCity.id,
            about_me: userAbout,
            image: userImage.base64 != undefined ? 'data:' + userImage.type + ';base64,' + userImage.base64 : '',
        }

        dispatch(editProfileAction(userNewData))
        // alert(JSON.stringify(userNewData))
    }

    function closeSuccessModal() {
        setIsSuccessModalVisible(false)
        navigation.navigate(Utils.Constants.KEY_PROFILE_TAB)
    }

    function onPressEditEmail() {
        navigation.navigate(Utils.Constants.SCREEN_EDIT_EMAIL_SEND_MOBILE_OTP, { type: 'e' })
    }

    function onPressEditMobile() {
        navigation.navigate(Utils.Constants.SCREEN_EDIT_EMAIL_SEND_MOBILE_OTP, { type: 'm' })
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <View style={{ height: 55 }}>
                <CommonHeaderTitleWithButton title={Strings.edit_profile}></CommonHeaderTitleWithButton>
            </View>
            <ScrollView>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => onpenImagePicker()}
                    >
                        {userImage != undefined ?
                            <Image
                                style={{ height: 80, width: 80, borderRadius: 50 }}
                                source={{ uri: userImage.uri }} /> :
                            <Image
                                resizeMode='contain'
                                style={{ height: 80, width: 80, borderRadius: 50 }}
                                source={IMAGE_PHOTO} />
                        }
                        <Image
                            source={IMAGE_CAMERA}
                            resizeMode='contain'
                            style={{ position: 'absolute', right: 0, bottom: 0 }}
                        />
                    </TouchableOpacity>
                    <RegularText title={Strings.tap_to_change_photo} textStyle={{ marginTop: 10 }} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Row
                        title={Strings.nick_name}
                        placeholder={Strings.name}
                        value={serverUserData != undefined ? userNickName : ''}
                        editable={true}
                        onPress={() => { console.log(''); }}
                        onChangeText={onChangeNickName}
                    />
                    <EmailMobileRow
                        title={Strings.mobile_no}
                        placeholder={serverUserData != undefined ? userPhoneNumber : ''}
                        editable={false}
                        onPress={() => { onPressEditMobile() }}
                    />
                    <EmailMobileRow
                        title={Strings.email}
                        placeholder={serverUserData != undefined ? userEmail : ''}
                        editable={false}
                        onPress={() => { onPressEditEmail() }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        padding: 5,
                        borderBottomColor: colors.grey300,
                        borderBottomWidth: 1,
                        marginHorizontal: 20,
                        alignItems: 'center',
                        height: 60
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 3 }}>
                                <RegularText title={Strings.gender} />
                            </View>
                            <View style={{ flex: 7, flexDirection: 'row' }}>
                                <FlatList
                                    data={genderData}
                                    horizontal
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                style={{ flexDirection: 'row', marginRight: 10 }}
                                                onPress={() => onSelectGender(item, index)}
                                            >
                                                <RegularText title={item.genderType} />
                                                <Image
                                                    style={{ marginLeft: 5 }}
                                                    source={item.isChecked ? IMAGE_RADIO_ACTIVE : IMAGE_RADIO_INACTIVE}
                                                    resizeMode='contain'
                                                />
                                            </TouchableOpacity>
                                        )
                                    }} />
                            </View>
                        </View>
                    </View>
                    <Row
                        title={Strings.height}
                        placeholder={Strings.select_height}
                        editable={false}
                        isButton={true}
                        onPress={() => onPressHeight()}
                        value={userHieght.name}
                    />
                    <Row
                        title={Strings.date_of_birth}
                        placeholder={Strings.select_your_birthday}
                        editable={false}
                        isButton={true}
                        onPress={() => onPressDob()}
                        value={userDob}
                    />
                    <Row
                        title={Strings.intrested_in}
                        placeholder={Strings.select_interested_area}
                        editable={false}
                        isButton={true}
                        onPress={() => onCategoryPress()}
                        value={userInterest.category_name}
                    />
                    <Row
                        title={Strings.country}
                        placeholder={Strings.country}
                        editable={false}
                        isButton={true}
                        value={userCountry.name}
                        onPress={() => onCountryPress()}
                    />
                    <Row
                        title={Strings.state}
                        placeholder={Strings.state}
                        editable={false}
                        isButton={true}
                        value={userState.name}
                        onPress={() => {
                            if (stateData == undefined) {
                                flashMessage('Please select country first', 'danger')
                            }
                            else {
                                onStatePress()
                            }
                        }}
                    />
                    <Row
                        title={Strings.city}
                        placeholder={Strings.city}
                        editable={false}
                        isButton={true}
                        value={userCity.name}
                        onPress={() => {
                            if (cityData == undefined) {
                                flashMessage('Please select state first', 'danger')
                            } else {
                                onCityPress()
                            }
                        }}
                    />
                    <View style={{ padding: 5, marginHorizontal: 20, marginTop: 15, height: 100, }}>
                        <RegularText title={Strings.about_me} />
                        <TextInput
                            placeholder={Strings.say_something_about_you}
                            multiline
                            style={{
                                //color: editable ? colors.black : colors.grey500
                            }}
                            onChangeText={value => onChangeAboutText(value)}
                            value={userAbout}
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginHorizontal: 10,
                        marginBottom: 50,
                        marginTop: 20
                    }}
                >
                    <CommonButton
                        title={Strings.save}
                        onPress={onSaveProfile}
                    />
                </View>
            </ScrollView>
            <CommonPickerModal
                visible={isHeightModalVisible}
                onClose={onCloseHeightModal}
                searchPlaceholder={'Height'}
                data={searchData == undefined ? heightData != undefined ? heightData : undefined : searchData}
                onChangeText={onChangeHeightText}
                onItemPress={onPressHeightItem}
            />
            {isDatePickerVisible &&
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onSelectDob}
                    maximumDate={new Date()}
                />}
            <CommonPickerModal
                visible={isCityModalVisible}
                searchPlaceholder={Strings.search_city}
                data={searchData == undefined ? cityData != undefined ? cityData.response : undefined : searchData}
                onItemPress={onSelectCity}
                onClose={() => { setIsCityModalVisible(false); setSearchData(undefined) }}
                onChangeText={searchCity}
            />
            <CommonPickerModal
                visible={isCountryModalVisible}
                searchPlaceholder={Strings.search_country}
                data={searchData == undefined ? countryData != undefined ? countryData.response : undefined : searchData}
                onItemPress={onSelectCountry}
                onClose={() => { setIsCountryModalVisible(false); setSearchData(undefined) }}
                onChangeText={searchCountry}
            />
            <CommonPickerModal
                visible={isStateModalVisible}
                searchPlaceholder={Strings.search_state}
                data={searchData == undefined ? stateData != undefined ? stateData.response : undefined : searchData}
                onItemPress={onSelectState}
                onClose={() => { setIsStateModalVisible(false); setSearchData(undefined) }}
                onChangeText={searchState}
            />
            <CommonCatPickerModal
                visible={isInterestedModalVisible}
                searchPlaceholder={Strings.intrested_in}
                data={searchData == undefined ? category != undefined ? category.response : undefined : searchData}
                onItemPress={onSelectCategory}
                onClose={() => { setIsInterestedModalVisible(false); setSearchData(undefined) }}
                onChangeText={searchCategory}
            />
            <CustomImagePickerModal
                visible={isImagePickerModal}
                onClose={onCloseImagePickerModal}
                onCameraClick={onCameraClick}
                onGallaryClick={onGallaryClick}
            />
            <CustomAlertModal
                visible={isSuccessModalVisible}
                // image={IMAGE_VERIFIED}
                message={Strings.profile_updated_successfully}
                btnFirstText={Strings.ok}
                onYes={closeSuccessModal}
                onClose={closeSuccessModal}
            />
            {
                fetching && fetching != undefined &&
                <CommonLoader />
            }
        </View >
    );
}

export default EditProfileScreen;