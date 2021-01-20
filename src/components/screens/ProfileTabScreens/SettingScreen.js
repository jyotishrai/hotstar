import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMG_BACK, IMAGE_MUSIC_SIMPLE, IMAGE_CAT_GAMING, IMAGE_CAT_NEWS, IMAGE_CAT_FILM, IMAGE_CAT_FASHION, IMAGE_CAT_ART, IMAGE_SET_EYE, IMAGE_ACTIVE_TOGGLE, IMAGE_INACTIVE_TOGGLE, IMAGE_NOT_EYE, IMAGE_NOTIFICATION } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAllMatchListAction } from '../../../actions/action'
import RegularText from '../../common/RegularText';
import colors from '../../../utility/Colors';
import CommonHeaderTitleWithButton from '../../common/CommonHeaderTitleWithButton';
import Strings from '../../../translation/language';
import { Chip } from 'react-native-paper';
import CommonButton from '../../common/CommonButton';
import CommonOutlineButton from '../../common/CommonOutLineButton ';
import LinearGradient from 'react-native-linear-gradient';
import { stylesHome } from '../../../utility/styles';
import { FONT_FAMILY_HEEBO_BOLD, FONT_FAMILY_BOLD } from '../../../utility/Typography';
import NavigationService from '../../../NavigationService';

const { width, height } = Dimensions.get('window')

const Row = ({ icon, title, onToggleChange, status }) => {

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                paddingHorizontal: 15,
                paddingVertical: 20,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image resizeMode='contain' source={icon} />
                    <RegularText textStyle={{ marginHorizontal: 10 }} title={title} />
                </View>
                <TouchableOpacity
                    onPress={() => onToggleChange()}>
                    <Image resizeMode='contain' source={status ? IMAGE_ACTIVE_TOGGLE : IMAGE_INACTIVE_TOGGLE} />
                </TouchableOpacity>
            </View>
            <View style={{ height: 1, backgroundColor: colors.grey200, marginHorizontal: 15 }}></View>
        </View>
    )
}

const SettingScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [profilePrivacy, setProfilePrivacy] = useState(true)
    const [hideComments, setHideComments] = useState(false)
    const [notifications, setNotifications] = useState(false)

    function onChangeHideCommentsFromVideo() {
        setHideComments(!hideComments)
    }

    function onChangeWhoCanSeeYourProfile() {
        setProfilePrivacy(!profilePrivacy)
    }

    function onChangeNotifications() {
        setNotifications(!notifications)
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <CommonHeaderTitleWithButton title={Strings.settings}></CommonHeaderTitleWithButton>
            <View style={{
                backgroundColor: colors.white,
                flex: 1
            }}>
                <Row
                    title={Strings.who_can_see_your_profile}
                    icon={IMAGE_SET_EYE}
                    status={profilePrivacy}
                    onToggleChange={onChangeWhoCanSeeYourProfile}
                />
                <Row
                    title={Strings.hide_comments_on_video}
                    icon={IMAGE_NOT_EYE}
                    status={hideComments}
                    onToggleChange={onChangeHideCommentsFromVideo}
                />
                <Row
                    title={Strings.notifications}
                    icon={IMAGE_NOTIFICATION}
                    status={notifications}
                    onToggleChange={onChangeNotifications}
                />
            </View>
        </View>
    );
}

export default SettingScreen;