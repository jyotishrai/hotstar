import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';

const CustomSearchBar = (props) => {
    const { title, keyboardType, style, secureTextEntry, isShown, refValue, onSubmitEditing, placeholder } = props;


    return (
        <View style={[styles.constainer, style]}>
            <Image style={{ width: 30, height: 30, resizeMode: 'center' }} source={Utils.ImgPath.IMG_SEARCH} />
            <TextInput
                style={[styles.txtInput,{fontWeight:'normal'}]}
                keyboardType={keyboardType} secureTextEntry={isShown ? isTxtShow : false}
                ref={refValue}
                placeholder={placeholder}//{"Search Laundary by name"}
                onSubmitEditing={onSubmitEditing}
                placeholderTextColor={colors.grey400}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        padding: 0,
        marginHorizontal:15,
        backgroundColor:colors.grey100,
        marginTop: 10,
        marginBottom: 0,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
        //height: 100
    },
    title: {
        color: colors.LIGHT_GREY_COLOR,
        fontSize: 14
    },
    txtInput: {
        //flex: 1,
        backgroundColor: colors.grey100,
        height: 40,
        flex: 1,
        //marginTop: 5,
        color: colors.BLUE_COLOR,
     
    }
});

export default CustomSearchBar;