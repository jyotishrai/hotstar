import {
    Platform
} from 'react-native';
import { displayIosNotification, displayAndroidNotification, } from './src/utility/Utils';

import { PARAMS } from './src/utility/constants';

export default async (message) => {
    // handle your message

    console.log('notification.data value bgMessage: ', message);
    if (Platform.OS === PARAMS.OS_TYPE_ANDROID) {
        displayAndroidNotification(message);
    }
    else if (Platform.OS === PARAMS.OS_TYPE_IOS) {
        displayIosNotification(message);
    }

    return Promise.resolve();
}