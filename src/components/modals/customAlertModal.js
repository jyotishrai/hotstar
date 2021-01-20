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


const screenWidth = Math.round(Dimensions.get('window').width);

const customAlertModal = (props) => {
    const {
        visible,
        image,
        message,
        btnFirstText,
        btnSecondText,
        onClose,
        title,
        onYes,
        onNo
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

                        <View style={styles.messageStyle}>
                            {
                                title != undefined &&
                                <RegularText
                                    font={Typography.FONT_FAMILY_BOLD}
                                    textStyle={{ marginVertical: 0 }}
                                    title={title} />
                            }
                            {
                                image != undefined &&
                                <Image resizeMode='contain' source={image} />
                            }
                            <RegularText textStyle={{ marginVertical: 15 }} title={message} />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5
                        }}>
                            {
                                btnSecondText != undefined &&
                                <TouchableOpacity
                                    style={[
                                        styles.btnStyle,
                                        {
                                            backgroundColor: colors.APP_GRAY,
                                            borderBottomRightRadius: 0
                                        }
                                    ]}
                                    onPress={() => onNo()}
                                >
                                    <RegularText font={Typography.FONT_FAMILY_BOLD} title={btnSecondText} />
                                </TouchableOpacity>
                            }

                            {
                                btnFirstText != undefined &&
                                <TouchableOpacity style={[
                                    styles.btnStyle,
                                    {
                                        borderBottomLeftRadius: btnSecondText != undefined ? 0 : 5
                                    }
                                ]} onPress={() => onYes()}>
                                    <RegularText font={Typography.FONT_FAMILY_BOLD} title={btnFirstText} />
                                </TouchableOpacity>
                            }

                        </View>

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

export default customAlertModal;