import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import * as Utils from '../../../../utility';
import { BookContext } from '../../../../Contexts';
import { IMG_IMAGE_PIC } from '../../../../utility/imageRes';
import RowSearch from '../../../rows/RowSearch';
import { getIsCheck } from '../../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAllMatchListAction, getSearchPageDataAction } from '../../../../actions/action'
import RegularText from '../../../common/RegularText';
import colors from '../../../../utility/Colors';
import { FONT_FAMILY_BOLD } from '../../../../utility/Typography';
import Strings from '../../../../translation/language';
import CommonHeaderSearch from '../../../common/CommonHeaderSearch';
import { SEARCH_RESULT_SCREEN, FROM_SEARCH_VIDEOS_SCREEN, SCREEN_VIEW_ALL, initialScrollIndex } from '../../../../utility/constants';

import CustomLoader from '../../../common/CustomLoader'


const Search = ({ }) => {

    const dispatch = useDispatch()

    const { navigation } = useContext(BookContext)

    const { searchPageData, myVideos, fetching } = useSelector(state => ({
        searchPageData: state.getSearchPageDataReducer.searchPageData,
        fetching: state.getSearchPageDataReducer.fetching,
        error: state.getSearchPageDataReducer.error,
    }), shallowEqual);

    // alert(JSON.stringify(searchPageData.response[0]))

    useEffect(() => {
        getSearchPageData()
    }, [])

    function getSearchPageData() {
        dispatch(getSearchPageDataAction({ page: 1 }))
    }

    function onPressSearchBar() {
        navigation.navigate(SEARCH_RESULT_SCREEN)
    }

    function onPressVideo(item, index) {
        // alert(JSON.stringify(index))
        // navigation.navigate(Utils.Constants.SCREEN_SHOW_VIDEO, { video: item, index: index, FROM_SCREEN_TYPE: FROM_SEARCH_VIDEOS_SCREEN })
        for (let i = 0; i < searchPageData.response.length; i++) {
            if (searchPageData.response[i].type == item.type) {
                navigation.navigate(Utils.Constants.SCREEN_SHOW_VIDEO, { video: searchPageData.response[i].videos, index: index, FROM_SCREEN_TYPE: FROM_SEARCH_VIDEOS_SCREEN })
                global[initialScrollIndex] = index
            }
        }
    }

    function onPressViewAll(data, index) {
        navigation.navigate(SCREEN_VIEW_ALL, { videos: data })
    }

    return (
        <View style={{ padding: 0, flex: 1, paddingVertical: 0, justifyContent: 'flex-start' }}>

            <View style={{ height: 55 }}>
                <CommonHeaderSearch
                    title={'Search'}
                    keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                    maxLength={30}
                    style={{ marginTop: 0, flex: 1, }}
                    //   refValue={ref => searchRef = ref}
                    //  value={searcTxt}
                    // onChangeText={(txt) => { setSearchText(txt) }}
                    onSubmitEditing={() => { }}
                    returnKeyType={Utils.Constants.KB_RETURN_TYPE_DONE}
                    onPress={onPressSearchBar}
                    editable={false}
                ></CommonHeaderSearch>
            </View>
            {
                searchPageData != undefined &&
                <FlatList
                    data={searchPageData.response}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={fetching != undefined && fetching}
                            onRefresh={() => getSearchPageData()}
                        />
                    }
                    renderItem={({ item, index }) => {
                        console.warn(item.videos.length);

                        return (
                            <View>
                                {
                                    item.videos.length != 0 &&
                                    <RowSearch
                                        index={index}
                                        data={item}
                                        onPressVideo={onPressVideo}
                                        onPressViewAll={onPressViewAll}
                                    />
                                }
                            </View>
                        )
                    }} />

            }
            {
                fetching &&
                <CustomLoader />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    typeStyle: {
        backgroundColor: colors.white,
        padding: 10,
        elevation: 2
    }
})

export default Search;