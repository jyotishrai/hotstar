import React from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import RegularText from './RegularText';
import Strings from '../../translation/language';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_AUDIOWIDE, FONT_FAMILY_HEEBO_REGULAR } from '../../utility/Typography';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utility/Colors';
import { IMG_SEARCH } from '../../utility/imageRes';
import { DIMENS } from '../../utility/constants';

function CommonHeaderSearch({
    keyboardType, returnKeyType, imgWidth, imgHeight, txtInput,
    txtStyle, maxLength, onChangeText, isShown,
    onSubmitEditing, value, title, multiline, editable, refValue, onPress
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
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    flex: .95,
                    alignSelf: 'center',
                    //justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    borderRadius: DIMENS.INPUT_FIELD_BORDER_RADIUS,
                    height: DIMENS.searchInptH + 5,
                    paddingHorizontal: 10
                }}
                onPress={() => onPress()}
            >
                <Image
                    source={IMG_SEARCH}
                    resizeMode={'contain'}
                    style={{
                        //alignSelf: 'center',
                        width: imgWidth ? imgWidth : 15,
                        height: imgHeight ? imgHeight : 15,
                    }} >
                </Image>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <TextInput
                        style={[{ textAlign: 'left', marginHorizontal: 5 }]}
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
                </View>
            </TouchableOpacity>
        </LinearGradient >
    );
}
const styles = StyleSheet.create({

})

export default CommonHeaderSearch;