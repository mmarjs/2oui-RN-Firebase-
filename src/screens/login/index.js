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
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/button'
import Swiper from 'react-native-swiper';
import RF from "react-native-responsive-fontsize"
import firebase from '../../components/Firebase';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading:true,
    }
  
  }
  
  componentWillMount(){
    var chatref=firebase.database().ref()
    AsyncStorage.getItem('userData').then(user=>{
      user =JSON.parse(user)
      //console.log("user : ",user)
      if(user){
      chatref.child('Users/'+user.userId)
        .once('value',(snapshot)=>
         {
          console.log(snapshot.val());
          if(snapshot.val()){
            var userData=snapshot.val()
            userData.userId=snapshot.key
            this.setState({loading:false})  
            Actions.Home({userData:userData})
           
          }
        })
      
      }
      else{
        this.setState({loading:false})
      }
    })
  }
  _swiperContent(title,subtitle){
    return(
      <View style={styles.container}>
          <View style={{ flex: 0.9, justifyContent: 'center' }}>
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View>
              <Image style={{height:80,width:80}} source={require('../../assets/images/logo.png')} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button buttonText='Sign up' colors={['#a65ae1', '#8a4cea']} style={styles.button} 
                      onClick={()=>Actions.SignUp()}/>
              <TouchableOpacity onPress={() => Actions.Login1()} style={styles.button}>
                <Text style={styles.loginText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }
  render() {
    if(this.state.loading)
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#a65ae1'}}>
         <ActivityIndicator size='large' color='white'/>
      </View>
    )
    else
    return (
      <Swiper horizontal 
      loop
      dotColor='#cbcbcb'
      dotStyle={{bottom:125}}
      activeDotStyle={{bottom:125}}
      activeDotColor='#ffffff' >
      <ImageBackground resizeMode='cover' source={require('../../assets/images/loginbackground1.png')} style={styles.imageBackground}>
        {this._swiperContent('Dating by events','The first mobile application to meet people by events.')}
      </ImageBackground>
      <ImageBackground source={require('../../assets/images/loginbackground2.png')} style={styles.imageBackground}>
        {this._swiperContent('Meet new people','Find new friends or maybe your love.')}
      </ImageBackground>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  imageBackground: {
    width: null,
    height: null,
    flex: 1,
  },
  textView: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize:RF(4) ,
    marginVertical: 3,
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: RF(2.3), 
    width: '75%',
    marginVertical: 5,
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
  },
  buttonView: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
  }
});
