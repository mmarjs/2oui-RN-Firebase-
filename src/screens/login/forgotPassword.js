import React, { Component } from 'react';
import {
    Platform, Dimensions, StyleSheet, Text, View, SafeAreaView, StatusBar,
    TextInput, TouchableOpacity, KeyboardAvoidingView,ScrollView
} from 'react-native';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Button from '../../components/button'
import firebase from '../../components/Firebase';
import MessageBar from '../../components/messageBar'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            msg:'',
            success:''
        }
    }
    _forgotPassword(){
        firebase.auth().sendPasswordResetEmail(this.state.emailId)
        .then((res)=>{
            this.setState({ msg: 'Reset password link sent to your email', success: true })
            this.messagebar._animateMessage()
            setTimeout(()=>{
                Actions.pop()
            },3000)
        })
        .catch((error)=>{
            console.log('Error',error)
            this.setState({ msg: 'Email not found', success: false })
            this.messagebar._animateMessage()
        })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                {/* <KeyboardAvoidingView behavior='padding' style={styles.subContainerView}> */}
                
                    <TouchableOpacity style={[styles.backView,{marginHorizontal:20}]}
                        onPress={() => Actions.pop()}>
                        <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={{paddingBottom:'5%'}}>
                    <View style={{ width: '100%', paddingHorizontal: 20, flex: 1 }}>
                    <View style={{ marginTop: '10%', marginBottom: '5%', width: '100%', }}>
                        <Text style={styles.forgotText}>Forgot your password ?</Text>
                    </View>
                    <View style={{ marginBottom: 30, width: '100%', alignItems: 'center' }}>
                        <Text style={styles.descText}>We will send a password reset link to your email address.</Text>
                    </View>
                    <View style={styles.textinputcontainer}>
                        <TextInput
                            style={styles.text}
                            placeholder='Email'
                            placeholderTextColor='rgba(0,0,0,0.5)'
                            autoCapitalize='none'
                            autoFocus={true}
                            autoCorrect={false}
                            keyboardType='email-address'
                            onChangeText={(text) => { this.setState({ emailId: text }) }}
                        >
                        </TextInput>
                    </View>
                   
                </View>
                </ScrollView>
                <View style={styles.buttonView}>
                    <Button onClick={()=>this._forgotPassword()} buttonText='Confirm' disabled={this.state.emailId ? false : true}
                    colors={this.state.emailId ? ['#a65ae1', '#8a4cea'] : ['#e3cdf8', '#e3cdf8']} style={styles.buttoncontainer} />
                </View>
                <MessageBar success={this.state.success} ref={ref => this.messagebar = ref} error={this.state.msg} />
                {/* </KeyboardAvoidingView> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainerView: {
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 5
    },
    forgotText: {
        height: 40,
        fontSize: 25,
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        textAlign: 'center',
    },
    descText: {
        // height: 40, 
        fontSize: 15,
        width: '90%',
        // fontWeight: '400', 
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
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
    buttonView: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        borderColor: '#f2f3f5',
        borderTopWidth: 1,
        paddingHorizontal: 20
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 50,
        width: '100%',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    }
});
