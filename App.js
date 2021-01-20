/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
  Platform,
  Alert
} from 'react-native';

import 'react-native-gesture-handler';
import Navigator from './src/navigations';
import configureStore from './src/ConfigStore';
import { Provider } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import colors from './src/utility/Colors';
import { SafeAreaView } from 'react-navigation';
import NavigationService from './src/NavigationService'
//import { NavigationContainer } from '@react-navigation/native';
import { displayAndroidNotification, displayIosNotification } from './src/utility/Utils';
import { PARAMS, IS_VIDEO_PAUSED } from './src/utility/constants';
import firebase from 'react-native-firebase'

//enableScreens();
const store = configureStore();

const App = () => {


  async function callNoti() {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {
        console.log("fire base error :", error);

        alert(error);
      }
      try {
        getNotifications();
      } catch (error) {
        console.warn("callNoti:::11:", error);

      }
    } else {

      try {
        getNotifications();
      } catch (error) {
        console.warn("getNotifications::::", error);

      }
    }

    if (Platform.OS == PARAMS.OS_TYPE_ANDROID) {
      firebase.notifications().getInitialNotification()
        .then((notificationOpen) => {
          if (notificationOpen) {
            const action = notificationOpen.action;
            const notification = notificationOpen.notification;
            notificationCalled(notification);
          }
        });
    }
    else {
      let launchData = 'launchData'//this.props
      if (launchData != undefined) {
        let notiFicationFromIosLaunch = launchData["noti"]
        if (notiFicationFromIosLaunch != undefined) {
          global[PARAMS.EMITTER_NOTIFICATION] = notiFicationFromIosLaunch;
        }
      }
    }
  }

  async function getNotifications() {

    console.log('here:: in getnotification');

    const channel = await new firebase.notifications.Android.Channel(
      'my_default_channel', 'my_default_channel', firebase.notifications.Android.Importance.Max)
      .setDescription('my_default_channel');
    firebase.notifications().android.createChannel(channel);

    const notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log('EMITTER_NOTIFICATION data displayed::: ', notification.data)
    });

    const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      var notification = notificationOpen.notification;
      notificationCalled(notification);
    });

    if (Platform.OS === PARAMS.OS_TYPE_ANDROID) {

      try {
        // const messageListener = firebase.messaging().onMessage((notification) => {
        //   console.log('notification.data value onMessage EMITTER_NOTIFICATION: ', JSON.stringify(notification));
        //   // displayAndroidNotification(notification)
        // });

        const messageListener = firebase.notifications().onNotification(notification => {
          console.log('notification.data value onMessage EMITTER_NOTIFICATION: ', notification);
          // alert('Recieved')
          displayAndroidNotification(notification)
        });

      } catch (error) {
        console.log(error)
        // alert(error)
      }
    }
    else if (Platform.OS === PARAMS.OS_TYPE_IOS) {
      const notificationListener = firebase.notifications().onNotification((notification) => {
        alert(notification)
        console.log('notificationData value onNotification EMITTER_NOTIFICATION: ', notification);
        displayIosNotification(notification);
      });
    }

  }

  function notificationCalled(notif) {
    console.log('noti>>>>>>>>', notif);
    // alert('Notification tap kiyaaa ::: ', JSON.stringify(notif));
    firebase.notifications().removeDeliveredNotification(notif.notificationId);
    global[PARAMS.EMITTER_NOTIFICATION] = notif;
    //this.goTONextScrn();
  }


  useEffect(() => {
    callNoti();

    global[IS_VIDEO_PAUSED] = false
    return () => {

    }
  }, [])

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.STATUS_BAR_COLOR }} forceInset={{ bottom: 'always' }}>
        <StatusBar backgroundColor={colors.STATUS_BAR_COLOR} barStyle="dark-content" />
        <Provider store={store}>
          {/* <NavigationContainer > */}
          <Navigator
            ref={navigationRef => {
              NavigationService.setTopLevelNavigator(navigationRef, (this))
            }}>
          </Navigator>
          {/* </NavigationContainer> */}
          <FlashMessage position="top" />
        </Provider>
      </SafeAreaView>
    </>
  );
};

export default App;
