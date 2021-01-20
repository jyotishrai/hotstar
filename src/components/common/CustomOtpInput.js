import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';



const CustomOtpInput = (props) => {
const {otpText} = props;

    let otpTextInput1 = useRef(null);
    let otpTextInput2 = useRef(null);
    let otpTextInput3 = useRef(null);
    let otpTextInput4 = useRef(null);
    
    const [txtInput1, setTxtInput1] = useState('');
    const [txtInput2, setTxtInput2] = useState('');
    const [txtInput3, setTxtInput3] = useState('');
    const [txtInput4, setTxtInput4] = useState('');

    useEffect(() => {

        if (txtInput1.length >= 0 && txtInput1.length < 1) {
            otpTextInput1.focus()
        } else if (txtInput2.length >= 0 && txtInput2.length < 1) {
            otpTextInput2.focus()
        } else if (txtInput3.length >= 0 && txtInput3.length < 1) {
            otpTextInput3.focus()
        }else if (txtInput4.length >= 0 && txtInput4.length < 1) {
            otpTextInput4.focus()
        } else if (txtInput4.length <= 1) {
            otpTextInput4.blur()
        }
        otpText(txtInput1 + txtInput2 + txtInput3 + txtInput4);
        if ((`${txtInput1 + txtInput2 + txtInput3 + txtInput4}`.length===4)) {
            setTxtInput1('');
            setTxtInput2('');
            setTxtInput3('');
            setTxtInput4('');
        }
    });

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TextInput style={styles.txtInput} ref={ref => otpTextInput1 = ref} onChangeText={text => setTxtInput1(text)} value={txtInput1} keyboardType={'numeric'} />
            <View style={{ height: 1, marginLeft: 15, marginRight: 15, width: 15, backgroundColor:colors.LIGHT_GREY_COLOR }} />
            <TextInput style={styles.txtInput} ref={ref => otpTextInput2 = ref} onChangeText={text => setTxtInput2(text)} value={txtInput2} onKeyPress={({ nativeEvent }) => {
                nativeEvent.key === 'Backspace' ? console.log('delete ::: ', txtInput2) : console.log('nativeEvent ::: ', nativeEvent)//do action : //other action
            }} keyboardType={'numeric'} />
            <View style={{ height: 1, marginLeft: 15, marginRight: 15, width: 15, backgroundColor: colors.LIGHT_GREY_COLOR }} />
            <TextInput style={styles.txtInput} ref={ref => otpTextInput3 = ref} onChangeText={text => setTxtInput3(text)} value={txtInput3} keyboardType={'numeric'} />
            <View style={{ height: 1, marginLeft: 15, marginRight: 15, width: 15, backgroundColor: colors.LIGHT_GREY_COLOR }} />
            <TextInput style={styles.txtInput} ref={ref => otpTextInput4 = ref} onChangeText={text => setTxtInput4(text)} value={txtInput4} keyboardType={'numeric'} />
        </View>
    )
}

const styles = StyleSheet.create({
    txtInput: {
        flex: 1,
        height: 45,
        borderBottomColor: colors.LIGHT_GREY_COLOR,
        borderBottomWidth: 0.5,
        textAlign: 'center'
    }
});

export default CustomOtpInput;