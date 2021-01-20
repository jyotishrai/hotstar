import React, { useState, useContext, useEffect, } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, PermissionsAndroid, Platform } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAllMatchListAction } from '../../../actions/action'
import RegularText from '../../common/RegularText';
import colors from '../../../utility/Colors';
import CommonHeaderTitleWithButton from '../../common/CommonHeaderTitleWithButton';
import Strings from '../../../translation/language';
import { VideoPicker } from '../../common/CommonVideoPicker';
import CameraRoll from '@react-native-community/cameraroll';
import RowVideo from '../../rows/RowVideos'
import ImagePicker from 'react-native-image-crop-picker';
import { SCREEN_ADD_TAGS } from '../../../utility/constants';
import RNVideoHelper from 'react-native-video-helper';
import CustomVideoProcessingLoader from '../../common/CustomVideoProcessingLoader'
import { ProcessingManager } from 'react-native-video-processing';
import VideoOverSizeErrorModal from '../../modals/VideoOverSizeErrorModal';

const { width, height } = Dimensions.get('window')

const SelectVideoScreen = ({ navigation }) => {

    //const { navigation } = useContext(BookContext)
    const dispatch = useDispatch();

    const [allVideos, setAllVideos] = useState(undefined)
    const [selectedCategory, setSelectedCategory] = useState(undefined)

    const [isVideoProcessing, setIsVideoProcessing] = useState(false)
    const [videoProcessingPercent, setVideoProcessingPercent] = useState(0)
    const [isOverSizeErrorModalVisible, setIsOverSizeErrorModalVisible] = useState(false)

    useEffect(() => {
        let selectedCat = navigation.state.params.category;
        setSelectedCategory(selectedCat)
        getPhoneVideos()
    }, [navigation.state.params.category])

    function getPhoneVideos() {
        CameraRoll.getPhotos({
            first: 1000,
            assetType: 'Videos',
        })
            .then(videos => {
                console.log(videos)
                setAllVideos(videos.edges)
            })
            .catch((err) => {
                //Error Loading Images
            });
    }

    function onPressVideo(video) {
        if (video.node.image.playableDuration > 60) {
            setIsOverSizeErrorModalVisible(true)
        } else {
            compressVideo(video)
        }
    }

    async function compressVideo(video) {
        setIsVideoProcessing(true)
        let uri = video.node.image.uri

        const options = {
            width: 360,
            height: 640,
            bitrateMultiplier: 0.7,
            saveToCameraRoll: true, // default is false, iOS only
            saveWithCurrentDate: true, // default is false, iOS only
            minimumBitrate: 500000,
            removeAudio: false, // default is false
        };

        const options2 = {
            width: 720,
            height: 1280,
            bitrateMultiplier: 0.5,
            saveToCameraRoll: false, // default is false, iOS only
            saveWithCurrentDate: false, // default is false, iOS only
            minimumBitrate: 300000,
        };

        var k = 1024; //Or 1 kilo = 1000
        var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
        var i = Math.floor(Math.log(video.node.image.fileSize) / Math.log(k));
        let videoSize = parseFloat((video.node.image.fileSize / Math.pow(k, i)).toFixed(2))

        console.warn(videoSize);

        if (videoSize < 10) {
            // ProcessingManager.compress(uri, options2)
            //     .then((data) => {
            //         setIsVideoProcessing(false)
            //         console.warn("data==", data.source)
            //         navigation.navigate(SCREEN_ADD_TAGS, { video: { path: data.source }, videoInfo: video, category: selectedCategory })
            //     });
            // alert(JSON.stringify(video.node.image.uri))
            setIsVideoProcessing(false)
            navigation.navigate(SCREEN_ADD_TAGS, { video: { path: video.node.image.uri }, videoInfo: video, category: selectedCategory })
        } else {
            console.warn('Greator Than 10 Mb');
            ProcessingManager.compress(uri, options)
                .then((data) => {
                    setIsVideoProcessing(false)
                    console.warn("data==", data.source)
                    navigation.navigate(SCREEN_ADD_TAGS, { video: { path: data.source }, videoInfo: video, category: selectedCategory })
                });
        }

    }

    function onErrorModalOk() {
        setIsOverSizeErrorModalVisible(false)
    }

    function onErrorModalClose() {
        setIsOverSizeErrorModalVisible(false)
    }

    return (
        <ImageBackground style={{ flex: 1 }} source={IMAGE_SELECT_VIDEO_BG}>
            <View style={{ height: 55 }}>
                <CommonHeaderTitleWithButton title={Strings.select_video}></CommonHeaderTitleWithButton>
            </View>

            {
                allVideos != undefined ?
                    <FlatList
                        data={allVideos}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <RowVideo
                                        item={item}
                                        index={index}
                                        onPressVideo={onPressVideo}
                                    />
                                </View>
                            )
                        }} /> :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <RegularText title={'Wait...'} />
                    </View>
            }
            <VideoOverSizeErrorModal
                visible={isOverSizeErrorModalVisible}
                onOk={onErrorModalOk}
                onClose={onErrorModalClose}
            />
            <CustomVideoProcessingLoader
                loading={isVideoProcessing}
                percent={videoProcessingPercent}
            />
        </ImageBackground>
    );
}

export default SelectVideoScreen;