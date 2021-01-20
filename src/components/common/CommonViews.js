import React, { useState, useEffect, useContext } from 'react';
import {
    ImageBackground,
    TouchableOpacity,
    Image,
    View,
    Text,
    Animated,
    Easing,
    Picker,
    ScrollView,
    FlatList
} from 'react-native';
import * as Utils from '../../utility';
import CustomRadio from './CustomRadio';
import { Dropdown } from 'react-native-material-dropdown';
import CommonButton from './CommonButton';
import { BookContext } from '../../Contexts';
import colors from '../../utility/Colors';
import StarRating from 'react-native-star-rating';
import flashMessage from './CustomFlashAlert';




export const LaundaryDetailHeader = (props) => {
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }
    return (
        <ImageBackground source={Utils.ImgPath.IMG_BG} style={{ width: '100%' }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ margin: 10 }}>
                <Image style={{ width: 25, height: 25, resizeMode: 'center' }} source={Utils.ImgPath.IMG_BACK} />
            </TouchableOpacity>
            <View style={{ padding: 10, marginTop: 20 }}>
                <Text style={[Utils.Typography.FONT_REGULAR, { fontSize: 18, color: 'white' }]}>Xpress Laundary</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[Utils.Typography.FONT_LIGHT, { fontSize: 12, color: 'white' }]}>140 Valentica St. San Francisco</Text>
                    <Text style={[Utils.Typography.FONT_LIGHT, { fontSize: 12, color: 'white' }]}>2.8 Km away</Text>
                </View>
                <View style={{ marginLeft: 0, marginTop: 5, backgroundColor: 'transparent',alignItems:'center' ,flexDirection:'row'}}>
                    <StarRating
                        disabled={true}
                        containerStyle={{display:'flex',}}
                        maxStars={5}
                        rating={3}
                        starStyle={{padding:2}}
                        starSize={14}
                        fullStarColor="yellow"
                        halfStarColor="yellow"
                        emptyStarColor="white"
                        selectedStar={(rating) => flashMessage(rating,'success')}
                    />
                    <Text style={[Utils.Typography.FONT_LIGHT, { fontSize: 12, color: 'white' ,left:5}]}>(90 Reviews)</Text>

                </View>
            </View>

        </ImageBackground>
    )
}

export const IconWithTitle = (props) => {
    const { source, title, backgroundColor, tintColor, onPress, textSize, imgStyle, containerStyle, disabled } = props

    return (
        <TouchableOpacity disabled={disabled} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 10 }} onPress={onPress}>
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: backgroundColor ? backgroundColor : 'white', marginBottom: 10, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Image source={source} style={{ resizeMode: 'contain', width: 30, height: 30, tintColor: tintColor ? tintColor : null, ...imgStyle }} />
            </View>
            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: textSize ? textSize : 12 }}>{title}</Text>
        </TouchableOpacity>
    )
}

export const CustomHeader = ({ onPress, title, icon }) => {
    return (
        <View style={{ height: 54, backgroundColor: colors.BLUE_COLOR, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginLeft: 15 }} onPress={onPress}>
                <Image source={icon ? icon : Utils.ImgPath.IMG_BACK} style={{ resizeMode: 'center' }} />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 15, marginLeft: '28%', ...Utils.Typography.FONT_BOLD }}>{title}</Text>
        </View>
    )
}

export const CategoryListView = ({ item }) => {
    return (
        <>
            <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={item.img} style={{ resizeMode: 'center', height: 40, width: 40 }} />
                    <View style={{ marginLeft: 15 }}>
                        <Text>{item.label}</Text>
                        <Text style={{ color: colors.BLUE_COLOR }}>{item.price}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 0.5, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 16 }}>-</Text></TouchableOpacity>
                    <Text style={{ fontSize: 16, ...Utils.Typography.FONT_BOLD, marginLeft: 10, marginRight: 10 }}>2</Text>
                    <TouchableOpacity style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 0.5, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 16 }}>+</Text></TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 0.4, flex: 1, backgroundColor: 'grey', marginTop: 10 }} />
        </>
    )
}
//**Custom Toggle Cell */
export const ExpandableHeaderView = props => {
    const { item, onHeaderTap, enableDelete } = props;
    let spinValue = new Animated.Value(0)
    const [isRotate, setIsRotate] = useState(false)

    useEffect(() => {
        Animated.timing(spinValue, {
            toValue: isRotate ? 1 : 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [isRotate])

    const clickedOnHeader = (item, index) => {
        console.warn("ghghghg ::: click");
        setIsRotate(!isRotate)
    }
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })


    return (
        <View style={{ ...Utils.Mixins.boxShadow('black') }}>
            <TouchableOpacity activeOpacity={1} onPress={() => clickedOnHeader(item)}>
                <View style={{ backgroundColor: item.isSelected ? '#c52724' : '#EFF3F6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 15, margin: 10, marginBottom: 0 }}>
                    <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 13, color: item.isSelected ? 'white' : 'black' }}>{item.label}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 13, color: item.isSelected ? 'white' : 'black' }}>{item.sub_title}</Text>
                        <Animated.Image source={item.isSelected ? Utils.ImgPath.IMG_DOWN_ARROW : Utils.ImgPath.IMG_DOWN_ARROW} style={{ width: 12, height: 12, marginLeft: 5, transform: [{ rotate: spin }], resizeMode: 'center' }} />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ ...Utils.Mixins.boxShadow('black'), marginLeft: 10, marginRight: 10 }}>
                {
                    isRotate && <View style={{ padding: 10, backgroundColor: 'white' }}>
                        {enableDelete && <TouchableOpacity style={{ alignSelf: 'flex-end', borderWidth: 0.5, borderColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 2 }}><Text style={{ marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, ...Utils.Typography.FONT_LIGHT, color: 'red', fontSize: 12 }}>delete</Text></TouchableOpacity>}
                        {props.children}
                    </View>
                    //     item.isSelected && (
                    //     item.sub_cat.map((item, index) => {
                    //         return (
                    //             <TouchableOpacity key={index} style={{ backgroundColor: '#EFF3F6' }} >
                    //                 {props.children}
                    //             </TouchableOpacity>
                    //         )
                    //     })
                    // )
                }
            </View>
        </View>
    );
}

export const SelectAddressView = (props) => {
    const { item } = props
    return (
        <View style={{ flexDirection: 'row', paddingLeft: 15, paddingTop: 15 }}>
            <View>
                <CustomRadio isSelected={item.isTrue} />
            </View>
            <View style={{ flex: 1, marginLeft: 10, paddingRight: 10 }}>
                <Text style={{ ...Utils.Typography.FONT_REGULAR }}>{item.label}</Text>
                <Text style={{ ...Utils.Typography.FONT_LIGHT, fontSize: 11 }}>{item.add}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Image source={Utils.ImgPath.IMG_DOT_MENU} style={{ height: 60, width: 20, resizeMode: 'center' }} />
            </View>
        </View>
    )
}
export const SelectPaymentView = (props) => {
    const { item } = props
    return (
        <View style={{ flexDirection: 'row', paddingLeft: 15, marginBottom: 15, marginRight: 10 }}>
            <View>
                <CustomRadio isSelected={item.isTrue} />
            </View>
            <View style={{ flex: 1, marginLeft: 10, paddingRight: 10 }}>
                <Text style={{ ...Utils.Typography.FONT_REGULAR }}>{item.label}</Text>
                <Text style={{ ...Utils.Typography.FONT_LIGHT, fontSize: 11 }}>{item.add}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Image source={item.img} style={{ resizeMode: 'center' }} />
            </View>
        </View>
    )
}
export const FooterPaymentView = (props) => {
    const { item } = props
    return (
        <View style={{ padding: 10, borderBottomWidth: 0.5, borderBottomColor: colors.LIGHT_GREY_COLOR }}>
            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 16 }}>Price Details</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
                <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 14 }}>Subtotal</Text>
                <Text style={{ ...Utils.Typography.FONT_LIGHT, fontSize: 11 }}>3000/-</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
                <Text style={{ ...Utils.Typography.FONT_LIGHT, fontSize: 11 }}>Tax</Text>
                <Text style={{ ...Utils.Typography.FONT_LIGHT, fontSize: 11 }}>125/-</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
                <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 14 }}>Total</Text>
                <Text style={{ ...Utils.Typography.FONT_LIGHT, fontSize: 11 }}>3125/-</Text>
            </View>

        </View>
    )
}

export const AddAddressView = (props) => {
    const { navigation, dismiss } = props;
    const [pickAddress, setPickAddress] = useState([{
        value: 'Phase 8, sector 59,jsipur',
    }, {
        value: 'Phase 2, sector 4,Noida',
    }, {
        value: 'Phase 4, sector 60,Gurgaon',
    }]);
    return (
        <View style={{ padding: 10 }}>
            <Text style={{ ...Utils.Typography.FONT_BOLD, fontSize: 14, marginTop: 10 }}>ADD ADDRESS</Text>
            <Dropdown
                label='Select Area'
                data={pickAddress}
                fontSize={14}
                itemPadding={10}
                itemTextStyle={{ ...Utils.Typography.FONT_REGULAR, fontSize: 14 }}
                onChangeText={(item) => console.warn("seledcted item :::: ", item)
                }
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 12, color: colors.LIGHT_GREY_COLOR }}>Complete Address</Text>
                <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 12, color: colors.BLUE_COLOR }} onPress={() => {
                    dismiss(false)
                    navigation.navigate(Utils.Constants.KEY_PIN_YOUR_LOCATION)
                }}>Pin Your Location</Text>
            </View>
            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 12, marginTop: 10, marginBottom: 10 }}>72 Tanglewood Ave. Charlottesville, VA 22901,1 169 Hamilton street Lilburn, GA 30047.72 Tanglewood Ave.</Text>
            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 12, color: colors.LIGHT_GREY_COLOR, marginTop: 10 }}>Contact No.</Text>
            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 12, marginTop: 10, marginBottom: 10 }}>0+91 9988776655</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 30 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomRadio />
                    <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 14, marginLeft: 10 }}>Home</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomRadio isSelected={true} />
                    <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 14, marginLeft: 10 }}>Work</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomRadio />
                    <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 14, marginLeft: 10 }}>Other</Text>
                </View>
            </View>
        </View>
    )
}

export const SelectDateTimeView = (props) => {
    const { title } = props;
    const [pickTime, setPickTime] = useState([{
        value: '10:00 AM - 12:00 PM',
    }, {
        value: '02:00 AM - 04:00 PM',
    }, {
        value: '05:00 AM - 07:00 PM',
    }]);

    return (
        <View style={{ margin: 10, padding: 10 }}>
            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 16 }}>{title}</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderColor: colors.LIGHT_GREY_COLOR, borderWidth: 0.5, marginTop: 10 }}>
                <Text>Wed, 11 dec, 2019</Text>
                <Image source={Utils.ImgPath.IMG_CALENDRA_GREY} />
            </TouchableOpacity>
            <Dropdown
                label='Select Time'
                data={pickTime}
                fontSize={14}
                itemPadding={10}
                itemTextStyle={{ ...Utils.Typography.FONT_REGULAR, fontSize: 14 }}
                onChangeText={(item) => console.warn("seledcted item :::: ", item)
                }

            />
        </View>
    )
}

export const CompleteOrderView = () => {
    return (
        <View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Image style={{ width: 200, height: 150, resizeMode: 'center' }} source={Utils.ImgPath.IMG_TRUCK} />
                        <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 18, marginLeft: 10, textAlign: 'center' }}>Thank You For Choosing Us!</Text>
                        <Text style={{ ...Utils.Typography.FONT_LIGHT, fontSize: 13, marginLeft: 10, textAlign: 'center', color: colors.GREY_COLOR, marginTop: 10 }}>Your pickup has been confirmed.</Text>
                    </View>
                    <View style={{ width: '100%', alignSelf: 'flex-start', marginTop: 30, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, marginRight: 0, padding: 10 }}>
                            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 15, marginLeft: 10 }}>Shop Name</Text>
                            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 15, marginLeft: 10 }}>Dhobey Laundary</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, marginRight: 0, padding: 10 }}>
                            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 15, marginLeft: 10 }}>Order Id</Text>
                            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 15, marginLeft: 10 }}>201579851</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, marginRight: 0, padding: 10 }}>
                            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 15, marginLeft: 10 }}>Final Amount</Text>
                            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 15, marginLeft: 10 }}>3125/-</Text>
                        </View>
                        <View style={{ marginLeft: 0, marginRight: 0, padding: 10 }}>
                            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 15, marginLeft: 10 }}>Pickup Date & Time</Text>
                            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 12, marginLeft: 10, marginTop: 10, color: colors.LIGHT_GREY_COLOR }}>Monday 12 Dec 2019 at 10:00 AM to 12:00 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, marginRight: 0, padding: 10 }}>
                            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 15, marginLeft: 10 }}>Payment Method</Text>
                            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 15, marginLeft: 10 }}>xxxx-4123</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ padding: 15, marginTop: 20 }}>

                <CommonButton title={'GO TO ORDER STATUS'} style={{ borderRadius: 0, padding: 10, width: 300 * Utils.Mixins.size / 320, borderRadius: 5 }} />
            </View>
        </View>
    )
}

export const BookingInProgressView = () => {
    const { navigation } = useContext(BookContext)

    const list = [
        { title: "Dhobee Laundary Service", orderNo: 110045578, price: "500/-", status: "confirm" },
        { title: "My Laundary", orderNo: 110045578, price: "600/-", status: "confirm" },
        { title: "Wash Laundary Services", orderNo: 110045578, price: "750/-", status: "confirm" },
        { title: "Cleaning Laundary Services", orderNo: 110045578, price: "450/-", status: "confirm" },
        { title: "Dhobee Laundary Service", orderNo: 110045578, price: "500/-", status: "confirm" },
    ]
    const [bookingList, setBookingList] = useState(list);
    const renderBookingList = (item, index) => {
        return (
            <TouchableOpacity activeOpacity={0.9} style={{ padding: 10, paddingTop: 15, paddingBottom: 15, marginBottom: 1, backgroundColor: 'white' }} onPress={() => navigation.navigate(Utils.Constants.KEY_ORDER_DETAILS)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 14, marginLeft: 10 }}>Dhobee Laundary services</Text>
                    <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 14, marginLeft: 10 }}>500/-</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 12, marginLeft: 10, color: colors.LIGHT_GREY_COLOR }}>order No. 110045578</Text>
                    <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 12, marginLeft: 10, color: colors.BLUE_COLOR }}>confirm</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconWithTitle disabled={true} source={Utils.ImgPath.IMG_ORDER_CONFIRMED} title={"Confirmed"} textSize={9} imgStyle={{ width: 40, height: 40 }} /><View style={{ width: 5, height: 1, backgroundColor: 'red' }} />
                    <IconWithTitle disabled={true} source={Utils.ImgPath.IMG_BAG_PICKEDUP} title={"Picked up"} textSize={9} imgStyle={{ width: 40, height: 40 }} /><View style={{ width: 5, height: 1, backgroundColor: 'red' }} />
                    <IconWithTitle disabled={true} source={Utils.ImgPath.IMG_ORDER_IN_PROCESS} title={"In Process"} textSize={9} imgStyle={{ width: 40, height: 40 }} /><View style={{ width: 5, height: 1, backgroundColor: 'red' }} />
                    <IconWithTitle disabled={true} source={Utils.ImgPath.IMG_ORDER_DELIVERY} title={"Shopped"} textSize={9} imgStyle={{ width: 40, height: 40 }} /><View style={{ width: 5, height: 1, backgroundColor: 'red' }} />
                    <IconWithTitle disabled={true} source={Utils.ImgPath.IMG_SUCCESSFULLY_DELIVERD} title={"Delivered"} textSize={9} imgStyle={{ width: 40, height: 40 }} />

                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={bookingList}
                renderItem={({ item, index }) => renderBookingList(item, index)}
                keyExtractor={(item, index) => index.toString()}
                extraData={setBookingList}
                style={{ marginBottom: 10, backgroundColor: colors.LIGHT_GREY_COLOR }}

            />
        </View>
    )
}

export const ProfileImgTitleView = (props) => {
    const { icon, title } = props
    return (
        <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white', height: 60 }}>
            <Image source={icon} style={{ resizeMode: 'contain', width: 20, height: 20, tintColor: 'black' }} />
            <Text style={{ ...Utils.Typography.FONT_REGULAR, fontSize: 13, marginLeft: 10 }}>{title}</Text>
        </TouchableOpacity>
    )
}