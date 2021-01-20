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
    FlatList,
    Dimensions
} from 'react-native';
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { Constants, Typography } from '../../utility';
import CommonButton from '../common/CommonButton';
import Strings from '../../translation/language';
import * as Utils from '../../utility'
import { DIMENS } from '../../utility/constants';
import CommonTextInput from '../common/CommonTextInput';
import { IMAGE_CLOSE, IMAGE_LIKE } from '../../utility/imageRes';
import { FONT_FAMILY_BOLD } from '../../utility/Typography';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const VideoLikesModal = (props) => {
    const {
        visible,
        onClose,
        userList
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
                        <View
                            style={{
                                borderBottomColor: colors.grey300,
                                borderBottomWidth: 1,
                                width: screenWidth,
                                paddingVertical: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}>
                            <RegularText title={"Likes 3656"} textStyle={{}} font={FONT_FAMILY_BOLD} />
                            <TouchableOpacity style={{ position: 'absolute', right: 20 }} onPress={() => onClose()}>
                                <Image source={IMAGE_CLOSE} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            {
                                userList != undefined &&
                                <FlatList
                                    data={userList}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}
                                                activeOpacity={0.9}
                                            //onPress={() => onCategorySelect(item, index)}
                                            >
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity activeOpacity={1}>
                                                        <Image
                                                            source={item.user_image}
                                                            style={{
                                                                height: 40,
                                                                width: 40,
                                                                marginRight: 10,
                                                                marginTop: 15
                                                            }}
                                                            resizeMode='contain'
                                                        />
                                                    </TouchableOpacity>
                                                    <RegularText
                                                        textStyle={{}}
                                                        title={item.user_id}
                                                    //font={FONT_FAMILY_BOLD}
                                                    />
                                                </View>
                                                <Image resizeMode='contain' source={IMAGE_LIKE} />
                                            </TouchableOpacity>
                                        )
                                    }} />
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack
    },
    visibleViewStyle: {
        backgroundColor: colors.white,
        width: screenWidth,
        height: screenHeight / 1.5,
        //alignItems: "center",
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
        borderBottomWidth: 1
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
    }
})

export default VideoLikesModal;