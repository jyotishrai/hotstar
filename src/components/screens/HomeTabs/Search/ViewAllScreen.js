import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import * as Utils from '../../../../utility';
import { BookContext } from '../../../../Contexts';
import { IMG_IMAGE_PIC, IMG_SEARCH } from '../../../../utility/imageRes';
import RowSearch from '../../../rows/RowSearch';
import { getIsCheck } from '../../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { searchAction, clearSearchAction } from '../../../../actions/action'
import RegularText from '../../../common/RegularText';
import colors from '../../../../utility/Colors';
import { FONT_FAMILY_BOLD } from '../../../../utility/Typography';
import Strings from '../../../../translation/language';
import CommonHeaderSearch from '../../../common/CommonHeaderSearch';
import LinearGradient from 'react-native-linear-gradient';
import { DIMENS, FROM_SEARCH_VIDEOS_SCREEN, initialScrollIndex } from '../../../../utility/constants';
import RowHome from '../../../rows/RowHome';
import CommonHeader from '../../../common/CommonHeader';

const ViewAllScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const [videos, setVideos] = useState(undefined)

    // alert(JSON.stringify(searchVideoRes))

    useEffect(() => {

        let video = navigation.state.params.videos
        setVideos(video)

        return () => {
            dispatch(clearSearchAction())
        }

    }, [])

    function onChangeSearchText(text) {
        setSearchText(text)
    }

    function onPressSearch() {

        let searchQuery = {
            search: searchText
        }

        dispatch(searchAction(searchQuery))
        setSearchText('')
    }


    function onPressVideo(item, index) {
        navigation.navigate(Utils.Constants.SCREEN_SHOW_VIDEO, { video: videos.videos, index: index, FROM_SCREEN_TYPE: FROM_SEARCH_VIDEOS_SCREEN })
        global[initialScrollIndex] = index
    }

    return (
        <View style={{ padding: 0, flex: 1, paddingVertical: 0, justifyContent: 'flex-start' }}>
            <CommonHeader title={videos != undefined ? videos.title : ''} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    videos != undefined &&
                    <FlatList
                        data={videos.videos}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 60 }}
                        renderItem={({ item, index }) => {
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

export default ViewAllScreen;