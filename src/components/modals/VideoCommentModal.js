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
    Dimensions,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { Constants, Typography } from '../../utility';
import CommonButton from '../common/CommonButton';
import Strings from '../../translation/language';
import * as Utils from '../../utility'
import { DIMENS } from '../../utility/constants';
import CommonTextInput from '../common/CommonTextInput';
import { IMAGE_CLOSE, IMAGE_LIKE, IMAGE_MORE, IMAGE_SEND, IMAGE_EMOJI, IMAGE_USER } from '../../utility/imageRes';
import { FONT_FAMILY_BOLD } from '../../utility/Typography';
import { getTimeInUtc, getDateInUtc, convertDateTime } from '../../utility/Utils';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const VideoCommentModal = (props) => {
    const {
        visible,
        onClose,
        userList,
        onChangeText,
        onAddComment,
        userComment,
        modalTitle,
        currentUserImage
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
                        <RegularText title={modalTitle} textStyle={{}} font={FONT_FAMILY_BOLD} />
                        <TouchableOpacity style={{ position: 'absolute', right: 20 }} onPress={() => onClose()}>
                            <Image source={IMAGE_CLOSE} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            userList != undefined &&
                            <FlatList
                                data={userList}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                // contentContainerStyle={{ flexGrow: 1 }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}
                                            activeOpacity={0.9}
                                        //onPress={() => onCategorySelect(item, index)}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                                <TouchableOpacity
                                                    activeOpacity={1}
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                    }}
                                                >
                                                    <Image
                                                        source={item.image != '' ? { uri: item.image } : IMAGE_USER}
                                                        style={{
                                                            height: 40,
                                                            width: 40,
                                                            marginRight: 10,
                                                            //marginTop: 15,
                                                            borderRadius: 20,
                                                        }}
                                                        resizeMode='cover'
                                                    />
                                                </TouchableOpacity>
                                                <View style={{ justifyContent: 'center' }}>
                                                    <RegularText
                                                        textStyle={{}}
                                                        title={item.username}
                                                        font={FONT_FAMILY_BOLD}
                                                    />
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RegularText
                                                            textStyle={{ marginTop: 2 }}
                                                            title={item.comment}
                                                        //font={FONT_FAMILY_BOLD}
                                                        />
                                                        <RegularText
                                                            textStyle={{ marginTop: 2, color: colors.grey400, marginLeft: 5 }}
                                                            title={' - ' + convertDateTime(item.created, 'hh:mm a - DD MMMM')}
                                                        //font={FONT_FAMILY_BOLD}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <Image resizeMode='contain' source={IMAGE_MORE} />
                                        </TouchableOpacity>
                                    )
                                }} />
                        }
                    </ScrollView>
                    <View style={{
                        backgroundColor: colors.grey300,
                        height: 65,
                        flexDirection: 'row',
                        paddingVertical: 10,
                        //alignSelf: 'flex-end',
                        //  position: 'absolute', bottom: 0, left: 0, right: 0,
                    }}>
                        <View style={{
                            borderRadius: 20,
                            backgroundColor: colors.white,
                            flex: 1,
                            marginHorizontal: 10,
                            //justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                            justifyContent: 'space-between'
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    //source={IMAGE_USER}
                                    source={currentUserImage != undefined ? { uri: currentUserImage.uri } : IMAGE_USER}
                                    style={{ height: 35, width: 35, marginRight: 5, borderRadius: 30 }} resizeMode='cover'
                                />
                                <TextInput
                                    placeholder={Strings.say_something}
                                    onChangeText={value => onChangeText(value)}
                                    value={userComment}
                                />
                            </View>
                            <Image source={IMAGE_EMOJI} style={{ height: 35, width: 35, }} resizeMode='contain' />
                        </View>
                        <TouchableOpacity
                            style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => onAddComment()}
                        >
                            <Image source={IMAGE_SEND} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
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
        height: screenHeight / 2,
        //alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between'
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

export default VideoCommentModal;