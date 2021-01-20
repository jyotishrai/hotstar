import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';
import CommonButton from './CommonButton';
import flashMessage from './CustomFlashAlert';


const CommonOrderList = ({ onPress, hidePaymentType }) => {


    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[styles.container,]}
        >
            <View style={{
                display: 'flex', flexDirection: "row",
                alignItems: 'center', justifyContent: 'space-between',
                backgroundColor: 'black', padding: 5, paddingHorizontal: 10
            }}>
                <View style={{}}>

                    <Text
                        numberOfLines={2}
                        style={{
                            fontFamily: Utils.Typography.FONT_FAMILY_REGULAR,
                            color: colors.white, fontSize: 12
                        }}
                    >#110102
                    </Text>

                    <Text
                        numberOfLines={2}
                        style={{
                            fontFamily: Utils.Typography.FONT_FAMILY_REGULAR,
                            color: colors.white, fontSize: 12
                        }}
                    >Ankit
                    </Text>

                </View>

                <Text
                    numberOfLines={2}
                    style={{
                        fontFamily: Utils.Typography.FONT_FAMILY_REGULAR,
                        color: colors.white, fontSize: 12
                    }}
                >Paid
                </Text>

            </View>

            <View style={{
                display: 'flex', flexDirection: "row",
                alignItems: 'center', justifyContent: 'space-between',
                backgroundColor: colors.grey100, padding: 5, paddingHorizontal: 10
            }}>

                <Text
                    numberOfLines={2}
                    style={{
                        fontFamily: Utils.Typography.FONT_FAMILY_REGULAR,
                        color: colors.black, fontSize: 12
                    }}
                >#110102
                    </Text>

                <View style={{
                    display: 'flex', flexDirection: "row",
                    alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: colors.grey100,
                }}>
                    <Image source={Utils.ImgPath.IMG_LOCATION}
                        style={{ height: 15, width: 15, tintColor: colors.BLUE_COLOR }}
                        resizeMode='contain' />

                    <Text
                        numberOfLines={2}
                        style={{
                            fontFamily: Utils.Typography.FONT_FAMILY_REGULAR,
                            color: colors.black, fontSize: 12
                        }}
                    > 3KM
                </Text>
                </View>

            </View>

            <View style={{
                display: 'flex',
                paddingVertical: 10,
                backgroundColor: colors.white, padding: 5, paddingHorizontal: 10
            }}>

                <Text
                    numberOfLines={2}
                    style={{
                        fontFamily: Utils.Typography.FONT_FAMILY_BOLD,
                        color: colors.black, fontSize: 12,
                    }}
                >Drop Location
                    </Text>


                <Text
                    numberOfLines={2}
                    style={{
                        fontFamily: Utils.Typography.FONT_FAMILY_REGULAR,
                        color: colors.grey600, fontSize: 12
                    }}
                > 90, Usha Vihar, Triveni Nagar, Gopalpura Bypass, Jaipur-302018
                </Text>


            </View>

            <View style={{
                display: 'flex',
                paddingVertical: 10,

                backgroundColor: colors.white, padding: 5, paddingHorizontal: 10
            }}>

                <Text
                    numberOfLines={2}
                    style={{
                        fontFamily: Utils.Typography.FONT_FAMILY_BOLD,
                        color: colors.black, fontSize: 12
                    }}
                >Pickup Location
                    </Text>


                <Text
                    numberOfLines={2}
                    style={{
                        fontFamily: Utils.Typography.FONT_FAMILY_REGULAR,
                        color: colors.grey600, fontSize: 12
                    }}
                > 90, Usha Vihar, Triveni Nagar, Gopalpura Bypass, Jaipur-302018
                </Text>


            </View>


            <View style={{
                display: 'flex', flexDirection: "row",
                alignItems: 'center', justifyContent: 'space-between',
                backgroundColor: colors.white,
            }}>
                <CommonButton
                    style={{ width: "50%", margin: 0, height: 40, marginBottom: 10 }}
                    title={"SUBMIT"} onPress={() => flashMessage('Submit', 'success')}
                    radius={4}
                    bold='bold'
                />

                <CommonButton
                    style={{ width: "50%", height: 40, margin: 0, marginBottom: 10, backgroundColor: 'red' }}
                    title={"SUBMIT"} onPress={() => flashMessage('Submit', 'success')}
                    radius={4}
                    bold='bold'
                    showIcon={true}
                />

            </View>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {

    },

});

export default CommonOrderList;