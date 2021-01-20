import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_LOCATION, IMG_LOCATION1, IMG_LOCATION_OUTLINE, IMG_OFFICE_YELLOW } from '../../utility/imageRes';

function RowMyAccountInformation({
    leftIcon,
    text,
}) {
    return (
        <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
            <Image
                style={{
                    tintColor: colors.ACCENT_COLOR
                }}
                resizeMode='contain'
                source={leftIcon} />
            <RegularText
                textStyle={{ marginHorizontal: 10 }}
                title={text} />
        </View>
    )
}
const styles = StyleSheet.create({
    btnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 50
    }
})

export default RowMyAccountInformation;