import React, { Component } from 'react';
import {
    Platform, StyleSheet,ScrollView, Text, View, SafeAreaView, StatusBar,TouchableOpacity } from 'react-native';
import { Icon,CheckBox } from 'native-base'
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize"


export default class Date extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:this.props.value
        }
    }
    _date(date){
        console.log("Date",date)
        this.props.event('Date',date)
        Actions.pop()
    }
    _renderList(title) {
        return (
            <TouchableOpacity onPress={() => this.setState({selected:title},()=>this._date(title))} style={styles.genderSelectioncontainer}>
                <View style={{ flexDirection: 'row',marginLeft:'5%' }}>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View style={{ marginRight:'10%', paddingTop:20,paddingBottom:20}}>
                    <CheckBox color='#8a4cea' checked={this.state.selected == title ? true : false}/>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                <View style={styles.subContainerView}>
                <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                <View style={{ width:'90%',alignSelf:'center',flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => Actions.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>Date</Text>
                        <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                </View>
                </View>
                <ScrollView>
                {this._renderList('Any')}
                {this._renderList('Today')}
                {this._renderList('Tomorrow')}
                {this._renderList('This week')}
                {this._renderList('This weekend')}
                {this._renderList('Next week')}
                </ScrollView>
                </View>
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
        flex:1,
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
    genderSelectioncontainer: {
        borderBottomWidth: 1,
        justifyContent:'space-between', 
        borderColor: '#f2f3f5',
        flexDirection:'row'     
    },
    text: {
        fontSize: RF(2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        color: '#000',
        paddingTop:20,
        paddingBottom:20
    },
    headerText: {
        height: 40,
        fontSize: RF(2.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        marginTop: 15
    },
    clearText: {
        height: 40,
        fontSize: RF(2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#9246e6',
        marginTop: 18
    },
});
