import React, { Component } from 'react';
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
    ScrollView,
    FlatList
} from 'react-native';
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { Constants, Typography } from '../../utility';
import CommonButton from '../common/CommonButton';
import Strings from '../../translation/language';
import * as Utils from '../../utility'
import { DIMENS } from '../../utility/constants';
import CommonTextInput from '../common/CommonTextInput';
import { IMG_DOWN_ARROW, IMG_SEARCH_YELLOW, IMG_TAB_SETTINGS_ACTIVE, IMG_SEARCH } from '../../utility/imageRes';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const customPickerModal = (props) => {
    const {
        visible,
        onClose,
        searchPlaceholder,
        data,
        onChangeText,
        onItemPress
    } = props

    return (
        <Modal
            animationType="slide"
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
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.visibleViewStyle}

                >
                    <View style={[styles.txtInputBg, { flexDirection: 'row' }]}>
                        <CommonTextInput
                            title={searchPlaceholder}
                            keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                            style={styles.textInputStyle}
                            //value={selectedBank}
                            onChangeText={txt => onChangeText(txt)}
                            returnKeyType={Utils.Constants.KB_RETURN_TYPE_DONE}
                        />
                        <Image resizeMode='contain' source={IMG_SEARCH} />
                    </View>
                    {
                        data != undefined &&
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            style={{ flex: 1, width: '100%' }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.itemStyle}
                                        onPress={() => onItemPress(item)}
                                    >
                                        <RegularText
                                            title={item.name.toUpperCase()} />
                                    </TouchableOpacity>
                                )
                            }} />
                    }
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalMainContainer: {
        backgroundColor: colors.white,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack
    },
    visibleViewStyle: {
        backgroundColor: colors.white,
        width: screenWidth,
        height: screenHeight / 2.3,
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    button: {
        width: screenWidth - 30
    },
    txtInputBg: {
        justifyContent: 'center',
        //paddingVertical: 10,
        elevation: 0,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey400
    },
    textInputStyle: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        marginTop: 0,
        flex: 1,
        elevation: 0,
        borderRadius: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 0
    },
    itemStyle: {
        height: DIMENS.btnH,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.FADE_GREY,
    }
})

export default customPickerModal;