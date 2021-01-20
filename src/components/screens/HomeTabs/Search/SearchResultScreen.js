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

const SearchResultScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const [searchText, setSearchText] = useState('')

    const { searchVideoRes, myVideos, fetching } = useSelector(state => ({
        searchVideoRes: state.searchReducer.searchVideoRes,
        fetching: state.searchReducer.fetching,
        error: state.searchReducer.error,
    }), shallowEqual);

    // alert(JSON.stringify(searchVideoRes))

    useEffect(() => {

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
        // navigation.navigate(Utils.Constants.SCREEN_SHOW_VIDEO, { video: item, index: index, FROM_SCREEN_TYPE: FROM_SEARCH_VIDEOS_SCREEN })
        navigation.navigate(Utils.Constants.SCREEN_SHOW_VIDEO, { video: searchVideoRes.response, index: index, FROM_SCREEN_TYPE: FROM_SEARCH_VIDEOS_SCREEN })
        global[initialScrollIndex] = index
    }

    return (
        <View style={{ padding: 0, flex: 1, paddingVertical: 0, justifyContent: 'flex-start' }}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.headerColor1, colors.headerColor2,]}
                style={{
                    flex: 1,
                    maxHeight: 55,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        flex: .95,
                        alignSelf: 'center',
                        //justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.white,
                        borderRadius: DIMENS.INPUT_FIELD_BORDER_RADIUS,
                        height: DIMENS.searchInptH + 5,
                        paddingHorizontal: 10
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <TextInput
                            style={[{ textAlign: 'left', marginHorizontal: 5 }]}
                            keyboardType={Utils.Constants.KB_TYPE_DEFAULT}
                            onSubmitEditing={() => onPressSearch()}
                            value={searchText}
                            onChangeText={value => onChangeSearchText(value)}
                            placeholder={Strings.search}
                            returnKeyType={"search"}
                        />
                    </View>
                    <TouchableOpacity style={{
                        padding: 5
                    }}
                        onPress={() => onPressSearch()}
                    >
                        <Image
                            source={IMG_SEARCH}
                            resizeMode={'contain'}
                            style={{
                                width: 15,
                                height: 15,
                            }} >
                        </Image>
                    </TouchableOpacity>
                </View>
            </LinearGradient >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    searchVideoRes != undefined && searchVideoRes.response != undefined ?

                        <FlatList
                            data={searchVideoRes.response}
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
                            }} /> :
                        <RegularText title={searchVideoRes != undefined && searchVideoRes.message} />
                }
                {
                    searchVideoRes == undefined &&
                    <RegularText title={Strings.search_something} />
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

export default SearchResultScreen;