import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';
import { DIMENS } from '../../utility/constants';
import { IMG_ARROW_NEXT } from '../../utility/imageRes';


const CommonButton = (props) => {
    const { style, title, onPress, radius, bold, showIcon, font } = props
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.headerColor1, colors.headerColor2,]}
            style={[
                styles.container,
                style,
                {
                    borderRadius: radius || Utils.Constants.INPUT_FIELD_BORDER_RADIUS,
                }
            ]}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[
                    styles.container_2,
                    {
                        borderRadius: radius || Utils.Constants.INPUT_FIELD_BORDER_RADIUS,
                    }
                ]}
                onPress={onPress}>

                <Text style={{
                    //...Utils.Typography.FONT_REGULAR,
                    fontSize: 14,
                    fontWeight: bold || 'normal',
                    fontFamily: font != undefined ? font : Utils.Typography.FONT_FAMILY_REGULAR,
                    color: colors.white
                }}>
                    {title}
                </Text>
                {showIcon &&
                    <Image source={IMG_ARROW_NEXT}
                        style={{ marginHorizontal: 10, position: 'absolute', right: 0, justifyContent: 'center' }}
                        resizeMode='contain' />}
            </TouchableOpacity>
        </LinearGradient>

    )
}


const styles = StyleSheet.create({
    container: {
        height: DIMENS.btnH,
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.headerColor1,
        elevation: 0
    },
    container_2: {
        flexDirection: 'row',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        height: DIMENS.btnH
    },
});

export default CommonButton;