import NetInfo from "@react-native-community/netinfo";
import flashMessage from "../components/common/CustomFlashAlert";
import { DEVICE_ID, DEVICE_TOKEN, USER_TOKEN, KEY_USER_DATA } from "../utility/constants";
import { USER_DATA } from "../utility/CustomAsyncStorage";
import { API_EDIT_PROFILE_METHOD } from "../utility/ApiTypes";

export default async (method) => {
    let networkStatus = undefined;
    await NetInfo.fetch().then(state => {
        console.log('NETINFO ME AAYA')
        networkStatus = state.isConnected;
    });
    if (networkStatus != undefined && networkStatus) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (method.payload == undefined) {
                    return resolve(await getApiCall(method.type));
                } else {
                    return resolve(await getPostApiCall(method));
                }
            }, 100);
        })
    } else {
        return flashMessage("You are offline.", "danger");;
    }
}

let headers = new Headers({
    //'deviceInfo': '',
    'token': global[DEVICE_TOKEN], //'d83l_NVs98o:APA91bF12ZZGxbJ9yxrGbgV1nVL7ZUjy5t9QPVtXzD3_e8nYmJ00fguiFCn47bl6p51wqoGvXEc1JIqqTlNs2IcQG0M2phJCWAxF8LO4nFaOM1wFrIozEjtkSYqA2zhbKoXyq-_Sos1H',
    'userToken': global[USER_TOKEN], // '2e078fa4d7de3ae92bfc0be849cc4d5b',
    'deviceId': global[DEVICE_ID],
    'Content-Type': 'multipart/form-data',
    //'boundary': '9ce37efc-88ba-484f-b8eb-b312d3895c00'
})

console.log('================HEADER====================');
console.log(headers);
console.log('===============HEADER=====================');

export async function getApiCall(url) {
    console.log('url :::: ', url)
    try {
        let response = await fetch(url, {
            method: 'GET',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'multipart/form-data'
            // }
            //headers: headers,
            headers: {
                //'deviceInfo': '',
                'token': global[DEVICE_TOKEN], //'d83l_NVs98o:APA91bF12ZZGxbJ9yxrGbgV1nVL7ZUjy5t9QPVtXzD3_e8nYmJ00fguiFCn47bl6p51wqoGvXEc1JIqqTlNs2IcQG0M2phJCWAxF8LO4nFaOM1wFrIozEjtkSYqA2zhbKoXyq-_Sos1H',
                'userToken': global[USER_TOKEN], // '2e078fa4d7de3ae92bfc0be849cc4d5b',
                'deviceId': global[DEVICE_ID],
                'Content-Type': 'multipart/form-data',
                //'boundary': '9ce37efc-88ba-484f-b8eb-b312d3895c00'
            }
        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

async function getPostApiCall(method) {
    console.log(" Api Type : ", method.type + '   requestData :::: ', JSON.stringify(method.payload));
    let formData = new FormData();

    try {
        for (const [key, value] of Object.entries(method.payload)) {
            formData.append(`${key}`, value);
        }
        let response = await fetch(method.type, {
            method: 'POST',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'multipart/form-data'
            // },
            //headers: headers,
            headers: {
                //'deviceInfo': '',
                'token': global[DEVICE_TOKEN], //'d83l_NVs98o:APA91bF12ZZGxbJ9yxrGbgV1nVL7ZUjy5t9QPVtXzD3_e8nYmJ00fguiFCn47bl6p51wqoGvXEc1JIqqTlNs2IcQG0M2phJCWAxF8LO4nFaOM1wFrIozEjtkSYqA2zhbKoXyq-_Sos1H',
                'userToken': global[USER_TOKEN], // '2e078fa4d7de3ae92bfc0be849cc4d5b',
                'deviceId': global[DEVICE_ID],
                'Content-Type': 'multipart/form-data',
                //'boundary': '9ce37efc-88ba-484f-b8eb-b312d3895c00'
            },
            body: formData
        })
        let responseJson = await response.json();
        console.log('response>>>>>>>>>>', responseJson)
        return responseJson;
    } catch (error) {
        console.warn(error)
        if (method != API_EDIT_PROFILE_METHOD) {
            flashMessage(error.message, "danger");
        }
    }
}