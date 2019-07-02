import React, { Component } from 'react';
import { Platform, StyleSheet, Dimensions, Text,AsyncStorage, TextInput, View, ScrollView, KeyboardAvoidingView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Button from '../../components/button'
import { LoginManager, AccessToken } from "react-native-fbsdk";
import firebase from '../../components/Firebase';
import RNfirebase from 'react-native-firebase';
import MessageBar from '../../components/messageBar'
import CryptoJS from "react-native-crypto-js";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            msg:'',
            success:''
        }
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
                          RNfirebase.auth().signInAndRetrieveDataWithCredential(credential)
                             .then((res) => {
                                 console.log('facebook console',res)
                                 // this.setState({ msg: 'Verification Email Sent', success: true })
                                 // this.messagebar._animateMessage()
                                 // setTimeout(() => {
                                if(res.additionalUserInfo.isNewUser){
                                    var user = firebase.database().ref().child('Users')
                                     var id = user.push().key
                                     key = user.push({
                                         facebookId:res.user.providerData[0].uid,
                                        // facebookId: result.id,
                                         name: res.user.displayName,
                                         email: res.user.email ? res.user.email : '',
                                         password: null,
                                         profile: res.user.photoURL
                                     }).key
                                     Actions.CompleteYourProfile({ userId: key })
                                }
                                else{
                                //  this.setState({ msg: 'You are Successfully logged in', success: true })
                                //  this.messagebar._animateMessage()
                                user = firebase.database().ref().child('Users').once('value',function(snapshot) {
                                    //console.log(snapshot.val());
                                    snapshot.forEach(user => {
                                        //console.log("user email : ",user.val().email)
                                        if(user.val().facebookId==res.additionalUserInfo.profile.id ){
                                            var userData=user.val()
                                            userData.userId=user.key
                                            AsyncStorage.setItem('userData',JSON.stringify(userData))
                                            Actions.reset('Home',{userData:userData})
                                        }
                                    });
                                  }, function (errorObject) {
                                    console.log("The read failed: " + errorObject.code);
                                })
                                Actions.reset('Home',)
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
    _login() {
        firebase.auth().signInWithEmailAndPassword(this.state.emailId,this.state.password)
        .then((result)=>{
            console.log('Login Result',result)
            var login = firebase.database().ref().child('Users')
            login.orderByChild('email').equalTo(result.user.email).once('value',snap => {
                console.log('Query Result',snap.val())
                if(snap.val()){
                    var data = snap.val()
                    var key = Object.keys(data)
                    var userData = data[key]
                    userData.userId=key[0]
                    //console.log('USER Data',userData)
                    AsyncStorage.setItem('userData',JSON.stringify(userData))
                    Actions.reset('Home',{userData:userData})
                }
                
            })
        })
        .catch((error)=>{
            console.log('Login Error',error)
            this.setState({ msg: error.message, success: false })
            this.messagebar._animateMessage()
        })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />

                <View style={styles.subContainerView}>

                    <TouchableOpacity onPress={() => Actions.pop()} style={styles.backView}>
                        <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                        {/* <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null}> */}
                        <View style={{ marginTop: '10%', marginBottom: '10%', width: '100%', }}>
                            <Text style={styles.welcomText}>Welcome back</Text>
                        </View>
                        <View style={styles.textinputcontainer}>
                            <TextInput
                                style={styles.text}
                                placeholder='Email'
                                placeholderTextColor='rgba(0,0,0,0.5)'
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='email-address'
                                autoFocus={true}
                                returnKeyType = {"next"}
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
                            //onChangeText={()=>this.setState({disableButton:false})}
                            >
                            </TextInput>
                        </View>
                        <Button onClick={() => this._login()} buttonText='Log in' disabled={this.state.emailId && this.state.password ? false : true} colors={this.state.emailId && this.state.password ? ['#a65ae1', '#8a4cea'] : ['#e3cdf8', '#e3cdf8']} style={[styles.buttoncontainer, { marginTop: 35 }]} />
                        <Button buttonText='Log in with Facebook' onClick={() => this._facebookSignUp()}
                            colors={['#4497de', '#4179bc']} style={[styles.buttoncontainer, { marginTop: 5 }]} />
                        <TouchableOpacity onPress={() => Actions.Forgot()} style={{ marginTop: '10%', alignItems: 'center' }}>
                            <Text style={{ height: 20, fontSize: 16, color: '#9246e6', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>Forgot password? </Text>
                        </TouchableOpacity>
                        {/* </KeyboardAvoidingView> */}
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
        // justifyContent: 'center',
        //  alignItems: 'center',
        backgroundColor: '#fff',
    },
    subContainerView: {
        width: '90%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        height: '100%'
    },
    welcomText: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        height: 40,
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 5
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
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        height: 50, width: '100%',
        borderRadius: 25,
    },
    text: {
        fontSize: 15,
        color: '(rgba(0,0,0,0.5))'
    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    }
});
