import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from './RegularText';
import { IMG_LOCATION, IMG_LOCATION1, IMG_LOCATION_OUTLINE } from '../../utility/imageRes';
import Strings from '../../translation/language';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_AUDIOWIDE } from '../../utility/Typography';

const tab_h = 35
const border_radius = 1
const border_radius_child = 2

function HomeTopTabs({

    onPressAll, count
}) {

    const [isLiveC, setLiveC] = useState(false)

    return (
        <View style={{
            elevation: 5,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
            borderRadius: border_radius,
            height: tab_h,
            backgroundColor: colors.BLUE_ACTIVE,
            flexDirection: 'row'
        }}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    setLiveC(false)
                    onPressAll(false)
                }
                }
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: 1,
                    justifyContent: 'center',
                    borderRadius: border_radius_child,
                    backgroundColor: isLiveC ? colors.BLUE_ACTIVE : colors.RED_DARK
                }}
            >
                <RegularText
                    title={Strings.all}
                    textStyle={stylesHome.homeTopTabs}
                    font={FONT_FAMILY_AUDIOWIDE}
                />

            </TouchableOpacity>


            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    setLiveC(true)
                    onPressAll(true)
                }
                }
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    margin: 1,
                    borderRadius: border_radius_child,
                    backgroundColor: !isLiveC ? colors.BLUE_ACTIVE : colors.RED_DARK
                }}
            >
                <RegularText
                    title={Strings.live + " (" + count + ")"}
                    textStyle={stylesHome.homeTopTabs}
                    font={FONT_FAMILY_AUDIOWIDE}
                />

            </TouchableOpacity>

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

export default HomeTopTabs;