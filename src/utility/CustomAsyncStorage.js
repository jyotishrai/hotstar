import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import * as Utils from "./index"

export const USER_DATA = Utils.Constants.KEY_USER_DATA;
export const TIME_OUT_TIME = 'TIME_OUT_TIME';

export const setUserData = (data) => {
    storeItem(USER_DATA, data);
}

export const getUserData = () => {
    return retrieveItem(USER_DATA).then((data) => {
        //this callback is executed when your Promise is resolved
        console.log('userData Value retrieveItem :' + JSON.stringify(data));
    }).catch((error) => {
        //this callback is executed when your Promise is rejected
        console.log('Promise is rejected with error:' + error);
    })
}



export async function retrieveItem(key) {
    try {
        const retrievedItem = await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
    } catch (error) {
        console.log(error.message);
    }
    return
}

export async function storeItem(key, item) {
    try {
        //we want to wait for the Promise returned by AsyncStorage.setItem()
        //to be resolved to the actual value before returning the value
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
        console.log(error.message);
    }
}

export async function clearData() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        // Error retrieving data
    }
}


// // hook for asyncstorage
// export const useStorage = (key, defaultValue) => {
//     const [storageValue, updateStorageValue] = useState(defaultValue);

//     async function getStorageValue() {
//         let value = defaultValue;
//         try {
//             value = JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
//         } catch (e) {
//         } finally {
//             updateStorageValue(value);
//         }
//     }

//     async function updateStorage(newValue) {
//         try {
//             if (newValue === null) {
//                 await AsyncStorage.removeItem(key);
//             } else {
//                 const value = JSON.stringify(newValue);
//                 await AsyncStorage.setItem(key, value);
//             }
//         } catch (e) {
//         } finally {
//             updateStorageValue(newValue);
//         }
//     }

//     useEffect(() => {
//         getStorageValue();
//     }, []);

//     return [storageValue, updateStorage];
// };

// export async function saveValue(key, value) {
//     console.log('VALU IN SAVE METHOD : ', value)
//     try {
//         if (value == null) {
//             await removeValue(key);
//             return { success: true };
//         } else {
//             await AsyncStorage.setItem(key, value);
//             return { success: true };
//         }
//     } catch (e) {
//         console.log("LOG_Async Storage access Failed", e);
//         return { error: e };
//     }
// }

// export async function saveMultiValues(data) {
//     const mappedValues = values.map((v, i) => {
//         return [i, v];
//     });
//     try {
//         await AsyncStorage.multiSet(mappedValues);
//         return { success: true };
//     } catch (e) {
//         console.log("LOG_Async Storage access Failed", e);
//         return { error: e };
//     }
// }

// export async function getValue(key) {
//     try {
//         const value = await AsyncStorage.getItem(key);
//         return value;
//     } catch (e) {
//         console.log("LOG_Async Storage access Failed", e);
//         return false;
//     }
// }

// export async function getMultiValues(keys) {
//     let values;
//     try {
//         values = await AsyncStorage.multiGet(keys);
//     } catch (e) {
//         console.log("LOG_Async Storage access Failed", e);
//         return false;
//     }

//     let value;
//     values.forEach((v, i) => {
//         value[v[0]] = v[1];
//     });

//     return value;
// }

// export async function removeValue(key) {
//     try {
//         await AsyncStorage.removeItem(key);
//         return { success: true };
//     } catch (e) {
//         console.log("LOG_Async Storage access Failed", e);
//         return { error: e };
//     }
// }

// export async function removeMultiValues(keys) {
//     try {
//         await AsyncStorage.multiRemove(keys);
//         return { success: true };
//     } catch (e) {
//         console.log("LOG_Async Storage access Failed", e);
//         return { error: e };
//     }
// }

// export async function getAllKeys() {
//     let keys = [];
//     try {
//         keys = await AsyncStorage.getAllKeys();
//     } catch (e) {
//         console.log("LOG_Async Storage access Failed", e);
//     }
//     return keys;
// }

// export async function clearAll() {
//     try {
//         await AsyncStorage.clear();
//     } catch (e) {
//         console.log("LOG_Async Storage access Failed", e);
//     }
// }

