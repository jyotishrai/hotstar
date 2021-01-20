import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_ARROW_RIGHT_FILLED } from '../../utility/imageRes';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_HEEBO_REGULAR, FONT_FAMILY_AUDIOWIDE } from '../../utility/Typography';
import { BOTH_TEAM_RADIUS } from '../../utility/constants';
const { width } = Dimensions.get('window');
const circle_h_img = width / 6
function RowSeriesWise({ matchTitle, dateAndTime, index, topDate
}) {
    return (

        <View key={index.toString()} style={{ flex: 1 }}>

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


            <View style={{
                flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 15,
                justifyContent: 'space-between',
                backgroundColor: topDate != undefined && colors.white, alignItems: 'center',
                borderRadius: BOTH_TEAM_RADIUS,
            }}>


                <View
                    style={[{
                        flexDirection: 'row', flex: .50,
                    }]}>

                    <View style={{ flexDirection: 'column', justifyContent: 'center', paddingLeft: 5 }}>
                        <RegularText
                            title={matchTitle}
                            textStyle={[stylesHome.mediumTextStyle,
                            { color: colors.BLUE_TXT, }]}
                            font={FONT_FAMILY_AUDIOWIDE}
                        />
                        <RegularText
                            title={dateAndTime}
                            textStyle={[stylesHome.mediumTextStyle, { color: colors.SKY_BLUE, }]}
                            font={FONT_FAMILY_HEEBO_REGULAR}
                        />

                    </View>

                </View>

                <View
                    style={[{
                        flexDirection: 'row', flex: .50, justifyContent: 'flex-end'

                    }]}>
                    <Image source={IMG_ARROW_RIGHT_FILLED} resizeMode={'contain'} style={{ resizeMode: 'contain' }} ></Image>

                </View>
            </View>


        </View>


    )
}

export default RowSeriesWise;