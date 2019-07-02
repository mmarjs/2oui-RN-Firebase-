import React, { Component } from 'react';
import { Platform, StyleSheet, Image, Text, View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Icon, CheckBox } from 'native-base'
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize"
import Button from '../../../components/button';

export default class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [{
                image: "https://simplicity.in/images/home/final/events.jpg",
                name: "Harry Potter Marathon at the cinema",
                checked: true
            }]
        }
    }

    _event(event) {
        console.log("Event", event)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                <View style={styles.subContainerView}>
                <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                    <View style={{ width:'90%',alignSelf:'center',flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => Actions.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>Invite</Text>
                        <Text style={styles.clearText}>...</Text>
                    </View>
                    </View>
                    <View style={{borderBottomWidth: 1, borderColor: '#f2f3f5'}}>
                        <Text style={styles.titleTxt}>Your events</Text>
                        <ScrollView>
                            {this.state.events.map((item) =>
                                <View style={styles.eventView}>
                                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>
                                        <Image source={{ uri: item.image }} style={styles.imgView} />
                                    </View>
                                    <View style={{ width: '65%', justifyContent: 'center' }}>
                                        <Text style={styles.itemTxt}>{item.name}</Text>
                                    </View>
                                    <View style={{ width: '10%', alignSelf: 'center' }}>
                                        <CheckBox style={{ alignSelf: 'center' }} color='#8a4cea' checked={item.checked}
                                            onPress={() => this._event(item.name)} />
                                    </View>
                                </View>       
                        )}
                        </ScrollView>

                    </View>
                </View>
                <View style={styles.buttonView}>
                    <Button buttonText='Invite' onClick={() => { }} colors={['#a65ae1', '#8a4cea']} style={styles.buttoncontainer} />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
    },
    backView: {
        width: 30,
    },
    headerText: {
        height: 40,
        fontSize: RF(4.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        marginTop: 2
    },
    clearText: {
        height: 40,
        fontSize: RF(3.0),
        color: '#fff',
        marginTop: 10
    },
    eventView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center',
        borderRadius: 12,
        marginTop: 10,
        elevation: 0.5,
        shadowOffset: { width: 1, height: 1, },
        shadowColor: 'gray',
        shadowOpacity: 0.1,
    },
    titleTxt: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft:'5%',
        color: '#000',
        fontSize: RF(3.0),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },
    imgView: {
        height: 65,
        width: 65,
        borderRadius: 15,
        marginBottom: 10,
        marginTop: 10
    },
    itemTxt: {
        marginLeft: 15,
        marginRight: 7,
        marginBottom: 10,
        marginTop: 15,
        color: '#000',
        fontSize: RF(3.0),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },
    buttonView: {
        height: 80,
        justifyContent: 'center',
        borderColor: '#f2f3f5',
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
