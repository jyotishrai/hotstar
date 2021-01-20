import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';

const CommonText = (props) => {
    const { title, keyboardType, style, secureTextEntry, isShown, refValue, onSubmitEditing, value, onChangeText, maxLength } = props;
    const [isTxtShow, setIsTxtShow] = useState(true);

    const setTextInputVisible = () => {
        setIsTxtShow(!isTxtShow)
    }

    return (
        <View style={[styles.constainer, style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 45, }}>
                <Text
                    style={[styles.txtInput, Utils.Typography.FONT_REGULAR]}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                >{title}</Text>
                {isShown && <TouchableOpacity onPress={() => setTextInputVisible()}>
                    <Image style={{ width: 25, height: 25, resizeMode: 'center' }} source={Utils.ImgPath.IMG_DOWN_ARROW} />
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
        elevation: 2,
        borderRadius: 7,
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
        //ssbackgroundColor: 'green',

        //marginTop: 5,
        textAlign: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        color: colors.textColor,
    },
    line: {
        height: 0.5,
        backgroundColor: colors.LIGHT_GREY_COLOR
    }
});

export default CommonText;