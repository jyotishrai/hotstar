import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMG_BACK, IMAGE_MUSIC_SIMPLE, IMAGE_CAT_GAMING, IMAGE_CAT_NEWS, IMAGE_CAT_FILM, IMAGE_CAT_FASHION, IMAGE_CAT_ART } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAllMatchListAction, getLikedVideosByUserAction, getNotificationAction } from '../../../actions/action'
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
import CommonLoader from '../../common/CustomLoader'
import { FROM_HOME_SCREEN, FROM_SCREEN_TYPE, FROM_LIKED_VIDEOS_SCREEN } from '../../../utility/constants';
import RowNotifications from '../../rows/RowNotifications';

const { width, height } = Dimensions.get('window')

const Notifications = ({ navigation }) => {

    const dispatch = useDispatch();

    const { notificationData, fetching } = useSelector(state => ({
        notificationData: state.getNotificationReducer.notificationData,
        fetching: state.getNotificationReducer.fetching,
        error: state.getNotificationReducer.error,
    }), shallowEqual);

    useEffect(() => {
        getNotifications()
    }, [])

    function getNotifications() {
        dispatch(getNotificationAction())
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <CommonHeaderTitleWithButton title={Strings.notifications}></CommonHeaderTitleWithButton>
            <View style={{
                backgroundColor: colors.white,
                flex: 1
            }}>
                <View style={{}}>
                    {
                        notificationData != undefined &&
                        <FlatList
                            data={notificationData.response}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <RowNotifications
                                        index={index}
                                        item={item}
                                    />
                                )
                            }} />
                    }
                </View>
            </View>
            {
                fetching &&
                <CommonLoader />
            }
        </View>
    );
}

export default Notifications;