import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import { IMG_BACK } from '../../utility/imageRes';
import NavigationService from '../../NavigationService';

function CommonHeader({
    showIcon,
    showCancelIcon,
    cancelIconPress,
    capitalize,
    tintColor,
    fontSize,
    fontFamily,
    leftIcon,
    rightIcon,
    title,
    leftIconPress,
    rightIconPress,
    iconPress,
    title2,
    backgroundColor,
    textColor,
    font,
    isBack,
    marginLeft,
    marginHorizontal, marginBottom
}) {
    return (
        // <View style={{
        //     flex: 1,
        //     minHeight: 50,
        //     maxHeight: 50,
        //     flexDirection: 'row',
        //     alignItems: 'center',
        //     backgroundColor: backgroundColor,
        //     marginBottom: marginBottom ? marginBottom : 0
        // }}>
              <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.headerColor1, colors.headerColor2,]}
            style={{
                flex: 1,
                maxHeight: 55,
                flexDirection: 'row',
                alignItems: 'center',


            }}>


            <View style={[styles.title, {
                flex: 1,
                position: 'absolute', zIndex: 0, width: '100%',
                borderWidth: 0, borderColor: 'black',
            }]}>
                <Text
                    numberOfLines={1}
                    multiline={true}
                    style={{
                        fontFamily: font != undefined ? font : Utils.Typography.FONT_FAMILY_HEEBO_MEDIUM,
                        textTransform: capitalize || 'none',
                        fontSize: fontSize || 14,
                        textAlign: 'center',
                        color: textColor != undefined ? textColor : colors.white,

                    }}>
                    {title}
                </Text>
            </View>

            {isBack == undefined || isBack ?
                <TouchableOpacity
                    style={[styles.iconStyle]}
                    activeOpacity={0.4}
                    onPress={() => {
                        NavigationService.back()
                    }}>
                    <Image
                        source={IMG_BACK || null}
                        resizeMode={'contain'}
                        style={{ tintColor: tintColor }}
                    />
                </TouchableOpacity> : null}

            {
                rightIcon != undefined ?
                    <TouchableOpacity
                        style={[styles.iconStyle]}
                        activeOpacity={0.4}
                        onPress={rightIconPress}>
                        <Image
                            source={rightIcon || null}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity> :
                    null
            }

</LinearGradient>
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
        maxHeight: 55,
        justifyContent: 'center',
        paddingHorizontal: 10
    }
})

export default CommonHeader;