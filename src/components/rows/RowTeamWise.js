import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_ARROW_RIGHT_FILLED, IMG_TEAM_FLAG } from '../../utility/imageRes';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_HEEBO_REGULAR, FONT_FAMILY_HEEBO_BOLD, FONT_FAMILY_AUDIOWIDE } from '../../utility/Typography';
import { BOTH_TEAM_RADIUS } from '../../utility/constants';
const { width } = Dimensions.get('window');
const circle_h_img = 50
const circle_h_img_c = circle_h_img - 10
function RowTeamWise({ teamName, dateAndTime, index, topDate
}) {
    return (

        <View key={index.toString()} style={{ flex: 1 }}>



            <View style={{
                flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                justifyContent: 'space-between',
                backgroundColor: topDate != undefined && colors.white, alignItems: 'center',
                borderRadius: BOTH_TEAM_RADIUS, backgroundColor: colors.white
            }}>


                <View
                    style={[{
                        flexDirection: 'row', flex: .80,
                    }]}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 0 }}>
                        <View style={[{
                            elevation: 3,
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 1,
                            alignItems: 'center',
                            backgroundColor: colors.white, width: circle_h_img, height: circle_h_img,
                            borderRadius: circle_h_img / 2, justifyContent: 'center'
                        }]}>
                            <Image source={IMG_TEAM_FLAG} style={{
                                width: circle_h_img_c, height: circle_h_img_c,
                                borderRadius: circle_h_img_c / 2
                            }}></Image>
                        </View>
                        <RegularText
                            title={teamName}
                            textStyle={[stylesHome.mediumTextStyle, {
                                color: colors.BLUE_TXT,
                                paddingHorizontal: 10
                            }]}
                            font={FONT_FAMILY_AUDIOWIDE}
                        />

                    </View>

                </View>

                <View
                    style={[{
                        flexDirection: 'row', flex: .20, justifyContent: 'flex-end'

                    }]}>
                    <Image source={IMG_ARROW_RIGHT_FILLED} resizeMode={'contain'} style={{ resizeMode: 'contain' }} ></Image>

                </View>
            </View>


        </View>


    )
}

export default RowTeamWise;