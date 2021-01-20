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
    Dimensions
} from 'react-native';
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { Constants, Typography } from '../../utility';
import { IMAGE_VERIFIED, IMAGE_ERROR } from '../../utility/imageRes';
import Strings from '../../translation/language';
import CommonButton from '../common/CommonButton';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const VideoUploadedModal = (props) => {
    const {
        visible,
        onClose,
        onOk
    } = props

    return (
        <View style={{ marginTop: 22 }}>
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
                    <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={IMAGE_VERIFIED} resizeMode='contain' />
                            <RegularText
                                title={Strings.video_successfully_uploaded}
                                numberOfLines={2}
                                textStyle={{ fontSize: 20, marginTop: 20 }}
                            />
                        </View>
                        <CommonButton title={Strings.ok}
                            style={{
                                marginHorizontal: 20
                            }}
                            onPress={() => onOk()}
                        />
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
        //flex: 1,
        width: screenWidth - 50,
        height: screenHeight / 2.5,
        alignItems: "center",
        borderRadius: 5,
        justifyContent: 'space-around'
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

export default VideoUploadedModal;