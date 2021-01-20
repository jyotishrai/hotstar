import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';
import { DIMENS } from '../../utility/constants'

const CommonTextInput = (props) => {
    const {
        title,
        keyboardType,
        style,
        secureTextEntry,
        isShown,
        refValue,
        onSubmitEditing,
        value,
        onChangeText,
        maxLength,
        returnKeyType,
        icon,
        isShowRightIcon,
        editable,
        txtStyle,
        multiline
    } = props;
    const [isTxtShow, setIsTxtShow] = useState(true);

    const setTextInputVisible = () => {
        setIsTxtShow(!isTxtShow)
    }

    return (
        <View style={[styles.constainer, style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <TextInput
                    style={[styles.txtInput, Utils.Typography.FONT_REGULAR, txtStyle]}
                    keyboardType={keyboardType}
                    secureTextEntry={isShown ? isTxtShow : false}
                    ref={refValue}
                    onSubmitEditing={onSubmitEditing}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={title}
                    multiline={multiline == undefined ? false : multiline}
                    maxLength={maxLength}
                    returnKeyType={returnKeyType}
                    editable={editable == undefined ? true : editable}
                />

                {isShown &&
                    <TouchableOpacity onPress={() => setIsTxtShow(!isTxtShow)}>
                        <Image style={{ width: 25, height: 25, resizeMode: 'center', marginHorizontal: 5 }} source={icon} />
                    </TouchableOpacity>
                }

                {isShowRightIcon &&
                    <TouchableOpacity onPress={() => setIsTxtShow(!isTxtShow)}>
                        <Image style={{ width: 25, height: 25, resizeMode: 'center', marginHorizontal: 5 }} source={icon} />
                    </TouchableOpacity>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        padding: 5,
        backgroundColor: 'white',
        marginTop: 10,
        //elevation: 2,
        borderRadius: Utils.Constants.INPUT_FIELD_BORDER_RADIUS,
        shadowColor: 'black',
        borderColor: colors.grey300,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    title: {
        color: colors.LIGHT_GREY_COLOR,
        fontSize: 14
    },
    txtInput: {
        flex: 1,
        //backgroundColor: 'green',
        height: DIMENS.txtInptH,
        //marginTop: 5,
        color: colors.textColor,
        paddingHorizontal: 10
        //backgroundColor: 'yellow'
    },
    line: {
        height: 0.5,
        backgroundColor: colors.LIGHT_GREY_COLOR
    }
});

export default CommonTextInput;