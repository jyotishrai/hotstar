import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, PermissionsAndroid, Platform, RefreshControl, TouchableOpacity, Image, Alert } from 'react-native';
import * as Utils from '../../../../utility';
import { BookContext } from '../../../../Contexts';
import { IMG_IMAGE_PIC, IMG_EYE, IMAGE_MUSIC_SIMPLE, IMAGE_COMMENT_WHITE, IMAGE_LIKE_ACTIVE, IMAGE_LIKE_WHITE, IMAGE_SHARE_WHITE, IMAGE_DOWNLOAD, IMAGE_REPORT_WHITE, IMAGE_USER, IMG_LOGO } from '../../../../utility/imageRes';
import RowHome from '../../../rows/RowHome';
import { getIsCheck } from '../../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getHomeVideoAction, getVideoCategoriesAction, likeDislikeVideoAction, shareVideoAction, increaseViewOfVidepAction, addCommentOnVideoAction, getMoreHomeVideoAction, clearHomeVideoAction } from '../../../../actions/action'
import { getUserData } from '../../../../utility/CustomAsyncStorage';
import { KEY_USER_DATA, FROM_SCREEN_TYPE, FROM_HOME_SCREEN, VIDEO_SORT_TYPE_NEW_FIRST, VIDEO_SHORT_TYPE, VIDEO_SORT_TYPE_MOST_COMMENTED, SCREEN_REPORT_VIDEO, SCREEN_VIDEO_USER_PROFILE, IS_VIDEO_PAUSED } from '../../../../utility/constants';
import colors from '../../../../utility/Colors';
import RegularText from '../../../common/RegularText';
import CustomLoader from '../../../common/CustomLoader';
import ViewPager from '@react-native-community/viewpager';
import ShowVideoRow from '../../../rows/ShowVideoRow';
import Video from 'react-native-video';
import VideoPlayerRun from 'react-native-video-controls';
import VideoCommentModal from '../../../modals/VideoCommentModal';
import { FONT_FAMILY_HEEBO_THIN } from '../../../../utility/Typography';
import Strings from '../../../../translation/language';
import CustomDownloadLoader from '../../../common/CustomDownloadLoader';
import RNFetchBlob from 'rn-fetch-blob'
import flashMessage from '../../../common/CustomFlashAlert';
import { NavigationAction } from 'react-navigation';
import Share from 'react-native-share'


const { width, height } = Dimensions.get('window')

const Home = ({ }) => {

    const { navigation } = useContext(BookContext)
    const dispatch = useDispatch();
    let selectedvideoPlayer = useRef(null);

    const [allVideos, setAllVideos] = useState(undefined)

    const [categoryData, setCategoryData] = useState(undefined)
    const [reRender, setReRender] = useState(false)
    const [currentCategory, setCurrentCategory] = useState(0)
    const [currentViewItem, setCurrentViewItem] = useState(undefined)
    const [userImage, setUserImage] = useState(undefined)

    const [comment, setComment] = useState('')
    const [showCommentModal, setShowCommentModal] = useState(false)

    const [showDownloadLoader, setShowDownloadLoader] = useState(false)
    const [downloadingPercent, setDownloadingPercent] = useState(0)

    const [currentCommetnIndex, setCurrentCommentIndex] = useState(0)

    const [videoPaused, setVideoPaused] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const [isUserOnHome, setIsUserOnHome] = useState(true)

    const { category, homeVideo, moreVideos, fetching, catFetching } = useSelector(state => ({
        category: state.getVideoCategoriesReducer.videoCategories,
        catFetching: state.getVideoCategoriesReducer.fetching,

        homeVideo: state.getHomeVideoReducer.homeVideo,
        moreVideos: state.getHomeVideoReducer.moreVideos,
        fetching: state.getHomeVideoReducer.fetching,
        error: state.getHomeVideoReducer.error
    }), shallowEqual)

    // alert(JSON.stringify(homeVideo))

    const onViewRef = React.useRef((viewableItems) => {
        // console.warn(JSON.stringify(viewableItems))
        // Use viewable items in state or as intended
        setCurrentViewItem(viewableItems.viewableItems)
        increaseViewsOfVideo(viewableItems.viewableItems[0].item.id, viewableItems.viewableItems[0].item.category_id)
        // alert(JSON.stringify(viewableItems.viewableItems))
        // console.warn('changed')
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    useEffect(() => {

        navigation.addListener(
            'didFocus',
            () => {
                setVideoPaused(true)
                setIsUserOnHome(true)
            }
        );
        navigation.addListener(
            'didBlur',
            () => {
                setVideoPaused(false)
                setIsUserOnHome(false)
            }
        );

        getCurrentUser()

        // if (category == undefined) {
        //     getVideoCategories()
        // }

        // if (category != undefined && category.error == false) {
        //     let cat = category.response.slice()
        //     if (cat[0].category_name != 'All') {
        //         cat.unshift({
        //             id: 0,
        //             category_name: 'All'
        //         })
        //     }
        //     //alert(JSON.stringify(cat))
        //     setCategoryData(cat)
        //     cat[0].isSelected = true
        //     setCurrentCategory(currentCategory)
        // }

        if (homeVideo == undefined) {
            getHomeVideos(1)
        }
        else if (homeVideo != undefined) {
            setHomeVideoData()
        }

        try {
            if (Platform.OS === "android") {
                const userResponse = PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.CAMERA
                ]);
                //return userResponse;
                if (userResponse === PermissionsAndroid.RESULTS.GRANTED) {
                    //console.log("You can use the camera");
                } else {
                    console.log("permission denied");
                }
            }
        } catch (err) {
            //Warning(err);
        }

        return () => {
            setCurrentCategory(0)
            // global[IS_VIDEO_PAUSED] = false
        }

    }, [category, homeVideo, global[IS_VIDEO_PAUSED]])

    function getVideoCategories() {
        dispatch(getVideoCategoriesAction({ page: 0 }))
    }

    function getHomeVideos(page) {
        dispatch(getHomeVideoAction({
            category_id: 0,
            page: page,
            sort_by: 'n' //global[VIDEO_SHORT_TYPE]
        }))
    }

    async function setHomeVideoData() {
        let oldData = allVideos
        if (oldData == undefined) {
            oldData = homeVideo
        } else {
            let a = [...oldData, ...homeVideo]
            oldData = a
        }
        setAllVideos(oldData)
    }

    // alert(JSON.stringify(allVideos))

    function getCurrentUser() {
        Utils.CustomStorage.retrieveItem(Utils.CustomStorage.USER_DATA).then((data) => {
            setUserImage(data.image == '' ? undefined : { uri: data.image })
        }).catch((error) => {

        })
    }

    function increaseViewsOfVideo(vidId, catId) {
        let videoInfo = {
            video_id: vidId,
            category_id: catId,
        }
        dispatch(increaseViewOfVidepAction(videoInfo))
    }

    async function onPressLike(item, index) {
        // let data = homeVideo.response

        if (item.self_liked == 'Y') {
            for (let i = 0; i < allVideos.length; i++) {
                if (index == i) {
                    allVideos[i].likes = allVideos[i].likes - 1
                    allVideos[i].self_liked = 'N' //!allVideos[i].self_liked
                }
            }
        } else {
            for (let i = 0; i < allVideos.length; i++) {
                if (index == i) {
                    allVideos[i].likes = allVideos[i].likes + 1
                    allVideos[i].self_liked = 'Y' //!allVideos[i].self_liked
                }
            }
        }

        setReRender(!reRender)

        dispatch(likeDislikeVideoAction({
            video_id: item.id
        }))
    }

    function onPressComment(item, index) {
        // console.warn(index);

        setCurrentCommentIndex(index)
        setShowCommentModal(true)
    }

    function onCloseCommentModal() {
        // setCurrentCommentIndex(0)
        setShowCommentModal(false)
    }

    function onChangeComment(text) {
        setComment(text)
    }

    async function addComment() {
        console.warn(allVideos[currentCommetnIndex].id);

        dispatch(addCommentOnVideoAction({
            video_id: allVideos[currentCommetnIndex].id,
            comment: comment
        }))
        setComment('')
        for (let i = 0; i < allVideos.length; i++) {
            if (currentCommetnIndex == i) {
                allVideos[i].comments.push({
                    comment: comment,
                    created: new Date(),
                    username: global[KEY_USER_DATA].full_name,
                    image: global[KEY_USER_DATA].image
                })
            }
        }
    }

    //share
    async function onPressShare(item, index) {
        alert(JSON.stringify(item.thumbnail))
        try {
            const result = await Share.share({
                title: 'Found a amazing video on AuditionTube',
                message: 'Download AuditionTube from Playstore and enjoy the short videos.',
                url: item.thumbnail,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {

                } else {
                    dispatch(shareVideoAction({ video_id: item.id }))
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
        }
    }

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
        // global[IS_VIDEO_PAUSED] = false
        navigation.navigate(SCREEN_REPORT_VIDEO, { videoData: item })
    }

    function onPressAcount(item, index) {
        if (global[KEY_USER_DATA].id != item.user_id) {
            navigation.navigate(SCREEN_VIDEO_USER_PROFILE, { video: item })
        }
    }

    function onBuffer(item) {
        console.warn(JSON.stringify(item));
    }

    function renderEmptyList() {
        return (
            <View style={{
                justifyContent: 'center', alignItems: 'center', marginTop: 50
            }}>
                <RegularText
                    title={'No Videos Available To Show'}
                />
            </View>
        )
    }

    async function refreshPage() {
        dispatch(clearHomeVideoAction())
        setAllVideos(undefined)
        // getHomeVideos(1)
        // setCurrentPage(1)
    }

    return (
        <View
            // initialPage={0}
            style={{
                // flex: 1,
                width: width,
                backgroundColor: colors.black,
                height: height - 55
            }}
        // orientation='vertical'
        >
            {
                allVideos != undefined &&
                <FlatList
                    data={allVideos}
                    snapToAlignment='start'
                    initialNumToRender={1}
                    keyExtractor={(item, index) => index.toString()}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    onEndReachedThreshold={0.5}
                    style={{ height: height - 55 }}
                    pagingEnabled={true} decelerationRate={'fast'}
                    ListEmptyComponent={renderEmptyList()}
                    onEndReached={() => {
                        getHomeVideos(currentPage + 1)
                        setCurrentPage(currentPage + 1)
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={fetching != undefined && fetching}
                            onRefresh={() => {
                                refreshPage()
                            }}
                        />
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <TouchableOpacity style={{
                                    // flex: 1,
                                    // alignItems: 'center',
                                    height: height - 55
                                }}
                                    activeOpacity={1}
                                // onPress={() => pauseVideo()}
                                >
                                    {

                                        //    index == 0 &&
                                        //     <Video
                                        //         source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}}
                                        //         style={{ width: width, height: height - 55 }}
                                        //         repeat={true}
                                        //         resizeMode='cover'
                                        //         thumbnail={{ uri: item.thumbnail }}
                                        //         endThumbnail={{ uri: item.thumbnail }}
                                        //         playInBackground={false}
                                        //         paused={
                                        //            currentViewItem != undefined &&
                                        //                currentViewItem[0].index === index && videoPaused ? false : true}
                                        //         selectedVideoTrack={{
                                        //             type: "resolution",
                                        //             value: 72
                                        //         }}
                                        //         // onBuffer={(bufferState) => onBuffer(bufferState.isBuffering)}
                                        //         //  onLoad={onLoad}
                                        //         // bufferConfig={{
                                        //         //     minBufferMs: 15000,
                                        //         //     maxBufferMs: 50000,
                                        //         //     bufferForPlaybackMs: 2500,
                                        //         //     bufferForPlaybackAfterRebufferMs: 5000
                                        //         // }}
                                        //     />

                                        isUserOnHome && currentViewItem != undefined && index == currentViewItem[0].index ?
                                            <VideoPlayerRun
                                                style={{ width: width, height: height - 55 }}
                                                ref={(ref) => { selectedvideoPlayer = ref; }}
                                                toggleResizeModeOnFullscreen={false}
                                                source={{ uri: item.video }}
                                                replay={true}
                                                paused={currentViewItem != undefined && currentViewItem[0].index === index && videoPaused ? false : true}
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
                                                // onEnd={(item) => { selectedvideoPlayer && selectedvideoPlayer.seek(0); alert(selectedvideoPlayer.seek()) }}
                                                onBuffer={onBuffer}
                                                onBack={() => null}
                                                navigator={navigation}
                                            // onError={(err) => alert(err)}
                                            />
                                            // <Image
                                            //     style={{ width: width, height: height - 55 }}
                                            //     source={{ uri: item.thumbnail }}
                                            //     resizeMode='cover'
                                            // />
                                            :
                                            <Image
                                                style={{ width: width, height: height - 55 }}
                                                source={{ uri: item.thumbnail }}
                                                resizeMode='cover'
                                            />
                                    }
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'row',
                                    height: 55,
                                    alignItems: 'center',
                                    paddingHorizontal: 15,
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
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
                                        <RegularText title={item.views} textStyle={{ color: colors.white, marginLeft: 5, fontSize: 12 }} />
                                    </View>
                                </View>
                                {/* HEADER  END*/}

                                {/* ACCOUNT_INFO START */}
                                <View style={{
                                    position: 'absolute',
                                    left: 10,
                                    bottom: 20
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ height: 55, width: 55, borderRadius: 30, margin: 10 }} onPress={() => onPressAcount(item, index)}>
                                            <Image style={{ height: 55, width: 55, borderRadius: 30, borderWidth: 1, borderColor: colors.white, }}
                                                source={item.user_image != '' ? { uri: item.user_image } : IMAGE_USER}
                                            />
                                        </TouchableOpacity>
                                        <RegularText title={item.user_name} textStyle={{ color: colors.white, fontSize: 15 }} />
                                    </View>
                                    {
                                        item.tag != '' &&
                                        <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                                            <RegularText title={item.tag} textStyle={{ color: colors.white }} />
                                            {/* <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                            <Image resizeMode='contain' source={IMAGE_MUSIC_SIMPLE} style={{ tintColor: colors.white, height: 10, width: 10, marginRight: 5 }} />
                                            <RegularText title={'Original Music by Nehamaik'} textStyle={{ color: colors.white }} font={FONT_FAMILY_HEEBO_THIN} />
                                        </View> */}
                                        </View>
                                    }
                                </View>
                                {/* ACCOUNT_INFO END */}

                                {/* VIDEO OPTIONS START */}
                                <View style={{ position: 'absolute', right: 10, bottom: 20, marginRight: 10 }}>
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
                allVideos != undefined &&
                <VideoCommentModal
                    visible={showCommentModal}
                    onClose={onCloseCommentModal}
                    userList={allVideos != undefined && allVideos[currentCommetnIndex].comments}
                    onChangeText={onChangeComment}
                    onAddComment={addComment}
                    userComment={comment}
                    modalTitle={Strings.comments}
                    currentUserImage={userImage}
                />
            }
            <CustomDownloadLoader
                loading={showDownloadLoader}
                downloadingPercent={downloadingPercent}
            />
        </View>
    );
}

export default Home;