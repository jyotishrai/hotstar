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
    ActivityIndicator
} from 'react-native';
import colors from '../../utility/Colors';
import RegularText from './RegularText';
import { Constants, Typography } from '../../utility';
import FastImage from 'react-native-fast-image'
import { IMAGE_CUSTOM_LOADER } from '../../utility/imageRes';
import Strings from '../../translation/language';


const screenWidth = Math.round(Dimensions.get('window').width);

const CustomVideoProcessingLoader = (props) => {
    const {
        loading,
        percent
    } = props

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={loading}
            onRequestClose={() => {
                //onClose()
            }}>
            <View style={styles.modalMainContainer} >
                <ActivityIndicator color={colors.APP_GRAY} />
                <View style={{ width: screenWidth / 2, alignItems: 'center' }}>
                    <RegularText
                        textStyle={{ marginTop: 10, color: colors.white, textAlign: 'center' }}
                        title={Strings.please_wait_while_your_video_is_being_processed}
                        numberOfLines={3}
                    />
                    {/* <RegularText
                        textStyle={{ marginTop: 10, color: colors.white }}
                        title={percent + '%'}
                        numberOfLines={3}
                    /> */}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalMainContainer: {
        backgroundColor: colors.transparent,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack,
    },
    visibleViewStyle: {
        backgroundColor: colors.transparent,
        //flex: 1,
        width: screenWidth - 50,
        height: screenWidth / 2,
        alignItems: "center",
        borderRadius: 5,
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

export default CustomVideoProcessingLoader;