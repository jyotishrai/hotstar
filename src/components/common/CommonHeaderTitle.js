import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import RegularText from './RegularText';
import Strings from '../../translation/language';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_AUDIOWIDE, FONT_FAMILY_HEEBO_REGULAR, FONT_FAMILY_HEEBO_BOLD } from '../../utility/Typography';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utility/Colors';

function CommonHeaderTitle({
    title
}) {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.headerColor1, colors.headerColor2,]}
            style={{
                flex: 1,
                maxHeight: 55,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            <View style={{ flexDirection: 'row', }}>
                <RegularText
                    title={title}
                    textStyle={stylesHome.homeHeader}
                    font={FONT_FAMILY_HEEBO_BOLD}
                />
            </View>
        </LinearGradient >
    );
}
const styles = StyleSheet.create({
    iconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    title: {
        flex: 2,
        flexDirection: 'row',
        maxHeight: 50,
        justifyContent: 'center',
        paddingHorizontal: 10
    }
})

export default CommonHeaderTitle;