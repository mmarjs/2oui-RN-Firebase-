import React, { Component } from 'react';
import {
    Platform, FlatList, ScrollView, StyleSheet, Text, View, SafeAreaView, StatusBar, Image,
    TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground
} from 'react-native';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';


export default class Saved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: true,
            events: [
                {
                    image: require('../../../assets/images/event_1.jpg'),
                    category: 'Travel',
                    title: 'Trip to Plam Shores Beaches',
                    titleColor: 'rgb(108,171,247)',
                    date: '27 - 31 July',
                    time: '11:00 UTC+2',
                    eventManager: {
                        name: 'Anje',
                        image: require('../../../assets/images/user_5.jpg')
                    },
                    price: '2000$'
                },
                {
                    image: require('../../../assets/images/event_7.jpg'),
                    category: 'SCIENCE',
                    title: 'IE: Mysteries of the Mind',
                    titleColor: 'rgb(239,113,184)',
                    date: '31 July',
                    time: '9:00 UTC+2',
                    eventManager: {
                        name: 'Leo',
                        image: require('../../../assets/images/user_3.jpg')
                    },
                    price: '400$'
                },
                {
                    image: require('../../../assets/images/event_4.jpg'),
                    category: 'Restaurant',
                    title: 'Epicurean brunch in the hear of Paris',
                    titleColor: 'rgb(255,146,121)',
                    date: '12 April',
                    time: '18:00 UTC+2',
                    eventManager: {
                        name: 'Fernan',
                        image: require('../../../assets/images/user_10.jpg')
                    },
                    price: '350$'
                },
                {
                    image: require('../../../assets/images/event_6.jpg'),
                    category: 'Art',
                    title: 'Art Club: Introduction to Painting',
                    titleColor: 'rgb(239,113,184)',
                    date: '4 May',
                    time: '14:00 UTC+2',
                    eventManager: {
                        name: 'Izabella',
                        image: require('../../../assets/images/user_9.jpg')
                    },
                    price: '150$'
                },
            ],
            peoples: [
                {
                    name: 'Virendra',
                    age: 21,
                    prof: 'Journalist',
                    dist: '25km',
                    image: require('../../../assets/images/user_6.jpg'),
                },
                {
                    name: 'Izabella',
                    age: 22,
                    prof: 'Veterinarian',
                    dist: '40km',
                    image: require('../../../assets/images/user_9.jpg'),
                },
                {
                    name: 'Adaora',
                    age: 21,
                    prof: 'Archeologist',
                    dist: '61km',
                    image: require('../../../assets/images/user_8.jpg'),
                },
                {
                    name: 'jack',
                    age: 25,
                    prof: 'Veterinarian',
                    dist: '40km',
                    image: require('../../../assets/images/user_1.jpg'),
                },
            ],
        }
    }

    _events() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        if (this.state.events.length > 0) {
            return (
                <View style={{ width: '100%', marginTop:5, alignItems:'center' }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{alignItems:'center',paddingBottom:'35%'}}
                        data={this.state.events}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.relatedEventsMainView}>
                                <View style={styles.relatedEventsCardView}>
                                    <View style={{ width: '35%' }}>
                                        <Image source={item.image} style={{ height: 125, width: '100%' }} />
                                    </View>
                                    <View style={styles.relatedEventsDetailsView}>
                                        <View style={{ width: '100%' }}>
                                            <View style={styles.relatedEventsCategoryView}>
                                                <Text style={[styles.relatedEventsCategoryText, { color: item.titleColor }]}>{item.category.toLocaleUpperCase()}</Text>
                                                <Image source={require('../../../assets/images/saved.png')} style={{ height: 16, width: 18, tintColor: index % 2 != 0 ? '#f05d87' : null }} />
                                            </View>
                                            <View style={{ width: '90%' }}>
                                                <Text style={styles.relatedEventsTitle}>{item.title}</Text>
                                                <Text style={styles.relatedEventsSubtitle}>{item.date}{dot}{item.time}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.relatedEventsHandlerView}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                                <Image source={item.eventManager.image} style={{ height: 25, width: 25, borderRadius: 12.5 }} />
                                                <Text style={{ marginLeft: 5, color: 'black', fontSize: RF(2), }}>{item.eventManager.name}</Text>
                                            </View>
                                            <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', fontSize: RF(2) }}>{item.price}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.noDataView}>
                    <Text style={styles.noDataText1}>No saved events yet</Text>
                    <Text style={styles.noDataText2}>Tap on the empty heart to save your favorites </Text>
                </View>
            )
        }
    }

    _peoples() {
        if (this.state.peoples.length > 0) {
            return (
                <View style={{ width: '100%',marginTop:5 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:'35%'}}
                        data={this.state.peoples}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.card}>
                                <View style={[styles.cartContainer]}>
                                    <ImageBackground source={item.image} style={{ height: 350, width: '100%', }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                                            <TouchableOpacity >
                                                <Icon name='close' type='MaterialIcons' style={{ color: '#fff', }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setState(state => (this.state.peoples[index].like = !this.state.peoples[index].like, state))}>
                                                <Icon name={this.state.peoples[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#fff' }} />
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>

                                    <View style={{ width: '100%', padding: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>{(item.name)}</Text>
                                                <Text style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>,</Text>
                                                <Text style={[styles.descText, { paddingBottom: 5, paddingLeft: 5, color: '#000' }]}>{item.age}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5' }]}>{(item.prof)}</Text>
                                                <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', paddingHorizontal: 5 }]}>.</Text>
                                                <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5' }]}>{item.dist}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={[styles.buttoncontainer]}>
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                                                <Icon name='plus' type='Entypo' style={{ color: '#fff', fontSize: 20, right: 5 }} />
                                                <Text style={{ color: 'white', fontSize: 18, fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Invite</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.noDataView}>
                    <Text style={styles.noDataText1}>No saved people yet</Text>
                    <Text style={styles.noDataText2}>Tap on the empty heart to save your favorites </Text>
                </View>
            )
        }

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />

                <View style={styles.subContainerView}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>Saved</Text>
                    </View>
                    <View style={styles.bottomBorderView}>
                    <View style={styles.btnView}>
                        <TouchableOpacity onPress={() => { this.setState({ clicks: true }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == true ? '#9246e6' : 'transparent' }]}>
                            <Text style={[styles.eventTxt, { color: this.state.clicks == true ? '#fff' : '#000' }]}>Events</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ clicks: false }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == false ? '#9246e6' : 'transparent' }]}>
                            <Text style={[styles.eventTxt, { color: this.state.clicks == false ? '#fff' : '#000' }]}>People</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    { this.state.clicks ? this._events() : this._peoples() }
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
        height: '100%'
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
        width: '95%',
        marginVertical: 5,
        elevation: 0.8,
        borderRadius: 15,
        shadowOffset: { height: 1, width: 0 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 1,
        marginTop: 15,
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
    relatedEventsCategoryText:{
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontSize: RF(1.6),
    },
    relatedEventsTitle:{
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RF(2.2),
        color: 'black' 
    },
    relatedEventsSubtitle:{
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Light', 
        //fontSize: 14, 
        fontSize: RF(2),
        width:'100%',
        color: '#a8a7b5',
        marginVertical: 2
    },
    relatedEventsHandlerView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    card:{
        //backgroundColor:'red',
        borderRadius: 12,
        //elevation: 0.7,
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.3,
        shadowRadius:1,
        margin: 5, 
        marginTop: 18,
    },  
    cartContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 12,
        elevation:0.7,
        width: '90%',
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
    noDataView:{ 
        alignSelf: 'center', 
        marginTop: '30%', 
        flex: 1, 
        width: '95%' 
    },
    noDataText1:{ 
        paddingBottom: 20, 
        fontSize: RF(3.0), 
        color: '#000', 
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', 
        textAlign: 'center' 
    },
    noDataText2:{ 
        fontSize: RF(2.7), 
        color: '#d8d7dd', 
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', 
        textAlign: 'center' 
    },
    titleView:{ 
        marginTop:25,
        marginBottom:7,
        marginHorizontal:20 
    },
    titleText:{ 
        fontSize: RF(3.8), 
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', 
        color: '#000' 
    },
    bottomBorderView:{
        paddingVertical:10,
        borderBottomWidth:1,
        borderColor:'#f2f3f5',
        width:'100%' 
    },
    btnView:{ 
         flexDirection: 'row',
         alignItems: 'center', 
         justifyContent: 'center', 
         backgroundColor: '#f2f3f5', 
         borderRadius: 13,
         marginHorizontal:20
    },
});
