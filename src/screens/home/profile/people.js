import React, { Component } from 'react';
import {
    Platform, FlatList, ScrollView, StyleSheet, Text, View, SafeAreaView, StatusBar, Image,
    TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground
} from 'react-native';
import { Icon, CheckBox } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Button from '../../../components/button'
import RF from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';
import { List, ListItem } from "react-native-elements";


export default class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: true,
            Followers: [
                {
                    name: 'Alicia',
                    prof: 'Florist',
                    image: require('../../../assets/images/user_3.jpg'),
                    follow: false
                },
                {
                    name: 'Virendra',
                    prof: 'Journalist',
                    image: require('../../../assets/images/user_6.jpg'),
                    follow: true
                },
                {
                    name: 'Adaora',
                    prof: 'Professor',
                    image: require('../../../assets/images/user_8.jpg'),
                    follow: false
                },
                {
                    name: 'Maia',
                    prof: 'Archeologist',
                    image: require('../../../assets/images/user_4.jpg'),
                    follow: true
                },
                {
                    name: 'Yasam',
                    prof: 'Photographe',
                    image: require('../../../assets/images/user_2.jpg'),
                    follow: false
                },
                {
                    name: 'Izabella',
                    prof: 'Veterinarian',
                    image: require('../../../assets/images/user_5.jpg'),
                    follow: true
                },
                {
                    name: 'Pan',
                    prof: 'Photographe',
                    image: require('../../../assets/images/user_1.jpg'),
                    follow: false
                },
                {
                    name: 'Joslin',
                    prof: 'Photographe',
                    image: require('../../../assets/images/user_7.jpg'),
                    follow: false
                },
                {
                    name: 'Aasiya',
                    prof: 'Economist',
                    image: require('../../../assets/images/user_10.jpg'),
                    follow: true
                },
           ],
            Following: [
                {
                    name: 'Virendra',
                    prof: 'Journalist',
                    image: require('../../../assets/images/user_6.jpg'),
                },
                {
                    name: 'Maia',
                    prof: 'Archeologist',
                    image: require('../../../assets/images/user_4.jpg'),
                },
                {
                    name: 'Izabella',
                    prof: 'Veterinarian',
                    image: require('../../../assets/images/user_5.jpg'),
                },
                {
                    name: 'Aasiya',
                    prof: 'Economist',
                    image: require('../../../assets/images/user_10.jpg'),
                },
                {
                    name: 'Mayke',
                    prof: 'Photographe',
                    image: require('../../../assets/images/user_1.jpg'),
                },
                {
                    name: 'Izabella',
                    prof: 'Veterinarian',
                    image: require('../../../assets/images/user_5.jpg'),
                },
                {
                    name: 'Aasiya',
                    prof: 'Economist',
                    image: require('../../../assets/images/user_10.jpg'),
                },
                {
                    name: 'Mayke',
                    prof: 'Photographe',
                    image: require('../../../assets/images/user_1.jpg'),
                },
                {
                    name: 'Izabella',
                    prof: 'Veterinarian',
                    image: require('../../../assets/images/user_5.jpg'),
                },
                {
                    name: 'Aasiya',
                    prof: 'Economist',
                    image: require('../../../assets/images/user_10.jpg'),
                },
                {
                    name: 'Mayke',
                    prof: 'Photographe',
                    image: require('../../../assets/images/user_1.jpg'),
                },
            ],
        }
    }

    _follower() {
        if (this.state.Followers.length > 0) {
            return (
                <View style={{ width: '100%', }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.Followers}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                           <View style={{width:'100%', paddingVertical: 10,borderBottomWidth: 1,borderColor: '#f2f3f5',}}>
                               <View style={{width:'90%',alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                   <View style={{flexDirection:'row',alignItems:'center',}}>
                                   <Image source={item.image} style={{ height: 40, width: 40, borderRadius:20  }} />
                                   <View style={{marginLeft:10}}>
                                       <Text style={styles.followNameText}>{item.name}</Text>
                                       <Text style={styles.followDescText}>{item.prof}</Text>
                                   </View>
                                   </View>
                                   <TouchableOpacity style={[styles.buttoncontainer]} onPress={() => this.setState(state => (this.state.Followers[index].follow = !this.state.Followers[index].follow, state))}>
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={this.state.Followers[index].follow == false ? ['#a65ae1', '#8a4cea']:['#f5f6f8', '#f5f6f8'] } style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                                                <Text style={{ color: this.state.Followers[index].follow == false ? 'white' : '#000', fontSize: RF(2.3), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>{this.state.Followers[index].follow == false ? 'Follow' : 'Following'}</Text>
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
                    <Text style={styles.emptyFLHeadingText}>No people yet</Text>
                    <Text style={styles.emptyFLDescText}>Nobody is following you yet </Text>
                </View>
            )
        }
    }

    _following() {
        if (this.state.Following.length > 0) {
            return (
                <View style={{ width: '100%', }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.Following}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                           <View style={{width:'100%', paddingVertical: 10,borderBottomWidth: 1,borderColor: '#f2f3f5',}}>
                               <View style={{width:'90%',alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                   <View style={{flexDirection:'row',alignItems:'center',}}>
                                   <Image source={item.image} style={{ height: 40, width: 40, borderRadius:20  }} />
                                   <View style={{marginLeft:10}}>
                                       <Text style={styles.followNameText}>{item.name}</Text>
                                       <Text style={styles.followDescText}>{item.prof}</Text>
                                   </View>
                                   </View>
                                   <TouchableOpacity style={[styles.buttoncontainer]}>
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#f5f6f8', '#f5f6f8']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                                                <Text style={{ color: '#000', fontSize: RF(2.3), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Following</Text>
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
                    <Text style={styles.emptyFLHeadingText}>No people yet</Text>
                    <Text style={styles.emptyFLDescText}>You haven't followed anyone yet </Text>
                </View>
            )
        }

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <View style={styles.headerView}>
                    <TouchableOpacity style={styles.backView}
                        onPress={() => this.props._pageNavigate(4,'',user)}>
                        <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.subContainerView}>
                    <View style={{  marginBottom: 10,width:'90%',alignSelf:'center' }}>
                        <Text style={styles.headingText}>People</Text>
                    </View>
                    <View style={styles.tabMainView}>
                        <View style={styles.tabSubConView}>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: true }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == true ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == true ? '#fff' : '#000' }]}>Followers</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: false }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == false ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == false ? '#fff' : '#000' }]}>Following</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        this.state.clicks ?
                            <View style={{ flex: 1 }}>
                                {this._follower()}
                            </View>
                            :
                            <View style={{ flex: 1 }}>
                                {this._following()}
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
        //  paddingHorizontal: 20,
        height: '100%'
    },
    headerView:{
        flexDirection:'row',
      //  justifyContent:'space-between',
        width:'90%',
        // backgroundColor:'gray',
       paddingVertical:10,
        alignSelf:'center',
        alignContent:'center'
    },
      backView: {
        // backgroundColor:'red',
        width: 40,
        alignItems: 'flex-start',
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
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 30,
        width: 100,
        // borderRadius: 15,
    },
    emptyFLHeadingText:{
        paddingBottom: 10, 
        fontSize: RF(2.7), 
        color: '#000', 
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', 
        textAlign: 'center' 
    },
    emptyFLDescText:{
        fontSize: RF(2.5), 
        color: '#d8d7dd', 
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', 
        textAlign: 'center'
    },
    tabMainView:{
        width:'100%',
        paddingVertical: 10, 
        borderBottomWidth: 1, 
        borderColor: '#f2f3f5',
        alignSelf:'center',
    },
    headingText:{
        fontSize: RF(3.5), 
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', 
        color: '#000' 
    },
    tabSubConView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#f2f3f5', 
        borderRadius: 13,
        marginHorizontal:20 
    },
    followNameText:{
         fontSize: RF(2.5), 
            fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', 
            color: '#000' ,
            paddingBottom:3
    },
    followDescText:{
        fontSize: RF(2.1), 
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', 
        color: '#aeadba' 
    }
});
