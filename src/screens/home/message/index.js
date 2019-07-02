import React, { Component } from 'react';
import {
    Platform, FlatList, ScrollView, StyleSheet, Text, View, SafeAreaView, StatusBar, Image,
    TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground
} from 'react-native';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';
const up = require('../../../assets/images/upArrow.png')
const wrong = require('../../../assets/images/wrong.png')
const right = require('../../../assets/images/right.png')
const image = require('../../../assets/images/event_6.jpg')

export default class Message  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: true,
            allMessages: [
                {
                    image: require('../../../assets/images/user_3.jpg'),
                    name: 'Alicia',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1h',
                    type: 'user',
                    button: 'follow'
                },
                {
                    image: require('../../../assets/images/event_4.jpg'),
                    name: 'Epicurean brunch in the heart of paris',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1h',
                    type: 'event',
                    button: 'upArrow'
                },
                {
                    image: require('../../../assets/images/user_3.jpg'),
                    name: 'Alicia',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1h',
                    type: 'user',
                    button: null
                },
                {
                    image: require('../../../assets/images/event_5.jpg'),
                    name: 'Friendly golf tournament',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1h',
                    type: 'event',
                    button: 'upArrow'
                },
                {
                    image: require('../../../assets/images/user_6.jpg'),
                    name: 'Virendra',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1h',
                    type: 'user',
                    button: 'following'
                },
                {
                    image: require('../../../assets/images/user_9.jpg'),
                    name: 'Izabella',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '3j',
                    type: 'user',
                    button: 'img'
                },
                {
                    image: require('../../../assets/images/event_7.jpg'),
                    name: ' Spa Day for mums, sisters and all ladies',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '3j',
                    type: 'event',
                    button: 'wrongBtn'
                },
                {
                    image: require('../../../assets/images/event_1.jpg'),
                    name: 'Tips to Palm Shores Beaches',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '4j',
                    type: 'event',
                    button: 'rightBtn'
                },
                {
                    image: require('../../../assets/images/user_8.jpg'),
                    name: 'Adaora',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '6j',
                    type: 'user',
                    button: 'follow'
                },
                {
                    image: require('../../../assets/images/user_9.jpg'),
                    name: 'Izabella',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1sem',
                    type: 'user',
                    button: 'img'
                },
                {
                    image: require('../../../assets/images/event_9.jpg'),
                    name: 'Travel to the land of fire and ice',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1sem',
                    type: 'event',
                    button: 'wrongBtn'
                },
                {
                    image: require('../../../assets/images/event_2.jpg'),
                    name: 'IE: Mysteries of the Mind',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1sem',
                    type: 'event',
                    button: 'rightBtn'
                },
                {
                    image: require('../../../assets/images/user_9.jpg'),
                    name: 'Izabella',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '2sem',
                    type: 'user',
                    button: 'following'
                },
                {
                    image: require('../../../assets/images/user_9.jpg'),
                    name: 'Izabella',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '2sem',
                    type: 'user',
                    button: null
                },
            ],
            events: [
                {
                    image: require('../../../assets/images/event_4.jpg'),
                    name: 'Epicurean brunch in the heart of paris',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1h',
                    type: 'event',
                    button: 'upArrow'
                },
                {
                    image: require('../../../assets/images/event_5.jpg'),
                    name: 'Friendly golf tournament',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1h',
                    type: 'event',
                    button: 'upArrow'
                },
               
                {
                    image: require('../../../assets/images/event_7.jpg'),
                    name: 'Spa Day for mums, sisters and all ladies',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '3j',
                    type: 'event',
                    button: 'wrongBtn'
                },
                {
                    image: require('../../../assets/images/event_1.jpg'),
                    name: 'Tips to Palm Shores Beaches',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '4j',
                    type: 'event',
                    button: 'rightBtn'
                },
                
                {
                    image: require('../../../assets/images/event_9.jpg'),
                    name: 'Travel to the land of fire and ice',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1sem',
                    type: 'event',
                    button: 'wrongBtn'
                },
                {
                    image: require('../../../assets/images/event_2.jpg'),
                    name: 'IE: Mysteries of the Mind',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time: '1sem',
                    type: 'event',
                    button: 'rightBtn'
                },
            ],
        }
    }

    _allMessages() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        if (this.state.allMessages.length > 0) {
            return (
                <View style={{ width: '100%', }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.allMessages}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={()=>Actions.Chats({_type:item.type})} style={{ flex: 1, width: '100%', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                        {item.type == 'user' ?
                                            <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                            :
                                            <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 20 }} />
                                        }
                                        <View style={{ marginLeft: 10, width: '80%' }}>
                                            <View style={{ width: '90%' }}>
                                                <Text numberOfLines={1} style={styles.followNameText}>{item.name}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center',width:'90%' }}>
                                                <Text numberOfLines={1} style={[styles.followDescText,{width:'95%'}]}>{item.message}</Text>{dot}
                                                <Text style={styles.followDescText}>{item.time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RF(2.7), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No Messages yet</Text>
                    <Text style={{ fontSize: RF(2.5), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>Talk privately with anyone who follow you or with group by participating to any event  </Text>
                </View>
            )
        }
    }

    _events() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        if (this.state.allMessages.length > 0) {
            return (
                <View style={{ width: '100%', }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.events}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={()=>Actions.Chats({_type:item.type})} style={{ flex: 1, width: '100%', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                        {item.type == 'user' ?
                                            <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                            :
                                            <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 20 }} />
                                        }
                                        <View style={{ marginLeft: 10, width: '80%' }}>
                                            <View style={{ width: '90%' }}>
                                                <Text numberOfLines={1} style={styles.followNameText}>{item.name}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center',width:'90%' }}>
                                                <Text numberOfLines={1} style={[styles.followDescText,{width:'95%'}]}>{item.message}</Text>{dot}
                                                <Text style={styles.followDescText}>{item.time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                   
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RF(2.7), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No messages yet</Text>
                    <Text style={{ fontSize: RF(2.5), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>Talk privately with anyone who follow you or with group by participating to any event  </Text>
                </View>
            )
        }

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <View style={{ alignSelf: 'flex-end', marginHorizontal: 20 }}>
                    <TouchableOpacity style={{marginTop:6}}
                        onPress={() =>{}}>
                       <Image source={require('../../../assets/images/createmessage.png')} style={{width:30,height:30}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.subContainerView}>
                    <View style={{ marginTop: 10, marginBottom: 7, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: RF(3.8), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#000' }}>Messages</Text>
                    </View>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f2f3f5', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 13, marginHorizontal: 20, marginTop: 3 }}>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: true }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == true ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == true ? '#fff' : '#000' }]}>All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: false }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == false ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == false ? '#fff' : '#000' }]}>Events</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        this.state.clicks ?
                            <View style={{ flex: 1 }}>
                                {this._allMessages()}
                            </View>
                            :
                            <View style={{ flex: 1 }}>
                                {this._events()}
                            </View>
                    }

                </View>

            </SafeAreaView>
        )
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
        //paddingHorizontal: 20,
        height: '100%'
    },
    backView: {
        width: 30,
    },
    eventBtn: {
        width: '50%',
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,

    },
    eventTxt: {
        fontSize: RF(2.0),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        textAlign: 'center',
        alignSelf: 'center'
    },
    relatedEventsMainView: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 5,
        elevation: 0.8,
        borderRadius: 15,
        shadowOffset: { height: 0.5, width: 1.5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginTop: 15
    },
    relatedEventsCardView: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 15,
        backgroundColor: '#fff'
    },
    relatedEventsDetailsView: {
        width: '65%',
        justifyContent: 'space-between',
        paddingHorizontal: 8
    },
    relatedEventsCategoryView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 3
    },
    relatedEventsCategoryText: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontSize: RF(2),
    },
    relatedEventsTitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RF(2.5),
        color: 'black'
    },
    relatedEventsSubtitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Light' : 'Lato Light',
        //fontSize: 14, 
        fontSize: RF(2),
        width: '95%',
        marginVertical: 2
    },
    relatedEventsHandlerView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    cartContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 12,
        elevation: 0.7,
        shadowOffset: { width: 1, height: 1, },
        shadowColor: 'gray',
        shadowOpacity: 0.1,
        width: '100%',
    },
    descText: {
        fontSize: RF(2.8),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },
    cartText: {
        fontSize: RF(2.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 100,
    },
    followNameText: {
        fontSize: RF(2.3),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        paddingBottom: 3,
        //width:'80%',
    },
    followDescText: {
        fontSize: RF(1.7),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#aeadba'
    }
});
