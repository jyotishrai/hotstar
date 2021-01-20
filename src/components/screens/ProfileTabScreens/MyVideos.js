import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput, RefreshControl } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMG_BACK, IMAGE_MUSIC_SIMPLE, IMAGE_CAT_GAMING, IMAGE_CAT_NEWS, IMAGE_CAT_FILM, IMAGE_CAT_FASHION, IMAGE_CAT_ART } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    getMyVideosAction,
    getVideoCategoriesAction,
    clearVideoCategoriesAction,
    deleteUserVideoAction,
    clearDeleteUserVideoAction
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
import { KEY_USER_ID, FROM_HOME_SCREEN, FROM_SCREEN_TYPE, FROM_MY_VIDEOS_SCREEN, initialScrollIndex } from '../../../utility/constants';
import CustomLoader from '../../common/CustomLoader'
import RowMyVideos from '../../rows/RowMyVideos';
import DeleteVideoModal from '../../modals/deleteVideoModal';
import flashMessage from '../../common/CustomFlashAlert';

const { width, height } = Dimensions.get('window')

const MyVideos = ({ navigation }) => {

    const dispatch = useDispatch();

    const { categories, myVideos, fetching, videoFetching, deleteVideoRes, deleteVideoFetching } = useSelector(state => ({
        categories: state.getVideoCategoriesReducer.videoCategories,
        myVideos: state.getMyVideosReducer.myVideos,
        fetching: state.getVideoCategoriesReducer.fetching,
        videoFetching: state.getMyVideosReducer.fetching,
        error: state.getMyVideosReducer.error,

        deleteVideoRes: state.deleteUserVideoReducer.deleteVideoRes,
        deleteVideoFetching: state.deleteUserVideoReducer.fetching,
        deleteVideoError: state.deleteUserVideoReducer.error
    }), shallowEqual);

    const [categoryData, setCategoryData] = useState(undefined)
    const [reRender, setReRender] = useState(false)
    const [isVideoDeleteModalVisible, setIsVideoDeleteModalVisible] = useState(false)
    const [toBeDeleteVideo, setToBeDeleteVideo] = useState(undefined)

    useEffect(() => {
        if (categories == undefined) {
            getVideoCategories()
        }

        if (categories != undefined) {
            //let cat = categories
            setCategoryData(categories)
            // categories.response[0].isSelected = true
            getMyVideos(categories.response[0].id)
            setInitialCategorySelect()
            // setReRender(!reRender)
        }

        if (deleteVideoRes != undefined && deleteVideoRes.error == false) {
            getMyVideos(categories.response[0].id)
            flashMessage(deleteVideoRes.message, 'success')
        }

        return () => {
            dispatch(clearDeleteUserVideoAction())
        }

    }, [categories, deleteVideoRes])


    function getVideoCategories() {
        dispatch(getVideoCategoriesAction({ page: 0 }))
    }

    function setInitialCategorySelect() {
        let catData = categories
        for (let i = 0; i < catData.response.length; i++) {
            if (i == 0) {
                catData.response[i].isSelected = true
            } else {
                catData.response[i].isSelected = false
            }
        }
        setCategoryData(catData)
        setReRender(!reRender)
    }

    function getMyVideos(id) {
        dispatch(getMyVideosAction({
            category_id: id,
            page: 1
        }))
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
        getMyVideos(item.id)
    }

    function onPressVideo(item, index) {
        navigation.navigate(Utils.Constants.SCREEN_SHOW_VIDEO, { video: myVideos.response, index: index, FROM_SCREEN_TYPE: FROM_MY_VIDEOS_SCREEN })
        global[initialScrollIndex] = index
    }

    function renderEmptyDataScreen() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <RegularText
                    title={Strings.nothing_to_show}
                    textStyle={{ fontSize: 18 }}
                />
            </View>
        )
    }

    function onLongPressVideo(item, index) {
        setToBeDeleteVideo(item)
        setIsVideoDeleteModalVisible(true)
    }

    function closeDeletVideoModal() {
        setIsVideoDeleteModalVisible(false)
    }

    function onDeleteVideo() {
        setIsVideoDeleteModalVisible(false)

        let videoInfo = {
            video_id: toBeDeleteVideo.id
        }

        dispatch(deleteUserVideoAction(videoInfo))
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <CommonHeaderTitleWithButton title={Strings.my_videos}></CommonHeaderTitleWithButton>
            <View style={{
                backgroundColor: colors.white,
                flex: 1
            }}>
                <View style={{ backgroundColor: colors.grey200, paddingVertical: 10 }}>
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
                <View style={{}}>
                    {
                        myVideos != undefined &&
                        <FlatList
                            data={myVideos.response}
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={videoFetching == undefined ? videoFetching : videoFetching}
                                    onRefresh={() => getMyVideos(categories.response[0].id)}
                                />
                            }
                            ListEmptyComponent={renderEmptyDataScreen}
                            renderItem={({ item, index }) => {
                                return (
                                    <RowMyVideos
                                        index={index}
                                        item={item}
                                        onPressVideo={onPressVideo}
                                        onLongPress={onLongPressVideo}
                                    />
                                )
                            }} />
                    }
                </View>
            </View>
            {
                fetching &&
                <CustomLoader />
            }
            {
                deleteVideoFetching &&
                <CustomLoader />
            }
            <DeleteVideoModal
                visible={isVideoDeleteModalVisible}
                title={Strings.delete_video}
                message={Strings.do_you_want_to_delete_selected_video}
                btnFirstText={Strings.yes}
                btnSecondText={Strings.no}
                onClose={closeDeletVideoModal}
                onNo={closeDeletVideoModal}
                onYes={onDeleteVideo}
            />
        </View>
    );
}

export default MyVideos;