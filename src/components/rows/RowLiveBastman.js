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
const TitleAr = [{ title: ("R").toUpperCase() }, { title: ("B").toUpperCase() },
{ title: ("4S").toUpperCase() }, { title: ('6S').toUpperCase() }, { title: ('SR').toUpperCase() }]
const box_w = 30
function RowLiveBhavBastman({
    index, title, runs, balls, fours, sixs, sr, isYesTitle, paddingVertical, marginVertical, paddingHorizontal, txtTitleColor, backgroundColor
}) {


    return (
        <View
            style={[{
                flexDirection: 'row',
                paddingVertical: paddingVertical ? paddingVertical : 0,
                marginVertical: marginVertical != undefined ? marginVertical : 0,
                paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0, alignItems: 'center',
                justifyContent: "space-between"
                , borderRadius: BOTH_TEAM_RADIUS, backgroundColor: backgroundColor ?
                    backgroundColor : colors.transparent
            }]}>

            <RegularText
                title={title}
                textStyle={[stylesHome.mediumTextStyle, {
                    fontSize: 14, paddingLeft: 0, marginRight: 5, color: txtTitleColor ?
                        txtTitleColor : colors.white
                }]}
                font={FONT_FAMILY_HEEBO_REGULAR}
            />


            {
                isYesTitle == undefined ? <View style={{ flexDirection: 'row' }}>
                    <RegularText
                        title={runs || "0"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            paddingVertical: 5,
                            width: box_w, textAlign: 'center', marginRight: 5, color: colors.BLUE_TXT
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />
                    <RegularText
                        title={balls || "0"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            paddingVertical: 5,
                            width: box_w, textAlign: 'center', marginRight: 5, color: colors.BLUE_TXT
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />
                    <RegularText
                        title={fours || "0"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            paddingVertical: 5,
                            width: box_w, textAlign: 'center', marginRight: 5, color: colors.BLUE_TXT
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />
                    <RegularText
                        title={sixs || "0"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            paddingVertical: 5,
                            width: box_w, textAlign: 'center', marginRight: 5, color: colors.BLUE_TXT
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />
                    <RegularText
                        title={sixs || "0"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            paddingVertical: 5,
                            width: box_w, textAlign: 'center', marginRight: 5, color: colors.BLUE_TXT
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />
                    <RegularText
                        title={sr || "0"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            paddingVertical: 5,
                            width: box_w, textAlign: 'center', color: colors.BLUE_TXT
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}

                    />

                </View>
                    :
                    <View style={{ flexDirection: 'row' }}>
                        <RegularText
                            title={TitleAr[0].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5, backgroundColor: colors.BLUE_COLOR, borderRadius: BOTH_TEAM_RADIUS,
                                width: box_w, textAlign: 'center', marginRight: 5
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />
                        <RegularText
                            title={TitleAr[1].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5, backgroundColor: colors.BLUE_COLOR, borderRadius: BOTH_TEAM_RADIUS,
                                width: box_w, textAlign: 'center', marginRight: 5
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />
                        <RegularText
                            title={TitleAr[2].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5, backgroundColor: colors.BLUE_COLOR, borderRadius: BOTH_TEAM_RADIUS,
                                width: box_w, textAlign: 'center', marginRight: 5
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />
                        <RegularText
                            title={TitleAr[3].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5, backgroundColor: colors.BLUE_COLOR, borderRadius: BOTH_TEAM_RADIUS,
                                width: box_w, textAlign: 'center', marginRight: 5
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />
                        <RegularText
                            title={TitleAr[3].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5, backgroundColor: colors.BLUE_COLOR, borderRadius: BOTH_TEAM_RADIUS,
                                width: box_w, textAlign: 'center', marginRight: 5
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />
                        <RegularText
                            title={TitleAr[3].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5, backgroundColor: colors.BLUE_COLOR, borderRadius: BOTH_TEAM_RADIUS,
                                width: box_w, textAlign: 'center',
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

export default RowLiveBhavBastman;