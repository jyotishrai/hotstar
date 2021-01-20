import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMG_BACK, IMAGE_MUSIC_SIMPLE, IMAGE_CAT_GAMING, IMAGE_CAT_NEWS, IMAGE_CAT_FILM, IMAGE_CAT_FASHION, IMAGE_CAT_ART } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getSharedVideoByUserAction } from '../../../actions/action'
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
import { FROM_HOME_SCREEN, FROM_SCREEN_TYPE, FROM_REPORTED_VIDEOS_SCREEN, FROM_SHARED_VIDEOS_SCREEN, initialScrollIndex } from '../../../utility/constants';
import CustomLoader from '../../common/CustomLoader'

const { width, height } = Dimensions.get('window')

const SharedVideos = ({ navigation }) => {

    const dispatch = useDispatch();

    const { sharedVideos, fetching, error } = useSelector(state => ({
        sharedVideos: state.getSharedVideoByUserReducer.sharedVideos,
        fetching: state.getSharedVideoByUserReducer.fetching,
        error: state.getSharedVideoByUserReducer.error,
    }), shallowEqual);

    //alert(JSON.stringify(reportedVideos))

    useEffect(() => {
        getSharedVideos()
    }, [])

    function getSharedVideos() {
        dispatch(getSharedVideoByUserAction({ page: 1 }))
    }

    function onPressVideo(item, index) {
        navigation.navigate(Utils.Constants.SCREEN_SHOW_VIDEO, { video: sharedVideos.response, index: index, FROM_SCREEN_TYPE: FROM_SHARED_VIDEOS_SCREEN })
        global[initialScrollIndex] = index
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <CommonHeaderTitleWithButton title={Strings.shared_videos}></CommonHeaderTitleWithButton>
            <View style={{
                backgroundColor: colors.white,
                flex: 1
            }}>
                <View style={{}}>
                    {
                        sharedVideos != undefined &&
                        <FlatList
                            data={sharedVideos.response}
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <RowHome
                                        index={index}
                                        item={item}
                                        onPressVideo={onPressVideo}
                                    />
                                )
                            }} />
                    }
                </View>
                {
                    sharedVideos != undefined && sharedVideos.error == true &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <RegularText title={Strings.nothing_to_show} />
                    </View>
                }
            </View>
            {
                fetching &&
                <CustomLoader />
            }
        </View>
    );
}

export default SharedVideos;