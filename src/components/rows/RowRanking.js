import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_LOCATION, IMG_NEWS, IMG_LOCATION_OUTLINE, IMG_DOWN_ARROW, IMG_HOME, IMG_LOGO, IMG_IMAGE_PLACEHOLDER, IMG_ADS } from '../../utility/imageRes';
import { spaceHorizontal } from '../../utility/Utils';
import HTML from 'react-native-render-html'
import { DIMENS, FONT_SIZE, WIDTH, HEIGHT, SCREEN_RANKING_TABS, SCREEN_RANKING_PLAYERS_TABS } from '../../utility/constants';
import { FONT_FAMILY_REGULAR, FONT_HEEBO_REGULAR, FONT_FAMILY_HEEBO_MEDIUM, FONT_WEIGHT_BOLD } from '../../utility/Typography';
import Strings from '../../translation/language';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window')

function HorizontalRanking({ item, index, navRankMatch, pathTitle }) {

    return (

        <TouchableOpacity activeOpacity={0.7} onPress={() => {

            if (pathTitle.toLowerCase().includes("teams")) {
                navRankMatch(SCREEN_RANKING_TABS, { type: "Team Ranking" })
            } else if (pathTitle.toLowerCase().includes("players")) {
                navRankMatch(SCREEN_RANKING_PLAYERS_TABS, { type: "Players Ranking" })
            }

        }

        }
            key={index}
            style={{
                backgroundColor: colors.STATUS_BAR_COLOR_TRANS,
                borderRadius: DIMENS.px_2,
                alignItems: 'center',
                width: WIDTH / 3 - 8,
                marginHorizontal: DIMENS.px_2
            }}>
            <View style={{
                alignItems: 'center',
                marginTop: DIMENS.px_10,
                overflow: 'hidden'
            }}>
                <Image source={item.uri && item.uri != '' ? { uri: item.uri } : IMG_ADS}
                    style={{
                        width: DIMENS.imgSize,
                        aspectRatio: 1 / 1,
                        borderRadius: DIMENS.imgSize / 2,
                        borderWidth: DIMENS.px_1,
                        borderColor: colors.RED_DARK,
                        //resizeMode:'contain'
                    }} />
                <Text style={{
                    paddingHorizontal: DIMENS.px_10,
                    paddingVertical: DIMENS.px_3,
                    color: colors.white,
                    fontFamily: FONT_HEEBO_REGULAR.fontFamily,
                    fontSize: FONT_SIZE.txt_size_10,
                    textAlign: 'center',
                    backgroundColor: colors.RED_DARK,
                    borderRadius: DIMENS.px_12,
                    marginTop: DIMENS.px_5,
                    width: WIDTH / 3 - 32
                }}>
                    {item.title}
                </Text>
                <Text style={{
                    paddingHorizontal: DIMENS.px_10,
                    paddingVertical: DIMENS.px_8,
                    color: colors.white,
                    fontFamily: FONT_HEEBO_REGULAR.fontFamily,
                    fontSize: FONT_SIZE.txt_size_11,
                    textAlign: 'center',
                    fontSize: FONT_SIZE.txt_size_13,
                }}>
                    {item.rating ? (`${Strings.rating.toUpperCase()}:${item.rating}`) : item.country}
                </Text>
            </View>

            <Text style={{
                paddingHorizontal: DIMENS.px_10,
                paddingVertical: DIMENS.px_8,
                color: colors.white,
                fontFamily: FONT_FAMILY_HEEBO_MEDIUM,
                fontSize: FONT_SIZE.txt_size_11,
                bottom: 0,
                textAlign: 'center',
                backgroundColor: colors.RED,
                width: '100%',
                borderBottomLeftRadius: DIMENS.px_2,
                borderBottomRightRadius: DIMENS.px_2,
            }}>
                {item.type}
            </Text>
        </TouchableOpacity>
    )
}
function RowRanking({
    item,
    index,
    onPressView,
    onPressExpndColpaseView, navRankMatch
}) {


    const spHorizontal = spaceHorizontal();
    return (
        <View key={index} style={{
            paddingVertical: DIMENS.px_2
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: colors.BLUE_ACTIVE,
                borderRadius: DIMENS.px_2,
                marginTop: DIMENS.px_10,
                alignItems: 'center',
            }}>
                <Text style={{
                    paddingHorizontal: DIMENS.px_10,
                    paddingVertical: DIMENS.px_8,
                    color: colors.white,
                    fontFamily: FONT_FAMILY_HEEBO_MEDIUM,
                    fontWeight: FONT_WEIGHT_BOLD,
                    fontSize: FONT_SIZE.txt_size_11,
                    margin: DIMENS.px_2,
                    borderRadius: DIMENS.px_2
                }}>
                    {item.typeOfRanking.toUpperCase()}
                </Text>
                <TouchableOpacity
                    style={{
                        marginRight: DIMENS.px_10,
                        width: DIMENS.px_30,
                        alignItems: 'center',
                        paddingVertical: DIMENS.px_10
                    }}
                    activeOpacity={.8}
                    onPress={() => onPressExpndColpaseView(item, index)}>
                    <Image source={IMG_DOWN_ARROW} style={{
                        tintColor: colors.white,
                        resizeMode: 'contain',

                    }} />
                </TouchableOpacity>
            </View>

            {
                item.isExpand == undefined || !item.isExpand && item.rankingData &&
                item.rankingData.map((rankingItem, rankIndex) => {
                    return (
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: colors.BLUE_ACTIVE,
                                borderRadius: DIMENS.px_2,
                                marginVertical: DIMENS.px_10
                            }}>
                                <Text style={{
                                    backgroundColor: colors.RED_DARK,
                                    paddingHorizontal: DIMENS.px_10,
                                    paddingVertical: DIMENS.px_8,
                                    color: colors.white,
                                    fontFamily: FONT_FAMILY_HEEBO_MEDIUM,
                                    fontSize: FONT_SIZE.txt_size_11,
                                    margin: DIMENS.px_2,
                                    borderRadius: DIMENS.px_2
                                }}>
                                    {rankingItem.title.toUpperCase()}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={.6}
                                    onPress={onPressView}>
                                    <Text style={{
                                        padding: DIMENS.px_10,
                                        color: colors.white,
                                        fontFamily: FONT_HEEBO_REGULAR.fontFamily,
                                        fontWeight: '400'
                                    }}>
                                        {Strings.view_all.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {

                                <FlatList

                                    numColumns={3}
                                    data={rankingItem.data}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <HorizontalRanking
                                                pathTitle={rankingItem.title != undefined ? rankingItem.title : ""}
                                                item={item}
                                                index={index}
                                                navRankMatch={navRankMatch}
                                            />
                                        )
                                    }}

                                    listKey={(item, index) => 'a' + index.toString()}
                                />

                            }
                        </View>
                    )
                })
            }


        </View>
    )
}


export default RowRanking;