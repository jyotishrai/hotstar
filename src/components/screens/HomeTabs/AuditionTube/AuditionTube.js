import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Utils from '../../../../utility';
import { BookContext } from '../../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMG_BG } from '../../../../utility/imageRes';
import RowHome from '../../../rows/RowHome';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getVideoCategoriesAction } from '../../../../actions/action'
import RegularText from '../../../common/RegularText';
import colors from '../../../../utility/Colors';
import { SCREEN_SELECT_VIDEO, SCREEN_ADD_TAGS, DEVICE_TOKEN, DEVICE_ID, USER_TOKEN } from '../../../../utility/constants';
import CustomLoader from '../../../common/CustomLoader'
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window')

const AuditionTube = ({ }) => {

    const { navigation } = useContext(BookContext)
    const dispatch = useDispatch();

    const { categories, fetching } = useSelector(state => ({
        categories: state.getVideoCategoriesReducer.videoCategories,
        fetching: state.getVideoCategoriesReducer.fetching,
        error: state.getVideoCategoriesReducer.error
    }), shallowEqual)

    useEffect(() => {
        getVideoCategories()
    }, [])

    function getVideoCategories() {
        dispatch(getVideoCategoriesAction({ page: 0 }))
    }

    function onCategorySelect(item, index) {
        navigation.navigate(SCREEN_SELECT_VIDEO, { category: item })
    }

    return (

        <View style={{ padding: 0, flex: 1, paddingVertical: 0, justifyContent: 'flex-start' }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    categories != undefined &&
                    // <FlatList
                    //     data={categories.response}
                    //     numColumns={2}
                    //     keyExtractor={(item, index) => index.toString()}
                    //     showsVerticalScrollIndicator={false}
                    //     renderItem={({ item, index }) => {
                    //         return (
                    //             <TouchableOpacity style={{ margin: 1, backgroundColor: colors.grey300 }} activeOpacity={0.9}
                    //                 onPress={() => onCategorySelect(item, index)}>
                    //                 <FastImage
                    //                     source={{ uri: item.image }}
                    //                     style={{
                    //                         height: width / 1.6,
                    //                         width: width / 2.02
                    //                     }} />
                    //                 <RegularText
                    //                     textStyle={{ position: 'absolute', bottom: 10, alignSelf: 'center', color: colors.white, fontSize: 18 }}
                    //                     title={item.category_name} />
                    //             </TouchableOpacity>
                    //         )
                    //     }} />
                    <View>
                        <View style={{ flexDirection: 'row' }}>

                            {categories != undefined && categories.response[0].image != undefined &&
                                <TouchableOpacity style={{ margin: 1, backgroundColor: colors.grey300 }} activeOpacity={0.9}
                                    onPress={() => onCategorySelect(categories.response[0], 0)}>
                                    <FastImage
                                        source={{ uri: categories.response[0].image }}
                                        style={styles.imageStyle} />
                                    <RegularText
                                        textStyle={{ position: 'absolute', bottom: 10, alignSelf: 'center', color: colors.white, fontSize: 18 }}
                                        title={categories.response[0].category_name} />
                                </TouchableOpacity>
                            }

                            {categories != undefined && categories.response[1].image != undefined &&
                                <TouchableOpacity style={{ margin: 1, backgroundColor: colors.grey300 }} activeOpacity={0.9}
                                    onPress={() => onCategorySelect(categories.response[1], 1)}>
                                    <FastImage
                                        source={{ uri: categories.response[1].image }}
                                        style={styles.imageStyle} />
                                    <RegularText
                                        textStyle={{ position: 'absolute', bottom: 10, alignSelf: 'center', color: colors.white, fontSize: 18 }}
                                        title={categories.response[1].category_name} />
                                </TouchableOpacity>
                            }

                            {categories != undefined && categories.response[2].image != undefined &&
                                <TouchableOpacity style={{ margin: 1, backgroundColor: colors.grey300 }} activeOpacity={0.9}
                                    onPress={() => onCategorySelect(categories.response[2], 2)}>
                                    <FastImage
                                        source={{ uri: categories.response[2].image }}
                                        style={styles.imageStyle} />
                                    <RegularText
                                        textStyle={{ position: 'absolute', bottom: 10, alignSelf: 'center', color: colors.white, fontSize: 18 }}
                                        title={categories.response[2].category_name} />
                                </TouchableOpacity>
                            }

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                categories != undefined && categories.response[3].image != undefined &&
                                <TouchableOpacity style={{ margin: 1, backgroundColor: colors.grey300 }} activeOpacity={0.9}
                                    onPress={() => onCategorySelect(categories.response[3], 3)}>
                                    <FastImage
                                        source={{ uri: categories.response[3].image }}
                                        style={styles.imageStyle} />
                                    <RegularText
                                        textStyle={{ position: 'absolute', bottom: 10, alignSelf: 'center', color: colors.white, fontSize: 18 }}
                                        title={categories.response[3].category_name} />
                                </TouchableOpacity>
                            }

                            {
                                categories != undefined && categories.response[4].image != undefined &&
                                <TouchableOpacity style={{ margin: 1, backgroundColor: colors.grey300 }} activeOpacity={0.9}
                                    onPress={() => onCategorySelect(categories.response[4], 4)}>
                                    <FastImage
                                        source={{ uri: categories.response[4].image }}
                                        style={styles.imageStyle} />
                                    <RegularText
                                        textStyle={{ position: 'absolute', bottom: 10, alignSelf: 'center', color: colors.white, fontSize: 18 }}
                                        title={categories.response[4].category_name} />
                                </TouchableOpacity>
                            }

                            {
                                categories != undefined && categories.response[5].image != undefined &&
                                <TouchableOpacity style={{ margin: 1, backgroundColor: colors.grey300 }} activeOpacity={0.9}
                                    onPress={() => onCategorySelect(categories.response[5], 5)}>
                                    <FastImage
                                        source={{ uri: categories.response[5].image }}
                                        style={styles.imageStyle} />
                                    <RegularText
                                        textStyle={{ position: 'absolute', bottom: 10, alignSelf: 'center', color: colors.white, fontSize: 18 }}
                                        title={categories.response[5].category_name} />
                                </TouchableOpacity>
                            }

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                categories != undefined && categories.response[6].image != undefined &&
                                <TouchableOpacity style={{ margin: 1, backgroundColor: colors.grey300 }} activeOpacity={0.9}
                                    onPress={() => onCategorySelect(categories.response[6], 6)}>
                                    <FastImage
                                        source={{ uri: categories.response[6].image }}
                                        style={styles.imageStyle} />
                                    <RegularText
                                        textStyle={{ position: 'absolute', bottom: 10, alignSelf: 'center', color: colors.white, fontSize: 18 }}
                                        title={categories.response[6].category_name} />
                                </TouchableOpacity>
                            }

                            {
                                categories != undefined && categories.response[7].image != undefined &&
                                <TouchableOpacity style={{ margin: 1, backgroundColor: colors.grey300 }} activeOpacity={0.9}
                                    onPress={() => onCategorySelect(categories.response[7], 7)}>
                                    <FastImage
                                        source={{ uri: categories.response[7].image }}
                                        style={styles.imageStyle} />
                                    <RegularText
                                        textStyle={{ position: 'absolute', bottom: 10, alignSelf: 'center', color: colors.white, fontSize: 18 }}
                                        title={categories.response[7].category_name} />
                                </TouchableOpacity>
                            }

                            {
                                categories != undefined && categories.response[8].image != undefined &&
                                <TouchableOpacity style={{ margin: 1, backgroundColor: colors.grey300 }} activeOpacity={0.9}
                                    onPress={() => onCategorySelect(categories.response[8], 8)}>
                                    <FastImage
                                        source={{ uri: categories.response[8].image }}
                                        style={styles.imageStyle} />
                                    <RegularText
                                        textStyle={{ position: 'absolute', bottom: 10, alignSelf: 'center', color: colors.white, fontSize: 18 }}
                                        title={categories.response[8].category_name} />
                                </TouchableOpacity>
                            }

                        </View>
                    </View>
                }
            </View>
            {
                fetching &&
                <CustomLoader />
            }
        </View>

    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: height / 3.5,
        width: width / 3.045
    },
})

export default AuditionTube;