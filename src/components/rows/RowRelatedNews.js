import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_LOCATION, IMG_NEWS, IMG_LOCATION_OUTLINE } from '../../utility/imageRes';
import { spaceHorizontal } from '../../utility/Utils';
import HTML from 'react-native-render-html'
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_HEEBO_MEDIUM, FONT_FAMILY_HEEBO_REGULAR } from '../../utility/Typography';
import Strings from '../../translation/language';

const { width } = Dimensions.get('window')

function RowRelatedNews({
    item,
    index,
    onPressNews
}) {
    const spHorizontal = spaceHorizontal();
    return (
        <TouchableOpacity
            activeOpacity={.6}
            style={{
                flexWrap: 'wrap',
                width: 190,
                marginHorizontal: index == 0 ? 5 : 10,

            }}
            onPress={() => onPressNews(item, index)}
        >

            <View style={{ padding: 0, borderWidth: 0, borderColor: 'black', }}>
                <Image resizeMode='cover' source={{ uri: item.story_image }}
                    style={{ width: 190, height: 120, borderRadius: 5 }}
                />
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
                <RegularText
                    title={item.story_title}
                    textStyle={stylesHome.newsTextStyle1}
                    font={FONT_FAMILY_HEEBO_REGULAR}
                />
                <RegularText
                    title={item.story_time}
                    textStyle={stylesHome.newsTextStyle2}
                    font={FONT_FAMILY_HEEBO_REGULAR}
                />
                <RegularText
                    title={item.sort_story_description}
                    textStyle={stylesHome.newsTextStyle3}
                    font={FONT_FAMILY_HEEBO_REGULAR}
                    numberOfLines={2}
                />
                {/* <HTML
                    containerStyle={{ fontSize: 10, display: 'flex', paddingHorizontal: 10, paddingTop: 0, textColor: 'red' }}
                    html={desc != undefined ? desc : "4 March 2020, WED 2:30 pm"} imagesMaxWidth={Dimensions.get('window').width} /> */}
            </View>
        </TouchableOpacity>
    )
}


export default RowRelatedNews;