import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import * as Utils from '../utility';
import Home from '../components/screens/HomeTabs/Home';
import Strings from '../translation/language';
import React from 'react';
import colors from '../utility/Colors';
import ImageX from '../icons/image'
import { Platform, Dimensions, View, Image, TouchableOpacity, OView } from 'react-native';
import SearchPage from '../components/screens/HomeTabs/Search';
import ProfilePage from '../components/screens/HomeTabs/Profile';
import FilterPage from '../components/screens/HomeTabs/Filter';
import AuditionTubePage from '../components/screens/HomeTabs/AuditionTube';
import { IMG_SEARCH, IMG_ADD } from '../utility/imageRes';
const { width, height } = Dimensions.get('window');
import ViewOverflow from 'react-native-view-overflow';
import { IS_VIDEO_PAUSED } from '../utility/constants';

const AddButton = () => {

  return (
    <View
      style={{
        // position: 'absolute',
        // bottom: -10,
        // zIndex: 2,
        // overflow: 'visible',

      }}>
      <Image
        source={IMG_ADD}
        style={{
          height: 40,
          width: 40
        }}
        resizeMode='contain'
      />
    </View>
  )
}

const BottomTabs = createMaterialBottomTabNavigator(
  {
    [Utils.Constants.KEY_HOME_TAB]: {
      screen: Home,
      path: 'home',
      navigationOptions: {
        headerTitle: Strings.home,
        title: (Strings.home),
        tabBarColor: 'red',
        tabBarVisible: true,
        // tabBarOnPress: ({ defaultHandler, navigation }) => { global[IS_VIDEO_PAUSED] = false },
        // tabBarOnPress: () => { global[IS_VIDEO_PAUSED] = false },
        tabBarIcon: ({ focused }) =>
          <ImageX
            mode={'contain'}
            src={focused ? Utils.ImgPath.IMG_TAB_HOME_INACTIVE : Utils.ImgPath.IMG_TAB_HOME_INACTIVE}
            tintColor={focused ? colors.white : colors.grey600}
          />
      },
    },
    [Utils.Constants.KEY_SEARCH_TAB]: {
      screen: SearchPage,
      path: 'search',
      navigationOptions: {
        headerTitle: (Strings.search),
        title: (Strings.search),
        tabBarVisible: true,
        // tabBarOnPress: ({ defaultHandler, navigation }) => { global[IS_VIDEO_PAUSED] = true },
        // tabBarOnPress: () => { global[IS_VIDEO_PAUSED] = false  },
        tabBarIcon: ({ focused }) =>
          <ImageX
            mode={'contain'}
            src={focused ? Utils.ImgPath.IMG_SEARCH : Utils.ImgPath.IMG_SEARCH}
            tintColor={focused ? colors.white : colors.grey600}
          />
      },
    },
    // [Utils.Constants.KEY_AUDITION_TAB]: {
    //   screen: AuditionTubePage, //() => null,
    //   path: 'audition',
    //   navigationOptions: () => ({
    //     // tabBarOnPress: () => { global[IS_VIDEO_PAUSED] = false },
    //     title: (''),
    //     tabBarIcon: (<AddButton />),
    //     showLabel: false
    //   }),
    // },
    [Utils.Constants.KEY_PROFILE_TAB]: {
      screen: ProfilePage,
      path: 'rankings',
      navigationOptions: {
        headerTitle: (Strings.profile),
        // title: (Strings.profile),
        title:"Comming Soon",
        // tabBarOnPress: ({ defaultHandler, navigation }) => { global[IS_VIDEO_PAUSED] = true },
        // tabBarOnPress: () => { global[IS_VIDEO_PAUSED] = false },
        tabBarIcon: ({ focused }) =>
          <ImageX
            mode={'contain'}
            src={focused ? Utils.ImgPath.IMAGE_TAB_PROFILE : Utils.ImgPath.IMAGE_TAB_PROFILE}
            tintColor={focused ? colors.white : colors.grey600}
          />

      },
    },

    [Utils.Constants.KEY_FILTER_TAB]: {
      screen: FilterPage,
      path: 'filter',
      navigationOptions: {
        headerTitle: (Strings.filter),
        // title: (Strings.gallary),
        title : "Downloads", 
        // tabBarOnPress: ({ defaultHandler, navigation }) => { global[IS_VIDEO_PAUSED] = true },
        // tabBarOnPress: () => { global[IS_VIDEO_PAUSED] = false },
        tabBarIcon: ({ focused }) =>
          <ImageX
            mode={'contain'}
            src={focused ? Utils.ImgPath.IMAGE_TAB_FILTER : Utils.ImgPath.IMAGE_TAB_FILTER}
            tintColor={focused ? colors.white : colors.grey600}
          />
      },
    },
  },

  {
    lazy: true,
    initialRouteName: Utils.Constants.KEY_HOME_TAB,
    // activeColor: colors.ACCENT_COLOR,
    activeColor: colors.white,
    shifting: false,
    labeled: true,
    // inactiveColor: colors.BLUE_COLOR,
    inactiveColor: colors.grey600,

    barStyle: {
      // backgroundColor: colors.white,
      backgroundColor: 'black',
      height: 55,
      bottom: ((Platform.OS === 'ios' && height === 812) ? 20 : 0),
      justifyContent: 'center',
    }
  },
);


export default createStackNavigator(
  {
    bottomTabs: BottomTabs,
  },

  {
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
    initialRouteName: 'bottomTabs',
  },
);

// export default DrawerNavigator;