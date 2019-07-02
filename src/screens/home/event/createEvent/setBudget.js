import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity,Switch,
    Image, TextInput, ScrollView
} from 'react-native';
import RF from "react-native-responsive-fontsize";
import { Header, Icon, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class SetBudget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switch1Value: false,
            price:''
        }
    }

    toggleSwitch1 = (value) => {
        this.setState({switch1Value: value})
        console.log('Switch 1 is: ' + value)
     }
     _next(){
        this.props.eventDetails.budget={currency:'€',value:this.state.price}
        Actions.ReviewAndPay({eventDetails:this.props.eventDetails,serachData:this.props.serachData})
     }
   
    render() {
        
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
                            <Text style={[styles.headerText,{color: '#afaebc',}]}>Step 4 of 5</Text>
                            <TouchableOpacity style={{width:50,alignItems:'flex-end'}} onPress={()=>this._next()}>
                            <Text style={[styles.headerText,{color: '#9246e6',}]}>Next</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '90%', alignSelf: 'center', paddingVertical: 15 }}>
                            <Text style={{ color: '#000', fontSize: RF(3.0), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Set your budget</Text>
                        </View>
                   </View>
                    <View style={styles.textinputcontainer}>
                        <View style={{ width: '35%',height:60,justifyContent:'flex-end',}}>
                            <Text style={{ fontSize: RF(2.5), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>EUR</Text>
                        </View>
                        <View style={{ width: '65%', }}>
                            <TextInput
                                style={styles.textinputtext}
                                placeholder='0'
                                placeholderTextColor='#a8a7b5'
                                autoCapitalize='none'
                                autoCorrect={false}
                                // value={}
                                keyboardType='number-pad'
                                // autoFocus={true}
                            
                                onChangeText={(text) => { this.setState({ price: text })}}
                            />
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, justifyContent: 'space-between',alignItems:'center', borderColor: '#f2f3f5', flexDirection: 'row' }}>
                        <Text style={{ marginTop: 20, marginBottom: 20, marginLeft: '5%', color: '#000', fontSize: RF(2.2), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', }}>Split budget</Text>
                        <Switch
                            onTintColor="#9246e6"
                            thumbTintColor={Platform.OS == 'android' ? "#fff" : ''}
                            style={{ marginRight: '3%' }}
                            onValueChange={this.toggleSwitch1}
                            value={this.state.switch1Value} />
                    </View>
                    <View style={{width:'90%',alignSelf:'center',marginTop:20}}>
                        <Text style={styles.text}>By adding a new event, 2oui takes 10% of your total budget</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
  
    text: {
        fontSize: RF(2.2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#a8a7b5',
        // backgroundColor: 'gray'
    },
    textinputtext: {
        textAlign:'right',
      //  height:60,
        fontSize: RF(6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000',
        // backgroundColor: 'red'
    },
    textinputcontainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'gray',
        paddingHorizontal: 20,
        paddingBottom: 15,
         borderColor: '#f2f3f5',
         borderBottomWidth: 1,
    },

});
