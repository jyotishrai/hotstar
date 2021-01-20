import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMG_BACK, IMAGE_MUSIC_SIMPLE, IMAGE_CAT_GAMING, IMAGE_CAT_NEWS, IMAGE_CAT_FILM, IMAGE_CAT_FASHION, IMAGE_CAT_ART } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    getVideoCategoriesAction,
    clearVideoCategoriesAction,
    getVideoUserProfileAction,
    clearVideoUserProfileAction
} from '../../../actions/action'
import RegularText from '../../common/RegularText';
import colors from '../../../utility/Colors';
import CommonHeaderTitleWithButton from '../../common/CommonHeaderTitleWithButton';
import Strings from '../../../translation/language';
import { Chip } from 'react-native-paper';
import CommonButton from '../../common/CommonButton';
import CommonOutlineButton from '../../common/CommonOutLineButton ';
import LinearGradient from 'react-native-linear-gradient';
import { stylesHome } from '../../../utility/styles';
import { FONT_FAMILY_HEEBO_BOLD, FONT_FAMILY_BOLD } from '../../../utility/Typography';
import NavigationService from '../../../NavigationService';
import { FROM_HOME_SCREEN, FROM_SCREEN_TYPE, FROM_OTHER_USER_VIDEOS_SCREEN } from '../../../utility/constants';
import CustomLoader from '../../common/CustomLoader'

const { width, height } = Dimensions.get('window')


const Row = ({ title, value }) => {

    return (
        <View style={{
            flexDirection: 'row',
            paddingHorizontal: 5,
            borderBottomColor: colors.grey300,
            borderBottomWidth: 1,
            marginHorizontal: 20,
            alignItems: 'center',
            paddingVertical: 10,
            marginVertical: 10
        }}>
            <View style={{ flex: 3 }}>
                <RegularText title={title} />
            </View>
            <View
                style={{ flex: 7 }}
            >
                <RegularText
                    style={{
                        color: colors.black
                    }}
                    title={value}
                />
            </View>
        </View>
    )
}

const VideoUserAboutScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [user, setUser] = useState(undefined)
    const [reRender, setReRender] = useState(false)

    useEffect(() => {
        let user = navigation.state.params.user
        setUser(user)

        return () => {
        }

    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ height: 50 }}>
                <CommonHeaderTitleWithButton title={Strings.about}></CommonHeaderTitleWithButton>
            </View>
            <ScrollView >
                <Image
                    style={{
                        alignSelf: 'center',
                        height: 120, width: 120,
                        borderRadius: 60,
                        margin: 10
                    }}
                    resizeMode='cover'
                    source={user != undefined ? { uri: user.user_image } : IMAGE_USER}
                />
                <Row
                    title={Strings.name}
                    value={user != undefined ? user.user_name : ''}
                />
                <Row
                    title={Strings.gender}
                    value={user != undefined ? user.gender : ''}
                />
                <Row
                    title={Strings.height}
                    value={user != undefined ? user.height : ''}
                />
                <Row
                    title={Strings.intrested_in}
                    value={user != undefined ? user.intrested_in : ''}
                />
                <View style={{
                    padding: 5, marginHorizontal: 20, marginTop: 15, marginBottom: 15, borderBottomColor: colors.grey300,
                    borderBottomWidth: 1,
                }}>
                    <RegularText title={Strings.about} />
                    <RegularText
                        title={user != undefined ? user.about_me : ''}
                        numberOfLines={100}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default VideoUserAboutScreen;