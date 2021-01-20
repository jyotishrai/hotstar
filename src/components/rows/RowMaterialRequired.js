import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_LOCATION, IMG_LOCATION1, IMG_LOCATION_OUTLINE } from '../../utility/imageRes';
import CommonTextInput from '../common/CommonTextInput';
import Strings from '../../translation/language'

function RowMaterialRequired({
    rowData
}) {
    return (
        <View style={{
            marginBottom: 10,
        }}>
            <CommonTextInput
                title={Strings.name}
                style={{
                    elevation: 0,
                    backgroundColor: colors.FADE_GREY,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 0,
                }} />
            <CommonTextInput
                title={Strings.brand}
                style={{
                    elevation: 0,
                    backgroundColor: colors.FADE_GREY,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 0,
                }} />
            <CommonTextInput
                title={Strings.model}
                style={{
                    elevation: 0,
                    backgroundColor: colors.FADE_GREY,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 0,
                }} />
            <CommonTextInput
                title={Strings.quantity}
                style={{
                    elevation: 0,
                    backgroundColor: colors.FADE_GREY,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 0,
                }} />
            <CommonTextInput
                title={Strings.upload_url}
                style={{
                    elevation: 0,
                    backgroundColor: colors.FADE_GREY,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 0,
                }} />

            <RegularText
                font={Utils.Typography.FONT_FAMILY_BOLD}
                textStyle={{ marginVertical: 10 }}
                title={Strings.upload_images} />

            <View style={{ flexDirection: 'row', marginHorizontal: -15 }}>
                <FlatList
                    data={rowData.images}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                backgroundColor: colors.FADE_GREY,
                                padding: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                                marginRight: rowData.images.length == index + 1 ? 10 : 0,
                                height: 110,
                                width: 110,
                                marginLeft: 10
                            }}>
                                <Image source={item.uri} />
                                <RegularText textStyle={{
                                    width: 50,
                                    color: colors.grey400,
                                    fontSize: 12,
                                    textAlign: 'center',
                                    marginTop: 5
                                }}
                                    title={'Upload Images'} />
                            </TouchableOpacity>
                        )
                    }} />
            </View>
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

export default RowMaterialRequired;