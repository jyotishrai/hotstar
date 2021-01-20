import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';

const size = 22;


const CustomRadio = (props) => {
    const { isSelected, color } = props

    return (
        <TouchableOpacity style={{
            ...styles.selected,
            borderColor: isSelected ? colors.BLUE_COLOR : 'grey'
        }}>
            {
                isSelected &&
                <View style={styles.innnerV}></View>
            }
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    selected: {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innnerV: {
        width: size - 8,
        height: size - 8,
        borderRadius: size / 4 + 2,
        backgroundColor: colors.BLUE_COLOR
    }
})
export default CustomRadio;