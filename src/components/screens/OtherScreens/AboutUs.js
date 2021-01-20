import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TextInput, ImageBackground } from 'react-native';
import * as Utils from '../../../utility';
import Colors from '../../../utility/Colors'
import colors from '../../../utility/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BookContext } from '../../../Contexts';
import CommonOrderList from '../../common/CommonOrderList'
import CommonButton from '../../common/CommonButton';
import RegularText from '../../common/RegularText';
import {
    IMG_USER5,
    IMG_CALL,
    IMG_STAR_FULL_YELLOW,
    IMG_STAR_HALF_YELLOW,
    IMG_STAR_OUTLINE,
    IMG_TOGGLE_OFF,
    IMG_TOGGLE_ON,
    IMG_MY_TRANSACTIONS,
    IMG_CHANGE_PASSWORD,
    IMG_TERMS_OF_USE,
    IMG_PRIVACY_POLICY,
    IMG_CONTACT_US,
    IMG_LOGOUT,
    IMG_ARROW_RIGHT,
    IMG_BG
} from '../../../utility/imageRes';
import Strings from '../../../translation/language';
import CustomAlertModal from '../../modals/customAlertModal';
import CommonHeader from '../../common/CommonHeader';
import CommonTextInput from '../../common/CommonTextInput'
import { stylesMore } from '../../../utility/styles';
import { color } from 'react-native-reanimated';

const AboutUs = ({ }) => {

    //const { navigation } = useContext(BookContext)

    return (
        <ImageBackground source={IMG_BG} style={stylesMore.imgBg} >
            <CommonHeader
                leftIcon={Utils.ImgPath.IMG_MENU}
                leftIconPress={() => navigation.openDrawer()}
                title={Strings.about_us}
                fontSize={18}
                fontFamily={Utils.Typography.FONT_FAMILY_REGULAR}
                //isBack={true}
                marginLeft={10}
                backgroundColor={colors.transparent}
                font={Utils.Typography.FONT_FAMILY_BOLD}
                textColor={colors.white}
                tintColor={colors.white}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 15, backgroundColor: color.white }}>
                <RegularText
                    textStyle={{ marginVertical: 10, color: colors.white }}
                    numberOfLines={100}
                    title={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'} />

            </ScrollView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({

})
export default AboutUs;