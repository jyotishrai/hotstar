import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import colors from '../../../../utility/Colors';
import Home from './Home'
import { BookContext } from '../../../../Contexts';
import { IMG_BG } from '../../../../utility/imageRes';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Strings from '../../../../translation/language'
import { FONT_REGULAR_AUDIOWIDE } from '../../../../utility/Typography';
import CommonHeaderTitle from '../../../common/CommonHeaderTitle';
import Home1 from './Home1';


const HomePage = ({ navigation }) => {

    const [tabArray] = useState([
        { name: Strings.all },
        { name: Strings.gaming },
        { name: Strings.news },
        { name: Strings.films },
        { name: Strings.fashion },
        { name: Strings.art }
    ]);

    let RouteConfigs = {}

    for (const iterator of tabArray) {
        RouteConfigs[iterator.name] = Home
    }


    const TabNavigatorConfig = {

        initialRouteName: Strings.all,
        backBehavior: 'none',
        scrollEnabled: true,
        lazy: true,
        tabBarOptions: {
            upperCaseLabel: false,
            activeTintColor: colors.ACCENT_COLOR,
            inactiveTintColor: colors.grey600,
            indicatorStyle: { backgroundColor: colors.ACCENT_COLOR, height: 2, marginBottom: 2 },
            scrollEnabled: true,
            pressColor: colors.transparent,
            swipeEnabled: false,
            animationEnabled: false,
            tabStyle: { width: 90 },
            style: { backgroundColor: colors.white, height: 45, margin: 0, },
            labelStyle: { fontSize: 12, margin: 0 },
            //  indicatorContainerStyle: { backgroundColor: 'red' }
        }
    }
    const TopTabNavigator = createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);
    const TopTabContainer = createAppContainer(TopTabNavigator)



    return (
        <BookContext.Provider value={{ navigation }}>
            <ImageBackground style={{ flex: 1 }} source={IMG_BG}>
                {/* <CommonHeaderTitle
                    title={Strings.audition_tube}>

                </CommonHeaderTitle> */}


                {/* <TopTabContainer></TopTabContainer> */}
                <Home />
               

            </ImageBackground>
        </BookContext.Provider>
    )
}

export default HomePage;