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
const circle_h = 120
const TitleAr = [{ title: (Strings.no_).toUpperCase() }, { title: (Strings.yes_).toUpperCase() },
{ title: (Strings.balls_).toUpperCase() }, { title: (Strings.runs_).toUpperCase() }]
const box_w = 50
function RowLiveTeamScore({
    title, teamName, score, overs, crr, minValue, maxValue
}) {

    return (
        <View
            style={[{
                flexDirection: 'row', borderRadius: BOTH_TEAM_RADIUS,

            }]}>


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    flex: 1, height: circle_h, width: circle_h, borderRadius: circle_h / 2,
                    backgroundColor: colors.BLUE_ACTIVE, padding: 10
                }}>
                    <RegularText
                        title={"4"}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.BLUE_ACTIVE, borderRadius: BOTH_TEAM_RADIUS,
                            textAlign: 'center', fontSize: 24
                        }]}
                        style={{ flex: 1, marginRight: 5, }}
                        font={FONT_FAMILY_AUDIOWIDE}
                    />
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    height: circle_h, width: circle_h, borderRadius: circle_h / 2,
                    justifyContent: 'center', alignItems: 'center', backgroundColor: colors.BLUE_ACTIVE, padding: 10
                }}>

                    <RegularText
                        title={teamName}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.BLUE_ACTIVE, borderRadius: 10,
                            textAlign: 'center', backgroundColor: colors.RED_DARK, paddingHorizontal: 0
                        }]} font={FONT_FAMILY_HEEBO_REGULAR}
                        style={{ width: 70, }}
                    />
                    <RegularText
                        title={score}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.BLUE_ACTIVE,
                            borderRadius: 10, paddingVertical: 2,
                            textAlign: 'center',
                        }]} font={FONT_FAMILY_HEEBO_BOLD}
                    />
                    <RegularText
                        title={overs + " " + Strings.overs}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.BLUE_ACTIVE, borderRadius: 10, paddingVertical: 2,
                            textAlign: 'center',
                        }]} font={FONT_FAMILY_HEEBO_BOLD}
                    />
                    <RegularText
                        title={Strings.crr + " : " + overs}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.BLUE_ACTIVE, borderRadius: 10, paddingVertical: 2,
                            textAlign: 'center',
                        }]} font={FONT_FAMILY_HEEBO_BOLD}
                    />

                </View>
            </View>
            {/* <RegularText
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
            /> */}

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

export default RowLiveTeamScore;