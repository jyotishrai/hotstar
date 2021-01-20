import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_LOCATION, IMG_LOCATION1, IMG_UPPER_ARROW, IMG_BALL_ICON, IMG_DOWN_ARROW } from '../../utility/imageRes';
import Strings from '../../translation/language';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_AUDIOWIDE, FONT_FAMILY_HEEBO_REGULAR } from '../../utility/Typography';
import { getIsCheck } from '../../utility/Utils'
import CommonTwoTeams from './CommonTwoTeams';
import { BOTH_TEAM_RADIUS } from '../../utility/constants';
const circle_h_sky = 25
function RowLiveBhav({
    title, countSky, countRed, marginVertical
}) {


    return (
        <View
            style={[stylesHome.homeRoundRow3, {
                flexDirection: 'row',
                padding: 10, alignItems: 'center',
                justifyContent: 'space-between', borderRadius: BOTH_TEAM_RADIUS,
                marginVertical: marginVertical ? marginVertical : 0
            }]}>

            <RegularText
                title={title}
                textStyle={[stylesHome.mediumTextStyle, { paddingLeft: 0, marginRight: 5 }]}
                font={FONT_FAMILY_HEEBO_REGULAR}
            />
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    backgroundColor: colors.SKY_BLUE, width: circle_h_sky, height: circle_h_sky, borderRadius: circle_h_sky / 2,
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <RegularText
                        title={countSky + ""}
                        textStyle={[stylesHome.mediumTextStyle, { paddingLeft: 0, marginRight: 0 }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />

                </View>
                <View style={{
                    backgroundColor: colors.RED_DARK, width: circle_h_sky, height: circle_h_sky, borderRadius: circle_h_sky / 2,
                    alignItems: 'center', justifyContent: 'center', marginLeft: 5
                }}>
                    <RegularText
                        title={countRed + ""}
                        textStyle={[stylesHome.mediumTextStyle, { padding: 0 }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />

                </View>

            </View>

        </View>
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

export default RowLiveBhav;