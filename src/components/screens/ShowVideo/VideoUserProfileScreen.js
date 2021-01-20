import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMG_BACK, IMAGE_MUSIC_SIMPLE, IMAGE_CAT_GAMING, IMAGE_CAT_NEWS, IMAGE_CAT_FILM, IMAGE_CAT_FASHION, IMAGE_CAT_ART } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    getVideoCategoriesAction,
    clearVideoCategoriesAction,
    getVideoUserProfileAction,
    clearVideoUserProfileAction
} from '../../../actions/action'
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
import { FROM_HOME_SCREEN, FROM_SCREEN_TYPE, FROM_OTHER_USER_VIDEOS_SCREEN, initialScrollIndex } from '../../../utility/constants';
import CustomLoader from '../../common/CustomLoader'

const { width, height } = Dimensions.get('window')

const VideoUserProfileScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [video, setVideo] = useState(undefined)
    const [categoryData, setCategoryData] = useState(undefined)
    const [reRender, setReRender] = useState(false)

    const { categories, videoUserData, fetching } = useSelector(state => ({
        categories: state.getVideoCategoriesReducer.videoCategories,
        fetching: state.getVideoCategoriesReducer.fetching,

        videoUserData: state.getVideoUserProfileDataReducer.videoUserProfileData,
        error: state.getVideoUserProfileDataReducer.error,
    }), shallowEqual);

    // alert(JSON.stringify(videoUserData))

    useEffect(() => {
        let vid = navigation.state.params.video
        setVideo(vid)
        //alert(JSON.stringify(video))

        if (categories == undefined) {
            getVideoCategories()
        }

        if (categories != undefined) {
            //let cat = categories
            setCategoryData(categories)
            categories.response[0].isSelected = true
            getVideoUserData(categories.response[0].id)
        }

        return () => {
            dispatch(clearVideoCategoriesAction({}))
            dispatch(clearVideoUserProfileAction({}))
            setVideo(undefined)
        }

    }, [])

    function getVideoCategories() {
        dispatch(getVideoCategoriesAction({ page: 0 }))
    }

    function getVideoUserData(id) {
        // if (video != undefined) {
        dispatch(getVideoUserProfileAction({
            category_id: id,
            page: 1,
            user_id: navigation.state.params.video.user_id
        }))
        //}
    }

    async function onPressCategory(item, index) {
        let catData = categoryData
        for (let i = 0; i < catData.response.length; i++) {
            if (index === i) {
                catData.response[i].isSelected = true
            } else {
                catData.response[i].isSelected = false
            }
        }
        setCategoryData(catData)
        setReRender(!reRender)
        getVideoUserData(item.id)
    }

    function onPressHireMe() {
        navigation.navigate(Utils.Constants.SCREEN_HIRE_ME, { userId: video.user_id })
    }

    function onPressAbout() {
        navigation.navigate(Utils.Constants.SCREEN_VIDEO_USER_ABOUT, { user: video })
    }

    function onPressVideo(item, index) {
        navigation.push(Utils.Constants.SCREEN_SHOW_VIDEO, { video: videoUserData.response.videos, index: index, FROM_SCREEN_TYPE: FROM_OTHER_USER_VIDEOS_SCREEN })
        global[initialScrollIndex] = index
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <CommonHeaderTitleWithButton title={Strings.user_profile}></CommonHeaderTitleWithButton>
            <View style={{ flex: 1 }}>
                <View style={{
                    justifyContent: 'center', height: 55
                }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[colors.headerColor1, colors.headerColor2,]}
                        style={{
                            flex: 1,
                            height: 55,
                            justifyContent: 'center',
                        }}>
                        <Image
                            style={{
                                alignSelf: 'center',
                                marginTop: 45,
                                height: 70, width: 70, borderRadius: 50
                            }}
                            source={videoUserData != undefined ? { uri: videoUserData.response.userinfo.user_image } : IMAGE_USER}
                        />
                    </LinearGradient >
                </View>

                <RegularText
                    title={videoUserData != undefined ? videoUserData.response.userinfo.user_name : ''}
                    textStyle={{ fontSize: 18, alignSelf: 'center', marginTop: 40 }}
                    font={FONT_FAMILY_BOLD}
                />
                <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 15 }}>
                    <View style={{ flex: 1, }}>
                        <CommonOutlineButton
                            btnHeight={32}
                            style={{ height: 35 }}
                            title={videoUserData != undefined ? videoUserData.response.userinfo.videos_total_like + ' ' + Strings.like_s : '0 ' + Strings.like_s}
                        />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 15 }}>
                        <CommonOutlineButton btnHeight={32} style={{ height: 35 }} title={Strings.about_me} onPress={onPressAbout} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CommonButton style={{ height: 35 }} title={Strings.hire_me} onPress={onPressHireMe} />
                    </View>
                </View>
                {/* </View> */}
                {/* <View style={{
                backgroundColor: colors.white,
                flex: 0.7
            }}> */}
                <View style={{ paddingVertical: 10, backgroundColor: colors.grey200, marginTop: 10 }}>
                    {
                        categoryData != undefined &&
                        <FlatList
                            data={categoryData.response}
                            horizontal
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 30,
                                        marginLeft: index == 0 ? 15 : 0,
                                        //height: 50,
                                        //       width: 50
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => onPressCategory(item, index)}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    tintColor: item.isSelected ? colors.ACCENT_COLOR : colors.grey800
                                                }}
                                                resizeMode='contain'
                                                source={{ uri: item.category_icon }}
                                            />
                                            <RegularText
                                                textStyle={{
                                                    marginTop: 5,
                                                    color: item.isSelected ? colors.ACCENT_COLOR : colors.grey800
                                                }}
                                                title={item.category_name}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }} />
                    }
                </View>
                <View style={{ paddingVertical: 10, }}>
                    {
                        videoUserData != undefined &&
                        <FlatList
                            data={videoUserData.response.videos}
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
                    videoUserData != undefined && videoUserData.response.videos == [] &&
                    <View style={{ flex: 1, alignItems: 'center' }}>
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

export default VideoUserProfileScreen;