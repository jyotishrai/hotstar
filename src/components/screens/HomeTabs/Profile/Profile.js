import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Utils from '../../../../utility';
import { BookContext } from '../../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_EDIT, IMAGE_VIDEO, IMAGE_REPORT, IMAGE_COMMENT, IMG_SEARCH, IMAGE_SHARE, IMAGE_LIKE, IMAGE_NOTIFICATION, IMAGE_SETTING, IMG_ARROW_RIGHT, IMAGE_CONNECT, IMAGE_LOGOUT, IMAGE_USER, IMAGE_PHOTO } from '../../../../utility/imageRes';
import RowHome from '../../../rows/RowHome';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAllMatchListAction, clearLoginDataAction, getProfileTabDataAction, clearProfileTabDataAction, clearSocialLoginAction } from '../../../../actions/action';
import colors from '../../../../utility/Colors';
import RegularText from '../../../common/RegularText';
import { FONT_FAMILY_BOLD } from '../../../../utility/Typography';
import Strings from '../../../../translation/language';
import { SCREEN_EDIT_PROFILE, SCREEN_MY_VIDEOS, SCREEN_LIKED_VIDEOS, SCREEN_REPORTED_VIDEOS, SCREEN_COMMENTED_VIDEOS, SCREEN_SETTING, KEY_LOGIN, SCREEN_SHARED_VIDEOS, KEY_USER_DATA, SCREEN_NOTIFICATIONS, SCREEN_GALLARY, SCREEN_CONNECT_FOR_BUSINESS_PURPOSE } from '../../../../utility/constants';
import { clearData } from '../../../../utility/CustomAsyncStorage';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

const Row = ({ icon, name, count, onPress }) => {

    return (
        <View>
            <TouchableOpacity style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                paddingHorizontal: 15,
                paddingVertical: 20,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
                activeOpacity={1}
                onPress={() => onPress()}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image resizeMode='contain' source={icon} />
                    <RegularText textStyle={{ marginHorizontal: 10 }} title={name} />
                </View>
                {
                    count != undefined ?
                        <RegularText title={count} /> :
                        <Image resizeMode='contain' source={IMG_ARROW_RIGHT} />
                }
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: colors.grey200, marginHorizontal: 15 }}></View>
        </View>
    )
}

const Profile = ({ }) => {

    const { navigation } = useContext(BookContext)

    const dispatch = useDispatch()

    const [localUserData, setLocalUserData] = useState(undefined)

    const { profileTabData, myVideos, fetching, videoFetching } = useSelector(state => ({
        profileTabData: state.getProfileTabDataReducer.profileTabData,
        fetching: state.getProfileTabDataReducer.fetching,
        error: state.getProfileTabDataReducer.error,
    }), shallowEqual);

    //alert(JSON.stringify(profileTabData))

    useEffect(() => {

        let user = global[KEY_USER_DATA]
        setLocalUserData(user)

        getProfileData()

        navigation.addListener(
            'didFocus',
            () => {
                getProfileData()
            }
        );

        return () => {
            // dispatch(clearProfileTabDataAction({}))
        }

    }, [global[KEY_USER_DATA]])

    function getProfileData() {
        dispatch(getProfileTabDataAction({ page: 1 }))
    }

    function onPressEditProfile() {
        navigation.navigate(SCREEN_EDIT_PROFILE)
    }

    function onPressMyVideos() {
        navigation.navigate(SCREEN_MY_VIDEOS)
    }

    function onPressLikedVideos() {
        navigation.navigate(SCREEN_LIKED_VIDEOS)
    }

    function onPressReportedVideos() {
        navigation.navigate(SCREEN_REPORTED_VIDEOS)
    }

    function onPressCommentedVideos() {
        navigation.navigate(SCREEN_COMMENTED_VIDEOS)
    }

    function onPressSharedVideos() {
        navigation.navigate(SCREEN_SHARED_VIDEOS)
    }

    // function onPressGallary() {
    //     navigation.navigate(SCREEN_GALLARY)
    // }

    function onPressNotification() {
        navigation.navigate(SCREEN_NOTIFICATIONS)
    }

    function onPressSetting() {
        navigation.navigate(SCREEN_SETTING)
    }

    function onPressConnecForBusinesPurpose() {
        navigation.navigate(SCREEN_CONNECT_FOR_BUSINESS_PURPOSE)
    }

    async function onPressLogout() {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'NO',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: () => clearData().then(() => {
                        dispatch(clearLoginDataAction())
                        dispatch(clearSocialLoginAction())
                        GoogleSignin.revokeAccess();
                        GoogleSignin.signOut();
                        LoginManager.logOut()
                        navigation.navigate(KEY_LOGIN)
                    })
                },
            ],
            { cancelable: false },
        );

        //clearData()
    }

    return (
        <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', backgroundColor: colors.grey200, height: 120 }}>
                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        source={
                            localUserData != undefined ? { uri: localUserData.image } : IMAGE_PHOTO}
                        resizeMode='cover'
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40
                        }}
                    />
                </View>
                <View style={{ flex: 0.6, justifyContent: 'space-between', paddingVertical: 20 }}>
                    <RegularText
                        title={localUserData != undefined ? localUserData.full_name : ''}
                        textStyle={{ fontSize: 20, color: colors.black }}
                        font={FONT_FAMILY_BOLD}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <RegularText
                            title={profileTabData != undefined && profileTabData.error == false ? profileTabData.response.total_like : 0}
                        />
                        <RegularText
                            title={' ' + Strings.like_s}
                        />
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: colors.ACCENT_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                        height: 25,
                        width: 150,
                        flexDirection: 'row',
                        paddingHorizontal: 5
                    }}
                        onPress={() => onPressEditProfile()}>
                        <Image resizeMode='contain' source={IMAGE_EDIT} />
                        <RegularText
                            title={Strings.edit_your_profile}
                            textStyle={{ marginHorizontal: 10, color: colors.white }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Row
                    icon={IMAGE_VIDEO}
                    onPress={onPressMyVideos}
                    name={'My Videos'}
                    count={profileTabData != undefined && profileTabData.error == false ? profileTabData.response.my_videos : 0}
                />
                <Row
                    icon={IMAGE_LIKE}
                    onPress={onPressLikedVideos}
                    name={'Liked Videos'}
                    count={profileTabData != undefined && profileTabData.error == false ? profileTabData.response.liked_videos : 0}
                />
                <Row
                    icon={IMAGE_REPORT}
                    onPress={onPressReportedVideos}
                    name={'Reported Videos'}
                    count={profileTabData != undefined && profileTabData.error == false ? profileTabData.response.reported_videos : 0}
                />
                <Row
                    icon={IMAGE_COMMENT}
                    onPress={onPressCommentedVideos}
                    name={'Commented Videos'}
                    count={profileTabData != undefined && profileTabData.error == false ? profileTabData.response.commented_videos : 0}
                />
                <Row
                    icon={IMAGE_SHARE}
                    onPress={onPressSharedVideos}
                    name={'Shared Videos'}
                    count={profileTabData != undefined && profileTabData.error == false ? profileTabData.response.share : 0}
                />
                {/* <Row
                    icon={IMAGE_VIDEO}
                    onPress={onPressGallary}
                    name={Strings.gallary}
                // count={profileTabData != undefined && profileTabData.error == false ? profileTabData.response.my_videos : 0}
                /> */}
                <Row
                    icon={IMAGE_NOTIFICATION}
                    onPress={onPressNotification}
                    name={'Notifications'}
                />
                <Row
                    icon={IMAGE_SETTING}
                    onPress={onPressSetting}
                    name={'Settings'}
                />
            </View>
            <View style={{
                marginVertical: 10
            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    backgroundColor: colors.white,
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }} onPress={() => onPressConnecForBusinesPurpose()}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image resizeMode='contain' source={IMAGE_CONNECT} />
                        <RegularText textStyle={{ marginHorizontal: 10 }} title={Strings.connect_for_business_purpose} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{
                marginBottom: 10
            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    backgroundColor: colors.white,
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                    onPress={() => onPressLogout()}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image resizeMode='contain' source={IMAGE_LOGOUT} />
                        <RegularText textStyle={{ marginHorizontal: 10, color: colors.red600 }} title={Strings.logout} />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Profile;