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

export default class AddEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
           guest:4,
           gender:'any',
           age:[18,32]
        }
        this._setGuestsData=this._setGuestsData.bind(this)
    }

    _renderList(title,value,onclick) {
        return (
            <TouchableOpacity style={styles.filterContainer} onPress={onclick}>
            <View style={styles.filterView}>
              <Text style={[styles.itemText,{color:'#000'}]}>{title}</Text>
              <View style={{ right: 10,flexDirection:'row',alignItems:'center' }}>
              <View style={{width:150,marginRight:10,}}>
              <Text numberOfLines={1} style={[styles.itemText,{color:'#a5a4b2',textAlign:'right'}]}>{value}</Text>
              </View>
              <Icon name='angle-right' type='FontAwesome' style={{color:'grey', fontSize:25}} />
              </View>
            </View>
          </TouchableOpacity>
        )
    }

    _setGuestsData(type,value){
        console.log("type value ",type,value[0])
        if(type=='guest'){
            this.setState({guest:value[0]})
        }
        else if(type=='gender'){
            this.setState({gender:value})
        }
        else if(type=='age'){
            this.setState({age:value})
        }
    }
    _next(){
     
        this.props.eventDetails.guest=this.state.guest
        this.props.eventDetails.gender=this.state.gender
        this.props.eventDetails.age=this.state.age
        Actions.SetBudget({eventDetails:this.props.eventDetails,serachData:this.props.serachData})
    }
 render() {
      
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />

                <View style={styles.subContainerView}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}>
                            <View style={{ alignSelf: 'flex-start', width: '10%', }}>
                                <TouchableOpacity style={styles.backView}
                                    onPress={() => Actions.pop()}>
                                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[styles.headerText, { color: '#afaebc', }]}>Step 3 of 5</Text>
                                <TouchableOpacity
                                 style={{ width: 50, alignItems: 'flex-end' }} onPress={() => this._next()}>
                                    <Text style={[styles.headerText, { color: '#9246e6', }]}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '90%', alignSelf: 'center', paddingVertical: 15 }}>
                            <Text style={{ color: '#000', fontSize: RF(3.0), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Set your guests</Text>
                        </View>
                    </View>

                    {this._renderList('Guests', this.state.guest, () => { Actions.SetGuestGuests({_setGuestsData:this._setGuestsData,guest:this.state.guest}) })}
                    {this._renderList('Gender', this.state.gender, () => { Actions.SetGuestGender({_setGuestsData:this._setGuestsData,gender:this.state.gender}) })}
                    {this._renderList('Age', this.state.age[0]+'-'+this.state.age[1]+' y.o', () => { Actions.SetGuestAge({_setGuestsData:this._setGuestsData,age:this.state.age}) })}

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
    itemText:{
        fontSize:RF(2.2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    },
    filterView:{
      width: '90%', 
      height: 60, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      alignSelf: 'center',
    },
    filterContainer:{
      borderBottomWidth: 1, 
      borderColor: '#f2f3f5' 
    },

});
