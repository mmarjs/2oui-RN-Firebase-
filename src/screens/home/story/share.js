import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView,StatusBar,TouchableOpacity,FlatList,
        Image,ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon,CheckBox } from 'native-base';
import RF from "react-native-responsive-fontsize"
import Button from '../../../components/button'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MyEvents:[
                {
                    image:require('../../../assets/images/event_3.jpg'),
                    title:'Harry Potter Marathon at the cinema',
                    check:false
                },
            ],
            GoingEvents:[
                {
                    image:require('../../../assets/images/event_1.jpg'),
                    title:'Trip to Palm Shores Beaches',
                    check:true
                },
                {
                    image:require('../../../assets/images/event_2.jpg'),
                    title:'IE: Mysteires of the Mind',
                    check:false
                },
            ],
        }
    }

    _yourStoryShare(){
        return(
            <View style={styles.yourStoryShareView}>
                <View style={styles.yourStoryShareContainer}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={require('../../../assets/images/user_1.jpg')} style={{ height: 50, width: 50, borderRadius: 25, }} />
                    <Text style={styles.yourStoryShareText}>Your story</Text>
                    </View>
                    <View style={{ right: 10, }}>
                        <CheckBox color='#8a4cea'  checked={true} />
                    </View>
                </View>
            </View>
        )
    }

    _myEvents(){
        return(
            <View style={{ width: '100%'}}>
            <View style={{width:'90%',alignSelf:'center',paddingVertical:20}}>
                <Text style={styles.headingText}>My events</Text>
            </View>
                <FlatList
                    data={this.state.MyEvents}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={styles.yourStoryShareView}>
                            <View style={styles.yourStoryShareContainer}>
                                <View style={{ width:'80%',flexDirection:'row',alignItems:'center'}}>
                                    <Image source={item.image} style={{ height: 50, width: 50, borderRadius: 13, }} />
                                {/* </View>
                                <View style={{width:'70%',alignItems:'flex-start'}}> */}
                                    <Text style={styles.yourStoryShareText}>{item.title}</Text>
                                </View>
                                <View style={{paddingLeft:3, width:'10%',}}>
                                    <CheckBox color='#8a4cea' checked={item.check} />
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
    _goingEvents(){
        return(
            <View style={{ width: '100%'}}>
            <View style={{width:'90%',alignSelf:'center',paddingVertical:20}}>
                <Text style={styles.headingText}>Events you're going to</Text>
            </View>
                <FlatList
                    data={this.state.GoingEvents}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={styles.yourStoryShareView}>
                            <View style={styles.yourStoryShareContainer}>
                                <View style={{ width:'80%',flexDirection:'row',alignItems:'center'}}>
                                    <Image source={item.image} style={{ height: 50, width: 50, borderRadius: 13, }} />
                                {/* </View>
                                <View style={{width:'70%',alignItems:'flex-start'}}> */}
                                    <Text style={styles.yourStoryShareText}>{item.title}</Text>
                                </View>
                                <View style={{paddingLeft:3, width:'10%',justifyContent:'flex-end',}}>
                                    <CheckBox color='#8a4cea' checked={item.check} />
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }

    _share(){
        Actions.YourStory({data:{uri:this.props.data.uri,type:this.props.data.type=="image"?"image":"video"}})
    }

  render() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.backView}
                    onPress={() => Actions.pop()}>
                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Share</Text>
            </View>
            <View style={{width:'100%'}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:'40%'}} >
           {this._yourStoryShare()}
           {this._myEvents()}
           {this._goingEvents()}
           </ScrollView>
           </View>
            <View style={styles.buttonView}>
                <Button buttonText='Share' onClick={()=>this._share()}
                    colors={['#a65ae1', '#8a4cea']} style={styles.buttoncontainer}  />
            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  headerView:{
    flexDirection:'row',
    width:'90%',
    // backgroundColor:'gray',
   paddingVertical:10,
    alignSelf:'center',
    alignItems:'center'
},
  backView: {
   // backgroundColor:'red',
    width: 30,
    alignItems: 'flex-start',
},
headerText: {
    width:'80%',
    fontSize: RF(2.5),
    textAlign:'center',
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    color: '#000',
    marginTop: 5
  },
  buttonView: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    borderColor: '#f2f3f5',
    backgroundColor:'#fff',
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
buttonText: {
    fontSize: RF(2.5),
    color: '#fff'
},
yourStoryShareContainer:{
    width:'90%',
    flexDirection:'row',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'space-between',
     paddingVertical:10
},
yourStoryShareView:{
    width:'100%',
   // borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#f2f3f5',
},
yourStoryShareText:{
   width:'80%',
    fontSize: RF(2),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    color: '#000',
    paddingLeft:10
},
headingText:{
    fontSize: RF(2.3),
    color: '#000',
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
},
});
