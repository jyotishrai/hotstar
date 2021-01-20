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

const { width } = Dimensions.get('window')

function RowNews({
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
                elevation: 5,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1,
                marginVertical: index == 0 ? 5 : 10, borderRadius: 3, backgroundColor: colors.white,
                borderRadius: 5
            }}
            onPress={() => onPressNews(item, index)}
        >

            <View style={{ padding: 0, borderWidth: 0, borderColor: 'black', }}>
                <Image resizeMode='cover' source={{ uri: item.story_image }}
                    style={{ width: (width - spHorizontal - 7), height: 180, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                />
            </View>
            <HTML
                containerStyle={{ display: 'flex', padding: 10 }}
                html={item.story_title}
                imagesMaxWidth={Dimensions.get('window').width} />

        </TouchableOpacity>
    )
}


export default RowNews;