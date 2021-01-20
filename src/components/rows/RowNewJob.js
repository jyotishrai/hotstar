import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_LOCATION, IMG_LOCATION1, IMG_LOCATION_OUTLINE } from '../../utility/imageRes';

function RowNewJob({
    item,
    index,
    onPressNewJobItem,
    onPressAccept,
    onPressCancel,
    btnFirstText,
    btnSecondText
}) {
    return (
        <View style={{
            marginBottom: 10,
            elevation: 5,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
        }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onPressNewJobItem(item, index)}
                style={{
                    flexDirection: 'row',
                    backgroundColor: colors.white,
                    padding: 10,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,

                }}>
                <View style={{
                    margin: 10
                }}>
                    <Image
                        source={item.userProfile}
                        style={{
                            height: 40,
                            width: 40
                        }} />
                </View>
                <View style={{
                    marginVertical: 10
                }}>
                    <RegularText
                        style={{

                        }}
                        font={Utils.Typography.FONT_FAMILY_BOLD}
                        title={item.title}
                    />
                    <RegularText
                        textStyle={{
                            color: colors.APP_GRAY,
                            marginVertical: 7
                        }}
                        title={item.createdAt}
                    />
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Image
                            resizeMode='contain'
                            source={IMG_LOCATION_OUTLINE}
                            style={{
                                //marginRight: 5
                            }} />
                        <RegularText
                            textStyle={{
                                marginHorizontal: 5
                            }}
                            title={item.distance + ','} />

                        <RegularText title={item.city + ','} />

                        <RegularText
                            textStyle={{
                                marginHorizontal: 5
                            }}
                            title={item.state} />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity style={[
                    styles.btnStyle,
                    {
                        backgroundColor: colors.APP_GRAY,
                        borderBottomLeftRadius: 5
                    }
                ]}
                    onPress={() => onPressCancel()}>
                    <RegularText font={Utils.Typography.FONT_FAMILY_BOLD} title={btnSecondText} />
                </TouchableOpacity>
                <TouchableOpacity style={[
                    styles.btnStyle,
                    {
                        backgroundColor: colors.ACCENT_COLOR,
                        borderBottomRightRadius: 5
                    }
                ]}
                    onPress={() => onPressAccept()}>
                    <RegularText font={Utils.Typography.FONT_FAMILY_BOLD} title={btnFirstText} />
                </TouchableOpacity>
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

export default RowNewJob;