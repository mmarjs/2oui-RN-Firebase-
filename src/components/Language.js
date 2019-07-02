import React, { Component } from 'react';
import { Platform, AsyncStorage } from 'react-native';
import I18n, { getLanguages } from 'react-native-i18n';
I18n.translations = {
    'en': require('../assets/translation/english'),
    'fr': require('../assets/translation/french'),
    'es': require('../assets/translation/spanish'),
};

export function setAppLanguage(lng) {
    AsyncStorage.setItem('appLanguage', lng)
}
export function getAppLanguage() {
    return AsyncStorage.getItem('appLanguage').then(lng => {
        return lng
    })
}
export function setDeviceLanguage() {
    return getLanguages().then(languages => {
        console.log('Languages',languages)
        if (languages[0].slice(0, 2) == 'en' || languages[0].slice(0, 2) == 'fr' || languages[0].slice(0, 2) == 'es') {
            return languages[0].slice(0, 2)    
        }
        else {
            return 'en'
        }
    });
}
export function getDeviceLanguage() {
    return AsyncStorage.getItem('deviceLanguage').then(lng => {
        return lng
    })
}
export function setLoginData(data) {
    AsyncStorage.setItem('loginData',JSON.stringify(data))
}
export function getLoginData() {
    return AsyncStorage.getItem('loginData').then(loginData => {
        return JSON.parse(loginData)
    })
}
