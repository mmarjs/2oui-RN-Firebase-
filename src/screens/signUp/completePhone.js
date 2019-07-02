import React, { Component } from 'react';
import {
    Platform, Dimensions, StyleSheet, Text, View, SafeAreaView, StatusBar,
    TextInput, TouchableOpacity, ScrollView,Modal,Alert
} from 'react-native';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import CountryCodeList from 'react-native-country-code-list'
import Button from '../../components/button'
import RNfirebase from 'react-native-firebase'
import MessageBar from '../../components/messageBar'
import firebase from '../../components/Firebase'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            openModal: false,
            countryCode:'+33',
            btnloading:false,
            msg:'',
            success:'',
            
        }
    }
    setModalVisible(visible) {
        this.setState({ openModal: visible });
      }
    
    _countryModal() {
        return (
           
            <Modal
                transparent={true}
                animationType="none"
                visible={this.state.openModal}
                onRequestClose={() => { }}
            >   
              <SafeAreaView style={{flex:1}}>
                <View style={{ backgroundColor: 'white', flex:0.95}}>
                    <TouchableOpacity
                        style={{ right: 10, padding: 10, marginTop: Platform.OS == 'ios' ? 30 : 20, position: 'absolute' }}
                        onPress={() => { this.setModalVisible(!this.state.openModal) }}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <CountryCodeList
                        sectionHeaderHeight={0}
                        onClickCell={(country) => {
                            this.setState({
                                countryCode: country.code,
                                openModal: false
                            })
                            console.log(country)
                        }
                     }
                    />
                </View>
                </SafeAreaView>
            </Modal>
      
         )
    }
    _continue(){
        this.setState({btnloading:true})
       console.log("phone number : ",this.state.countryCode + this.state.phone)
        RNfirebase.auth().signInWithPhoneNumber(this.state.countryCode + this.state.phone)
              .then(confirmResult => {
                this.setState({btnloading:false})
                Actions.Otp({ confirmResult: confirmResult, phoneNumber: this.state.phone,userData:this.props.userData})
                console.log('result', confirmResult)
              })
              .catch(error =>{
                  console.log('error : ',error)
                this.setState({ msg: error.message ,success:false, btnloading:false})
                this.messagebar._animateMessage()
              })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                {/* <KeyboardAvoidingView behavior='padding' style={styles.subContainerView}> */}
               
                <TouchableOpacity style={[styles.backView, { marginHorizontal: 20 }]}
                    onPress={() => Actions.pop()}>
                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ paddingBottom: '5%' }}>
                {this._countryModal()}
                    <View style={{ width: '100%', paddingHorizontal: 20, flex: 1 }}>
                        <View style={{ marginTop: 35, marginBottom: 15, width: '100%', }}>
                            <Text style={styles.phoneText}>What's your phone number ?</Text>
                        </View>
                        <View style={{ marginBottom: 30, width: '100%', alignItems: 'center' }}>
                            <Text style={styles.descText}>We need it to verify your account, we will send you a code by SMS.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent:'space-between',}}>
                            <TouchableOpacity onPress={() => { this.setState({openModal : true})}}
                            style={[styles.countrycontainer,{  pointerEvents: 'none'}]}>
                           
                                <Text style={[styles.text]}>{this.state.countryCode}</Text>
                                <Icon
                                    name='ios-arrow-down' type='Ionicons' style={{ fontSize: 18 , color: '(rgba(0,0,0,0.5))',}} />
                            </TouchableOpacity>
                            <View style={styles.textinputcontainer}>
                                <TextInput
                                    style={styles.text}
                                    placeholder=''
                                    maxLength={10}
                                    autoCorrect={false}
                                    autoFocus={true}
                                    keyboardType='number-pad'
                                    onChangeText={(text) => { this.setState({ phone: text }) }}
                                >
                                </TextInput>
                            </View>
                        </View>
                    </View>

                </ScrollView>
                <View style={styles.buttonView}>
                    <Button buttonText='Continue' onClick={()=>this._continue()} 
                    loading={this.state.btnloading}
                     disabled={this.state.phone ? false : true}
                        colors={this.state.phone ? ['#a65ae1', '#8a4cea'] : ['#e3cdf8', '#e3cdf8']} style={styles.buttoncontainer} />
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
        // backgroundColor:'red'
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
    phoneText: {
        fontSize: 25,
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        marginHorizontal: 30,
        textAlign: 'center',
    },
    descText: {
        fontSize: 15,
        width: '90%',
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        color: '#000',
        textAlign: 'center',
    },
    countrycontainer:{
        flexDirection: 'row', 
        alignItems: 'center',
         backgroundColor: '#f2f3f5',
          height: 50,
          width: '25%', 
          justifyContent:'space-around',
           borderRadius: 12, 
           marginTop: 12,
           paddingHorizontal:5
    },
    textinputcontainer: {
        justifyContent: 'center',
        backgroundColor: '#f2f3f5',
        height: 50,
        width: '70%',
        borderRadius: 12,
        paddingLeft: 15,
        marginTop: 12
    },
    text: {
        fontSize: 15,
        color: '(rgba(0,0,0,1))'
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
