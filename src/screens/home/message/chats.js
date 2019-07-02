import React, { Component } from 'react';
import {
    Platform, FlatList, ScrollView, StyleSheet, Text, View, SafeAreaView, StatusBar, Image,
    TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground,Modal,TouchableWithoutFeedback
} from 'react-native';
import { Icon,Header,Left,Right,Body} from 'native-base'
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import RF from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/button'

export default class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:'',
            sharelocationModal:false,
            groupmessage:[
                {
                    id:1,
                    image: require('../../../assets/images/user_9.jpg'),
                    send:false,
                    msgtype:'msg',
                    msg:'Loren ipsum dolor sit amet, consectetur adipisingelit. Quisque sodales loren ipsum dolor sit amet,',
                    date:'20/03/2019 at 11:11',
                    read:false
                },
                {
                    id:2,
                    image: require('../../../assets/images/user_6.jpg'),
                    send:true,
                    msgtype:'msg',
                    msg:'Loren ipsum dolor sit amet.',
                    date:'20/03/2019 at 11:20',
                    read:true
                },
                {
                    id:3,
                    image: require('../../../assets/images/user_8.jpg'),
                    send:false,
                    msgtype:'msg',
                    msg:'Loren ipsum',
                    date:'9:36',
                    read:false
                },
                {
                    id:4,
                    image: require('../../../assets/images/user_6.jpg'),
                    send:false,
                    msgtype:'msg',
                    msg:'Loren ipsum dolor sit amet,',
                    date:'9:36',
                    read:false
                },
                {
                    id:5,
                    image: require('../../../assets/images/user_6.jpg'),
                    send:true,
                    msgtype:'msg',
                    msg:'Loren ipsum dolor sit amet, consectetur adipisingelit. Quisque sodales loren ipsum dolor sit amet,',
                    date:'9.41',
                    read:false
                },
                {
                    id:6,
                    image: require('../../../assets/images/user_6.jpg'),
                    send:true,
                    msgtype:'msg',
                    msg:'Loren ipsum dolor sit amet.',
                    date:'9.41',
                    read:false
                },
            ],
            messages:[
                {
                    id:1,
                    image: require('../../../assets/images/user_9.jpg'),
                    send:false,
                    msgtype:'msg',
                    msg:'Loren ipsum dolor sit amet, consectetur adipisingelit. Quisque sodales loren ipsum dolor sit amet,',
                    date:'20/03/2019 at 11:11',
                    read:false
                },
                {
                    id:2,
                    image: require('../../../assets/images/user_9.jpg'),
                    send:true,
                    msgtype:'msg',
                    msg:'Loren ipsum dolor sit amet.',
                    date:'20/03/2019 at 11:20',
                    read:true
                },
                {
                    id:3,
                    image: require('../../../assets/images/user_9.jpg'),
                    send:false,
                    msgtype:'msg',
                    msg:'Loren ipsum',
                    date:'9:36',
                    read:false
                },
                {
                    id:4,
                    image: require('../../../assets/images/user_9.jpg'),
                    send:false,
                    msgtype:'image',
                    msg:'',
                    image2:require('../../../assets/images/message_1.jpg'),
                    date:'9:36',
                    read:false
                },
                {
                    id:5,
                    image: require('../../../assets/images/user_9.jpg'),
                    send:true,
                    msgtype:'msg',
                    msg:'Loren ipsum dolor sit amet, consectetur adipisingelit. Quisque sodales loren ipsum dolor sit amet,',
                    date:'9.41',
                    read:false
                },
                {
                    id:6,
                    image: require('../../../assets/images/user_9.jpg'),
                    send:true,
                    msgtype:'msg',
                    msg:'Loren ipsum dolor sit amet.',
                    date:'9.41',
                    read:false
                },
                {
                    id:7,
                    image: require('../../../assets/images/user_9.jpg'),
                    send:true,
                    msgtype:'location',
                    msg:'',
                    date:'9.41',
                    read:false
                },
                {
                    id:8,
                    image: require('../../../assets/images/user_9.jpg'),
                    send:false,
                    msgtype:'location',
                    msg:'',
                    date:'9.41',
                    read:false
                },
            ]
        }
    }
    _shareLoactionModal(){
        return(
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.sharelocationModal}
            onRequestClose={() => {
               this.setState({sharelocationModal:false})
            }}>
                <TouchableWithoutFeedback onPress={()=>this.setState({sharelocationModal:false})}>
                 <View style={{flex:1,backgroundColor:'rgba(0.5,0.5,0.5,0.5)',alignItems:'center'}}>
                    <View style={{backgroundColor:'white',width:'90%',padding:20,position:'absolute',bottom:30,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                    <TouchableWithoutFeedback>
                      <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
                            <View style={{ height: 5, width: 60, backgroundColor: '#e5e4ea', alignSelf: 'center',marginVertical:5,borderRadius:50,marginBottom:20,marginTop:-10 }}></View>
                            <Image source={require('../../../assets/images/shareyourlocation.png')} style={{width:150,height:150}}/>
                            <Text style={{fontSize: RF(2.8),marginTop:15,color:'black',fontFamily: Platform.OS == 'ios' ?  'Lato-Bold' : 'Lato Bold'}}>Make meating up easier</Text>
                            <Text style={{fontSize: RF(2.5),marginVertical:5,textAlign:'center',fontFamily: Platform.OS == 'ios' ?  'Lato-Regular' : 'Lato Regular'}}>Share your location to make  meating up with firends easier</Text>
                            <Button onClick={() => this.setState({sharelocationModal:false},()=>Actions.LiveLocation())} buttonText='Okay' colors={['#a65ae1', '#8a4cea'] } style={{ marginTop: 35,width:'100%' }} />
                       </View>
                       </TouchableWithoutFeedback>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    _renderMessage(item,index){
        l=this.state.messages.length
        data=this.state.messages
        if(!item.send)
        return(
           <View style={{padding:10,width:'70%',flexDirection:'row'}}>
                        <Image source={item.image} style={{width:40,height:40,borderRadius:20}}/>
                    {item.msgtype=='location'?
                    <View style={{marginLeft:10,width:'100%'}}>
                            <View style={{width:'100%',height:200,borderRadius:10,overflow:'hidden'}}>
                            <MapView
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={{
                                    flex:1,
                                    width:'100%',
                                    height:200,
                                    borderRadius:10,
                                    }}
                                    showsUserLocation={true}
                                    initialRegion={{
                                        latitude: 44.1628,
                                        longitude: -77.3832,
                                        latitudeDelta: 0.015,
                                        longitudeDelta: 0.0121,
                                    }}
                                    > 
                                    <Marker
                                    coordinate={{
                                        latitude: 44.1628,
                                        longitude:-77.3832,
                                    }}>
                                    <ImageBackground source={require('../../../assets/images/locationmarker.png')} style={{height:50,width:50,justifyContent:'center',alignItems:'center'}}>
                                        <Image source={require('../../../assets/images/user_9.jpg')} style={{width:35,height:35,borderRadius:17.5,marginTop:-8}}/>
                                    </ImageBackground>
                                    </Marker>
                                
                                    </MapView>
                                    <View style={{height:50,width:'100%',position:'absolute',bottom:20,alignItems:'center'}}>
                                    <Button onClick={() =>{this.setState({sharelocation:true})}} buttonText='See location' colors={['#a65ae1', '#8a4cea'] } style={{ marginTop: 15, width:'90%'}} height={40}/>
                                    </View> 
                            </View>
                              <Text style={{fontSize: RF(2.2)}}>{item.date}</Text>   
                            </View>
                            :
                        item.msgtype=='image'?
                            <View style={{marginLeft:10,width:'100%'}}>
                                <Image source={item.image} style={{width:'100%',height:200,borderRadius:10}}/>
                                <Text style={{fontSize: RF(2.2)}}>{item.date}</Text>   
                            </View>
                              :
                      <View style={{marginLeft:10}}>
                            <View style={{backgroundColor:'#f3f3f5',padding:10,borderRadius:10}}>
                                <Text style={{ fontSize: RF(2.5),color:'black',fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'}}>{item.msg}</Text>
                            </View>
                              <Text style={{fontSize: RF(2.2)}}>{item.date}</Text>   
                      </View>}
            </View>       
        )
        else
        return(
            <View style={{padding:10,marginRight:10,width:'70%',alignSelf:'flex-end'}}>
          
               
              { item.msgtype=='location'?
                            <View style={{marginRight:10,alignItems:'flex-end',width:'100%',height:200,borderRadius:10,overflow:'hidden'}}>
                              <MapView
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={{
                                    flex:1,
                                    width:'100%',
                                    height:200,
                                    borderRadius:10,
                                    }}
                                    initialRegion={{
                                        latitude: 21.206640,
                                        longitude:72.845724,
                                        latitudeDelta: 0.015,
                                        longitudeDelta: 0.0121,
                                    }}
                                    > 
                                    </MapView>
                                    <View style={{height:50,width:'100%',position:'absolute',bottom:20,alignItems:'center'}}>
                                        <TouchableOpacity onPress={() =>{this.setState({sharelocation:false})}} style={{width:'90%',justifyContent:'center',alignItems:'center',backgroundColor:'#f6f7f9',marginTop:15,height:40,borderRadius:20}}>
                                            <Text style={{color:'black'}}>Stop sharing</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>:
                    item.msgtype=='image'?
                    <Image source={item.image} style={{marginRight:10,alignItems:'flex-end',width:'100%',height:200}}/>:
                    <View style={{alignSelf:'flex-end'}}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']}  style={{padding:10,borderRadius:10}} >  
                            <Text style={{fontSize: RF(2.5), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',color:'white'}}>{item.msg}</Text>
                    </LinearGradient>
                    </View>                
              }
                <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
                    <Text style={{fontSize: RF(2.2)}} >{item.date}</Text>
                    <Icon name='done' type='MaterialIcons' style={{fontSize:13,color:item.read?'#9246e6':'grey'}}/>
                </View>
            
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS=='ios'?'padding':null}>
                <Header style={{backgroundColor:'white'}}>
                    <View style={{width:'10%',justifyContent:'center',}}>
                        <TouchableOpacity style={styles.backView}
                            onPress={() => Actions.pop()}>
                            <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'80%',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize: RF(3),color:'black',fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'}}>{this.props._type == 'user' ? 'Izabella' : 'Trip to palm Shores...'}</Text>
                    </View>
                    <View style={{width:'10%'}}>
                    </View>
                </Header>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />   
                <SafeAreaView style={{flex:1}}>
                <View style={{flex:1}}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}
                    extraData={this.state}
                    data={this.props._type == 'user' ? this.state.messages : this.state.groupmessage}
                    renderItem={({item,index})=>this._renderMessage(item,index)}
                    keyExtractor={(item)=>item.id}
                    inverted
                    />
                     <View style={{padding:10,borderTopWidth:0.5,borderTopColor:'grey'}}>
                    <TextInput 
                    style={{height:40}}
                    placeholder='Send a message...'
                    onChangeText={(text)=>this.setState({message:text})}
                    />
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity>
                            <Image source={require('../../../assets/images/invite.png')} style={{width:30,height:30}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.setState({sharelocationModal:true})} style={{marginLeft:10}}>
                            <Image source={require('../../../assets/images/userlocation.png')} style={{width:20,height:25}}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity disabled={!this.state.message} style={{justifyContent:'flex-end'}}>
                            <Text style={{fontSize: RF(3), fontFamily: Platform.OS == 'ios' ?  'Lato-Bold' : 'Lato Bold',color:this.state.message?'#9246e6':'grey'}}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
                {this._shareLoactionModal()}
            </SafeAreaView>
            </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    
});
