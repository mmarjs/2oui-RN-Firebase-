import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  TextInput
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { Icon ,Header} from 'native-base';
import RF from "react-native-responsive-fontsize"
import Button from '../../../components/button'
export default class LiveLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
       sharelocation:false
    }
  }
  render() {
    return (
        <View style={styles.container}>
         <Header style={{backgroundColor:'white'}}>
                    <View style={{width:'10%',justifyContent:'center',}}>
                        <TouchableOpacity style={styles.backView}
                            onPress={() => Actions.pop()}>
                            <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'80%',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize: RF(3),color:'black',fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'}}>Live location</Text>
                    </View>
                    <View style={{width:'10%'}}>
                    </View>
                </Header>
        <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
            {/* <SafeAreaView style={styles.container}> */}
           <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{
               flex:1,
               width:'100%'
            }}
            region={{
                latitude: 44.1628,
                longitude: -77.3832,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            > 
            <Marker
            coordinate={{
                latitude: 44.1628,
                longitude:-77.3832,
            }}>
            <ImageBackground source={require('../../../assets/images/locationmarker.png')} style={{height:50,width:50,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../../assets/images/user_9.jpg')} style={{width:35,height:35,borderRadius:17.5,marginTop:-8}}/>
            </ImageBackground>
            </Marker>
           
            </MapView>
            <View style={{height:110,width:'100%',position:'absolute',bottom:0,backgroundColor:'white',alignItems:'center'}}>
            {
                !this.state.sharelocation?
                <Button onClick={() =>{this.setState({sharelocation:true})}} buttonText='Share my location' colors={['#a65ae1', '#8a4cea'] } style={{ marginTop: 15,width:'90%' }} />:
                <TouchableOpacity onPress={() =>{this.setState({sharelocation:false})}} style={{width:'90%',justifyContent:'center',alignItems:'center',backgroundColor:'#f6f7f9',marginTop:15,padding:15,borderRadius:20}}>
                    <Text style={{color: 'black', fontSize: 18, fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'}}>Stop sharing</Text>
                </TouchableOpacity>
            }
            
            
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  cartContainer:{
    alignItems: 'flex-start',
    alignSelf: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 12,
    elevation:0.7,
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'gray',
    shadowOpacity: 0.1,
    width: '100%',
},
searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    //padding: 10,
    width:'100%',
    justifyContent: 'space-between',
},
searchinputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
    height: 40,
    width: '75%',
    borderRadius: 12,
    paddingLeft: 10,
    // marginTop: 12
},
cartText:{
    fontSize:RF(2.5),
    fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
},
descText:{
    fontSize:RF(2.8),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
},
buttoncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: '#000',
    height: 30,
    width: 100,
   // borderRadius: 15,
},
relatedEventsMainView:{
    alignItems: 'center', 
    width:Dimensions.get('screen').width-40, 
    marginVertical: 5, 
    marginRight:20,
    elevation: 0.8, 
    borderRadius: 20, 
    shadowOffset: { height: 0.5, width: 1.5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 3,
},
relatedEventsCardView:{
    flexDirection: 'row', 
    alignItems: 'center', 
    overflow: 'hidden', 
    borderRadius: 20, 
    backgroundColor: 'white'
},
relatedEventsCategoryView:{
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between', 
    paddingVertical: 3
},
relatedEventsCategoryText:{
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    fontSize: RF(2),
},
relatedEventsTitle:{
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    fontSize: RF(2.5),
    color: 'black' 
},
relatedEventsSubtitle:{
    fontFamily: Platform.OS == 'ios' ? 'Lato-Light' : 'Lato Light', 
    //fontSize: 14, 
    fontSize: RF(2.2),
    marginVertical: 2
},
relatedEventsHandlerView:{
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%', 
    justifyContent: 'space-between', 
    paddingVertical: 5
},
relatedEventsDetailsView:{
    width: '70%', 
    justifyContent: 'space-between', 
    paddingHorizontal: 8,
},
text: {
    width:'85%',
    fontSize: RF(2.3),
    fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    marginLeft: 5,
    color: '#a8a7b5'
},
backView: {
    width: 30,
    height:35,
    alignItems:'center',
    justifyContent:'center',
},

  
});
