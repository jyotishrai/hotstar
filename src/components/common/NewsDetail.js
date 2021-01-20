
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, ScrollView, Dimensions, ImageBackground } from 'react-native';
import * as Utils from '../../utility';
import Colors from '../../utility/Colors'
import colors from '../../utility/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BookContext } from '../../Contexts';
import CommonButton from '../common/CommonButton';
import RegularText from '../common/RegularText';
import { IMG_NEWS2, IMG_NEWS, IMG_ABOUT, IMG_PROFILE_IMG, IMG_PROFILE_IMAGE, IMG_MAP, IMG_CHECK_YELLOW, IMG_ADS, IMG_BG } from '../../utility/imageRes';
import RowNewJob from '../rows/RowNewJob';
import Strings from '../../translation/language'
import CustomAlertModal from '../modals/customAlertModal';
import CommonHeader from '../common/CommonHeader';
import RowNews from '../rows/RowNews';
import { spaceHorizontal } from '../../utility/Utils';
import RowRelatedNews from '../rows/RowRelatedNews';
import { stylesHome } from '../../utility/styles';
import { FONT_FAMILY_HEEBO_REGULAR, FONT_FAMILY_HEEBO_BOLD, FONT_FAMILY_HEEBO_EXTRABOLD, FONT_WEIGHT_BOLD, FONT_FAMILY_HEEBO_THIN, FONT_FAMILY_AUDIOWIDE } from '../../utility/Typography';
import CommonHeaderTitle from '../common/CommonHeaderTitle';
import CustomLoader from '../common/CustomLoader';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAllNewsAction } from '../../actions/action'
import HTML from 'react-native-render-html'

const { width } = Dimensions.get('window')

const NewsDetails = ({ navigation }) => {

    //const { navigation } = useContext(BookContext)
    const dispatch = useDispatch();

    const spHorizontal = spaceHorizontal();

    const [newsData, setNewsData] = useState()

    useEffect(() => {
        let newsData = navigation.state.params.data
        setNewsData(newsData)
    }, [])

    function onPressNews(item, index) {
        alert(item.story_title)
    }

    return (
        <ImageBackground style={{ flex: 1, backgroundColor: colors.STATUS_BAR_COLOR }} source={IMG_BG}>
            {/* <CommonHeaderTitle paddingHorizontal={10}></CommonHeaderTitle> */}
            <CommonHeader
                leftIcon={Utils.ImgPath.IMG_MENU}
                leftIconPress={() => navigation.openDrawer()}
                title={Strings.news}
                fontSize={18}
                fontFamily={Utils.Typography.FONT_FAMILY_REGULAR}
                //isBack={true}
                marginLeft={10}
                backgroundColor={colors.transparent}
                font={Utils.Typography.FONT_FAMILY_BOLD}
                textColor={colors.white}
                tintColor={colors.white}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                }}>

                <View style={{
                    marginTop: 0,
                    backgroundColor: colors.white,
                }}>
                    <View >
                        <Image resizeMode='cover' source={{ uri: newsData != undefined && newsData.story_image }}
                            style={{ width: '100%', height: 180, }}
                        />
                    </View>
                    <RegularText
                        title={newsData != undefined && newsData.story_title}
                        textStyle={{ fontSize: 18, marginBottom: 10, marginHorizontal: 10, marginTop: 10, color: colors.black }}
                        font={FONT_FAMILY_HEEBO_BOLD}
                        numberOfLines={10}
                    />
                    <RegularText
                        title={newsData != undefined && newsData.story_time}
                        textStyle={{ fontSize: 12, marginHorizontal: 10, marginBottom: 3 }}
                        font={FONT_FAMILY_HEEBO_THIN}
                    />
                    <HTML
                        containerStyle={{ display: 'flex', paddingHorizontal: 10 }}
                        html={newsData != undefined && newsData.story_description}
                        imagesMaxWidth={Dimensions.get('window').width} />
                </View>


            </ScrollView>
        </ImageBackground>
    );
}

export default NewsDetails;