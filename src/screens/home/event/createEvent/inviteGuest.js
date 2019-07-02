import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity,
    Image, TextInput, ScrollView,FlatList
} from 'react-native';
import RF from "react-native-responsive-fontsize";
import { Header, Icon, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

export default class InviteGuest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clicks: 0,
            going: [
                {
                    name: 'Izabella',
                    prof: 'Veterinarian',
                    image: require('../../../../assets/images/user_9.jpg'),
                },
                {
                    name: 'Aasiya',
                    prof: 'Economist',
                    image: require('../../../../assets/images/user_10.jpg'),
                },
                {
                    name: 'Virendra',
                    prof: 'Journalist',
                    image: require('../../../../assets/images/user_6.jpg'),
                },
            ],
            pending: [
                {
                    name: 'Adaora',
                    prof: 'Professor',
                    image: require('../../../../assets/images/user_8.jpg'),
                },
                {
                    name: 'Maia',
                    prof: 'Archeologist',
                    image: require('../../../../assets/images/user_4.jpg'),
                },
                
            ],
            invited: [
                {
                    name: 'Alicia',
                    prof: 'Florist',
                    image: require('../../../../assets/images/user_3.jpg'),
                },
                {
                    name: 'Emilee',
                    prof: 'Estate Agent',
                    image: require('../../../../assets/images/user_7.jpg'),
                },
                {
                    name: 'Alexa',
                    prof: 'Musician',
                    image: require('../../../../assets/images/user_2.jpg'),
                },
            ],
        }
    }
    _going() {
      
        if (this.state.going.length > 0) {
            return (
                <View style={{ width: '100%', }}>
                    <FlatList
                     showsVerticalScrollIndicator={false}
                        data={this.state.going}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                        <View style={{width:'100%', paddingVertical: 10,borderBottomWidth: 1,borderColor: '#f2f3f5',}}>
                        <View style={{width:'90%',alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <View style={{flexDirection:'row',alignItems:'center',}}>
                            <Image source={item.image} style={{ height: 40, width: 40, borderRadius:20  }} />
                            <View style={{marginLeft:10}}>
                                <Text style={styles.guestNameText}>{item.name}</Text>
                                <Text style={styles.guestDescText}>{item.prof}</Text>
                            </View>
                            </View>
                            {/* <TouchableOpacity style={[styles.buttoncontainer]}>
                                     <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#f5f6f8', '#f5f6f8']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                                         <Text style={{ color: '#000', fontSize: RF(2.3), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Following</Text>
                                     </LinearGradient>
                                 </TouchableOpacity> */}
                        </View>
                    </View>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RF(2.7), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No guests yet</Text>
                    <Text style={{ fontSize: RF(2.5), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>Invite people to participate in your event </Text>
                </View>
            )
        }
    }

    _pending() {
      
        if (this.state.pending.length > 0) {
            return (
                <View style={{ width: '100%', }}>
                    <FlatList
                     showsVerticalScrollIndicator={false}
                        data={this.state.pending}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={{ width: '100%', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f2f3f5', }}>
                                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Image source={item.image} style={{ height: 40, width: 40, borderRadius: 20 }} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.guestNameText}>{item.name}</Text>
                                            <Text style={styles.guestDescText}>{item.prof}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <TouchableOpacity style={[styles.buttoncontainer]}>
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 35, justifyContent: 'center' }}>
                                                <Icon name='plus' type='Entypo' style={{color:'#fff',fontSize:20,right:5}}/>
                                                <Text style={{ color: '#fff', fontSize: RF(2.3), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Add</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginLeft:10,backgroundColor:'#f2f3f5',padding:10,borderRadius:20}}>
                                        <Image source={require('../../../../assets/images/close1.png')} style={{ height: 20, width:20, borderRadius: 10, }} />
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
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RF(2.7), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No pending invition yet</Text>
                    <Text style={{ fontSize: RF(2.5), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>Invite people to participate in your event </Text>
                </View>
            )
        }
    }

    _invited() {
      
        if (this.state.invited.length > 0) {
            return (
                <View style={{ width: '100%', }}>
                    <FlatList
                     showsVerticalScrollIndicator={false}
                        data={this.state.invited}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                        <View style={{width:'100%', paddingVertical: 10,borderBottomWidth: 1,borderColor: '#f2f3f5',}}>
                        <View style={{width:'90%',alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <View style={{flexDirection:'row',alignItems:'center',}}>
                            <Image source={item.image} style={{ height: 40, width: 40, borderRadius:20  }} />
                            <View style={{marginLeft:10}}>
                                <Text style={styles.guestNameText}>{item.name}</Text>
                                <Text style={styles.guestDescText}>{item.prof}</Text>
                            </View>
                            </View>
                            <TouchableOpacity style={[styles.buttoncontainer]}>
                                     <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#f5f6f8', '#f5f6f8']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                                         <Text style={{ color: '#000', fontSize: RF(2.3), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Invited</Text>
                                     </LinearGradient>
                                 </TouchableOpacity>
                        </View>
                    </View>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RF(2.7), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No guests invited yet</Text>
                    <Text style={{ fontSize: RF(2.5), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>Invite people to participate in your event </Text>
                </View>
            )
        }
    }

    render() {
        
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />

                <View style={styles.subContainerView}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', paddingVertical: 5, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => Actions.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 50, alignItems: 'flex-end' }} onPress={() => {Actions.SearchGuest()}}>
                            <Icon name='md-add' type='Ionicons' style={{ color: '#9246e6', fontSize: 25 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 7, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: RF(3.8), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#000' }}>Guests</Text>
                    </View>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f2f3f5', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 13, marginHorizontal: 20, marginTop: 3 }}>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 0 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 0 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 0 ? '#fff' : '#000' }]}>Going</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 1 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 1 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 1 ? '#fff' : '#000' }]}>Pending</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 2 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 2 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 2 ? '#fff' : '#000' }]}>Invited</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                    {
                        this.state.clicks == 0 ?
                            <View style={{ flex: 1,}}>
                                {this._going()}
                            </View>
                            :
                            this.state.clicks == 1 ?
                                <View style={{ flex: 1, }}>
                                    {this._pending()}
                                </View>
                                :
                                <View style={{ flex: 1, }}>
                                    {this._invited()}
                                </View>
                    }
                  
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FFF',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        //  paddingHorizontal:20,
        height: '100%'
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        //marginTop: 10,
       // marginBottom: 5
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
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 30,
        width: 80,
        // borderRadius: 15,
    },
    guestNameText:{
        fontSize: RF(2.5), 
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', 
        color: '#000' ,
        paddingBottom:3
    },
    guestDescText:{
        fontSize: RF(2.1), 
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', 
        color: '#aeadba' 
    }

});
