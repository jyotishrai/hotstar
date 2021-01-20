import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import colors from '../../../../utility/Colors';
import AuditionTube from './AuditionTube'
import { BookContext } from '../../../../Contexts';
import { IMG_BG } from '../../../../utility/imageRes';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Strings from '../../../../translation/language'
import { FONT_REGULAR_AUDIOWIDE } from '../../../../utility/Typography';
import CommonHeaderTitle from '../../../common/CommonHeaderTitle';
import AuditionTubeScreen from './AuditionTube'

const AuditionTubePage = ({ navigation }) => {

    return (
        <BookContext.Provider value={{ navigation }}>
            <ImageBackground style={{ flex: 1 }} source={IMG_BG}>
                <CommonHeaderTitle title={Strings.select_video_category}></CommonHeaderTitle>
                <AuditionTubeScreen />
            </ImageBackground>
        </BookContext.Provider>
    )
}

export default AuditionTubePage;