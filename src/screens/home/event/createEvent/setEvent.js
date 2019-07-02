import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity,
    Image, TextInput, ScrollView
} from 'react-native';
import RF from "react-native-responsive-fontsize";
import { Header, Icon, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { DatePicker } from '../../../../lib/react-native-wheel-datepicker';
import MessageBar from '../../../../components/messageBar'
var moment = require('moment');

export default class AddEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            meetingplace: this.props.serachData.address,
            notes: '',
            date1: new Date(),
            date2: new Date(),
            clickdate1: false,
            clickdate2: false,
            msg:'',
            success:''
        }
    }

    _selectDate1(date1) {
        this.setState({ date1: date1 })
    }
    _selectDate2(date2) {
        this.setState({ date2: date2 })
    }

    _inputBox(name,value,onChange, mline,focus ) {
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
    _next(){
        let {title,date1,date2,meetingplace,notes}=this.state
        data={
            event_title:title,
            event_start_date:moment(date1.toJSON()).format('DD MMMM YYYY'),
            event_end_date:moment(date2.toJSON()).format('DD MMMM YYYY'),
            event_start_time:moment(date1.toJSON()).format('h:mm'),
            event_end_time:moment(date2.toJSON()).format('h:mm'),
            meeting_place:meetingplace,
            notes:notes
        }
        console.log("data : ",data)
       if(title && date1 && date2 && meetingplace && notes){
            Actions.AddEventSetGuest({eventDetails:data,serachData:this.props.serachData})
        }
        else{
            this.setState({ msg:'Please fill all the Details.', success: false })
            this.messagebar._animateMessage()
        }
        
    }
    render() {
        console.log('date====',this.state.date1)
        console.log("serach data : ",this.props.serachData)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />

                <View style={styles.subContainerView}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}>
                            <View style={{ alignSelf: 'flex-start',width:'10%', }}>
                                <TouchableOpacity style={styles.backView}
                                    onPress={() => Actions.pop()}>
                                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={[styles.headerText,{color: '#afaebc',}]}>Step 2 of 5</Text>
                            <TouchableOpacity style={{width:50,alignItems:'flex-end'}} onPress={()=>this._next()}>
                            <Text style={[styles.headerText,{color: '#9246e6',}]}>Next</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '90%', alignSelf: 'center', paddingVertical: 15 }}>
                            <Text style={{ color: '#000', fontSize: RF(3.0), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Set your event</Text>
                        </View>
                       
                    </View>

                    <ScrollView contentContainerStyle={{ paddingBottom: '5%' }}>
                        <View style={[styles.textinputView, { paddingBottom: 10 }]}>
                            {this._inputBox('Title',this.state.title, (text) => { this.setState({ title: text }) }, true, () => { })}
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
                            {this._inputBox('Meeting place',this.state.meetingplace, (text) => { this.setState({ meetingplace: text }) }, true, () => this.setState({ clickdate2: false }))}
                        </View>
                        <View style={[styles.textinputView, { paddingBottom: 20 }]}>
                            {this._inputBox('Notes',this.state.notes, (text) => { this.setState({ notes: text }) }, true, () => { })}
                        </View>
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
        marginTop: 10,
        marginBottom: 5
    },
    headerText: {
        // height: 40,
        fontSize: RF(2.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        // color: '#afaebc',
        marginTop: 10,
        marginBottom: 5
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
    textinputView: {
        borderColor: '#f2f3f5', borderBottomWidth: 1,
    },
    text: {
        fontSize: RF(2.2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#a8a7b5',
        marginTop:Platform.OS == 'ios' ? 15 : 0,
        // backgroundColor: 'gray'
    },

});
