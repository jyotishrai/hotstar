import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    StatusBar
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as Utils from '../../utility'
import { DEVICE_ID, DEVICE_TOKEN, KEY_USER_DATA, USER_TOKEN, VIDEO_SHORT_TYPE, VIDEO_SORT_TYPE_NEW_FIRST } from '../../utility/constants';
import { USER_DATA } from '../../utility/CustomAsyncStorage';
import DeviceInfo from 'react-native-device-info';


const Splash = ({ navigation }) => {

    // const { loginRes, fetching, error } = useSelector(state => ({
    //     loginRes: state.loginReducer.data,
    //     fetching: state.loginReducer.fetching,
    //     error: state.loginReducer.error,
    // }), shallowEqual);

    const navigateTo = (route) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: route })],
        });
        navigation.dispatch(resetAction);
    }

    useEffect(() => {

        global[VIDEO_SHORT_TYPE] = VIDEO_SORT_TYPE_NEW_FIRST

        Utils.CustomStorage.retrieveItem(Utils.CustomStorage.USER_DATA).then((data) => {
            setTimeout(() => {
                if (data != undefined && data != null) {

                    //1
                    global[KEY_USER_DATA] = data;

                    //2
                    Utils.CustomStorage.retrieveItem(USER_TOKEN).then((userToken) => {
                        //alert(JSON.stringify(deviceId))
                        global[USER_TOKEN] = userToken
                        console.log('userToken>>>>>', userToken);
                    })

                    //3
                    Utils.CustomStorage.retrieveItem(DEVICE_ID).then((deviceId) => {
                        //alert(JSON.stringify(deviceId))
                        global[DEVICE_ID] = deviceId
                        console.log('deviceId>>>>>', deviceId);
                    })

                    //4
                    Utils.CustomStorage.retrieveItem(DEVICE_TOKEN).then((deviceToken) => {
                        //alert(JSON.stringify(deviceId))
                        global[DEVICE_TOKEN] = deviceToken
                        console.log('deviceToken>>>>>', deviceToken);
                    })

                    navigation.navigate(Utils.Constants.KEY_HOME_TAB);
                }
                else {
                    navigation.navigate(Utils.Constants.KEY_AUTH);
                }
            }, 2500);
        })
            .catch((error) => {
                FlashMessage(error, 'warning')
            })
    })
    return (

        <ImageBackground source={Utils.ImgPath.IMG_SLASH} style={styles.imgBg} >
            <StatusBar hidden></StatusBar>
        </ImageBackground>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    imgBg: {
        flex: 1
    }
});

export default Splash;