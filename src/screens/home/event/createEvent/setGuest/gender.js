import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView,StatusBar,TouchableOpacity,Image} from 'react-native';
//  import Header from '../../components/filterHeader'
import {  Header, Icon,CheckBox } from 'native-base';
import RF from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';

export default class HostRating extends Component {
  constructor(props){
    super(props)
    this.state={
      selected:this.props.gender
    }
  }
  _gender(gender){
   // this.props.people('Gender',gender)
   this.props._setGuestsData('gender',gender)
    Actions.pop()
}
_renderList(title) {
    return (
        <TouchableOpacity onPress={() => this.setState({selected:title},()=>this._gender(title))} style={styles.genderContainer}>
        <View style={styles.genderView}>
          <Text style={styles.itemText}>{title}</Text>
          <View style={{ right: 10, }}>
            <CheckBox color='#8a4cea' checked={this.state.selected == title ? true : false} />
          </View>
        </View>
      </TouchableOpacity>
    )
}
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
        <View style={styles.subContainerView}>
        <View style={{borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                    <View style={{paddingVertical:10,width:'90%',alignSelf:'center',flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                        <View style={{ }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => {
                                  Actions.pop()
                              }}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>Gender</Text>
                        <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                    </View>
                    </View>
          {this._renderList('Any')}
          {this._renderList('Female')}
          {this._renderList('Male')}
          {this._renderList('Other')}
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
    flex:1,
    width: '100%',
    backgroundColor: '#fff',
  //  paddingHorizontal:20,
    height: '100%'
},
backView: {
  width: 30,
},
headerText: {
  fontSize: RF(2.5),
  fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
  color: '#000',
 // marginTop: 8
},
clearText: {
  fontSize: RF(2.2),
  fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
  color: '#9246e6',
  //marginTop: 12
},
itemText:{
    fontSize:RF(2.2),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    fontWeight:'400',
    color:'#000'
},
genderView:{
  width: '90%', 
  height: 60, 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  alignSelf: 'center',
},
genderContainer:{
  borderBottomWidth: 1, 
  borderColor: '#f2f3f5' 
}
  
});
