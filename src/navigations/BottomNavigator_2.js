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
import { IMG_SEARCH, IMG_ADD, IMAGE_TAB_FILTER } from '../utility/imageRes';
const { width, height } = Dimensions.get('window');
import ViewOverflow from 'react-native-view-overflow';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function tabIcon(resName, tabName, focused, badgeCount) {
  return (
    <View
      style={{
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        accessible: false
      }}
    >
      {
        (IMG_ADD == resName ?
          (
            <Image
              source={resName}
              style={{
                position: 'absolute',
                zIndex: 10,
              }}
            />
            //null
          )
          :
          (
            <Image source={resName}
              style={{
                tintColor: focused ? colors.ACCENT_COLOR : colors.textColor,
              }}
            />
          )
        )
      }
    </View>
  );
}

const BottomTabs = createMaterialBottomTabNavigator(
  {
    [Utils.Constants.KEY_HOME_TAB]: {
      screen: Home,
      navigationOptions: () => ({
        title: (Strings.home)
      }),
    },
    [Utils.Constants.KEY_SEARCH_TAB]: {
      screen: SearchPage,
      navigationOptions: () => ({
        title: (Strings.search)
      }),
    },
    [Utils.Constants.KEY_AUDITION_TAB]: {
      screen: AuditionTubePage,
      navigationOptions: () => ({
        title: ('')
      }),
    },
    [Utils.Constants.KEY_PROFILE_TAB]: {
      screen: ProfilePage,
      navigationOptions: () => ({
        title: (Strings.profile)
      }),
    },

    [Utils.Constants.KEY_FILTER_TAB]: {
      screen: FilterPage,
      navigationOptions: () => ({
        title: (Strings.filter)
      }),
    },
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {

        const { routeName } = navigation.state;
        let resName = IMAGE_TAB_FILTER;

        if (routeName == Utils.Constants.KEY_HOME_TAB) {
          resName = Utils.ImgPath.IMG_TAB_HOME_INACTIVE;
          tabName = Utils.Constants.KEY_HOME_TAB;
        } else if (routeName == Utils.Constants.KEY_SEARCH_TAB) {
          resName = Utils.ImgPath.IMG_SEARCH;
          tabName = Utils.Constants.KEY_HOME_TAB;
        } else if (routeName == Utils.Constants.KEY_AUDITION_TAB) {
          resName = IMG_ADD;
          tabName = Utils.Constants.KEY_HOME_TAB;
        }
        else if (routeName == Utils.Constants.KEY_PROFILE_TAB) {
          resName = Utils.ImgPath.IMAGE_TAB_PROFILE;
          tabName = Utils.Constants.KEY_HOME_TAB;
        }
        else if (routeName == Utils.Constants.KEY_FILTER_TAB) {
          resName = Utils.ImgPath.IMAGE_TAB_FILTER;
          tabName = Utils.Constants.KEY_HOME_TAB;
        }
        return (tabIcon(resName, tabName, focused))

      },
    }),
    initialRouteName: Utils.Constants.KEY_HOME_TAB,
    activeColor: colors.ACCENT_COLOR,
    shifting: false,
    labeled: true,
    sceneAnimationEnabled: true,
    inactiveColor: colors.BLUE_COLOR,
    barStyle: {
      backgroundColor: colors.white,
      height: 55,
      bottom: ((Platform.OS === 'ios' && height === 812) ? 20 : 0),
    },
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


 //export default DrawerNavigator;