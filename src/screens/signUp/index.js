import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView,KeyboardAvoidingView,
  Linking,TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'native-base'
import { LoginManager, AccessToken } from "react-native-fbsdk";
import RNfirebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/button'
import firebase from '../../components/Firebase';
import CryptoJS from "react-native-crypto-js";
import MessageBar from '../../components/messageBar'

var user
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      emailId: '',
      password: '',
      msg:'',
      success:'',
      btnloading:false
    }
  }
  componentDidMount(){
    user = firebase.database().ref().child('Users')
    // user.once('value',snapshot =>{
    //   snapshot.forEach(user=>{
    //     console.log('Snapshot',user.val())
    //   })
    // })
  }
  _facebookSignUp(){
    LoginManager.logOut()
     LoginManager.logInWithReadPermissions(['public_profile', 'email'])
         .then((result) => {
             if (result.isCancelled) {
                 alert('Login cancelled');
             }
             else {
                 AccessToken.getCurrentAccessToken().then((data) => {
                     const credential = RNfirebase.auth.FacebookAuthProvider.credential(data.accessToken);
                      RNfirebase.auth().signInWithCredential(credential)
                         .then((res) => {
                             console.log('facebook console',res)
                             // this.setState({ msg: 'Verification Email Sent', success: true })
                             // this.messagebar._animateMessage()
                             // setTimeout(() => {
                            if(res.additionalUserInfo.isNewUser){
                                user={
                                  facebookId:res.user.providerData[0].uid,
                                  name: res.user.displayName,
                                  email: res.user.email ? res.user.email : '',
                                  password: null,      
                                  profile: res.user.photoURL
                                }
                                Actions.CompleteYourProfile({ userData: user })
                            }
                            else{
                             this.setState({ msg: 'You are Successfully logged in', success: true })
                             this.messagebar._animateMessage()
                            }
                             // }, 3000)
                         }).catch((error) => {
                             console.log('error---', error)
                             this.setState({ msg: error.message, success: false })
                             this.messagebar._animateMessage()
                         })
                 }).catch((error) => {
                     console.log('error---', error)
                 })

             }
         })
 }
  _register(){
    //var passwordEnc = CryptoJS.AES.encrypt(this.state.password, 'password').toString();
   if(this.state.password.length > 5){
    user={
      facebookId:'',
      name: this.state.name,
      email: this.state.emailId,
      password: this.state.password
    }
    Actions.CompleteYourProfile({ userData: user })
   }
   else{
    this.setState({ msg: 'Password must be 6 characters long', success: false })
    this.messagebar._animateMessage()
   }
   
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
        <View style={styles.subContainerView}>
          <TouchableOpacity style={styles.backView} onPress={()=>Actions.pop()}>
            <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null}>
          <View style={{ marginTop: '10%', marginBottom: 30, width: '100%', }}>
            <Text style={styles.createAccountText}>Create your account</Text>
          </View>
          <View style={styles.textinputcontainer}>
           <TextInput
                style={styles.text}
                placeholder='Name'
                placeholderTextColor='rgba(0,0,0,0.5)'
                autoCapitalize='none'
                autoFocus={true}
                autoCorrect={false}
                returnKeyType = {"next"}
                onSubmitEditing={() => this.email.focus()}
                onChangeText={(text) => { this.setState({ name: text }) }}
              >
              </TextInput>
          </View>
          <View style={styles.textinputcontainer}>
             <TextInput
                style={styles.text}
                placeholder='Email'
                placeholderTextColor='rgba(0,0,0,0.5)'
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType = {"next"}
                keyboardType='email-address'
                ref={(ref) => {this.email = ref;}}
                onSubmitEditing={() => this.pass.focus()}
                onChangeText={(text) => { this.setState({ emailId: text }) }}
              >
              </TextInput>
          </View>
          <View style={styles.textinputcontainer}>
              <TextInput
                style={styles.text}
                placeholder='Password'
                placeholderTextColor='rgba(0,0,0,0.5)'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                ref={(ref) => {this.pass = ref;}}
                onChangeText={(text) => { this.setState({ password: text }) }}
              >
              </TextInput>
          </View>
          <Button buttonText='Sign up' loading={this.state.btnloading} onClick={()=>this._register()}
          disabled={this.state.emailId && this.state.password && this.state.name ? false : true} colors={this.state.emailId && this.state.password && this.state.name ? ['#a65ae1', '#8a4cea'] : ['#e3cdf8', '#e3cdf8']} style={[styles.buttoncontainer, { marginTop: 35 }]} />
          <Button buttonText='Sign up with Facebook' onClick={()=>this._facebookSignUp()} colors={['#4497de', '#4179bc']} style={[styles.buttoncontainer, { marginTop: 5 }]} />
          <View style={{  alignItems: 'center' }}>
            <Text style={styles.bottomText}>By signing up, your agree to 2oui's <Text style={{textDecorationLine:'underline'}}>Terms of Service</Text> and <Text style={{textDecorationLine:'underline'}}>Privacy Policy.</Text></Text>
          </View>
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <MessageBar success={this.state.success} ref={ref => this.messagebar = ref} error={this.state.msg} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  subContainerView: {
    width: '100%',
    paddingHorizontal: 20,
     backgroundColor: '#fff',
   // backgroundColor: 'gray',
    height: '100%'
  },
  backView: {
    width: 30,
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 5
},
  createAccountText: {
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    height: 40,
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
  },
  textinputcontainer: {
    justifyContent: 'center',
    backgroundColor: '#f2f3f5',
    height: 50,
    width: '100%',
    borderRadius: 12,
    paddingLeft: 15,
    marginTop: 12
  },
  text: {
    fontSize: 15,
    color: '(rgba(0,0,0,0.5))'
  },
  buttoncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    height: 50, 
    width: '100%',
    borderRadius: 25,
},
bottomText:{
  paddingHorizontal:Platform.OS == 'ios' ? 25 : 20,
  marginTop:5,
  textAlign:'center',
  fontSize: 15, 
  color: '#c8c7d1', 
  fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular' 
}

});
