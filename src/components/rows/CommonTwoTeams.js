import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_TEAM_FLAG, IMG_LOCATION1, IMG_LOCATION_OUTLINE, IMG_BALL_ICON, IMG_DOWN_ARROW } from '../../utility/imageRes';
import Strings from '../../translation/language';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_AUDIOWIDE, FONT_FAMILY_HEEBO_REGULAR } from '../../utility/Typography';
import { BOTH_TEAM_RADIUS } from '../../utility/constants';
const { width, height } = Dimensions.get('window');
const circle_h_sky = 25
const circle_h_img = width / 6
const circle_h_img_c = circle_h_img - 10
function CommonTwoTeams({
    item, index, navMatchDetails, teamData,
    teamName1, teamName2, teamImage1, teamImage2, teamScore1, teamScore2, dateTxt, startIn, status, matchNumber, topDate, winMsg, matchTitle,

}) {
    //alert(JSON.stringify(item))
    return (

        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                if (navMatchDetails != undefined) {
                    navMatchDetails()
                }
            }}
            key={index.toString()}
            style={{ flex: 1 }}>

            {topDate != undefined &&
                <RegularText
                    title={topDate}
                    textStyle={[stylesHome.mediumTextStyle, {
                        backgroundColor: colors.STATUS_BAR_COLOR_TRANS,
                        borderTopLeftRadius: BOTH_TEAM_RADIUS,
                        borderTopRightRadius: BOTH_TEAM_RADIUS,
                        paddingHorizontal: 5, paddingVertical: 7
                    }]}
                    font={FONT_FAMILY_HEEBO_REGULAR}
                />
            }

            {/* match no and status view start for home */}
            {topDate == undefined &&
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                    paddingTop: 5,
                    backgroundColor: topDate != undefined && colors.white,
                    borderTopLeftRadius: BOTH_TEAM_RADIUS,
                    borderTopRightRadius: BOTH_TEAM_RADIUS,
                }}>
                    <RegularText
                        title={item.match_type}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.BLUE_COLOR, paddingVertical: 2,
                            paddingHorizontal: 7, borderRadius: 3
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />

                    <View style={{
                        borderRadius: 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: colors.RED_DARK,
                        paddingVertical: 4,
                        paddingHorizontal: 4,
                    }}>
                        <View style={{ width: 10, height: 10, backgroundColor: colors.white, borderRadius: 5 }}></View>
                        <RegularText
                            //title={status}
                            title='Live'
                            textStyle={[stylesHome.mediumTextStyle, { paddingLeft: 5, }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />
                    </View>

                </View>

            }
            {/* match no and status view end for home*/}


            {/* match no and status view start for fixture */}

            {topDate != undefined &&
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                    paddingTop: 5,
                    backgroundColor: topDate != undefined && colors.white,
                    borderTopLeftRadius: BOTH_TEAM_RADIUS,
                    borderTopRightRadius: BOTH_TEAM_RADIUS,
                }}>
                    <View style={{
                        borderRadius: 3, flexDirection: 'row', alignItems: 'center', paddingVertical: 4,
                        paddingHorizontal: 2,
                    }}>
                        <Image source={IMG_BALL_ICON} resizeMode={'contain'} style={{ resizeMode: 'contain' }} ></Image>
                        <RegularText
                            title={matchTitle}
                            textStyle={[stylesHome.mediumTextStyle, { paddingLeft: 5, color: colors.BLUE_TXT }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />
                    </View>

                    <RegularText
                        title={matchNumber}
                        textStyle={[stylesHome.mediumTextStyle, {
                            backgroundColor: colors.BLUE_TXT,
                            paddingVertical: 2,
                            paddingHorizontal: 7,
                            borderRadius: 3,
                        }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />

                </View>
            }

            {/* match no and status view end for fixture*/}


            {/* both teams images view start */}
            {
                teamData != [] && teamData != undefined &&
                <View style={{
                    flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 15, justifyContent: 'space-between',
                    backgroundColor: topDate != undefined && colors.white
                }}>
                    <View
                        style={[{
                            flexDirection: 'row', flex: .45,
                        }]}>
                        <View style={[{
                            elevation: 3,
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 1,
                            alignItems: 'center',
                            backgroundColor: colors.white, width: circle_h_img, height: circle_h_img, borderRadius: circle_h_img / 2,
                            justifyContent: 'center'
                        }]}>
                            <Image
                                // source={IMG_TEAM_FLAG}
                                source={{ uri: teamData[0].team_image }}
                                resizeMode='contain'
                                style={{ width: circle_h_img_c, height: circle_h_img_c, borderRadius: circle_h_img_c / 2 }}>

                            </Image>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'center', paddingLeft: 5 }}>
                            <RegularText
                                title={teamData[0].team_name}
                                textStyle={[stylesHome.mediumTextStyle, { color: colors.BLUE_TXT }]}
                                font={FONT_FAMILY_HEEBO_REGULAR}
                            />
                            <RegularText
                                title={teamData[0].first_inning_score}
                                textStyle={[stylesHome.mediumTextStyle, { color: colors.SKY_BLUE }]}
                                font={FONT_FAMILY_HEEBO_REGULAR}
                            />

                        </View>

                    </View>


                    <RegularText
                        title={"v/s"}
                        textStyle={[stylesHome.mediumTextStyle, { flex: .10, color: colors.LIGHT_GREY_COLOR, fontSize: 22, paddingHorizontal: 0 }]}
                        font={FONT_FAMILY_HEEBO_REGULAR}
                    />


                    <View
                        style={[{
                            flexDirection: 'row', flex: .45, justifyContent: 'flex-end'

                        }]}>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5 }}>
                            <RegularText
                                title={teamData[1].team_name}
                                textStyle={[stylesHome.mediumTextStyle, { color: colors.BLUE_TXT }]}
                                font={FONT_FAMILY_HEEBO_REGULAR}
                            />
                            <RegularText
                                title={teamData[1].first_inning_score}
                                textStyle={[stylesHome.mediumTextStyle, { color: colors.SKY_BLUE }]}
                                font={FONT_FAMILY_HEEBO_REGULAR}
                            />

                        </View>
                        <View style={[{
                            elevation: 3,
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 1,
                            alignItems: 'center',
                            backgroundColor: colors.white, width: circle_h_img, height: circle_h_img, borderRadius: circle_h_img / 2, justifyContent: 'center'
                        }]}>
                            <Image
                                source={{ uri: teamData[1].team_image }}
                                resizeMode='contain'
                                style={{ width: circle_h_img_c, height: circle_h_img_c, borderRadius: circle_h_img_c / 2 }}>

                            </Image>
                        </View>
                    </View>
                </View>
            }

            {/* both teams images view end */}


            {/* match place view start */}
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.HOME_DATE_BG, paddingVertical: 4,
                paddingHorizontal: 5,
            }}>
                <RegularText
                    // title={item.status == 'live' ? item.toss_message :item.match_open_date}
                    title={item.match_open_date}
                    textStyle={[stylesHome.mediumTextStyle, { color: colors.BLUE_TXT }]}
                    font={FONT_FAMILY_HEEBO_REGULAR}
                />
                <RegularText
                    title={startIn == undefined ? Strings.startin + '00:00:00' : Strings.startin + startIn}
                    textStyle={[stylesHome.mediumTextStyle, { color: colors.RED_DARK }]}
                    font={FONT_FAMILY_HEEBO_REGULAR}
                />

            </View>

            {/* match place view end */}

            {
                winMsg != undefined &&
                <RegularText
                    title={winMsg}
                    textStyle={[stylesHome.mediumTextStyle, { backgroundColor: colors.BLUE_ACTIVE, paddingHorizontal: 5, paddingVertical: 7 }]}
                    font={FONT_FAMILY_HEEBO_REGULAR}
                />
            }

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

export default CommonTwoTeams;