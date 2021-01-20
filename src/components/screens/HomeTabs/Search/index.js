import React, { useState, useRef } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import colors from '../../../../utility/Colors';
import { BookContext } from '../../../../Contexts';
import { IMG_BG } from '../../../../utility/imageRes';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Strings from '../../../../translation/language'
import { FONT_REGULAR_AUDIOWIDE } from '../../../../utility/Typography';
import CommonHeaderTitle from '../../../common/CommonHeaderTitle';
import Search from './Search';
import CommonHeaderSearch from '../../../common/CommonHeaderSearch';
import * as Utils from '../../../../utility';
import { SEARCH_RESULT_SCREEN } from '../../../../utility/constants';

const SearchPage = ({ navigation }) => {

    const [tabArray] = useState([{ name: Strings.all }, { name: Strings.gaming }, { name: Strings.news }
        , { name: Strings.films }, { name: Strings.fashion }, { name: Strings.art }]);

    let RouteConfigs = {}

    for (const iterator of tabArray) {
        RouteConfigs[iterator.name] = Search
    }


    const [searcTxt, setSearchText] = useState(false)
    let searchRef = useRef(null);

    const TabNavigatorConfig = {

        initialRouteName: Strings.all,
        backBehavior: 'none',
        scrollEnabled: true,
        tabBarOptions: {
            upperCaseLabel: false,
            activeTintColor: colors.ACCENT_COLOR,
            inactiveTintColor: colors.grey600,
            indicatorStyle: { backgroundColor: colors.ACCENT_COLOR, height: 1 },
            scrollEnabled: true,
            pressColor: colors.transparent,
            swipeEnabled: false,
            animationEnabled: false,
            tabStyle: { width: 90 },
            style: { backgroundColor: colors.white, height: 45, margin: 0, },
            labelStyle: { ...FONT_REGULAR_AUDIOWIDE, fontSize: 12, margin: 0 },
            //  indicatorContainerStyle: { backgroundColor: 'red' }
        }
    }
    const TopTabNavigator = createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);
    const TopTabContainer = createAppContainer(TopTabNavigator)

    return (
        <BookContext.Provider value={{ navigation }}>
            <ImageBackground style={{ flex: 1 }} source={IMG_BG}>
                {/* <CommonHeaderSearch
                    title={'Search'}
                    keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                    maxLength={30}
                    style={{ marginTop: 0, flex: 1 }}
                    refValue={ref => searchRef = ref}
                    value={searcTxt}
                    onChangeText={(txt) => { setSearchText(txt) }}
                    onSubmitEditing={() => { }}
                    returnKeyType={Utils.Constants.KB_RETURN_TYPE_DONE}
                    editable={false}
                ></CommonHeaderSearch> */}

                <Search></Search>


            </ImageBackground>
        </BookContext.Provider>
    )
}

export default SearchPage;