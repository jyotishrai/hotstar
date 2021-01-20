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

const ContactUsForBranding = ({ }) => {

    //const { navigation } = useContext(BookContext)

    return (
        <ImageBackground source={IMG_BG} style={stylesMore.imgBg} >
            <CommonHeader
                leftIcon={Utils.ImgPath.IMG_MENU}
                leftIconPress={() => navigation.openDrawer()}
                title={Strings.contact_us_for_branding}
                fontSize={18}
                fontFamily={Utils.Typography.FONT_FAMILY_REGULAR}
                //isBack={true}
                marginLeft={10}
                backgroundColor={colors.transparent}
                font={Utils.Typography.FONT_FAMILY_BOLD}
                textColor={colors.white}
                tintColor={colors.white}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
                <RegularText
                    textStyle={{ color: colors.white }}
                    numberOfLines={100}
                    title={'For any kind of information or queries mail us.'}
                />
                <View style={{ flexDirection: 'row' }}>
                    <RegularText
                        textStyle={{ marginVertical: 10, color: colors.white }}
                        numberOfLines={100}
                        title={'Email : '}
                    />
                    <TouchableOpacity>
                        <RegularText
                            textStyle={{ marginVertical: 10, color: colors.RED }}
                            numberOfLines={100}
                            title={'help@crickliveline.com'}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({

})
export default ContactUsForBranding;