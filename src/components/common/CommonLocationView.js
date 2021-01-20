import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';
import { DIMENS } from '../../utility/constants'

const CommonLocationView = (props) => {
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
        iconLeft,
        isShownLeft,
        btnTitle,
        onPressLocation,
        editable
    } = props;
    const [isTxtShow, setIsTxtShow] = useState(true);

    const setTextInputVisible = () => {
        setIsTxtShow(!isTxtShow)
    }

    return (
        <View style={[styles.constainer, style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {isShownLeft &&
                    <TouchableOpacity onPress={() => setIsTxtShow(!isTxtShow)}>
                        <Image
                            style={{ width: 25, height: 25, resizeMode: 'center', marginHorizontal: 5 }}
                            source={iconLeft}
                        />
                    </TouchableOpacity>
                }
                <TextInput
                    style={[styles.txtInput, Utils.Typography.FONT_REGULAR]}
                    keyboardType={keyboardType}
                    secureTextEntry={isShown ? isTxtShow : false}
                    ref={refValue}
                    onSubmitEditing={onSubmitEditing}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={title}
                    multiline={false}
                    maxLength={maxLength}
                    returnKeyType={returnKeyType}
                    editable={editable == undefined ? true : editable}
                />

                <TouchableOpacity
                    style={[styles.btnStyle,]}
                    onPress={() => onPressLocation()}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: colors.textColor
                    }}>
                        {
                            btnTitle
                        }
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        backgroundColor: 'white',
        marginTop: 10,
        elevation: 2,
        borderRadius: 7,
        height: DIMENS.txtInptH + 10,
        justifyContent: 'center',
        shadowColor: 'black',
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
        height: DIMENS.txtInptH,
        color: colors.textColor,
    },
    btnStyle: {
        backgroundColor: colors.ACCENT_COLOR,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50 + 10,
        borderRadius: 7,
    }
});

export default CommonLocationView;