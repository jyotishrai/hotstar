import { Dimensions } from 'react-native'
import flashMessage from '../components/common/CustomFlashAlert';
import Strings from '../translation/language';
import moment from 'moment';
import { FROM_HOME_SCREEN, FROM_LIKED_VIDEOS_SCREEN, FROM_COMMENTED_VIDEOS_SCREEN, FROM_MY_VIDEOS_SCREEN, FROM_SEARCH_VIDEOS_SCREEN, FROM_REPORTED_VIDEOS_SCREEN, FROM_SHARED_VIDEOS_SCREEN, FROM_OTHER_USER_VIDEOS_SCREEN, PARAMS } from './constants';
import firebase from 'react-native-firebase';
import colors from './Colors';

const { width } = Dimensions.get('window')

export const getMinFromSec = (time) => {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

export const emailValidator = (email) => {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    else {
        return false
    }

}

export const passwordValidator = (password) => {
    if (password.length < 2) {
        flashMessage(Strings.too_short, "danger")
    }
    else {
        return (true)
    }
}

export const isTextInputNotEmptyValidator = (text) => {
    if (text == '') {
        return true
    }
    else {
        return false
    }
}

export const mobileNumberValidator = (text) => {
    if (text.length < 10 || text.length > 10) {
        return false
    }
    else {
        return true
    }
}

// export const getTimeInUtc = (time, formt) => {
//     let tim = new Date(time);
//     //return moment(tim.toISOString()).utcOffset("PDT").format(formt);
//     // return moment(tim.toUTCString()).format(formt)
//     return moment(tim).format('MMM DD h:mm A');
// }

export const convertDateTime = (date1, formt) => {
    let date = new Date(parseInt(date1))
    return moment(date1).format(formt)
}

export const updateLikesMethod = (fromScreen, videoIndex, currentLikes, fromScreenAllVideos, selfLiked) => {

    let allVideos = fromScreenAllVideos

    for (let i = 0; i < allVideos.response.length; i++) {
        if (i == videoIndex) {
            allVideos.response[videoIndex].likes = currentLikes;
            allVideos.response[videoIndex].self_liked = selfLiked;
            break;
        }
    }
    return allVideos

    // if (fromScreen == FROM_HOME_SCREEN) {
    //     for (let i = 0; i < allVideos.response.length; i++) {
    //         if (i == videoIndex) {
    //             allVideos.response[videoIndex].likes = currentLikes;
    //             allVideos.response[videoIndex].self_liked = selfLiked;
    //             break;
    //         }
    //     }
    //     return allVideos
    // }
    // else if (fromScreen == FROM_LIKED_VIDEOS_SCREEN) {
    //     for (let i = 0; i < allVideos.response.length; i++) {
    //         if (i == videoIndex) {
    //             allVideos.response[videoIndex].likes = currentLikes;
    //             allVideos.response[videoIndex].self_liked = selfLiked;
    //             break;
    //         }
    //     }
    //     return allVideos
    // }
    // else if (fromScreen == FROM_COMMENTED_VIDEOS_SCREEN) {

    // }
    // else if (fromScreen == FROM_MY_VIDEOS_SCREEN) {

    // }
    // else if (fromScreen == FROM_SEARCH_VIDEOS_SCREEN) {

    // }
    // else if (fromScreen == FROM_REPORTED_VIDEOS_SCREEN) {

    // }
    // else if (fromScreen == FROM_SHARED_VIDEOS_SCREEN) {

    // }
    // else if (fromScreen == FROM_OTHER_USER_VIDEOS_SCREEN) {

    // }
}


export const displayAndroidNotification = (notificatDataObj) => {

    // var notificatDataObj = message;
    try {
        console.log('messageData: ', notificatDataObj)
        const channel = new firebase.notifications.Android.Channel('my_default_channel', 'my_default_channel', firebase.notifications.Android.Importance.Max)
            .setDescription('my_default_channel');
        firebase.notifications().android.createChannel(channel);

        // Create the channel

        var notification = new firebase.notifications.Notification();
        notification.android.setColor(colors.darkSkyBlue);
        var notificationId = (new Date).getTime().toString();
        notification.setNotificationId(notificationId);
        notification.android.setChannelId('my_default_channel');
        notification.setTitle(notificatDataObj.data.title);
        notification.setBody(notificatDataObj.data.body);
        console.log('EMITTER_NOTIFICATION displayAndroidNotification data :::', notificatDataObj.data);

        if (notificatDataObj.data.bigPicture != undefined &&
            notificatDataObj.data.bigPicture != null &&
            notificatDataObj.data.bigPicture != '') {

            notification.android.setBigPicture(notificatDataObj.data.bigPicture)
        }
        else {
            notification.android.setBigText(notificatDataObj.data.body);
        }
        // else if (notificatDataObj.data.bigText != undefined &&
        //   notificatDataObj.data.bigText != null &&
        //   notificatDataObj.data.bigText != '') {
        //   notification.android.setBigText(notificatDataObj.data.bigText)
        // }
        if (notificatDataObj.data[PARAMS.KEY_NOTIFICATION_DATA] != undefined)
            notification.setData(JSON.parse(notificatDataObj.
                data[PARAMS.KEY_NOTIFICATION_DATA]));
        firebase.notifications()
            .displayNotification(notification);

    } catch (error) {
        console.error();

        console.log('error :::', error[PARAMS.KEY_MESSAGE]);
    }
}

export const displayIosNotification = (notification) => {
    console.log('messageData: ', notification);
    const localNotification = new firebase.notifications.Notification();
    localNotification.setNotificationId((new Date).getTime().toString());
    localNotification.setTitle(notification.title);
    localNotification.setBody(notification.body);
    if (notification.data.bigPicture != undefined &&
        notification.data.bigPicture != null &&
        notification.data.bigPicture != '') {
        notification.ios.setLaunchImage(notification.data.bigPicture)
    }
    localNotification.setData(notification.data);
    if (notification[PARAMS.KEY_DATA][PARAMS.KEY_NOTIFICATION_DATA_IOS]
        != undefined) {
        console.log('messageData [Constants.KEY_NOTIFICATION_DATA]: ',
            notification[PARAMS.KEY_DATA][PARAMS.KEY_NOTIFICATION_DATA_IOS])
        localNotification.setData(JSON.parse(notification[PARAMS.KEY_DATA]
        [PARAMS.KEY_NOTIFICATION_DATA_IOS]));
    }

    firebase.notifications()
        .displayNotification(localNotification);
}