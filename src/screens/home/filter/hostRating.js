import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View,SafeAreaView,StatusBar,TouchableOpacity,Image} from 'react-native';
//  import Header from '../../components/filterHeader'
import {  Header, Icon,CheckBox } from 'native-base';
import RF from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';

export default class HostRating extends Component {
  constructor(props){
    super(props)
    this.state={
      selected:this.props.value
    }
  }
  _rating(rating){
    // console.log("Date",date)
    this.props.event('Host rating',rating)
    Actions.pop()
}
_renderList(star) {
    return (
      <TouchableOpacity onPress={() => this.setState({selected:star.length},()=>this._rating(star.length))} style={styles.ratingContainer}>
        <View style={styles.ratingView}>
          <View style={{flexDirection:'row'}}>
          {star.map((index)=>
            <Image key={index} style={styles.starStyle} source={require('../../../assets/images/star.png')} />
            )}
          </View>
          <View style={{ right: 10, }}>
            <CheckBox color='#8a4cea' checked={this.state.selected == star.length ? true : false} />
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
          <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
            <View style={{width:'90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',alignSelf:'center'}}>
              <View style={{ alignSelf: 'flex-start' }}>
                <TouchableOpacity style={styles.backView}
                  onPress={() => Actions.pop()}>
                  <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                </TouchableOpacity>
              </View>
              <Text style={styles.headerText}>Host rating</Text>
              <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
            </View>
          </View>
          <ScrollView>
          {this._renderList([1])}
          {this._renderList([1,2])}
          {this._renderList([1,2,3])}
          {this._renderList([1,2,3,4])}
          {this._renderList([1,2,3,4,5])}
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
    flex:1,
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
starStyle:{
  width: 25, height: 25
},
ratingView:{
  width: '90%', 
  height: 60, 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  alignSelf: 'center',
},
ratingContainer:{
  borderBottomWidth: 1, 
  borderColor: '#f2f3f5' 
}
  
});
