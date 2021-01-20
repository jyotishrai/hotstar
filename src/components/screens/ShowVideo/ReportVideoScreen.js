import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Button, ScrollView, TextInput } from 'react-native';
import * as Utils from '../../../utility';
import { BookContext } from '../../../Contexts';
import { IMG_IMAGE_PIC, IMAGE_USER, IMAGE_CATEGORY, IMAGE_SELECT_VIDEO_BG, IMAGE_VERIFIED } from '../../../utility/imageRes';
import RowHome from '../../rows/RowHome';
import { getIsCheck } from '../../../utility/Utils';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { reportVideoAction, clearReportVideoAction } from '../../../actions/action'
import RegularText from '../../common/RegularText';
import colors from '../../../utility/Colors';
import CommonHeaderTitleWithButton from '../../common/CommonHeaderTitleWithButton';
import Strings from '../../../translation/language';
import { Chip } from 'react-native-paper';
import CommonButton from '../../common/CommonButton';
import CustomAlertModal from '../../modals/customAlertModal';
import CustomLoader from '../../common/CustomLoader'

const { width, height } = Dimensions.get('window')

const reportOptions = [
    "Bad video quality", "Wrong content", "Abusive language", "Political content", "Terrorist content", "Personal Content"
]

const ReportVideoScreen = ({ navigation }) => {

    //const { navigation } = useContext(BookContext)
    const dispatch = useDispatch();

    const [video, setVideo] = useState(undefined)
    const [message, setMessage] = useState('')

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

    const { reportVideoRes, fetching } = useSelector(state => ({
        reportVideoRes: state.reportVideoReducer.reportVideoRes,
        fetching: state.reportVideoReducer.fetching,
        error: state.reportVideoReducer.error,
    }), shallowEqual);

    useEffect(() => {
        let video = navigation.state.params.videoData
        setVideo(video)
        if (reportVideoRes != undefined && reportVideoRes.error == false) {
            setIsSuccessModalVisible(true)
        }
        return () => {
            dispatch(clearReportVideoAction())
        }
    }, [reportVideoRes])

    function onReportVideo() {

        setMessage('')

        let userMessage = {
            video_id: video.id,
            message: message
        }

        dispatch(reportVideoAction(userMessage))
    }

    function closeSuccessModal() {
        setIsSuccessModalVisible(false)
        navigation.navigate(Utils.Constants.KEY_HOME_TAB)
    }

    return (
        <View style={{ flex: 1 }}>
            <CommonHeaderTitleWithButton title={Strings.report}></CommonHeaderTitleWithButton>
            <ScrollView>
                <View style={{ marginHorizontal: 10, marginVertical: 10, }}>
                    <FlatList
                        data={reportOptions}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                        renderItem={({ item, index }) => {
                            return <Chip
                                onPress={() => setMessage(item)}
                                mode='flat'
                                style={{
                                    marginVertical: 5,
                                    marginRight: 5,
                                }}>
                                {item}
                            </Chip>
                        }} />
                </View>
                <View style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.grey300,
                    height: 150,
                    paddingHorizontal: 10,
                    marginHorizontal: 10
                }}>
                    <TextInput
                        placeholder={Strings.enter_your_message}
                        multiline={true}
                        onChangeText={value => setMessage(value)}
                        value={message}
                    />
                </View>
                <CommonButton
                    style={{
                        marginHorizontal: 10,
                        marginVertical: 20
                    }}
                    title={Strings.submit}
                    bold={'bold'}
                    onPress={onReportVideo}
                    value={message}
                />
            </ScrollView>
            <CustomAlertModal
                visible={isSuccessModalVisible}
                // image={IMAGE_VERIFIED}
                message={Strings.video_report_successful}
                btnFirstText={Strings.ok}
                onYes={closeSuccessModal}
                onClose={closeSuccessModal}
            />
            {
                fetching &&
                <CustomLoader />
            }
        </View>
    );
}

export default ReportVideoScreen;