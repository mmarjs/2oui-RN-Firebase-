import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity,
    Image, TextInput, ScrollView
} from 'react-native';
import RF from "react-native-responsive-fontsize";
import { Header, Icon, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { DatePicker } from 'react-native-wheel-datepicker';
var moment = require('moment');
const note=' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales lorem ipsum dolor sit amet, consectetur adipiscing elit.'
export default class EditEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Harry Potter Marathon at the cinema',
            meetingplace: 'Place de la Nation, Paris',
            notes: note,
            date1: new Date(),
            date2: new Date(),
            clickdate1: false,
            clickdate2: false
        }
    }

    _selectDate1(date1) {
        this.setState({ date1: date1 })
    }
    _selectDate2(date2) {
        this.setState({ date2: date2 })
    }

    _inputBox(name, onChange, mline,focus,value ) {
        return (
            <View style={styles.textinputcontainer}>
                <View style={{ width: '35%', marginTop: 15 }}>
                    <Text style={{ fontSize: RF(2.2), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>{name}</Text>
                </View>
                <View style={{ width: '65%', }}>
                    <TextInput
                        style={styles.text}
                        placeholder={name}
                        multiline={mline}
                        placeholderTextColor='#a8a7b5'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={value}
                        onFocus={focus}
                        keyboardType='email-address'
                        // autoFocus={true}
                        // returnKeyType={"next"}
                        //  onSubmitEditing={() => this.city.focus()}
                        onChangeText={onChange}
                    />
                </View>
            </View>
        )
    }

    _dateInput(title,onpress,datetext,timetext){
        return(
            <View style={[styles.textinputcontainer, { paddingVertical: 15 }]}>
                            <View style={{ width: '35%' }}>
                                <Text style={{ fontSize: RF(2.2), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>{title}</Text>
                            </View>
                            <TouchableOpacity style={{width:'65%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={onpress}>
                                <Text style={{ fontSize: RF(2.2), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', color: 'black' }} >
                                    {datetext}
                                </Text >
                                <Text style={{ fontSize: RF(2.2), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', color: 'black' }}>
                                {timetext}
                                </Text>
                            </TouchableOpacity>
                        </View>
        )
    }

    render() {
        
        console.log('date====',this.state.date1)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />

                <View style={styles.subContainerView}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', paddingVertical: 5, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => Actions.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: 50, alignItems: 'flex-end' }} onPress={() => {}}>
                                <Text style={[styles.headerText, { color: '#9246e6', }]}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '90%', alignSelf: 'center', paddingVertical: 15 }}>
                            <Text style={{ color: '#000', fontSize: RF(3.0), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Edit your event</Text>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={{ paddingBottom: '5%' }}>
                        <View style={[styles.textinputView, { paddingBottom: 10 }]}>
                            {this._inputBox('Title', (text) => { this.setState({ title: text }) }, true, () => { },this.state.title)}
                        </View>

                        {this._dateInput('Dates', () => { this.setState({ clickdate1: true, clickdate2: false,}) }, moment(this.state.date1.toJSON()).format('DD MMMM YYYY'),moment(this.state.date1.toJSON()).format('h:mm'))}
                        <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#f2f3f5', }}>
                            {this.state.clickdate1 == true ?
                                <DatePicker
                                    textSize={15}
                                    date={this.state.date1}
                                    mode="datetime"
                                    onDateChange={date => this._selectDate1(date)}
                                    style={{ width: '100%', alignSelf: 'center', backgroundColor: 'transparent' }}
                                />
                                : null}
                        </View>
                        {this._dateInput('', () => { this.setState({ clickdate2: true,clickdate1: false, }) }, moment(this.state.date2.toJSON()).format('DD MMMM YYYY'),moment(this.state.date2.toJSON()).format('h:mm'))}
                        <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#f2f3f5', }}>
                            {this.state.clickdate2 == true ?
                                <DatePicker
                                    textSize={15}
                                    date={this.state.date2}
                                    mode='datetime'
                                    onDateChange={date => this._selectDate2(date)}
                                    style={{ width: '100%', alignSelf: 'center', backgroundColor: 'transparent' }}
                                />
                                : null}
                        </View>
                        <View style={[styles.textinputView]}>
                            {this._inputBox('Meeting place', (text) => { this.setState({ meetingplace: text }) }, true, () => this.setState({ clickdate2: false }),this.state.meetingplace)}
                        </View>
                        <View style={[styles.textinputView, { paddingBottom: 10 }]}>
                            {this._inputBox('Notes', (text) => { this.setState({ notes: text }) }, true, () => { },this.state.notes)}
                        </View>
                        <View style={[styles.deletecontainer]}>
                            <TouchableOpacity style={{width:'100%',justifyContent:"center",flexDirection:'row',alignItems:'center',}} >
                                <Text style={{fontSize: RF(2.3), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#9246e6' }} >
                                   Delete event
                                </Text >
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FFF',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        //  paddingHorizontal:20,
        height: '100%'
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        //marginTop: 10,
       // marginBottom: 5
    },
    headerText: {
        // height: 40,
        fontSize: RF(2.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        // color: '#afaebc',
        //marginTop: 10,
        //marginBottom: 5
    },
    textinputcontainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingBottom: 15,
        // borderColor: '#f2f3f5'
        // borderBottomWidth: 1,
    },
    deletecontainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        marginTop:30,
        paddingVertical: 15 ,
        borderColor: '#f2f3f5',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    textinputView: {
        borderColor: '#f2f3f5', borderBottomWidth: 1,
    },
    text: {
        fontSize: RF(2.2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000',
        marginTop:Platform.OS == 'ios' ? 12 : 5,
        // backgroundColor: 'gray'
    },

});
