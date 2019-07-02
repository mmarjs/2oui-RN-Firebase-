import React, { Component } from 'react';
import {
    Platform, Dimensions, StyleSheet, Text, View, SafeAreaView, StatusBar,
    TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView
} from 'react-native';
import { Icon } from 'native-base'
import { DatePicker } from 'react-native-wheel-datepicker';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/button'
import firebase from '../../components/Firebase';
import moment from 'moment'


export default class Birthday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birthday:new Date()
        }
    }
    _selectBirthday(birthday){
    this.setState({birthday:birthday})
    }
    _continue(){
        this.props.userData.birthday= this.state.birthday.toDateString()
        //console.log('Birthday Data',this.props.userData)
        Actions.CompletePhone({userData:this.props.userData})
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
                <View style={{ width: '100%', paddingHorizontal: 20, flex: 1 }}>
                    <View style={{ marginTop: '10%', marginBottom: '5%', width: '100%', }}>
                        <Text style={styles.forgotText}>What's your birthday</Text>
                    </View>
                    <DatePicker
                        textSize={20}
                        date={this.state.birthday}
                        mode="date"
                        onDateChange={date => this._selectBirthday(date)}
                        style={{ width: '100%',backgroundColor:'transparent' }}
                    />
                </View>
                <View style={styles.buttonView}>
                    <Button buttonText='Continue' onClick={()=>this._continue()} colors={['#a65ae1', '#8a4cea']} style={styles.buttoncontainer} />
                </View>
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
