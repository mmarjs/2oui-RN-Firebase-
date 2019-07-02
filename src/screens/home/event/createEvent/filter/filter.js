import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,
    SafeAreaView,StatusBar,TouchableOpacity,

} from 'react-native';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Button from '../../../../../components/button'
import RF from "react-native-responsive-fontsize"

export default class App extends Component {
    constructor(props){
        super(props)
        this.state={
         
        }
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
            <View style={styles.subContainerView}>
                <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                    <View style={{ width: '90%', paddingVertical: 10, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity style={styles.backView}
                            onPress={() => Actions.pop()}>
                            <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Filters</Text>
                        <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                    </View>
                </View>
                {this._renderList('Location','Any',()=>{Actions.AddEventFilterLocation()})}
                {this._renderList('Rating','From 3 to 5',()=>{Actions.AddEventFilterRating()})}
                {this._renderList('Category','(4) Resturants, Movies,Bars,cafe',()=>{Actions.AddEventFilterCategory()})}
                <View style={styles.buttonView}>
                    <Button buttonText='Apply' 
                    colors={['#a65ae1', '#8a4cea']} style={styles.buttoncontainer} />
                </View>
            </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  subContainerView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    height: '100%'
},
backView: {
    alignItems: 'flex-start',
    width: 30,
},
headerText: {
    fontSize: RF(2.5),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    color: '#000',
},
clearText: {
    fontSize: RF(2),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    color: '#9246e6',
},
itemText:{
    fontSize:RF(2),
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
buttonView: {
  width: '100%',
  height: 80,
  position:'absolute',
  bottom:0,
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
});
