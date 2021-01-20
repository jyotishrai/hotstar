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
function RowLiveBhav2({
    title, countSky, countRed, isYesTitle, paddingVertical, txtTitleColor
}) {


    return (
        <View
            style={[{
                flexDirection: 'row',
                paddingVertical: paddingVertical ? paddingVertical : 0, alignItems: 'center', justifyContent: "space-between"
                , borderRadius: BOTH_TEAM_RADIUS, backgroundColor: colors.transparent
            }]}>

            <RegularText
                title={title}
                textStyle={[stylesHome.mediumTextStyle, { paddingLeft: 0, marginRight: 5, color: txtTitleColor ? txtTitleColor : colors.white }]}
                font={FONT_FAMILY_HEEBO_REGULAR}
            />


            {
                isYesTitle == undefined ? <View style={{ flexDirection: 'row' }}>
                    <RegularText
                        title={countSky || "-"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.BLUE_ACTIVE, borderRadius: BOTH_TEAM_RADIUS, paddingVertical: 5,
                            width: box_w, textAlign: 'center', marginRight: 5
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />
                    <RegularText
                        title={countSky || "-"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.RED_DARK, borderRadius: BOTH_TEAM_RADIUS, paddingVertical: 5,
                            width: box_w, textAlign: 'center', marginRight: 5
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />
                    <RegularText
                        title={countSky || "-"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.BLUE_ACTIVE, borderRadius: BOTH_TEAM_RADIUS, paddingVertical: 5,
                            width: box_w, textAlign: 'center', marginRight: 5
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />
                    <RegularText
                        title={countSky || "-"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.RED_DARK, borderRadius: BOTH_TEAM_RADIUS, paddingVertical: 5,
                            width: box_w, textAlign: 'center', marginRight: 5
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />

                </View>
                    :
                    <View style={{ flexDirection: 'row' }}>
                        <RegularText
                            title={TitleAr[0].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />
                        <RegularText
                            title={TitleAr[1].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />
                        <RegularText
                            title={TitleAr[2].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />
                        <RegularText
                            title={TitleAr[3].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />

                    </View>
            }




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

export default RowLiveBhav2;