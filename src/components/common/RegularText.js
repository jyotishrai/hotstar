import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';

const RegularText = (props) => {
    const {
        title,
        style,
        font,
        numberOfLines,
        textStyle
    } = props;
    const [isTxtShow, setIsTxtShow] = useState(true);

    const setTextInputVisible = () => {
        setIsTxtShow(!isTxtShow)
    }

    return (
        <View style={[styles.constainer, style]}>
            <Text
                numberOfLines={numberOfLines != undefined ? numberOfLines : 1}
                style={[
                    styles.txtInput,
                    textStyle,

                    //Utils.Typography.FONT_REGULAR
                    {
                        fontFamily: font != undefined ? font : Utils.Typography.FONT_FAMILY_REGULAR,
                    }
                ]}
            >
                {
                    title
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        justifyContent: 'center',
        //alignItems: 'center',
    },
    txtInput: {
        color: colors.textColor,
        //textAlign: 'left'
    },
});

export default RegularText;