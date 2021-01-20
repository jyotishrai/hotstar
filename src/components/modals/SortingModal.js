import React, { Component, useState } from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    FlatList
} from 'react-native';
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { Constants, Typography } from '../../utility';
import Strings from '../../translation/language';
import { VIDEO_SORT_TYPE_MOST_VIEWED, VIDEO_SORT_TYPE_MOST_COMMENTED, VIDEO_SORT_TYPE_MOST_LIKED, VIDEO_SORT_TYPE_NEW_FIRST, VIDEO_SHORT_TYPE } from '../../utility/constants';
import { IMAGE_RADIO_INACTIVE, IMAGE_RADIO_ACTIVE } from '../../utility/imageRes';


const screenWidth = Math.round(Dimensions.get('window').width);

const SortingModal = (props) => {
    const {
        visible,
        onClose,
        sortData,
        onSelect
    } = props

    return (
        <View style={{ marginTop: 22 }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    onClose()
                }}>
                <TouchableOpacity
                    style={styles.modalMainContainer}
                    activeOpacity={1}
                    onPress={() => onClose()}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle}>

                        <FlatList
                            data={sortData}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={{
                                        alignItems: 'center',
                                        marginBottom: 15,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        flex: 1,
                                        width: screenWidth - 80
                                    }}
                                        onPress={() => onSelect(item, index)}
                                        activeOpacity={1}>
                                        <RegularText textStyle={{ marginTop: 5, color: colors.black }} title={item.name} />
                                        <Image
                                            resizeMode='contain'
                                            source={
                                                item.isChecked == true ?
                                                    IMAGE_RADIO_ACTIVE :
                                                    IMAGE_RADIO_INACTIVE
                                            }
                                        />
                                    </TouchableOpacity>
                                )
                            }} />

                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalMainContainer: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack
    },
    visibleViewStyle: {
        backgroundColor: colors.white,
        // flex: 1,
        width: screenWidth - 50,
        alignItems: "center",
        borderRadius: 5,
        justifyContent: 'center',
        paddingTop: 10
    },
    messageStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyle: {
        backgroundColor: colors.ACCENT_COLOR,
        // width: '100%',
        height: Constants.DIMENS.btnH,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})

export default SortingModal;