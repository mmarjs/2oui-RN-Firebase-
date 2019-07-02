import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, StatusBar, FlatList, ScrollView,
    SafeAreaView, TouchableOpacity, AsyncStorage
} from 'react-native';
import { Icon, CheckBox } from 'native-base'
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize"
import Button from '../../../components/button'

export default class Upgrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: [
                {
                    name: 'Account details'
                },
                {
                    name: 'Account details'
                },
                {
                    name: 'Account details'
                },
                {
                    name: 'Account details'
                },
                {
                    name: 'Account details'
                },
            ]

        }
    }
    _renderList(title) {
        return (

            <TouchableOpacity style={styles.settingContainer}>
                <View style={styles.settingView}>
                    <Text style={styles.itemText}>{title}</Text>
                    <View style={{ right: 10, }}>
                        <Icon name='ios-arrow-forward' type='Ionicons' style={{ color: '#aeadba', fontSize: 20 }} />
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
    _logout() {
        AsyncStorage.clear()
        Actions.reset("Login")
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <View style={styles.headerView}>
                    <TouchableOpacity style={styles.backView}
                        onPress={() => this.props._pageNavigate(4, '', user)}>
                        <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.subContainerView}>
                    <View style={{ paddingBottom: 15, width: '100%', alignSelf: 'center', borderBottomWidth: 1, borderColor: '#f2f3f5', }}>
                        <Text style={styles.headingText}>Settings</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ width: '100%' }}>
                            {this._renderList('Account details')}
                            {this._renderList('Notifications')}
                            {this._renderList('Language')}
                            {this._renderList('Support')}
                            {this._renderList('Terms of Service')}
                            {this._renderList('Privacy Policy')}
                        </View>
                        <TouchableOpacity onPress={() => this._logout()} style={styles.logoutView}>
                            <Text style={styles.logoutText}>Log out</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
    },
    headerView: {
        flexDirection: 'row',
        width: '90%',
        paddingVertical: 10,
        alignSelf: 'center',
        alignContent: 'center'
    },
    backView: {
        width: 40,
        alignItems: 'flex-start',
    },
    headingText: {
        paddingHorizontal: 20,
        fontSize: RF(3.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000'
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 50,
        width: '100%',
        borderRadius: 25,
    },
    itemText: {
        fontSize: RF(2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontWeight: '400',
        color: '#000'
    },
    settingView: {
        width: '90%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    settingContainer: {
        borderBottomWidth: 1,
        borderColor: '#f2f3f5'
    },
    logoutText: {
        width: '90%',
        alignSelf: 'center',
        color: '#9246e6',
        fontSize: RF(2.2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    },
    logoutView: {
        width: '100%',
        paddingVertical: 20,
        marginTop: 25,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#f2f3f5'
    }
});
