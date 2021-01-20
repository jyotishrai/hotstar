import React, { useState, useContext, useEffect, useDebugValue } from 'react';
import { View, FlatList, Dimensions, Image, TouchableOpacity, Share, StatusBar, ActivityIndicator, Permission } from 'react-native';
import * as Utils from '../../utility';
import { BookContext } from '../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_VIDEO_SCREEN_SAMPLE, IMG_BACK, IMG_EYE, IMAGE_USER, IMAGE_MUSIC, IMAGE_MUSIC_SIMPLE, IMAGE_LIKE_WHITE, IMAGE_COMMENT_WHITE, IMAGE_SHARE_WHITE, IMAGE_DOWNLOAD, IMAGE_REPORT_WHITE, IMAGE_PLAY, IMAGE_LIKE_BORDER, IMAGE_LIKE_ACTIVE } from '../../utility/imageRes';
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
} from '../../actions/action'
import RegularText from '../common/RegularText';
import colors from '../../utility/Colors';
import NavigationService from '../../NavigationService'
import { FONT_FAMILY_LIGHT, FONT_FAMILY_HEEBO_THIN, FONT_FAMILY_HEEBO_MEDIUM, FONT_FAMILY_HEEBO_REGULAR } from '../../utility/Typography';
import Strings from '../../translation/language';
import VideoLikesModal from '../modals/VideoLikesModal';
import VideoCommentModal from '../modals/VideoCommentModal';
import { SCREEN_REPORT_VIDEO, SCREEN_VIDEO_USER_PROFILE, FROM_SCREEN_TYPE, FROM_HOME_SCREEN, FROM_LIKED_VIDEOS_SCREEN, FROM_COMMENTED_VIDEOS_SCREEN, FROM_MY_VIDEOS_SCREEN, FROM_SEARCH_VIDEOS_SCREEN, FROM_REPORTED_VIDEOS_SCREEN, FROM_SHARED_VIDEOS_SCREEN, FROM_OTHER_USER_VIDEOS_SCREEN } from '../../utility/constants';
import Video from 'react-native-video';
import CustomLoader from '../common/CustomLoader';
import CustomDownloadLoader from '../common/CustomDownloadLoader';
import flashMessage from '../common/CustomFlashAlert';
import RNFetchBlob from 'rn-fetch-blob'
import { getUserData } from '../../utility/CustomAsyncStorage';
import { updateLikesMethod } from '../../utility/Utils';

const { width, height } = Dimensions.get('window')

const ShowVideoScreen = ({ navigation, video, videoIndex, fromScreen }) => {

    const dispatch = useDispatch();

    const [userImage, setUserImage] = useState(undefined)

    const [isSelfLiked, setIsSelfLiked] = useState(false)
    const [currentLikes, setCurrentLikes] = useState(0)
    const [showLikesModal, setShowLikesModal] = useState(false)

    const [comment, setComment] = useState('')
    const [showCommentModal, setShowCommentModal] = useState(false)

    const [showLoader, setShowLoader] = useState(false)

    const [showDownloadLoader, setShowDownloadLoader] = useState(false)
    const [downloadingPercent, setDownloadingPercent] = useState(0)
    const [playToggle, setPlayToggle] = useState(false)

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

    useEffect(() => {

        // getCurrentUser()

        if (video != undefined) {
            if (video.self_liked == 'Y' || video.self_liked == 'y') {
                setIsSelfLiked(true)
            } else {
                setIsSelfLiked(false)
            }
            // getVideoComments(video.id)
            // increaseViewsOfVideo(video.id, video.category_id)
        }

        return () => {
            // dispatch(clearLikeDislikeVideoAction({}))
            // dispatch(clearIncreaseViewOfVidepAction({}))
            // dispatch(clearAddCommentOnVideoAction({}))
            // dispatch(clearShareVideoAction({}))
            // dispatch(clearVideoDownloadedAction({}))
            // setPlayToggle(true)
        }

    }, [])

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
    async function onPressLike() {
        if (isSelfLiked) {
            setCurrentLikes(currentLikes - 1)
            // updateLikes(currentLikes - 1, 'N')
        } else {
            setCurrentLikes(currentLikes + 1)
            // updateLikes(currentLikes + 1, 'Y')
        }
        setIsSelfLiked(!isSelfLiked)

        dispatch(likeDislikeVideoAction({
            video_id: video.id
        }))
    }

    async function updateLikes(likes, selfLike) {
        // if (fromScreen == FROM_HOME_SCREEN) {
        //     let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, homeVideo, selfLike)
        //     dispatch(updateHomeVideoAction(updatedData))
        // }
        // else if (fromScreen == FROM_LIKED_VIDEOS_SCREEN) {
        //     let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, likedVideos, selfLike)
        //     dispatch(updateLikedVideosByUserAction(updatedData))
        // }
        // else if (fromScreen == FROM_COMMENTED_VIDEOS_SCREEN) {
        //     let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, commentedVideos, selfLike)
        //     dispatch(updateCommentedVideosByUserAction(updatedData))
        // }
        // else if (fromScreen == FROM_MY_VIDEOS_SCREEN) {
        //     let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, myVideos, selfLike)
        //     dispatch(updateMyVideosAction(updatedData))
        // }
        // else if (fromScreen == FROM_SEARCH_VIDEOS_SCREEN) {

        // }
        // else if (fromScreen == FROM_REPORTED_VIDEOS_SCREEN) {
        //     let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, reportedVideos, selfLike)
        //     dispatch(updateMyVideosAction(updatedData))
        // }
        // else if (fromScreen == FROM_SHARED_VIDEOS_SCREEN) {

        // }
        // else if (fromScreen == FROM_OTHER_USER_VIDEOS_SCREEN) {
        //     let updatedData = await updateLikesMethod(fromScreen, videoIndex, likes, videoUserProfileData, selfLike)
        //     dispatch(updateMyVideosAction(updatedData))
        // }
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

    function onPressComment() {
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
            video_id: video.id,
            comment: comment
        }))

        setTimeout(() => {
            getVideoComments(video.id)
        }, 2000)
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

    //download
    function onPressDownload() {

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
            .fetch('GET', video.video, {
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
    function onPressReport() {
        setPlayToggle(true)
        navigation.navigate(SCREEN_REPORT_VIDEO, { videoData: video })
    }

    //video user
    function onPressAcount() {
        setPlayToggle(true)
        navigation.navigate(SCREEN_VIDEO_USER_PROFILE, { video: video })
    }

    function onBuffer(isBuffering) {
        setShowLoader(isBuffering)
    }

    function pauseVideo() {
        setPlayToggle(!playToggle)
    }

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
                {/* <Image
                    resizeMode='cover'
                    style={{
                        width: width,
                        height: height
                    }}
                    source={IMAGE_VIDEO_SCREEN_SAMPLE}
                /> */}
                {
                    // video != undefined &&
                    // <Video
                    //     source={{ uri: video.video }}
                    //     style={{
                    //         width: width,
                    //         height: height,
                    //     }}
                    //     repeat={true}
                    //     resizeMode='cover'
                    //     paused={playToggle}
                    //     selectedVideoTrack={{
                    //         type: "resolution",
                    //         value: 144
                    //     }}
                    //     onBuffer={(bufferState) => onBuffer(bufferState.isBuffering)}
                    //     //  onLoad={onLoad}
                    //     bufferConfig={{
                    //         minBufferMs: 15000,
                    //         maxBufferMs: 50000,
                    //         bufferForPlaybackMs: 2500,
                    //         bufferForPlaybackAfterRebufferMs: 5000
                    //     }}
                    // />
                    <Image
                        source={{ uri: video.thumbnail }}
                        style={{
                            width: width,
                            height: height,
                        }}
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
                    <RegularText title={video != undefined ? video.views : 0} textStyle={{ color: colors.white, marginLeft: 5, fontSize: 12 }} />
                </View>
            </View>
            {/* HEADER  END*/}

            {/* ACCOUNT_INFO START */}
            <View style={{
                position: 'absolute',
                left: 10,
                bottom: 100
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{
                        height: 55,
                        width: 55,
                        borderRadius: 30,
                        margin: 10
                    }}
                        onPress={() => onPressAcount()}>
                        <Image
                            style={{
                                height: 55,
                                width: 55,
                                borderRadius: 30,
                                borderWidth: 1,
                                borderColor: colors.white,
                            }}
                            source={video != undefined && video.user_image != '' ? { uri: video.user_image } : IMAGE_USER}
                        />
                    </TouchableOpacity>
                    <RegularText title={video != undefined ? video.user_name : ''} textStyle={{ color: colors.white, fontSize: 15 }} />
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                    <RegularText title={video != undefined ? video.tag : ''} textStyle={{ color: colors.white }} />
                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                        <Image resizeMode='contain' source={IMAGE_MUSIC_SIMPLE} style={{ tintColor: colors.white, height: 10, width: 10, marginRight: 5 }} />
                        <RegularText title={'Original Music by Nehamaik'} textStyle={{ color: colors.white }} font={FONT_FAMILY_HEEBO_THIN} />
                    </View>
                </View>
            </View>
            {/* ACCOUNT_INFO END */}

            {/* VIDEO OPTIONS START */}
            <View style={{ position: 'absolute', right: 10, bottom: 100, marginRight: 10 }}>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPressLike}>
                    <Image resizeMode='contain' source={isSelfLiked ? IMAGE_LIKE_ACTIVE : IMAGE_LIKE_WHITE} />
                    <RegularText title={currentLikes} textStyle={{ color: colors.white, marginTop: 3 }} />
                    {/* video != undefined ? video.likes : 0 */}
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', marginVertical: 15 }} onPress={() => onPressComment()}>
                    <Image resizeMode='contain' source={IMAGE_COMMENT_WHITE} />
                    <RegularText
                        title={videoComments != undefined && videoComments.error == true ? 0 : videoComments != undefined ? videoComments.response.length : 0}
                        textStyle={{ color: colors.white, marginTop: 3 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onPressShare()}>
                    <Image resizeMode='contain' source={IMAGE_SHARE_WHITE} />
                    <RegularText title={video != undefined ? video.share : 0} textStyle={{ color: colors.white, marginTop: 3 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', marginVertical: 15 }} onPress={() => onPressDownload()}>
                    <Image resizeMode='contain' source={IMAGE_DOWNLOAD} />
                    <RegularText title={Strings.save} textStyle={{ color: colors.white, marginTop: 3 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', marginBottom: 10 }} onPress={() => onPressReport()}>
                    <Image resizeMode='contain' source={IMAGE_REPORT_WHITE} />
                    <RegularText title={Strings.report} textStyle={{ color: colors.white, marginTop: 3 }} />
                </TouchableOpacity>
            </View>
            {/* VIDEO OPTIONS END */}

            <VideoCommentModal
                visible={showCommentModal}
                onClose={onCloseCommentModal}
                userList={videoComments != undefined && videoComments.response}
                onChangeText={onChangeComment}
                onAddComment={addComment}
                userComment={comment}
                modalTitle={Strings.comments}
                currentUserImage={userImage}
            />

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