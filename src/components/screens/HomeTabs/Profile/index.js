import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import colors from '../../../../utility/Colors';

import { BookContext } from '../../../../Contexts';
import { IMG_BG } from '../../../../utility/imageRes';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Strings from '../../../../translation/language'
import { FONT_REGULAR_AUDIOWIDE } from '../../../../utility/Typography';
import CommonHeaderTitle from '../../../common/CommonHeaderTitle';
import Profile from './Profile'

const ProfilePage = ({ navigation }) => {

    return (
        <BookContext.Provider value={{ navigation }}>
            {/* <ImageBackground style={{ flex: 1 }} source={IMG_BG}> */}
            <CommonHeaderTitle
                title={Strings.my_profile}
            />
            <Profile></Profile>
            {/* </ImageBackground> */}
        </BookContext.Provider>
    )
}

export default ProfilePage;