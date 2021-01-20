import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, TextInput, ScrollView } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMAGE_PLAY } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    uploadVideoAction,
    clearUploadVideoAction
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
import { KEY_APP, KEY_HOME_TAB, KEY_USER_ID, KEY_ID, DEVICE_TOKEN, USER_TOKEN, DEVICE_ID } from '../../../utility/constants';
import VideoOverSizeErrorModal from '../../modals/VideoOverSizeErrorModal';
import Video from 'react-native-video';
import { USER_DATA } from '../../../utility/CustomAsyncStorage';
import CustomLoader from '../../common/CustomVideoUploadingLoader'
import VideoUploadedModal from '../../modals/VideoUploadedModal';
import flashMessage from '../../common/CustomFlashAlert';
import RNFetchBlob from 'rn-fetch-blob'
import axios from 'axios';
import { API_UPLOAD_VIDEO_METHOD } from '../../../utility/ApiTypes';

const { width, height } = Dimensions.get('window')

const suggestedTags = [
    "funny", "memes", "followme", "cute", "fun", "cute", "tagsforlike", "like", "comment"
]

const AddTagsScreen = ({ navigation }) => {

    //const { navigation } = useContext(BookContext)
    const dispatch = useDispatch();

    const { uploadVideoRes, } = useSelector(state => ({
        uploadVideoRes: state.uploadVideoReducer.uploadVideo,
        // fetching: state.uploadVideoReducer.fetching,
        error: state.uploadVideoReducer.error
    }), shallowEqual)

    const [video, setVideo] = useState(undefined)
    const [videoInfo, setVideoInfo] = useState(undefined)
    const [selectedCategory, setSelectedCategory] = useState(undefined)
    const [tags, setTags] = useState('')
    const [playToggle, setPlayToggle] = useState(false)
    const [isOverSizeErrorModalVisible, setIsOverSizeErrorModalVisible] = useState(false)
    const [isVideoUploadedModalVisible, setIsVideoUploadedModalVisible] = useState(false)

    const [fetching, setFetching] = useState(false)
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        let video = navigation.state.params.video
        let videoInfo = navigation.state.params.videoInfo
        let selectedCat = navigation.state.params.category
        // alert(JSON.stringify(video))
        setVideoInfo(videoInfo)
        setVideo(video)
        setSelectedCategory(selectedCat)

        // if (uploadVideoRes != undefined && uploadVideoRes.error == false) {
        //     setIsVideoUploadedModalVisible(true)
        // }
        // if (uploadVideoRes != undefined && uploadVideoRes.error == true) {
        //     flashMessage(uploadVideoRes.message, 'danger')
        // }

    }, [navigation.state.params.video, uploadVideoRes])

    function onPressNext() {
        if (videoInfo.node.image.playableDuration > 60) {
            setPlayToggle(true)
            setIsOverSizeErrorModalVisible(true)
        } else {
            setPlayToggle(true)
            uploadVideo()
        }
    }

    function onErrorModalOk() {
        setPlayToggle(true)
        setIsOverSizeErrorModalVisible(false)
        navigation.navigate(KEY_HOME_TAB)
    }

    function onErrorModalClose() {
        setPlayToggle(false)
        setIsOverSizeErrorModalVisible(false)
    }

    function onPressSuggestedTags(item) {
        setTags(tags + ' ' + item)
    }

    function uploadVideo() {

        setPlayToggle(true)
        setFetching(true)

        let videoInformation = {
            name: videoInfo.node.image.filename,
            type: videoInfo.node.type,
            uri: video.path,
        }

        let videoData = {
            tag: tags,
            category_id: selectedCategory.id,
            video: videoInformation,
            video_length: videoInfo.node.image.playableDuration
        }

        console.log('==============VIDEO UPLOAD REQUEST======================');
        console.log(JSON.stringify(videoData));
        console.log('====================================');

        let formData = new FormData()
        for (const [key, value] of Object.entries(videoData)) {
            formData.append(`${key}`, value);
        }

        const AuthStr = {
            'token': global[DEVICE_TOKEN],
            'userToken': global[USER_TOKEN],
            'deviceId': global[DEVICE_ID],
            'content-type': 'multipart/form-data',
        }

        axios.post(API_UPLOAD_VIDEO_METHOD, formData, {
            headers: AuthStr,
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                // console.warn('Progress>>', percentCompleted)
                setPercent(percentCompleted)
            }
        })
            .then((uploadVideoRes) => {
                console.log('=================VIDEO UPLOAD RES===================');
                console.log(uploadVideoRes);
                console.log('====================================');
                if (uploadVideoRes.error == false) {
                    setIsVideoUploadedModalVisible(true)
                    setFetching(false)
                }
                if (uploadVideoRes.error == true) {
                    flashMessage(uploadVideoRes.message, 'danger')
                    setFetching(false)
                }
                setIsVideoUploadedModalVisible(true)
                setFetching(false)
            }).catch((error) => {
                flashMessage(error.message, 'danger')
                console.log('===============UPLOAD VIDEO ERROR=====================');
                console.log(JSON.stringify(error));
                console.log('====================================');
                setFetching(false)
            })

        // dispatch(uploadVideoAction(videoData))
    }

    function onVideoUploadedModalOk() {
        setPlayToggle(true)
        dispatch(clearUploadVideoAction())
        setIsVideoUploadedModalVisible(false)
        navigation.navigate(KEY_HOME_TAB)
    }

    function onVideoUploadedModalClose() {
        setPlayToggle(true)
        dispatch(clearUploadVideoAction())
        setIsVideoUploadedModalVisible(false)
        navigation.navigate(KEY_HOME_TAB)
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ height: 55 }}>
                <CommonHeaderTitleWithButton title={Strings.add_tags}></CommonHeaderTitleWithButton>
            </View>
            <ScrollView>
                {
                    video != undefined &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Video
                            source={{ uri: video.path }}
                            style={{ width: width, height: height / 1.5, }}
                            //     controls={true}
                            paused={playToggle}
                            repeat={true}
                            resizeMode='cover'
                        // onError={(err) => alert(JSON.stringify(err))}
                        />
                        <TouchableOpacity
                            style={{ position: 'absolute', flex: 1, zIndex: 1, height: 500, width: width, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => setPlayToggle(!playToggle)}
                        >
                            {
                                playToggle &&
                                <Image source={IMAGE_PLAY} />
                            }
                        </TouchableOpacity>
                    </View>
                }
                <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: colors.white }}>
                    <View>
                        <RegularText title={Strings.suggested_tags}
                            textStyle={{ fontSize: 16, marginBottom: 5 }}
                            font={FONT_FAMILY_BOLD} />
                    </View>
                    <FlatList
                        data={suggestedTags}
                        //numColumns={5}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <Chip
                                    onPress={() => onPressSuggestedTags(item)}
                                    mode='flat'
                                    style={{
                                        marginVertical: 5,
                                        marginRight: 5
                                    }}
                                >
                                    {'#' + item}
                                </Chip>
                            )
                        }} />
                </View>
                <View style={{
                    paddingHorizontal: 10, paddingBottom: 10, backgroundColor: colors.white
                }}>
                    <View>
                        <RegularText title={Strings.add_tags}
                            textStyle={{ fontSize: 16, marginBottom: 5 }}
                            font={FONT_FAMILY_BOLD} />
                    </View>
                    <View style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: colors.grey300,
                        height: 100,
                        paddingHorizontal: 10
                    }}>
                        <TextInput
                            placeholder={'#photography'}
                            multiline={true}
                            value={tags}
                            onChangeText={value => setTags(value)}
                        />
                    </View>
                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                        <CommonButton style={{ width: width / 3, }} title={Strings.next} bold={'bold'} onPress={onPressNext} />
                    </View>
                </View>
                <VideoOverSizeErrorModal
                    visible={isOverSizeErrorModalVisible}
                    onOk={onErrorModalOk}
                    onClose={onErrorModalClose}
                />
                <VideoUploadedModal
                    visible={isVideoUploadedModalVisible}
                    onOk={onVideoUploadedModalOk}
                    onClose={onVideoUploadedModalClose}
                />
            </ScrollView>
            {
                fetching &&
                <CustomLoader
                    fetching={fetching}
                    percent={percent}
                />
            }
        </View >
    );
}

export default AddTagsScreen;