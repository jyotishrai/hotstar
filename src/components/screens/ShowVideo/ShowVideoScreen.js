import React, { useState, useContext, useEffect, useDebugValue, useRef } from 'react';
import { View, FlatList, Dimensions, Image, TouchableOpacity, StatusBar, ActivityIndicator, Permission, RefreshControl } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_VIDEO_SCREEN_SAMPLE, IMG_BACK, IMG_EYE, IMAGE_USER, IMAGE_MUSIC, IMAGE_MUSIC_SIMPLE, IMAGE_LIKE_WHITE, IMAGE_COMMENT_WHITE, IMAGE_SHARE_WHITE, IMAGE_DOWNLOAD, IMAGE_REPORT_WHITE, IMAGE_PLAY, IMAGE_LIKE_BORDER, IMAGE_LIKE_ACTIVE, IMG_LOGO } from '../../../utility/imageRes';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    likeDislikeVideoAction,
    getAllCommentsOfVideoAction,
    clearLikeDislikeVideoAction,
    addCommentOnVideoAction,
    updateHomeVideoAction,
    updateMyVideosAction,
    updateCommentedVideosByUserAction,
    updateLikedVideosByUserAction,
    increaseViewOfVidepAction,
    clearIncreaseViewOfVidepAction,
    clearShareVideoAction,
    shareVideoAction,
    clearAddCommentOnVideoAction,
    videoDownloadedAction,
    clearVideoDownloadedAction
} from '../../../actions/action'
import RegularText from '../../common/RegularText';
import colors from '../../../utility/Colors';
import NavigationService from '../../../NavigationService'
import { FONT_FAMILY_LIGHT, FONT_FAMILY_HEEBO_THIN, FONT_FAMILY_HEEBO_MEDIUM, FONT_FAMILY_HEEBO_REGULAR } from '../../../utility/Typography';
import Strings from '../../../translation/language';
import VideoLikesModal from '../../modals/VideoLikesModal';
import VideoCommentModal from '../../modals/VideoCommentModal';
import { SCREEN_REPORT_VIDEO, SCREEN_VIDEO_USER_PROFILE, FROM_SCREEN_TYPE, FROM_HOME_SCREEN, FROM_LIKED_VIDEOS_SCREEN, FROM_COMMENTED_VIDEOS_SCREEN, FROM_MY_VIDEOS_SCREEN, FROM_SEARCH_VIDEOS_SCREEN, FROM_REPORTED_VIDEOS_SCREEN, FROM_SHARED_VIDEOS_SCREEN, FROM_OTHER_USER_VIDEOS_SCREEN, initialScrollIndex, KEY_USER_DATA } from '../../../utility/constants';
import Video from 'react-native-video';
import CustomLoader from '../../common/CustomLoader';
import CustomDownloadLoader from '../../common/CustomDownloadLoader';
import flashMessage from '../../common/CustomFlashAlert';
import RNFetchBlob from 'rn-fetch-blob'
import { getUserData } from '../../../utility/CustomAsyncStorage';
import { updateLikesMethod } from '../../../utility/Utils';
import VideoPlayerRun from 'react-native-video-controls';
import RNVideoPlayer from 'react-native-video-player'
import Share from 'react-native-share'

const { width, height } = Dimensions.get('window')

const ShowVideoScreen = ({ navigation, }) => {

    let listRef = useRef()
    let selectedvideoPlayer = useRef(null);

    const dispatch = useDispatch();

    const [video, setVideo] = useState(undefined)
    const [videoIndex, setVideoIndex] = useState(undefined)
    const [fromScreen, setFromScreen] = useState(undefined)

    const [userImage, setUserImage] = useState(undefined)

    const [isSelfLiked, setIsSelfLiked] = useState(false)
    const [currentLikes, setCurrentLikes] = useState(0)
    const [showLikesModal, setShowLikesModal] = useState(false)

    const [comment, setComment] = useState('')
    const [currentCommetnIndex, setCurrentCommentIndex] = useState(0)
    const [showCommentModal, setShowCommentModal] = useState(false)

    const [showLoader, setShowLoader] = useState(false)

    const [showDownloadLoader, setShowDownloadLoader] = useState(false)
    const [downloadingPercent, setDownloadingPercent] = useState(0)
    const [playToggle, setPlayToggle] = useState(false)

    const [isOnScreen, setIsOnScreen] = useState(false)

    const [currentViewItem, setCurrentViewItem] = useState(undefined)
    const [reRender, setReRender] = useState(false)

    const { videoComments, fetching, error, homeVideo, myVideos, likedVideos, commentedVideos, addCommentRes } = useSelector(state => ({
        videoComments: state.videoCommentReducer.videoComments,
        fetching: state.videoCommentReducer.fetching,
        error: state.videoCommentReducer.error,

        homeVideo: state.getHomeVideoReducer.homeVideo,
        myVideos: state.getMyVideosReducer.myVideos,
        likedVideos: state.getLikedVideosByUserReducer.likedVideos,
        commentedVideos: state.getCommentedVideosByUserReducer.commentedVideos,
        reportedVideos: state.getReportedVideosByUserReducer.reportedVideos,
        videoUserProfileData: state.getVideoUserProfileDataReducer.videoUserProfileData,

        addCommentRes: state.videoCommentReducer.addCommentRes
    }), shallowEqual);

    const onViewRef = React.useRef((viewableItems) => {
        // console.warn(JSON.stringify(viewableItems))
        // Use viewable items in state or as intended
        setCurrentViewItem(viewableItems.viewableItems)
        increaseViewsOfVideo(viewableItems.viewableItems[0].item.id, viewableItems.viewableItems[0].item.category_id)
        // alert(JSON.stringify(viewableItems.viewableItems[0].item.id))
        // console.warn('changed')
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    useEffect(() => {

        navigation.addListener(
            'didBlur',
            () => {
                setPlayToggle(true)
                setIsOnScreen(false)
            }
        );

        navigation.addListener(
            'didFocus',
            () => {
                setIsOnScreen(true)
            }
        );

        let video = navigation.state.params.video;
        let videoIndex = navigation.state.params.index
        let fromScreen = navigation.state.params.FROM_SCREEN_TYPE
        setFromScreen(fromScreen)
        setCurrentLikes(video.likes)
        setVideo(video)
        setVideoIndex(videoIndex)
        getCurrentUser()

        // if (video != undefined) {
        //     if (video.self_liked == 'Y' || video.self_liked == 'y') {
        //         setIsSelfLiked(true)
        //     } else {
        //         setIsSelfLiked(false)
        //     }
        //     getVideoComments(video.id)
        //     increaseViewsOfVideo(video.id, video.category_id)
        // }

        return () => {
            dispatch(clearLikeDislikeVideoAction({}))
            dispatch(clearIncreaseViewOfVidepAction({}))
            dispatch(clearAddCommentOnVideoAction({}))
            dispatch(clearShareVideoAction({}))
            dispatch(clearVideoDownloadedAction({}))
            setPlayToggle(true)
            setFromScreen(undefined)
            selectedvideoPlayer
        }

    }, [navigation.state.params.video])

    function increaseViewsOfVideo(vidId, catId) {

        let videoInfo = {
            video_id: vidId,
            category_id: catId,
        }

        dispatch(increaseViewOfVidepAction(videoInfo))
    }

    function getCurrentUser() {
        Utils.CustomStorage.retrieveItem(Utils.CustomStorage.USER_DATA).then((data) => {
            setUserImage(data.image == '' ? undefined : { uri: data.image })
        }).catch((error) => {

        })
    }

    function onPressBack() {
        NavigationService.back()
    }

    //like video functions
    async function onPressLike(item, index) {

        if (item.self_liked == 'Y') {
            for (let i = 0; i < video.length; i++) {
                if (index == i) {
                    video[i].likes = video[i].likes - 1
                    video[i].self_liked = 'N' //!video[i].self_liked
                }
            }
        } else {
            for (let i = 0; i < video.length; i++) {
                if (index == i) {
                    video[i].likes = video[i].likes + 1
                    video[i].self_liked = 'Y' //!video[i].self_liked
                }
            }
        }

        setReRender(!reRender)

        dispatch(likeDislikeVideoAction({
            video_id: item.id
        }))
    }

    async function updateLikes(likes, selfLike) {
        if (fromScreen == FROM_HOME_SCREEN) {
            let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, homeVideo, selfLike)
            dispatch(updateHomeVideoAction(updatedData))
        }
        else if (fromScreen == FROM_LIKED_VIDEOS_SCREEN) {
            let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, likedVideos, selfLike)
            dispatch(updateLikedVideosByUserAction(updatedData))
        }
        else if (fromScreen == FROM_COMMENTED_VIDEOS_SCREEN) {
            let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, commentedVideos, selfLike)
            dispatch(updateCommentedVideosByUserAction(updatedData))
        }
        else if (fromScreen == FROM_MY_VIDEOS_SCREEN) {
            let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, myVideos, selfLike)
            dispatch(updateMyVideosAction(updatedData))
        }
        else if (fromScreen == FROM_SEARCH_VIDEOS_SCREEN) {

        }
        else if (fromScreen == FROM_REPORTED_VIDEOS_SCREEN) {
            let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, reportedVideos, selfLike)
            dispatch(updateMyVideosAction(updatedData))
        }
        else if (fromScreen == FROM_SHARED_VIDEOS_SCREEN) {

        }
        else if (fromScreen == FROM_OTHER_USER_VIDEOS_SCREEN) {
            let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, videoUserProfileData, selfLike)
            dispatch(updateMyVideosAction(updatedData))
        }
    }

    function onCloseLikesModal() {
        setShowLikesModal(false)
    }

    //comment modal functions
    function getVideoComments(videoId) {
        dispatch(getAllCommentsOfVideoAction({
            video_id: videoId
        }))
    }

    function onPressComment(item, index) {
        setCurrentCommentIndex(index)
        setShowCommentModal(true)
    }

    function onCloseCommentModal() {
        setShowCommentModal(false)
    }

    function onChangeComment(text) {
        setComment(text)
    }

    async function addComment() {
        setComment('')
        dispatch(addCommentOnVideoAction({
            video_id: video[currentCommetnIndex].id,
            comment: comment
        }))

        setComment('')
        for (let i = 0; i < video.length; i++) {
            if (currentCommetnIndex == i) {
                video[i].comments.push({
                    comment: comment,
                    created: new Date(),
                    username: global[KEY_USER_DATA].full_name,
                    image: global[KEY_USER_DATA].image
                })
            }
        }
    }

    //share
    async function onPressShare() {
        try {
            const result = await Share.share({
                message:
                    'AuditionTube',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType

                } else {
                    // shared
                    dispatch(shareVideoAction({ video_id: video.id }))
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            //alert(error.message);
        }
    }

    //share
    //share
    const _shareImage = async (item, index) => {
        let imagePath = null;
        RNFetchBlob.config({
            fileCache: true
        })
            .fetch("GET", item.thumbnail)
            // the image is now dowloaded to device's storage
            .then(resp => {
                // the image path you can use it directly with Image component
                imagePath = resp.path();
                return resp.readFile("base64");
            })
            .then(async base64Data => {
                var base64Data = `data:image/png;base64,` + base64Data;
                // here's base64 encoded image
                await Share.open({
                    url: base64Data,
                    message: "Hey, i found this amazing video on AuditionTube. Download it from https://play.google.com/store"
                });
                // remove the file from storage
                // return fs.unlink(imagePath);
            });
    };

    //download
    function onPressDownload(item, index) {

        setShowDownloadLoader(true)

        let dirs = RNFetchBlob.fs.dirs

        let date = new Date().getDate()
        let month = new Date().getMonth()
        let year = new Date().getFullYear()
        let hour = new Date().getHours()
        let minute = new Date().getMinutes()
        let second = new Date().getSeconds()
        let videoName = date + '' + month + '' + year + '' + hour + '' + minute + '' + second;

        RNFetchBlob
            .config({
                path: dirs.DownloadDir + '/' + videoName + '.mp4'
            })
            .fetch('GET', item.video, {
                //some headers ..
            })
            .progress((received, total) => {
                setDownloadingPercent(((received / total) * 100).toFixed(1))
            })
            .then((res) => {
                setShowDownloadLoader(false)
                setDownloadingPercent(0)
                dispatch(videoDownloadedAction({ video_id: video.id }))
                flashMessage('Find downloaded video at - ' + res.path(), 'success')
            })
    }

    //report
    function onPressReport(item, index) {
        setPlayToggle(true)
        navigation.navigate(SCREEN_REPORT_VIDEO, { videoData: item })
    }

    //video user
    function onPressAcount(item, index) {
        if (global[KEY_USER_DATA].id != item.user_id) {
            setPlayToggle(true)
            navigation.navigate(SCREEN_VIDEO_USER_PROFILE, { video: item })
        }
    }

    function onBuffer(isBuffering) {
        setShowLoader(isBuffering)
    }

    function pauseVideo() {
        setPlayToggle(!playToggle)
    }

    return (
        <View style={{ justifyContent: 'center', height: height }}>
            <StatusBar backgroundColor={colors.transparentBlackHard} barStyle={'light-content'} />

            {
                video != undefined &&
                <FlatList
                    data={video}
                    snapToAlignment='start'
                    initialNumToRender={1}
                    keyExtractor={(item, index) => index.toString()}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    onEndReachedThreshold={0.5}
                    style={{ height: height }}
                    pagingEnabled={true}
                    decelerationRate={'fast'}
                    ref={(ref) => { listRef = ref }}
                    initialScrollIndex={global[initialScrollIndex]}
                    getItemLayout={(data, index) => (
                        { length: height, offset: height * index, index }
                    )}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    height: height
                                }}
                                    activeOpacity={1}
                                    onPress={() => pauseVideo()}
                                >
                                    {
                                        video != undefined && isOnScreen == true && currentViewItem != undefined && index == currentViewItem[0].index ?

                                            <VideoPlayerRun
                                                style={{ width: width, height: height }}
                                                ref={(ref) => { selectedvideoPlayer = ref; }}
                                                toggleResizeModeOnFullscreen={false}
                                                source={{ uri: item.video }}
                                                replay={true}
                                                paused={playToggle}
                                                repeat={true}
                                                isFullscreen={true}
                                                resizeMode={'cover'}
                                                showOnStart={false}
                                                playInBackground={false}
                                                disableBack={true}
                                                disableTimer={true}
                                                disableVolume={true}
                                                disableFullscreen={true}
                                                disablePlayPause={true}
                                                title={""}
                                                onLoadStart={(ivent) => { console.warn("ivent::::: ", ivent); }}
                                                thumbnail={{ uri: item.thumbnail }}
                                                endThumbnail={{ uri: item.thumbnail }}
                                                playWhenInactive={false}
                                                disableSeekbar={true}
                                                firstTime={6}
                                                seekColor={colors.GREY_COLOR}
                                                tapAnywhereToPause={true}
                                                // onEnd={(item) => { selectedvideoPlayer && selectedvideoPlayer.seek(0); }}
                                                // onBuffer={onBuffer}
                                                // onBack={() => null}
                                                // onError={(err) => {}}
                                                navigator={navigation}
                                            />

                                            // <Image
                                            //     source={IMG_LOGO}
                                            //     style={{ width: width, height: height }}
                                            //     resizeMode='cover'
                                            // />

                                            :
                                            <Image
                                                source={item.thumbnail != undefined ? { uri: item.thumbnail } : IMG_LOGO}
                                                style={{ width: width, height: height }}
                                                resizeMode='cover'
                                            />

                                    }
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            position: 'absolute',
                                            zIndex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: height,
                                            width: width,
                                            backgroundColor: playToggle ? colors.transparentBlack : colors.transparent
                                        }}
                                        onPress={() => setPlayToggle(!playToggle)}
                                    >
                                        {
                                            playToggle &&
                                            <Image resizeMode='contain' source={IMAGE_PLAY} style={{ alignSelf: 'center' }} />
                                        }
                                    </TouchableOpacity>
                                </TouchableOpacity>

                                {/* HEADER  START*/}
                                <View style={{
                                    flexDirection: 'row',
                                    height: 55,
                                    alignItems: 'center',
                                    paddingHorizontal: 15,
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0
                                }}>
                                    <TouchableOpacity
                                        style={{ position: 'absolute', left: 15 }}
                                        onPress={() => onPressBack()}
                                    >
                                        <Image source={IMG_BACK} />
                                    </TouchableOpacity>
                                    <View style={{
                                        flexDirection: 'row',
                                        borderRadius: 15,
                                        backgroundColor: colors.transparentBlack,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingHorizontal: 5,
                                        paddingVertical: 2,
                                        alignSelf: 'center'
                                    }}>
                                        <Image resizeMode='contain' source={IMG_EYE} />
                                        <RegularText title={item.views} textStyle={{ color: colors.white, marginLeft: 5, fontSize: 12 }} />
                                    </View>
                                </View>
                                {/* HEADER  END*/}

                                {/* ACCOUNT_INFO START */}
                                <View style={{
                                    position: 'absolute',
                                    left: 10,
                                    bottom: 10
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{
                                            height: 55,
                                            width: 55,
                                            borderRadius: 30,
                                            margin: 10
                                        }}
                                            onPress={() => onPressAcount(item, index)}>
                                            <Image
                                                style={{
                                                    height: 55,
                                                    width: 55,
                                                    borderRadius: 30,
                                                    borderWidth: 1,
                                                    borderColor: colors.white,
                                                }}
                                                source={item.user_image != '' ? { uri: item.user_image } : IMAGE_USER}
                                            />
                                        </TouchableOpacity>
                                        <RegularText title={item.user_name} textStyle={{ color: colors.white, fontSize: 15 }} />
                                    </View>
                                    <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                                        <RegularText title={item.tag} textStyle={{ color: colors.white }} />
                                        {/* <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                            <Image resizeMode='contain' source={IMAGE_MUSIC_SIMPLE} style={{ tintColor: colors.white, height: 10, width: 10, marginRight: 5 }} />
                                            <RegularText title={'Original Music by Nehamaik'} textStyle={{ color: colors.white }} font={FONT_FAMILY_HEEBO_THIN} />
                                        </View> */}
                                    </View>
                                </View>
                                {/* ACCOUNT_INFO END */}

                                {/* VIDEO OPTIONS START */}
                                <View style={{ position: 'absolute', right: 10, bottom: 10, marginRight: 10 }}>
                                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onPressLike(item, index)}>
                                        <Image resizeMode='contain' source={item.self_liked == 'Y' ? IMAGE_LIKE_ACTIVE : IMAGE_LIKE_WHITE} />
                                        <RegularText title={item.likes} textStyle={{ color: colors.white, marginTop: 3 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignItems: 'center', marginVertical: 15 }} onPress={() => onPressComment(item, index)}>
                                        <Image resizeMode='contain' source={IMAGE_COMMENT_WHITE} />
                                        <RegularText title={item.comments.length} textStyle={{ color: colors.white, marginTop: 3 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => _shareImage(item, index)}>
                                        <Image resizeMode='contain' source={IMAGE_SHARE_WHITE} />
                                        <RegularText title={item.share} textStyle={{ color: colors.white, marginTop: 3 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignItems: 'center', marginVertical: 15 }} onPress={() => onPressDownload(item, index)}>
                                        <Image resizeMode='contain' source={IMAGE_DOWNLOAD} />
                                        <RegularText title={Strings.save} textStyle={{ color: colors.white, marginTop: 3 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignItems: 'center', marginBottom: 10 }} onPress={() => onPressReport(item, index)}>
                                        <Image resizeMode='contain' source={IMAGE_REPORT_WHITE} />
                                        <RegularText title={Strings.report} textStyle={{ color: colors.white, marginTop: 3 }} />
                                    </TouchableOpacity>
                                </View>
                                {/* VIDEO OPTIONS END */}
                            </View>
                        )
                    }}
                />
            }

            {
                video != undefined &&
                <VideoCommentModal
                    visible={showCommentModal}
                    onClose={onCloseCommentModal}
                    userList={video != undefined && video[currentCommetnIndex].comments}
                    onChangeText={onChangeComment}
                    onAddComment={addComment}
                    userComment={comment}
                    modalTitle={Strings.comments}
                    currentUserImage={userImage}
                />
            }

            {
                showLoader &&
                <View style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    backgroundColor: colors.transparentBlack,
                    // height: width / 2,
                    // width: width / 2,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size={"large"} color={colors.ACCENT_COLOR} />
                </View>
            }
            <CustomDownloadLoader
                loading={showDownloadLoader}
                downloadingPercent={downloadingPercent}
            />
        </View>
    );
}

export default ShowVideoScreen;