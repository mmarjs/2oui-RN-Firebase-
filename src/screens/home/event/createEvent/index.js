import React, { Component } from 'react';
import {
    Platform, FlatList, ScrollView, StyleSheet, Text, View, SafeAreaView, StatusBar, Image,
    TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground, TouchableHighlight,
    Modal, Dimensions,AsyncStorage
} from 'react-native';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import firebase from '../../../../components/Firebase'
import moment from 'moment'
export default class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: 0,
            btnClicks: true,
            modalVisible: false,
            height: Dimensions.get('screen').height / 1.6,
            swipe: 'SWIPE_DOWN',
            goingbutton: false,
            yoursEvent:[],
            selectedEvent:'',
            yours: [
                {
                    image: require('../../../../assets/images/event_3.jpg'),
                    category: 'Movies',
                    title: 'Harry Potter Marathon at the cinema',
                    titleColor: 'rgb(108,171,247)',
                    date: '9 - 10 Sep',
                    time: '20:00 UTC+2',
                    eventManager: {
                        name: 'Jack',
                        image: require('../../../../assets/images/user_1.jpg')
                    },
                    price: '120$'
                },
            ],
            upcoming: [
                {
                    image: require('../../../../assets/images/event_4.jpg'),
                    category: 'Restaurant',
                    title: 'Epicurean brunch in the heart of Paris',
                    titleColor: 'rgb(255,146,121)',
                    date: '12 April',
                    time: '18:00 UTC+2',
                    eventManager: {
                        name: 'Aasiya',
                        image: require('../../../../assets/images/user_10.jpg')
                    },
                    price: '350$'
                },
                {
                    image: require('../../../../assets/images/event_5.jpg'),
                    category: 'SPORT',
                    title: 'Friendly golf tournament',
                    titleColor: 'rgb(239,113,184)',
                    date: '27 - 31 July',
                    time: '11:00 UTC+2',
                    eventManager: {
                        name: 'Thomasson',
                        image: require('../../../../assets/images/user_5.jpg')
                    },
                    price: '80$'
                },
                {
                    image: require('../../../../assets/images/event_7.jpg'),
                    category: 'Health',
                    title: 'Spa Day for mums, sisters, daughters & all ladies',
                    titleColor: 'rgb(108,171,247)',
                    date: '20 June',
                    time: '10:00 UTC+2',
                    eventManager: {
                        name: 'Alicia',
                        image: require('../../../../assets/images/user_3.jpg')
                    },
                    price: '400$'
                },
            ],
            past: [
                {
                    image: require('../../../../assets/images/event_1.jpg'),
                    category: 'TRAVEL',
                    title: 'Trip to Palm Shores Beaches',
                    titleColor: 'rgb(108,171,247)',
                    date: '27 - 31 July',
                    time: '11:00 UTC+2',
                    eventManager: {
                        name: 'Anje',
                        image: require('../../../../assets/images/user_10.jpg')
                    },
                    price: '2000$'
                },
                {
                    image: require('../../../../assets/images/event_6.jpg'),
                    category: 'ART',
                    title: 'Art Club: Introduction to Painting',
                    titleColor: 'rgb(239,113,184)',
                    date: '4 May',
                    time: '14:00 UTC+2',
                    eventManager: {
                        name: 'Izabella',
                        image: require('../../../../assets/images/user_9.jpg')
                    },
                    price: '150$'
                },
            ]
        }
    }

    setModalVisible(visible,data) {
        this.setState({ modalVisible: visible ,selectedEvent:data});
    }
    componentDidMount(){
        var userData=firebase.database().ref().child('Users')
        var eventData=firebase.database().ref().child('Events')
        AsyncStorage.getItem('userData').then(user=>{
          user =JSON.parse(user)
          //console.log("user : ",user)
          if(user){
              eventsData=[]
            eventData.orderByChild('event_creater').equalTo(user.userId)
            .once('value',(events)=>
             {
                events.forEach((event,index)=>{
                userData.child(event.val().event_creater)
                .once('value',(user)=>
                {
                    eventDetails=event.val()
                    eventDetails.event_creater={name:user.val().name,profile:user.val().profile}
                    eventDetails.event_id=event.key
                    eventsData.push(eventDetails)
                    this.setState({yoursEvent:eventsData})
                })

              })
            })

            console.log("event data ",eventsData)
          }
          else{
            this.setState({loading:false})
          }
        })
    }
    _reanderStory(image) {
        return (
            <ImageBackground source={image} style={{ width: '100%', height: '100%' }} resizeMode='stretch'>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.headerView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => { this.setModalVisible(!this.state.modalVisible) }}
                                style={{ paddingHorizontal: 10 }}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: 'white', fontSize: 30 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/images/message1.png')} style={{ height: 25, width: 25, marginRight: 15 }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name={'favorite'} type='MaterialIcons' style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    _desc() {
        return (
            <View style={{ width: '100%', alignSelf: 'center', marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor:'#9246e6' }} source={require('../../../../assets/images/calender.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>9 - 10 Sep,2019</Text>
                        <Text style={styles.fulldescTimeText}>At 11:00 P.M EST</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor:'#9246e6' }} source={require('../../../../assets/images/pinpoint.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>Place de la Nation</Text>
                        <Text style={styles.fulldescTimeText}>75011 Paris, France</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor:'#9246e6' }} source={require('../../../../assets/images/price.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>200$ budget</Text>
                        <Text style={styles.fulldescTimeText}>The budget is splitted</Text>
                    </View>
                </View>
            </View>
        )
    }

    _yourEventModel() {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                }}>

                <View style={{ height: Platform.OS == 'ios' ? Dimensions.get('screen').height / 2.5 : Dimensions.get('screen').height / 3.3 }}>
                    <Swiper
                        dotColor='#cbcbcb'
                        activeDotColor='#ffffff'
                        activeDotStyle={{ borderWidth: 2, borderColor: '#cbcbcb', width: 12, height: 12, borderRadius: 6 }}
                        showsButtons={false}>
                        {this._reanderStory(require('../../../../assets/images/location_2.jpg'))}
                        {this._reanderStory(require('../../../../assets/images/location_3.jpg'))}
                        {this._reanderStory(require('../../../../assets/images/location_4.jpg'))}
                    </Swiper>
                </View>
                <View style={{ width: '100%', alignSelf: 'center', height: this.state.height, backgroundColor: 'white', position: 'absolute', bottom: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: 'hidden' }}>
                    <View style={{ marginTop: 15, marginBottom: 5,paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: RF(2.3), color: 'rgb(239,113,184)', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>MOVIES</Text>
                    </View>
                    <View style={{ width: '100%',paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: RF(3.5), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Harry Potter Marathon at the cinema</Text>
                    </View>
                    <View style={{ marginTop: 10,paddingHorizontal: 20 }}>
                        {this._desc()}
                    </View>
                    <View style={{ flexDirection: 'row',paddingVertical: 20, width: '100%', alignSelf: 'center',justifyContent:'center',borderTopWidth:1,borderTopColor:'#f2f3f5' }}>
                        <View style={{  alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 20, width:'40%' }}>
                            <TouchableOpacity onPress={() =>  {Actions.EditEvent(),this.setState({modalVisible:false}) } } style={{ backgroundColor:  '#f2f3f5',  padding: 12, borderRadius: 20, flexDirection: 'row', justifyContent:'center',width:'100%' }}>
                                <Image style={{ height: 20, width: 20, tintColor:  '#000'}} source={require('../../../../assets/images/edit.png')} />
                                <Text style={ { color: '#000', fontSize:RF(2.1), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',paddingLeft:5,alignSelf:'center' }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{  alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 20, width:'40%',marginLeft:10 }}>
                            <TouchableOpacity onPress={() => {Actions.InviteGuest(), this.setState({modalVisible:false})}} style={{ backgroundColor:  '#9246e6', padding: 12, borderRadius: 20, flexDirection: 'row',justifyContent:'center',width:'100%'  }}>
                                <Image style={{ height: 20, width: 20, tintColor:  '#fff' }} source={require('../../../../assets/images/guest.png')} />
                                <Text style={ {color:  '#fff', fontSize:RF(2.1), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',paddingLeft:5,alignSelf:'center' }}>Guests</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }



    _yours() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        if (this.state.yours.length > 0) {
            return (
                <View style={{ width: '100%',alignItems:'center' }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{alignItems:'center',paddingBottom:'30%'}}
                        data={this.state.yoursEvent}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.relatedEventsMainView}>
                                <TouchableHighlight style={styles.relatedEventsCardView} onPress={() => { this.setModalVisible(!this.state.modalVisible,item) }}>
                                    <View style={styles.relatedEventsCardContent}>
                                        <View style={{ width: '100%' }}>
                                            <Image source={{uri:item.event_image}} style={{ height: 125, width: '100%' }} />
                                        </View>
                                        <View style={styles.relatedEventsDetailsView}>
                                            <View style={{ width: '100%' }}>
                                                <View style={styles.relatedEventsCategoryView}>
                                                    <Text style={[styles.relatedEventsCategoryText, { color:'rgb(108,171,247)' }]}>{item.category}</Text>
                                                    <Image source={require('../../../../assets/images/saved.png')} style={{ height: 16, width: 18, tintColor:'#f05d87'  }} />
                                                </View>
                                                <View style={{ width: '90%' }}>
                                                    <Text numberOfLines={2} style={styles.relatedEventsTitle}>{item.event_title}</Text>
                                                    <Text style={styles.relatedEventsSubtitle}>{moment(item.event_start_date).format('DD MMM')}{dot}{moment(item.event_start_date).format('hh mm')}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.relatedEventsHandlerView}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                                    <Image source={{uri:item.event_creater.profile}} style={{ height: 25, width: 25, borderRadius: 12.5 }} />
                                                    <Text style={{ marginLeft: 5, color: 'black', fontSize: RF(2), }}>{item.event_creater.name}</Text>
                                                </View>
                                                <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', fontSize: RF(2) }}>{item.budget.value}{item.budget.currency}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RF(2.7), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No events yet</Text>
                    <Text style={{ fontSize: RF(2.5), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>You haven't created any events yet </Text>
                </View>
            )
        }
    }

    _upcoming() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        if (this.state.upcoming.length > 0) {
            return (
                <View style={{ width: '100%',alignItems:'center' }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{alignItems:'center'}}
                        data={this.state.upcoming}
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
                                                <Image source={require('../../../../assets/images/saved.png')} style={{ height: 16, width: 18, tintColor: index % 2 != 0 ? '#f05d87' : null }} />
                                            </View>
                                            <View style={{ width: '90%' }}>
                                                <Text numberOfLines={2} style={styles.relatedEventsTitle}>{item.title}</Text>
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
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RF(2.7), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No upcoming events yet</Text>
                    <Text style={{ fontSize: RF(2.5), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>You don't have any upcoming events yet </Text>
                </View>
            )
        }

    }

    _past() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        if (this.state.past.length > 0) {
            return (
                <View style={{ width: '100%',alignItems:'center' }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{alignItems:'center'}}
                        data={this.state.past}
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
                                                <Image source={require('../../../../assets/images/saved.png')} style={{ height: 16, width: 18, tintColor: index % 0 != 0 ? '#f05d87' : null }} />
                                            </View>
                                            <View style={{ width: '90%' }}>
                                                <Text numberOfLines={2} style={styles.relatedEventsTitle}>{item.title}</Text>
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
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RF(2.7), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No past events yet</Text>
                    <Text style={{ fontSize: RF(2.5), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>You don't have any past events yet </Text>
                </View>
            )
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <View style={{ paddingTop: 10 }}>
                    <View style={{ alignSelf: 'flex-end', marginHorizontal: 20, }}>
                        <TouchableOpacity style={styles.backView}
                            onPress={() => Actions.AddEvent()}>
                            <Image source={require('../../../../assets/images/addEvent.png')} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.subContainerView}>
                    <View style={{ marginTop: 10, marginBottom: 7, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: RF(3.8), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#000' }}>Events</Text>
                    </View>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f2f3f5', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 13, marginHorizontal: 20, marginTop: 3 }}>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 0 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 0 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 0 ? '#fff' : '#000' }]}>Created</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 1 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 1 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 1 ? '#fff' : '#000' }]}>Upcoming</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 2 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 2 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 2 ? '#fff' : '#000' }]}>Past</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    { this.state.clicks == 0 ? this._yours() : this.state.clicks == 1 ? this._upcoming() : this._past() }
                </View>
                {this._yourEventModel()}
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
        height: '100%',
    },
    backView: {
        width: 30,
    },
    eventBtn: {
        width: '33%',
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
    relatedEventsCardContent: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '65%',
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
        paddingVertical: 3,
    },
    relatedEventsCategoryText: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontSize: RF(1.6),
    },
    relatedEventsTitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RF(2.2),
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
        fontSize: RF(1.9),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        paddingBottom: 3,
        //width:'80%',
    },
    followDescText: {
        fontSize: RF(1.7),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#aeadba'
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        paddingVertical: Platform.OS == 'ios' ? 30 : 20,
    },
    fulldescText: {
        color: '#000',
        fontSize: RF(2.3),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
    },
    fulldescTimeText: {
        color: '#a2a0af',
        fontSize: RF(2.1),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        marginTop: 3
    },
});
