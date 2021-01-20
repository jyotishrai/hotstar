import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as Utils from '../../../../utility';
import { BookContext } from '../../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_MUSIC, IMAGE_GAMING, IMAGE_NEWS, IMAGE_FILM, IMAGE_FASHION, IMAGE_ART, IMAGE_RADIO_ACTIVE, IMAGE_RADIO_INACTIVE } from '../../../../utility/imageRes';
import RowHome from '../../../rows/RowHome';
import { getIsCheck } from '../../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getHomeVideoAction } from '../../../../actions/action'
import Strings from '../../../../translation/language';
import RegularText from '../../../common/RegularText';
import colors from '../../../../utility/Colors';
import { FONT_FAMILY_BOLD } from '../../../../utility/Typography';
import CommonButton from '../../../common/CommonButton';
import { VIDEO_SHORT_TYPE, VIDEO_SORT_TYPE_MOST_VIEWED, VIDEO_SORT_TYPE_MOST_COMMENTED, VIDEO_SORT_TYPE_NEW_FIRST, VIDEO_SORT_TYPE_MOST_LIKED } from '../../../../utility/constants';
import CustomLoader from '../../../common/CustomLoader'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const filterData = [
    {
        name: Strings.music,
        image: IMAGE_MUSIC,
    },
    {
        name: Strings.gaming,
        image: IMAGE_GAMING,
    },
    {
        name: Strings.news,
        image: IMAGE_NEWS,
    },
    {
        name: Strings.films,
        image: IMAGE_FILM,
    },
    {
        name: Strings.fashion,
        image: IMAGE_FASHION,
    },
    {
        name: Strings.art,
        image: IMAGE_ART,
    },
]

const Filter = ({ }) => {

    const { navigation } = useContext(BookContext)
    const dispatch = useDispatch();

    const { homeVideo, fetching, catFetching } = useSelector(state => ({
        homeVideo: state.getHomeVideoReducer.homeVideo,
        fetching: state.getHomeVideoReducer.fetching,
        error: state.getHomeVideoReducer.error
    }), shallowEqual)

    const [sortData, setSortData] = useState(
        [
            // {
            //     name: Strings.popularity,
            //     isChecked: true,

            // },
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
                isChecked: false,
                type: VIDEO_SORT_TYPE_NEW_FIRST
            },
        ]
    )

    const [selectedSort, setSelectedSort] = useState(global[VIDEO_SHORT_TYPE])

    const [reRender, setReRender] = useState(false)

    useEffect(() => {
        for (let i = 0; i < sortData.length; i++) {
            if (sortData[i].type == global[VIDEO_SHORT_TYPE]) {
                sortData[i].isChecked = true
            }
            else {
                sortData[i].isChecked = false
            }
        }
        setReRender(!reRender)
    }, [])

    function setSorting(item, index) {
        let sort = sortData
        for (let i = 0; i < sort.length; i++) {
            if (index == i) {
                sort[i].isChecked = true
                global[VIDEO_SHORT_TYPE] = item.type
            } else {
                sort[i].isChecked = false
            }
        }
        setSortData(sort)
        setReRender(!reRender)
    }

    function onSubmit() {
        dispatch(getHomeVideoAction({
            category_id: 0,
            page: 1,
            sort_by: global[VIDEO_SHORT_TYPE]
        }))
    }

    return (

        <View style={{ padding: 0, flex: 1, paddingVertical: 0, justifyContent: 'flex-start' }}>
            {/* <View style={{
                paddingVertical: 10,
                backgroundColor: colors.white,
            }}>
                {
                    filterData != undefined &&
                    <FlatList
                        data={filterData}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                    marginLeft: index == 0 ? 15 : 0,
                                }}>
                                    <TouchableOpacity>
                                        <Image resizeMode='contain' source={item.image} />
                                    </TouchableOpacity>
                                    <RegularText textStyle={{ marginTop: 5 }} title={item.name} />
                                </View>
                            )
                        }} />
                }
            </View> */}
            <View style={{ backgroundColor: colors.white, marginTop: 0, flex: 1 }}>
                <View style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15
                }}>
                    <RegularText textStyle={{ fontSize: 18, color: colors.grey500 }} font={FONT_FAMILY_BOLD} title={Strings.sort_by} />
                </View>
                <View style={{ height: 1, backgroundColor: colors.grey300 }}></View>
                <View style={{ padding: 15 }}>
                    <FlatList
                        data={sortData}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{
                                    alignItems: 'center',
                                    marginBottom: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                                    onPress={() => setSorting(item, index)}
                                    activeOpacity={1}>
                                    <RegularText textStyle={{ marginTop: 5, color: colors.black }} title={item.name} />
                                    <Image
                                        resizeMode='contain'
                                        source={
                                            item.isChecked == true ?
                                                IMAGE_RADIO_ACTIVE :
                                                IMAGE_RADIO_INACTIVE
                                        }
                                    />
                                </TouchableOpacity>
                            )
                        }} />
                </View>
                <View style={{
                    width: screenWidth / 2,
                    alignSelf: 'center'
                }}>
                    <CommonButton
                        style={{ height: 40 }}
                        title={Strings.apply.toUpperCase()}
                        bold={'bold'}
                        onPress={onSubmit}
                    />
                </View>
                {
                    fetching &&
                    <CustomLoader />
                }
            </View>
        </View>

    );
}

export default Filter;