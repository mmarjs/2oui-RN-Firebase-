import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import {Icon} from 'native-base'
import RF from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';


export default class ProfileIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
        lastActivity:[
          {
            event:true,
            eventTitle:'Spa Day for mums, sisters, daughters &...',
            requestStatus:'your request has been rejected - 3j',
            rejected:true,
            image:require('../../../assets/images/event_7.jpg')
          },
          {
            event:true,
            eventTitle:'Trip to Plam Shores Beaches',
            requestStatus:'your request has been accepted - 4j',
            rejected:false,
            image:require('../../../assets/images/event_1.jpg')
          },
          {
            event:false,
            name:'Adaora',
            requestStatus:'Followed you - 6j',
            image:require('../../../assets/images/user_8.jpg')
          },
          {
            event:true,
            eventTitle:'Trip to Plam Shores Beaches',
            requestStatus:'your request has been accepted - 4j',
            rejected:false,
            image:require('../../../assets/images/event_1.jpg')
          },
          {
            event:false,
            name:'Adaora',
            requestStatus:'Followed you - 6j',
            image:require('../../../assets/images/user_8.jpg')
          }
        ],
        userData:''
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('userData')
    .then((data)=>{
      this.setState({userData:JSON.parse(data)})
    })
  }
  _button(name,icon,onPress,iconstyle){
      return(
        <TouchableOpacity  
        onPress={onPress}
        style={{width:'100%',padding:10,flexDirection:'row',alignItems:'center',borderBottomWidth:0.25,borderBottomColor:'grey'}}>
        <View style={{flexDirection:'row',width:'90%'}}>
          <View style={{width:'15%',paddingHorizontal:5}}>
            <Image source={icon} style={iconstyle}/>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',paddingVertical:5,paddingHorizontal:15}}>
              <View style={{width:'80%',paddingHorizontal:5}}>
                  <Text  style={{fontSize:RF(2.2),color:'black',fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'}}>{name}</Text>
              </View>
          </View>
        </View>
        <View style={{width:'10%',alignItems:'center'}}>
               <Icon name='angle-right' type='FontAwesome' style={{color:'grey', fontSize:25}} />
        </View>

     </TouchableOpacity> 
      )
  }
  render() {
      //console.log("user Data : ",this.state.userData)
      user=this.state.userData
    return (
     <View style={styles.container}>
     <TouchableOpacity 
     onPress={()=>this.props._pageNavigate(4,'view',user)}
     style={{width:'100%',marginTop:15,paddingHorizontal:10,flexDirection:'row',alignItems:'center',borderBottomWidth:0.25,borderBottomColor:'grey',paddingVertical:15}}>
       <View style={{flexDirection:'row',width:'90%'}}>
        <View>
          <Image source={{uri:user.profile}} style={{width:70,height:70,borderRadius:35}}/>
        </View>
        <View style={{flexDirection:'row',width:'70%',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}}>
            <View>
                <Text style={{fontSize:RF(2.5),color:'black',fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'}}>Hey {user.name},</Text>
                <Text  style={{fontSize:RF(2),color:'#9246e6',fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'}}>See and edit profile</Text>
            </View>
      </View>
      </View>
      <View style={{width:'10%',alignItems:'center'}}>
           <Icon name='angle-right' type='FontAwesome' style={{color:'grey', fontSize:25 }} />
      </View>
     </TouchableOpacity> 
     <View style={{flex:1}}>
         {this._button(
             'Last Activity',
             require('../../../assets/images/activity700.png'),
             ()=>{this.props._pageNavigate(4,'Last activity',user)},
             {width:27,height:30},
         )}
         {/* <FlatList
            data={this.state.lastActivity}
            renderItem={({item,index})=>
            item.event ? 
            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:15,paddingVertical:10,justifyContent:'space-between',borderBottomWidth:0.25,borderBottomColor:'grey'}}>
              <View style={{width:"15%"}}>
                <Image source={item.image} style={{height:40,width:40,borderRadius:10}} />
              </View>
              <View style={{alignItems:'flex-start',width:'70%'}}>
                <Text numberOfLines={1} style={{fontSize:RF(2),color:'black',fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'}}>{item.eventTitle}</Text>
                <Text style={{fontSize:RF(1.8),color:'#a8a7b5',fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'}}>{item.requestStatus}</Text>
              </View>
              <Image source={item.rejected ? require('../../../assets/images/wrong.png') : require('../../../assets/images/right.png')} style={{height:22,width:22}} />
            </View> :
            <View style={{flexDirection:'row',alignItems:'center',padding:15,justifyContent:'space-between',borderBottomWidth:0.25,borderBottomColor:'grey'}}>
               <View style={{width:"15%"}}>
                <Image source={item.image} style={{ height: 40, width: 40, borderRadius: 20 }} />
              </View>
              <View style={{alignItems:'flex-start',width:'55%'}}>
                <Text style={[styles.followDescText,{fontSize:RF(2),color:'black'}]}>{item.name}</Text>
                <Text style={styles.followDescText}>{item.requestStatus}</Text>
              </View>
              <TouchableOpacity style={[styles.buttoncontainer]}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontSize: RF(2.0), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Follow</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          }
          keyExtractor={(index)=>index.toString()}
         /> */}
          {this._button(
             'Settings',
             require('../../../assets/images/settings700.png'),
             ()=>{this.props._pageNavigate(4,'setting',user)},
             {width:30,height:29}
         )}
          {this._button(
             'Premium account',
             require('../../../assets/images/premium700.png'),
             ()=>{},
             {width:30,height:30}
         )}
     </View>
     <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4f38b4','#a65ae1']} style={{width: '100%', alignItems: 'center',paddingVertical:5}}>
      <TouchableOpacity onPress={()=>Actions.Upgrade()} style={{alignItems:'center',marginVertical:10,flexDirection:'row',paddingHorizontal:20}}>
            <View style={{flexDirection:'row',alignItems:'center',width:'80%'}}>
              <Image source={require('../../../assets/images/emptystar.png')} style={{height:30,width:30,tintColor:'white'}} />
              <Text style={{fontSize:RF(2.5),fontFamily:Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',color:'white',marginLeft:15}}>Become Premium</Text>
            </View>
            <TouchableOpacity onPress={()=>Actions.Upgrade()} style={{width:'20%',alignItems:'center',height:28,justifyContent:'center',backgroundColor:'white',borderRadius:18}}>
              <Text style={{fontSize:RF(1.8),fontFamily:Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',color:'#a65ae1'}}>GO</Text>
            </TouchableOpacity>
      </TouchableOpacity>
      </LinearGradient>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  followDescText: {
    fontSize: RF(1.8),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    color: '#aeadba'
  },
  buttoncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 80,
  },
  
});
