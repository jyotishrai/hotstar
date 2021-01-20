import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_LOCATION, IMG_LOCATION1, IMG_UPPER_ARROW, IMG_BALL_ICON, IMG_DOWN_ARROW, IMG_LIKE, IMAGE_LIKE_BORDER } from '../../utility/imageRes';
import Strings from '../../translation/language';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_AUDIOWIDE, FONT_FAMILY_HEEBO_REGULAR } from '../../utility/Typography';
import { getIsCheck, getMinFromSec } from '../../utility/Utils'
import CommonTwoTeams from './CommonTwoTeams';
import FastImage from 'react-native-fast-image';
const circle_h_sky = 25
const { width, height } = Dimensions.get('window')
const imgHeight = width / 3 + width / 8
const imgWidth = width / 3

function RowVideo(
    {
        item,
        index,
        onPressVideo
    }) {
    return (
        <TouchableOpacity
            key={index.toString()}
            style={{}} activeOpacity={.7}
            onPress={() => onPressVideo(item)}
        >
            <FastImage
                source={{
                    uri: item.node.image.uri,
                }}
                style={{
                    width: imgWidth, height: imgHeight,
                    marginRight: ((index + 1) % 3 === 0) && index != 0 ? 0 : .5, marginBottom: .5
                }}

            />
            <View style={{ position: 'absolute', bottom: 0 }}>
                <RegularText
                    title={getMinFromSec(item.node.image.playableDuration)}
                    textStyle={{
                        color: colors.white,
                        marginBottom: 5,
                        marginLeft: 5
                    }}
                />
            </View>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    btnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 50
    }
})

export default RowVideo;