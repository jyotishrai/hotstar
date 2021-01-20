import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, PermissionsAndroid, Platform, RefreshControl, TouchableOpacity } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getGallaryCategoriesAction, getGallaryVideosAction } from '../../../actions/action'
import { getUserData } from '../../../utility/CustomAsyncStorage';
import { KEY_USER_DATA, FROM_SCREEN_TYPE, FROM_HOME_SCREEN, VIDEO_SORT_TYPE_NEW_FIRST, VIDEO_SHORT_TYPE, VIDEO_SORT_TYPE_MOST_COMMENTED } from '../../../utility/constants';
import colors from '../../../utility/Colors';
import RegularText from '../../common/RegularText';
import CustomLoader from '../../common/CustomLoader'
import CommonHeaderTitleWithButton from '../../common/CommonHeaderTitleWithButton';
import Strings from '../../../translation/language';

const Home = ({ navigation }) => {

    const dispatch = useDispatch();

    const [categoryData, setCategoryData] = useState(undefined)
    const [reRender, setReRender] = useState(false)
    const [currentCategory, setCurrentCategory] = useState(0)

    const { gallaryCategories, gallaryVideos, fetching, catFetching } = useSelector(state => ({
        gallaryCategories: state.gallaryReducer.gallaryCategories,
        gallaryVideos: state.gallaryReducer.gallaryVideos,
        fetching: state.gallaryReducer.fetching,
        error: state.gallaryReducer.error
    }), shallowEqual)

    useEffect(() => {

        // if (homeVideo == undefined) {
        //     getHomeVideos()
        // }

        if (gallaryCategories == undefined) {
            getVideoCategories()
        }

        if (gallaryCategories != undefined && gallaryCategories.error == false) {
            let cat = gallaryCategories.response.slice()
            if (cat[0].category_name != 'All') {
                cat.unshift({
                    id: 0,
                    category_name: 'All'
                })
            }
            // alert(JSON.stringify(cat))
            setCategoryData(cat)
            cat[0].isSelected = true
            setCurrentCategory(currentCategory)
            getHomeVideos(currentCategory)
            setReRender(!reRender)
        }

        return () => {
            setCurrentCategory(0)
        }

    }, [gallaryCategories])

    function getVideoCategories() {
        dispatch(getGallaryCategoriesAction({ page: 0 }))
    }

    function getHomeVideos(id) {
        dispatch(getGallaryVideosAction({
            category_id: id,
            page: 1,
            sort_by: 'n'
        }))
    }


    async function onPressCategory(item, index) {
        let catData = categoryData
        for (let i = 0; i < catData.length; i++) {
            if (index === i) {
                catData[i].isSelected = true
            } else {
                catData[i].isSelected = false
            }
        }
        setCurrentCategory(item.id)
        setCategoryData(catData)
        setReRender(!reRender)
        getHomeVideos(item.id)
    }

    function onPressVideo(item, index) {
        navigation.navigate(Utils.Constants.SCREEN_SHOW_VIDEO, { video: item, index: index, FROM_SCREEN_TYPE: FROM_HOME_SCREEN })
    }

    function renderEmptyDataScreen() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <RegularText
                    title={Strings.nothing_to_show}
                    textStyle={{ fontSize: 14 }}
                />
            </View>
        )
    }

    return (

        <View style={{ padding: 0, flex: 1, paddingVertical: 0, justifyContent: 'flex-start' }}>
            <CommonHeaderTitleWithButton title={Strings.gallary}></CommonHeaderTitleWithButton>
            <View style={{ backgroundColor: colors.grey200, paddingVertical: 10, height: 40 }}>
                {
                    categoryData != undefined &&
                    <FlatList
                        data={categoryData}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 30,
                                    marginLeft: index == 0 ? 15 : 0,
                                    //height: 50,
                                    //       width: 50
                                    borderBottomWidth: item.isSelected ? 1 : 0,
                                    borderBottomColor: colors.ACCENT_COLOR
                                }}>
                                    <TouchableOpacity
                                        onPress={() => onPressCategory(item, index)}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: 5,

                                        }}
                                    >
                                        <RegularText
                                            textStyle={{
                                                marginTop: 5,
                                                color: item.isSelected ? colors.ACCENT_COLOR : colors.grey800
                                            }}
                                            title={item.category_name}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }} />
                }
            </View>
            <View style={{}}>
                {
                    gallaryVideos != undefined &&
                    <FlatList
                        data={gallaryVideos.response}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 60 }}
                        ListEmptyComponent={renderEmptyDataScreen}
                        refreshControl={
                            <RefreshControl
                                refreshing={fetching != undefined && fetching}
                                onRefresh={() => getHomeVideos(currentCategory)}
                            />
                        }
                        renderItem={({ item, index }) => {
                            //alert(JSON.stringify(item))
                            return (
                                <RowHome
                                    index={index}
                                    item={item}
                                    onPressVideo={onPressVideo}
                                />
                            )
                        }} />
                }
            </View>
            {
                catFetching &&
                <CustomLoader />
            }
        </View>

    );
}

export default Home;