import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,FlatList,ScrollView,
        SafeAreaView,TouchableOpacity,Image} from 'react-native';
import { Icon, CheckBox } from 'native-base'
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize"
import Button from '../../../components/button'

export default class Upgrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: [
                {
                   desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                },
                {
                    desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                },
               
           ],
         
        }
    }

    _renderList(disprice,price,days) {
        return (
            <TouchableOpacity style={styles.priceSelectioncontainer}>
              
                    <View style={{ flexDirection: 'row',alignItems:'center' }}>
                        <Text style={styles.dispriceText}>{disprice}</Text>
                        <Text style={styles.priceText}>{price}</Text>
                    </View>
                    <View style={{ right: 10, flexDirection: 'row',alignItems:'center' }}>
                        <Text style={styles.daysText}>{days}</Text>
                        <CheckBox color='#8a4cea' checked={this.state.selected == disprice ? true : false} />
                    </View>
              
            </TouchableOpacity>
        )
    }
  _swiper(title,image,style){
      return(
          <View style={{alignItems:'center',paddingVertical:25}}>
              <Image source={image} style={style} />
              <Text style={{marginVertical:15,fontFamily:Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',color:'black',fontSize:RF(2.5)}}>{title}</Text>
          </View>
      )
  }
  render() {
    const dot = <Icon name='dot-single' type='Entypo' style={{fontSize:30,color:'grey'}} />
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#fff' barStyle="dark-content" />
        <View style={styles.headerView}>
            <TouchableOpacity style={styles.backView}
                onPress={() => Actions.pop()}>
                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
            </TouchableOpacity>
            
        </View>
            <View style={styles.subContainerView}>
            <ScrollView contentContainerStyle={{paddingBottom:'30%'}}>
                <View style={{ paddingBottom: 15, width: '100%', alignSelf: 'center', borderBottomWidth: 1, borderColor: '#f2f3f5', }}>
                    <Text style={styles.headingText}>Premium</Text>
                </View>
                <Swiper horizontal style={{height:200}} dotStyle={{bottom:-10,backgroundColor:'#c299ef'}} activeDotStyle={{bottom:-10,backgroundColor:'#9c5ce7',height:10,width:10,borderRadius:5,borderColor:'#c299ef',borderWidth:2}}>
                    {this._swiper('Your event in the top list',require('../../../assets/images/event-top700.png'),{height:90,width:160})}
                    {this._swiper('Be informed by user that match with you',require('../../../assets/images/premium-match700.png'),{height:100,width:88})}
                    {this._swiper('Your profile in the top list',require('../../../assets/images/premium-profil-top700.png'),{height:90,width:170})}
                </Swiper>
                {/* <View style={{paddingVertical:15,width:'90%',alignSelf:'center'}}>
                    <View style={{marginBottom:5}}>
                        <Text style={styles.DescText}> Lorem ipsum dolor sit amet, consectetur adipiscing elit ?</Text>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.description}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                    <View style={{flexDirection:'row',paddingVertical:5,marginTop:10,alignItems:'flex-start'}}>
                    <Text>{dot}</Text>
                    <Text style={styles.DescText}>{item.desc}</Text>
                    </View>
                        }
                        />
                </View> */}
                <View style={{marginTop:15}}>
                <View style={{ paddingBottom: 15, width: '90%', alignSelf: 'center', }}>
                    <Text style={{ fontSize: RF(2.8),fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',color: '#000' }}>Select an option</Text>
                </View>
                {this._renderList('16.49$','','1 month')}
                {this._renderList('57.99$','9.66$ / mon','6 months')}
                {this._renderList('90.99$','7.58$ / mon','12 months')}
                </View>
                </ScrollView>
                <View style={styles.buttonView}>
                    <Button buttonText='Upgrade now' 
                        colors={['#a65ae1', '#8a4cea'] } style={styles.buttoncontainer} />
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
    //height: '100%'
},
headerView:{
    flexDirection:'row',
    width:'90%',
    paddingVertical:10,
    alignSelf:'center',
    alignContent:'center'
},
  backView: {
    width: 40,
    alignItems: 'flex-start',
},
headingText:{
    paddingHorizontal:20,
    fontSize: RF(3.5), 
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', 
    color: '#000' 
},
buttonView: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    backgroundColor:'#fff',
    borderColor: '#f2f3f5',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    position:'absolute',
    bottom:0
},
buttoncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: '#000',
    height: 50,
    width: '100%',
    borderRadius: 25,
}, 
DescText:{
   // backgroundColor:'red',
    width:'90%',
    fontSize: RF(2.3), 
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', 
    color: '#000' 
},
priceSelectioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:'space-between',
    backgroundColor: '#fff',
    //  backgroundColor:'red',
    width: '90%',
    height:70,
    borderRadius: 12,
    paddingHorizontal:20,
    marginTop: 12,
     elevation:0.7,
     shadowOffset:{  width: 1.5,  height: 1.5,  },
    shadowColor: 'gray',
    shadowOpacity: 0.1,
},
dispriceText:{
    fontSize:RF(2.5),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    fontWeight:'400',
    color:'#000'
},
priceText:{
    marginLeft:10,
    fontSize:RF(2.2),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    color:'#aeadba',
    //textDecorationLine:'line-through'
},
daysText:{
        marginRight:10,
        fontSize:RF(2.2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color:'#000'
}
});
