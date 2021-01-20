import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated, Dimensions, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_LOCATION, IMG_LOCATION1, IMG_UPPER_ARROW, IMG_BALL_ICON, IMG_DOWN_ARROW, IMG_LIKE, IMAGE_LIKE_BORDER, IMAGE_PHOTO, IMG_EYE } from '../../utility/imageRes';
import Strings from '../../translation/language';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_AUDIOWIDE, FONT_FAMILY_HEEBO_REGULAR, FONT_FAMILY_BOLD } from '../../utility/Typography';
import { getIsCheck } from '../../utility/Utils'
import CommonTwoTeams from './CommonTwoTeams';
const circle_h_sky = 25
const { width, height } = Dimensions.get('window')
const imgHeight = width / 3 + width / 8
const imgWidth = width / 3
function RowHome({
    data,
    index,
    onPressVideo,
    onPressViewAll
}) {
    return (
        <View style={styles.typeStyle}>
            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <RegularText
                        title={'#'}
                        textStyle={{ color: colors.ACCENT_COLOR, fontSize: 20 }}
                        font={FONT_FAMILY_BOLD} />
                    <RegularText
                        title={data.title != undefined ? data.title : ''}
                        textStyle={{ color: colors.black, fontSize: 16, marginHorizontal: 5 }}
                        font={FONT_FAMILY_BOLD} />
                    <RegularText
                        title={'|'} />
                    <RegularText
                        title={data.views}
                        textStyle={{ marginHorizontal: 5 }}
                    />
                </View>
                <TouchableOpacity style={{
                    backgroundColor: colors.ACCENT_COLOR,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4
                }}
                    onPress={() => onPressViewAll(data, index)}>
                    <RegularText
                        title={Strings.view_all}
                        textStyle={{ marginHorizontal: 5, color: colors.white }}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data.videos.slice(0, 5)}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={{
                            marginLeft: index == 0 ? 10 : 1,
                            marginRight: index == data.videos.length - 1 ? 10 : 0
                        }}
                            onPress={() => onPressVideo(item, index)}
                        >
                            <Image
                                source={item.thumbnail != undefined && item.thumbnail != '' ? { uri: item.thumbnail } : IMAGE_PHOTO}
                                style={{
                                    width: imgWidth,
                                    height: imgHeight,
                                }}
                            />

                            <TouchableOpacity
                                //
                                activeOpacity={1}
                                style={{ position: 'absolute', bottom: 0, padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={IMAGE_LIKE_BORDER} style={{ marginRight: 5 }} ></Image>

                                <RegularText
                                    title={item.likes}
                                    textStyle={[stylesHome.mediumTextStyle, {}]}
                                    font={FONT_FAMILY_HEEBO_REGULAR}
                                />

                            </TouchableOpacity>
                            <TouchableOpacity
                                //
                                activeOpacity={1}
                                style={{ position: 'absolute', bottom: 0, right: 5, padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={IMG_EYE} style={{ marginRight: 5 }} ></Image>

                                <RegularText
                                    title={item.views}
                                    textStyle={[stylesHome.mediumTextStyle, {}]}
                                    font={FONT_FAMILY_HEEBO_REGULAR}
                                />

                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }} />
        </View>

    )
}
const styles = StyleSheet.create({
    typeStyle: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        elevation: 2
    }
})

export default RowHome;