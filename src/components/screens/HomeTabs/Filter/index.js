import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import colors from '../../../../utility/Colors';
import { BookContext } from '../../../../Contexts';
import { IMG_BG, IMAGE_MUSIC, IMAGE_GAMING, IMAGE_NEWS, IMAGE_FILM, IMAGE_FASHION, IMAGE_ART } from '../../../../utility/imageRes';
import Strings from '../../../../translation/language'
import { FONT_REGULAR_AUDIOWIDE } from '../../../../utility/Typography';
import CommonHeaderTitle from '../../../common/CommonHeaderTitle';
import Filter from './Filter';
import FilterScreen from './GallaryScreen';

const FilterPage = ({ navigation }) => {

    return (
        <BookContext.Provider value={{ navigation }}>
            {/* <ImageBackground style={{ flex: 1 }} source={IMG_BG}> */}
            <CommonHeaderTitle title={Strings.gallary}></CommonHeaderTitle>
            <FilterScreen />
            {/* </ImageBackground> */}
        </BookContext.Provider>
    )
}

export default FilterPage;