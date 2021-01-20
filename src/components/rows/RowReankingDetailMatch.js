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
import { FONT_FAMILY_AUDIOWIDE, FONT_FAMILY_HEEBO_REGULAR, FONT_FAMILY_HEEBO_BOLD } from '../../utility/Typography';
import { getIsCheck } from '../../utility/Utils'
import CommonTwoTeams from './CommonTwoTeams';
import { BOTH_TEAM_RADIUS } from '../../utility/constants';
const circle_h_sky = 25
const TitleAr = [{ title: (Strings.pos_) }, { title: (Strings.team_) },
{ title: (Strings.matches_) }, { title: (Strings.points_) }, { title: (Strings.ratings_) }]
const box_w = 50
function RowReankingDetailMatch({
    title, countSky, countRed, isYesTitle, paddingVertical, txtTitleColor, backgroundColor, textColor,
    index, teamname, matchNo, points, ratings, flag
}) {


    return (
        <View
            style={[{
                flexDirection: 'row',
                paddingVertical: paddingVertical ? paddingVertical : 0, alignItems: 'center', justifyContent: "space-between"
                , borderRadius: BOTH_TEAM_RADIUS, backgroundColor: backgroundColor ? backgroundColor : colors.transparent
            }]}>




            {
                isYesTitle == undefined ?
                    <View style={{ flexDirection: 'row' }}>
                        <RegularText
                            title={index || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5, color: textColor ? textColor : colors.white
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR} style={{ flex: 1, }}
                        />
                        <View style={{ flex: 1.5, flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={flag} style={{ width: 20, height: 20, borderRadius: 10 }}></Image>
                            <RegularText

                                title={teamname || "-"}
                                textStyle={[stylesHome.mediumTextStyle, {
                                    paddingVertical: 5,
                                    width: box_w, textAlign: 'center', marginRight: 5, color: textColor ? textColor : colors.white
                                }]}
                                font={FONT_FAMILY_HEEBO_REGULAR}
                            />
                        </View>

                        <RegularText
                            title={matchNo || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5, color: textColor ? textColor : colors.white
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR} style={{ flex: .8 }}
                        />
                        <RegularText
                            title={points || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5, color: textColor ? textColor : colors.white
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR} style={{ flex: .9 }}
                        />
                        <RegularText
                            title={ratings || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5, color: textColor ? textColor : colors.white
                            }]}
                            font={FONT_FAMILY_HEEBO_REGULAR} style={{ flex: .8 }}
                        />


                    </View>

                    :
                    <View style={{ flexDirection: 'row' }}>
                        <RegularText
                            title={TitleAr[0].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5, color: textColor ? textColor : colors.white
                            }]}
                            font={FONT_FAMILY_HEEBO_BOLD} style={{ flex: 1 }}
                        />
                        <RegularText
                            title={TitleAr[1].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5, color: textColor ? textColor : colors.white
                            }]}
                            font={FONT_FAMILY_HEEBO_BOLD} style={{ flex: 1.5 }}
                        />

                        <RegularText
                            title={TitleAr[2].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5, color: textColor ? textColor : colors.white
                            }]}
                            font={FONT_FAMILY_HEEBO_BOLD} style={{ flex: .8 }}
                        />
                        <RegularText
                            title={TitleAr[3].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5, color: textColor ? textColor : colors.white
                            }]}
                            font={FONT_FAMILY_HEEBO_BOLD} style={{ flex: .9 }}
                        />
                        <RegularText
                            title={TitleAr[4].title || "-"}
                            textStyle={[stylesHome.mediumTextStyle, {
                                paddingVertical: 5,
                                width: box_w, textAlign: 'center', marginRight: 5, color: textColor ? textColor : colors.white
                            }]}
                            font={FONT_FAMILY_HEEBO_BOLD} style={{ flex: .8 }}
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

export default RowReankingDetailMatch;