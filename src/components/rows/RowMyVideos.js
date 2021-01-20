import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_LOCATION, IMG_LOCATION1, IMG_UPPER_ARROW, IMG_BALL_ICON, IMG_DOWN_ARROW, IMG_LIKE, IMAGE_LIKE_BORDER, IMG_EYE } from '../../utility/imageRes';
import Strings from '../../translation/language';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_AUDIOWIDE, FONT_FAMILY_HEEBO_REGULAR } from '../../utility/Typography';
import { getIsCheck } from '../../utility/Utils'
import CommonTwoTeams from './CommonTwoTeams';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

const circle_h_sky = 25
const { width, height } = Dimensions.get('window')
const imgHeight = width / 3 + width / 8
const imgWidth = width / 3

function RowMyVideos({ item, index, onPressVideo, onLongPress }) {

    const [isArrowOpen, setArrowOpen] = useState(item.isOpen)
    //alert(JSON.stringify(item))
    return (

        <TouchableOpacity
            key={index.toString()} style={{}} activeOpacity={.7}
            onPress={() => onPressVideo(item, index)}
            onLongPress={() => onLongPress(item, index)}
        >

            {/* start row 1 */}
            <FastImage
                source={{
                    uri: item.thumbnail,
                    priority: 'high'
                }}
                style={{
                    width: imgWidth, height: imgHeight,
                    marginRight: ((index + 1) % 3 === 0) && index != 0 ? 0 : .5, marginBottom: .5
                }}
            />

            {/* <Video
                source={{ uri: item.video, cache: true }}
                style={{
                    width: imgWidth,
                    height: imgHeight,
                    marginRight: ((index + 1) % 3 === 0) && index != 0 ? 0 : .5,
                    marginBottom: .5
                }}
                repeat={false}
                resizeMode='cover'
                paused={true}
            /> */}

            <View style={{ marginLeft: 2, position: 'absolute', bottom: 0, padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <Image source={IMAGE_LIKE_BORDER} style={{ marginRight: 5 }} ></Image>
                {<RegularText
                    title={item.likes}
                    textStyle={[stylesHome.mediumTextStyle, {}]}
                    font={FONT_FAMILY_HEEBO_REGULAR}
                />}
            </View>
            <View style={{ right: 2, position: 'absolute', bottom: 0, padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={IMG_EYE} style={{ marginRight: 5 }} ></Image>
                {<RegularText
                    title={item.views}
                    textStyle={[stylesHome.mediumTextStyle, {}]}
                    font={FONT_FAMILY_HEEBO_REGULAR}
                />}

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

export default RowMyVideos;