import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { IMG_LOCATION, IMG_LOCATION1, IMG_LOCATION_OUTLINE, IMAGE_VIDEO_SCREEN_SAMPLE, IMAGE_CAMERA, IMAGE_USER } from '../../utility/imageRes';
import { convertDateTime } from '../../utility/Utils';

const width = Dimensions.get('window').width;

function RowNotifications({ item, index }) {
    return (
        <View style={{
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginBottom: 0,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: colors.grey400,
            paddingVertical: 5
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Image
                    source={item.user_image != undefined ? { uri: item.user_image } : IMAGE_USER}
                    style={{ height: 40, width: 40, borderRadius: 50 }}
                />
                <View style={{ marginHorizontal: 10 }}>
                    <RegularText title={item.message} numberOfLines={2} textStyle={{ width: width / 1.5 }} />
                    <RegularText
                        title={convertDateTime(item.created, 'hh:mm DD-MM-YYYY')}
                        textStyle={{
                            fontSize: 12,
                            color: colors.grey500,
                            marginTop: 5
                        }}
                    />
                </View>
            </View>
            <Image
                source={item.video_thumbnail != undefined ? { uri: item.video_thumbnail } : IMAGE_VIDEO_SCREEN_SAMPLE}
                style={{ height: 60, width: 50, }}
            />
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

export default RowNotifications;