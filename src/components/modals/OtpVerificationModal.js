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
import { IMAGE_VERIFIED } from '../../utility/imageRes';
import Strings from '../../translation/language';
import CommonButton from '../common/CommonButton';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const OtpVerificationModal = (props) => {
    const {
        visible,
        onClose,
        onDone
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
                        <Image source={IMAGE_VERIFIED} resizeMode='contain' />
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <RegularText title={Strings.phone_number_verified} />
                            <RegularText title={Strings.successfullly}
                                textStyle={{
                                    fontSize: 25,
                                    color: colors.green500,
                                    marginTop: 10
                                }} />
                        </View>
                        <CommonButton title={Strings.done}
                            style={{
                                marginHorizontal: 20
                            }}
                            onPress={() => onDone()}
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
        height: screenHeight / 2,
        alignItems: "center",
        borderRadius: 5,
        justifyContent: 'space-evenly'
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

export default OtpVerificationModal;