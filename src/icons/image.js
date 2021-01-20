
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native'



function getImage({ style, src, tintColor, mode, onPress }) {

    return (
        // <TouchableOpacity
        //     activeOpacity={0} style={{ justifyContent: 'center', alignItems: 'center' }}
        //     onPress={() => onPress()}
        // >
        <Image
            style={style || { height: 20, width: 20, }}
            source={src != undefined ? src : null}
            resizeMode={mode}
            tintColor={tintColor || ''}
        />
        // </TouchableOpacity>
    );
}

export default getImage;