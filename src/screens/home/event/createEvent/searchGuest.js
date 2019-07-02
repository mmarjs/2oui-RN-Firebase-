import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView,StatusBar,TextInput,FlatList,
        Image,TouchableOpacity} from 'react-native';
import RF from "react-native-responsive-fontsize";
import { Header, Icon, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

export default class SearchGuest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            going: [
                {
                    name: 'Izabella',
                    prof: 'Doctor',
                    image: require('../../../../assets/images/user_9.jpg'),
                },
                {
                    name: 'Anne',
                    prof: 'Engineer',
                    image: require('../../../../assets/images/user_10.jpg'),
                },
                {
                    name: 'Mara',
                    prof: 'Photographer',
                    image: require('../../../../assets/images/user_6.jpg'),
                },
                {
                    name: 'Leslee',
                    prof: 'Psycologist',
                    image: require('../../../../assets/images/user_9.jpg'),
                },
                {
                    name: 'Marije',
                    prof: 'Optician',
                    image: require('../../../../assets/images/user_10.jpg'),
                },
                {
                    name: 'Joyi',
                    prof: 'Stewardess',
                    image: require('../../../../assets/images/user_6.jpg'),
                },
                {
                    name: 'Amelia',
                    prof: 'Publisher',
                    image: require('../../../../assets/images/user_9.jpg'),
                },
                {
                    name: 'Pan',
                    prof: 'Writer',
                    image: require('../../../../assets/images/user_10.jpg'),
                },
                {
                    name: 'Margje',
                    prof: 'Dentist',
                    image: require('../../../../assets/images/user_6.jpg'),
                },
                {
                    name: 'Joana',
                    prof: 'Dressmaker',
                    image: require('../../../../assets/images/user_9.jpg'),
                },
                {
                    name: 'Emlen',
                    prof: 'Compositer',
                    image: require('../../../../assets/images/user_10.jpg'),
                },
                {
                    name: 'Cotton',
                    prof: 'Jeweller',
                    image: require('../../../../assets/images/user_6.jpg'),
                },
            ],
        }
    }
  render() {
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
        <View style={styles.subContainerView}>
            <View style={styles.searchView}>
                <View style={[styles.searchinputcontainer]}>
                    <Icon name='search1' type='AntDesign' style={{ color: '#a8a7b5', fontSize: 20 }} />
                    <TextInput
                        style={styles.text}
                        placeholder='Search'
                        autoCorrect={false}
                        keyboardType='default'
                        onChangeText={(text) => this._search(text)}
                    />
                </View>
                <TouchableOpacity style={{}} onPress={()=> Actions.pop()}>
                    <Text style={{color:'#000',fontSize: RF(2.3),fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',}}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', }}>
                <FlatList
                    contentContainerStyle={{paddingBottom:'20%'}}
                    showsVerticalScrollIndicator={false}
                    data={this.state.going}
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
                                <TouchableOpacity style={[styles.buttoncontainer]}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 35, justifyContent: 'center' }}>
                                        <Icon name='plus' type='Entypo' style={{ color: '#fff', fontSize: 20, right: 5 }} />
                                        <Text style={{ color: '#fff', fontSize: RF(2.3), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Invite</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />
                </View>
            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  justifyContent: 'center',
   // alignItems: 'center',
    backgroundColor: '#fff',
  },
  subContainerView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    //  paddingHorizontal:20,
    height: '100%'
},
  searchinputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
    height: 40,
    width: Platform.OS == 'ios' ? '80%' : '85%',
    borderRadius: 10,
    padding: 10,
    // paddingRight: 12
},
searchView:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20, 
    paddingVertical:15,
    borderColor: '#f2f3f5', 
    borderBottomWidth: 1
},
text: {
    width:'85%',
    height: 40,
    fontSize: RF(2.3),
    fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    marginLeft: 5,
    color: '#a8a7b5'
},
buttoncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: '#000',
    height: 30,
    width: 90,
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
