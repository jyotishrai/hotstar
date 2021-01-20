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
const TitleAr = [{ title: (Strings.no_).toUpperCase() }, { title: (Strings.yes_).toUpperCase() },
{ title: (Strings.balls_).toUpperCase() }, { title: (Strings.runs_).toUpperCase() }]
const box_w = 50
function RowLiveBhavOpenMinMax({
    title, countSky, countRed, isYesTitle, openValue, minValue, maxValue
}) {


    return (
        <View
            style={[{
                flexDirection: 'row', borderRadius: BOTH_TEAM_RADIUS,

            }]}>



            <RegularText
                title={Strings.open + " : " + (openValue || "0")}
                textStyle={[stylesHome.mediumTextStyle, {
                    backgroundColor: colors.BLUE_ACTIVE, borderRadius: BOTH_TEAM_RADIUS, paddingVertical: 5,
                    textAlign: 'center',
                }]}
                style={{ flex: 1, marginRight: 5, }}
                font={FONT_FAMILY_HEEBO_REGULAR}
            />
            <RegularText
                title={Strings.min + " : " + (minValue || "0")}
                textStyle={[stylesHome.mediumTextStyle, {
                    backgroundColor: colors.RED_DARK, borderRadius: BOTH_TEAM_RADIUS, paddingVertical: 5,
                    textAlign: 'center',
                }]}
                style={{ flex: 1, marginRight: 5, }}
                font={FONT_FAMILY_HEEBO_REGULAR}
            />
            <RegularText
                title={Strings.max + " : " + (maxValue || "0")}
                textStyle={[stylesHome.mediumTextStyle, {
                    backgroundColor: colors.BLUE_ACTIVE, borderRadius: BOTH_TEAM_RADIUS, paddingVertical: 5,
                    textAlign: 'center',
                }]}
                style={{ flex: 1 }}
                font={FONT_FAMILY_HEEBO_REGULAR}
            />

        </View >
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

export default RowLiveBhavOpenMinMax;