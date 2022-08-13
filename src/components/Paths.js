import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const getData = async (data) => {
    try {
        return await AsyncStorage.getItem(data);
    } catch(e) {
    }
}

const storeData = async (data) => {
    try {
        await AsyncStorage.setItem(data, "true")
    } catch (e) {
      // saving error
    }
}

export function CompletedPath(path) {
    storeData(path);
}


export default getData;