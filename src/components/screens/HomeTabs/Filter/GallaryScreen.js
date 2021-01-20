import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, PermissionsAndroid, Platform, RefreshControl, TouchableOpacity, Image } from 'react-native';
import * as Utils from '../../../../utility';
import { BookContext } from '../../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_TAB_FILTER } from '../../../../utility/imageRes';
import RowHome from '../../../rows/RowHome';
import { getIsCheck } from '../../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getGallaryCategoriesAction, getGallaryVideosAction, cleargetGallaryVideosAction } from '../../../../actions/action'
import { getUserData } from '../../../../utility/CustomAsyncStorage';
import { KEY_USER_DATA, FROM_SCREEN_TYPE, FROM_HOME_SCREEN, VIDEO_SORT_TYPE_NEW_FIRST, VIDEO_SHORT_TYPE, VIDEO_SORT_TYPE_MOST_COMMENTED, VIDEO_SORT_TYPE_MOST_VIEWED, VIDEO_SORT_TYPE_MOST_LIKED, initialScrollIndex } from '../../../../utility/constants';
import colors from '../../../../utility/Colors';
import RegularText from '../../../common/RegularText';
import CustomLoader from '../../../common/CustomLoader'
import CommonHeaderTitleWithButton from '../../../common/CommonHeaderTitleWithButton';
import Strings from '../../../../translation/language';
import { Picker } from '@react-native-community/picker';
import SortingModal from '../../../modals/SortingModal'

const Home = ({ }) => {

    const { navigation } = useContext(BookContext)

    const dispatch = useDispatch();

    const [categoryData, setCategoryData] = useState(undefined)
    const [reRender, setReRender] = useState(false)
    const [currentCategory, setCurrentCategory] = useState(0)
    const [selectedSorting, setSelectedSorting] = useState('n')
    const [sortData, setSortData] = useState(
        [
            {
                name: Strings.most_viewd,
                isChecked: false,
                type: VIDEO_SORT_TYPE_MOST_VIEWED
            },
            {
                name: Strings.most_liked,
                isChecked: false,
                type: VIDEO_SORT_TYPE_MOST_LIKED
            },
            {
                name: Strings.most_commented,
                isChecked: false,
                type: VIDEO_SORT_TYPE_MOST_COMMENTED
            },
            {
                name: Strings.newest,
                isChecked: true,
                type: VIDEO_SORT_TYPE_NEW_FIRST
            },
        ]
    )
    const [isSortingModalVisible, setIsSortingModalVisible] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const { gallaryCategories, gallaryVideos, fetching, catFetching } = useSelector(state => ({
        gallaryCategories: state.gallaryReducer.gallaryCategories,
        gallaryVideos: state.gallaryReducer.gallaryVideos,
        fetching: state.gallaryReducer.fetching,
        error: state.gallaryReducer.error
    }), shallowEqual)

    // alert(JSON.stringify(gallaryVideos))

    console.warn('dddddddddd cat id ' + currentCategory + '   ' + 'sort ' + selectedSorting + '  page ' + currentPage);

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
                    id: '0',
                    category_name: 'All'
                })
            }
            // alert(JSON.stringify(cat))
            setCategoryData(cat)
            cat[0].isSelected = true
            setCurrentCategory(currentCategory)
            getHomeVideos(currentCategory, 'n', 1)
            setReRender(!reRender)
        }

        return () => {
            setCurrentCategory(0)
            setCurrentPage(1)
        }

    }, [gallaryCategories])

    function getVideoCategories() {
        dispatch(getGallaryCategoriesAction({ page: 0 }))
    }

    function getHomeVideos(id, sort, page) {
        dispatch(getGallaryVideosAction({
            category_id: id,
            page: page,
            sort_by: sort
        }))

        setTimeout(() => {
            setReRender(!reRender)
        }, 2500)

        console.warn('cat id ' + id + '   ' + 'sort ' + sort + '  page ' + page);

    }

    async function onPressCategory(item, index) {
        dispatch(cleargetGallaryVideosAction())
        // alert(JSON.stringify(item))
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
        setCurrentPage(1)
        getHomeVideos(item.id, selectedSorting, 1)
    }

    function onPressVideo(item, index) {
        // navigation.navigate(Utils.Constants.SCREEN_SHOW_VIDEO, { video: item, index: index, FROM_SCREEN_TYPE: FROM_HOME_SCREEN })
        navigation.navigate(Utils.Constants.SCREEN_SHOW_VIDEO, { video: gallaryVideos.response, index: index, FROM_SCREEN_TYPE: FROM_HOME_SCREEN })
        global[initialScrollIndex] = index
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

    function showSortingModal() {
        setIsSortingModalVisible(true)
    }

    function onCloseSortingModal() {
        setIsSortingModalVisible(false)
    }

    function setSorting(item, index) {
        dispatch(cleargetGallaryVideosAction())
        let sort = sortData
        for (let i = 0; i < sort.length; i++) {
            if (index == i) {
                sort[i].isChecked = true
                setSelectedSorting(item.type)
                setIsSortingModalVisible(false)
                setCurrentPage(1)
                getHomeVideos(currentCategory, item.type, 1)
            } else {
                sort[i].isChecked = false
            }
        }
        setSortData(sort)
        setReRender(!reRender)
    }

    return (

        <View style={{ padding: 0, flex: 1, paddingVertical: 0, justifyContent: 'flex-start' }}>
            {/* <CommonHeaderTitleWithButton title={Strings.gallary}></CommonHeaderTitleWithButton> */}
            <View style={{
                backgroundColor: colors.grey200, paddingVertical: 10, height: 40, flexDirection: 'row',
                alignItems: 'center'
            }}>
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
                <TouchableOpacity
                    style={{ backgroundColor: colors.ACCENT_COLOR, paddingLeft: 10, borderRadius: 30, marginRight: 5 }}
                    onPress={() => showSortingModal()}
                >
                    <Image
                        source={IMAGE_TAB_FILTER}
                        style={{
                            height: 20,
                            width: 20,
                            marginVertical: 5,
                            marginRight: 10,
                            tintColor: colors.white
                        }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
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
                        onEndReachedThreshold={0.1}
                        onEndReached={({ distanceFromEnd }) => {
                            if (gallaryVideos.next_videos == 1 || gallaryVideos.next_videos == '1') {
                                setCurrentPage(currentPage + 1)
                                getHomeVideos(currentCategory, selectedSorting, currentPage + 1)
                            }
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={fetching != undefined && fetching}
                                onRefresh={() => {
                                    dispatch(cleargetGallaryVideosAction())
                                    getHomeVideos(currentCategory, selectedSorting, 1)
                                }
                                }
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
            <SortingModal
                visible={isSortingModalVisible}
                sortData={sortData}
                onSelect={setSorting}
                onClose={onCloseSortingModal}
            />
        </View>

    );
}

export default Home;