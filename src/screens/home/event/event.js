import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,FlatList,
  ImageBackground, ScrollView,Modal,
  TouchableOpacity,TouchableWithoutFeedback,
  StatusBar,
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import RF from "react-native-responsive-fontsize"
import Swiper from 'react-native-swiper';
import SlidingUpPanel from 'rn-sliding-up-panel';


//import SwipeUpDown from '../../../lib/react-native-swipe-up-down';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GestureRecognizer, {swipeDirections} from '../../../lib/react-native-swipe-gestures-master';

const { width, height } = Dimensions.get('window');

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      ratemodalVisible: false,
      goingbutton : false,
      starCount:'',
      Guests: [
        {
          image: require('../../../assets/images/user_10.jpg'),
        },
        {
          image: require('../../../assets/images/user_2.jpg'),
        },
        {
          image: require('../../../assets/images/user_5.jpg'),
        },
        {
          image: require('../../../assets/images/user_4.jpg'),
        },
        {
          image: require('../../../assets/images/user_6.jpg'),
        },
        {
          image: require('../../../assets/images/user_11.jpg'),
        },
        {
          image: require('../../../assets/images/user_7.jpg'),
        },
        {
          image: require('../../../assets/images/user_3.jpg'),
        },
        {
          image: require('../../../assets/images/user_8.jpg'),
        },
        {
          image: require('../../../assets/images/user_9.jpg'),
        },
      ],
      peoples: [
        {
          event: 'Travel',
          place: require('../../../assets/images/event_1.jpg'),
          desc: 'Trip to Plam Shores Beaches',
          date:'27-31 July . 11:00 UTC+2',
          image: require('../../../assets/images/user_9.jpg'),
          personName: 'Anje',
          price : '2000$',
          like:0,
      },
      {
          event: 'Science',
          place: require('../../../assets/images/event_2.jpg'),
          desc: 'Trip to Plam Shores Beaches',
          date:'31 July . 11:00 UTC+2',
          image: require('../../../assets/images/user_11.jpg'),
          personName: 'Leo',
          price : '3000$',
          like:0,
      },
      {
          event: 'Travel',
          place: require('../../../assets/images/user_3.jpg'),
          desc: 'Trip to Plam Shores Beaches',
          date:'27-31 July . 11:00 UTC+2',
          image: require('../../../assets/images/user_9.jpg'),
          personName: 'Anje',
          price : '2000$',
          like:0,
      },
      {
          event: 'Travel',
          place: require('../../../assets/images/user_4.jpg'),
          desc: 'Trip to Plam Shores Beaches',
          date:'27-31 July . 11:00 UTC+2',
          image: require('../../../assets/images/user_9.jpg'),
          personName: 'Anje',
          price : '2000$',
          like:0,
      },
    ],
      height:Dimensions.get('screen').height/5.5,
      swipe:'SWIPE_DOWN',
    }
  }
  componentDidMount() {

  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setRateModalVisible(visible) {
    this.setState({ ratemodalVisible: visible });
  }
  onStarRatingPress(rating) {
    this.setState({starCount: rating});
  }

  _participateModal(){
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible)
        }}>
        <TouchableOpacity style={styles.participateModalView} onPressOut={() => { this.setModalVisible(!this.state.modalVisible) }}>
        {/* <StatusBar backgroundColor='rgba(0,0,0,0.5)' barStyle='light-content' /> */}
        <TouchableWithoutFeedback>
          <View style={styles.participateView}>
          <View style={{ height: 5, width: 80, backgroundColor: '#e5e4ea', alignSelf: 'center',marginTop:10,borderRadius:50 }}></View>
          <View style={{marginVertical:30}}>
            <Text style={[styles.descText,{color:'#000',marginBottom:5}]}>Participate to this event</Text>
            <Text style={[styles.cartText,{color:'#000',textAlign:'center'}]}>Send a request to the host</Text>
          </View>
            <TouchableOpacity style={[styles.buttoncontainer]} onPress={() => { this.setModalVisible(!this.state.modalVisible),this.setState({goingbutton:true}) }}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                <Text style={[styles.cartText,{ color: 'white',}]}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
  }
  UpdateRating(key) {
    this.setState({ starCount: key });
  }
  _renderList(star) {
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 30, marginBottom: 5 }}>
        {star.map((index) =>

          <TouchableOpacity key={index} onPress={()=>this.setState({ starCount: index })}>
            <Image style={styles.starStyle} source={ this.state.starCount >= index ? require('../../../assets/images/star.png') : require('../../../assets/images/emptystar.png')} />
          </TouchableOpacity>
        )}
      </View>
    )
  }

  _rateModal(){
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.ratemodalVisible}
        onRequestClose={() => {
          this.setRateModalVisible(!this.state.ratemodalVisible)
        }}>
        <TouchableOpacity style={styles.participateModalView} onPressOut={() => { this.setRateModalVisible(!this.state.ratemodalVisible) }}>
        {/* <StatusBar backgroundColor='rgba(0,0,0,0.5)' barStyle='light-content' /> */}
        <TouchableWithoutFeedback>
          <View style={styles.participateView}>
          <View style={{ height: 5, width: 80, backgroundColor: '#e5e4ea', alignSelf: 'center',marginTop:10,borderRadius:50 }}></View>
          <View style={{paddingVertical:25}}>
          <Image style={{ height: 60, width: 60,borderRadius:30 }} source={require('../../../assets/images/user_10.jpg')} />
          </View>
          <View style={{}}>
            <Text style={[styles.descText,{color:'#000',marginBottom:5}]}>Trip to Palm Shores Beaches</Text>
            <Text style={[styles.cartText,{color:'#000',textAlign:'center'}]}>Please rate your experience</Text>
          </View>
            
            {this._renderList([1,2,3,4,5])}
           
            <TouchableOpacity style={[styles.buttoncontainer]} disabled={this.state.starCount ? false : true} 
              onPress={()=>Actions.reset('Home')}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} 
              colors={this.state.starCount ? ['#a65ae1', '#8a4cea'] : ['#e3cdf8', '#e3cdf8']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                <Text style={[styles.cartText,{ color: 'white',}]}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
  }

  fullView() {
    return (
      <SafeAreaView style={{ backgroundColor: '#fff',height:height/1.7 }}>
        {/* ============================= Title ============================== */}
     
        <ScrollView contentContainerStyle={{paddingBottom:'5%'}} >
        {/* <View style={{ width: '90%', alignSelf: 'center' }}>
           
            <Text style={{ marginTop: 10, color: '#68a8fa', fontSize: RF(2.3), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}> {'Travel'.toUpperCase()} </Text>
            <Text style={{ marginTop: 7, width: Platform.OS == 'ios' ? '75%' : '65%', color: '#000', fontSize: RF(3.5), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>Trip to Plam Shores Beaches</Text>
          </View> */}
          {/* <Image style={{height:300,width:300}}
                          source={require('../../../assets/images/user_1.jpg')} />
                           <Image style={{height:300,width:300}}
                          source={require('../../../assets/images/user_1.jpg')} />
                           <Image style={{height:300,width:300}}
                          source={require('../../../assets/images/user_1.jpg')} />
                           <Image style={{height:300,width:300}}
                          source={require('../../../assets/images/user_1.jpg')} />
                           <Image style={{height:300,width:300}}
                          source={require('../../../assets/images/user_1.jpg')} />
                           <Image style={{height:300,width:300}}
                          source={require('../../../assets/images/user_1.jpg')} /> */}
        
          {/* ============================= Desc ============================== */}
          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 10, }}>
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
              <Image style={{ height: 25, width: 25 }} source={require('../../../assets/images/calender.png')} />
              <View style={{ paddingLeft: 10 }}>
                <Text style={styles.fulldescText}>27 -  31 July, 2019</Text>
                <Text style={styles.fulldescTimeText}>At 11:00 UTC+2</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
              <Image style={{ height: 25, width: 25 }} source={require('../../../assets/images/pinpoint.png')} />
              <View style={{ paddingLeft: 10 }}>
                <Text style={styles.fulldescText}>Paris-Charles De Gualle Airport</Text>
                <Text style={styles.fulldescTimeText}>95700 Roissy-en-France, France</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
              <Image style={{ height: 25, width: 25 }} source={require('../../../assets/images/price.png')} />
              <View style={{ paddingLeft: 10 }}>
                <Text style={styles.fulldescText}>2 000$ budget</Text>
                <Text style={styles.fulldescTimeText}>The host take care of it</Text>
              </View>
            </View>
          </View>
          {/* ============================= Guests ============================== */}
          <View style={{ width: '100%', alignSelf: 'center', marginVertical: 10 }}>
            <Text style={[styles.fullViewHeadingText,{paddingHorizontal:20}]}>Guests</Text>
            <Text style={[styles.fulldescText, { paddingVertical: 5, marginTop: 15,paddingHorizontal:20 }]}>Up to 10 mixed guests</Text>
            <View style={{marginTop:5}}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.state.Guests}
              extraData={this.state}
              renderItem={({ item, index }) =>
                <View style={{paddingHorizontal:5}}>
                  <Image style={{ height: 50, width: 50,borderRadius:25 }} source={item.image} />
                </View>
              }
            />
            </View>
          </View>
               {/* ============================= Note ============================== */}
               <View style={{justifyContent:'center'}}>
                 <Text style={[styles.fullViewHeadingText,{paddingHorizontal:20}]}>Notes</Text>
                  <Text style={{width:'90%',alignSelf:'center',textAlign:'justify',color:'black',marginTop:10,fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'}}>
                    Loren ipsum dolor sit amet, consectetur adipisingelit. Quisque sodales loren ipsum dolor sit amet, consectetur adipisingelit. Quisque sodales loren ipsum dolor sit amet, consectetur adipisingelit. Quisque sodales loren ipsum dolor sit amet
                  </Text>
               </View>
                {/* ============================= Location ============================== */}
                <View style={{justifyContent:'center',marginTop:10}}>
                 <Text style={[styles.fullViewHeadingText,{paddingHorizontal:20}]}>Location</Text>
                  <Text style={{width:'90%',alignSelf:'center',textAlign:'justify',color:'black',marginTop:10,fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'}}>
                      Hotel Riu Palace Aruba, Noord, Aruba
                  </Text>
                  <View style={{marginTop:10, height:Dimensions.get('screen').width/3.5,borderRadius:10,overflow:'hidden', width:'90%',alignSelf:'center'}}>
                    <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                      height:'100%',
                      width:'100%',
                      
                    }}
                    region={{
                        latitude: 12.5665,
                        longitude: -70.0475,
                        latitudeDelta: 0.0009656971472811193,
                        longitudeDelta: 0.003112368285670186,
                    }}
                    > 
                    <Marker
                    coordinate={{
                      latitude: 12.5665,
                      longitude: -70.0475,
                    }}>
                    <Image source={require('../../../assets/images/locationicon.png')} style={{height:40,width:40,justifyContent:'center',alignItems:'center'}}/>
                    </Marker>
                    </MapView>
                  </View>
               </View>
                {/* ============================= Hostedby ============================== */}
                <View style={{justifyContent:'center',marginTop:10}}>
                 <Text style={[styles.fullViewHeadingText,{paddingHorizontal:20}]}>Hosted by</Text>
                 <View style={{borderBottomWidth:0.5,borderBottomColor:'#e5e4ea'}}>
                 <View style={{ flexDirection: 'row',width:'90%',alignSelf:'center',alignItems:"center",justifyContent:'space-between',paddingVertical:5,}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Image source={require('../../../assets/images/user_10.jpg')} style={{ height: 30, width: 30, borderRadius: 15, }} />
                          <View style={{paddingLeft:10}}>
                            <Text style={[styles.cartText,{fontSize:RF(2.4),color:'black'}]}>Anje</Text>
                            <View style={{flexDirection:'row'}}>
                              <Image source={require('../../../assets/images/star.png')} style={{ height: 20, width: 20, borderRadius: 15, }} />
                              <Text style={[styles.cartText,{fontSize:RF(2.3),color:'black'}]}>4.7 (48)</Text>
                            </View>
                          </View>
                    </View>
                    <Icon name='angle-right' type='FontAwesome' style={{ color: 'grey', fontSize: 20 }} />
                </View>                
               </View>
               </View>
                {/* ============================= Similer Event ============================== */}
                <View style={{justifyContent:'center',marginTop:20}}>
                    <Text style={[styles.fullViewHeadingText,{paddingHorizontal:20}]}>Similar events</Text>
                    {this._popularPeople ()}
                </View>
                <View style={{width:'100%',marginTop:15,padding:20,flexDirection:'row',justifyContent:'space-between',borderTopWidth:0.5,borderTopColor:'#e5e4ea'}}>
                    <View style={{}}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Icon name='dot-single' type='Entypo' style={{ color: 'green', fontSize: 35 }} />
                      <Text style={[styles.cartText,{color:'#000'}]}>Free event!</Text>
                      </View>
                      <Text style={[styles.cartText,{color:'#000'}]}>The host take care of it</Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
              {
                this.state.goingbutton == false ?
                  <TouchableOpacity style={[styles.buttoncontainer]}
                    onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 35, justifyContent: 'center' }}>
                      <Text style={[styles.cartText,{ color: 'white'}]}>Participate</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={[styles.buttoncontainer]}
                    onPress={() => { this.setRateModalVisible(!this.state.ratemodalVisible) }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#1ae29d', '#0dc088']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 35, justifyContent: 'center' }}>
                      <Text style={[styles.cartText,{ color: 'white'}]}>You're going</Text>
                    </LinearGradient>
                  </TouchableOpacity>
              }
                   
                    </View>
                </View>
        </ScrollView>
        {/* <Swiper loop={false} >
                      <ImageBackground style={styles.imageslider}
                          source={require('../../../assets/images/event_1.jpg')} >
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10,paddingHorizontal:10}}>
                        <TouchableOpacity style={{width:30}}>
                        <Image style={{height:25,width:25}}
                          source={require('../../../assets/images/back.png')} />
                          </TouchableOpacity>
                          <TouchableOpacity>
                          <Icon name='favorite'  type='MaterialIcons' style={{color:'#ec527b',fontSize:25 }}/>
                          </TouchableOpacity>
                        </View>
                    </ImageBackground>
                      <ImageBackground style={styles.imageslider}
                          source={require('../../../assets/images/user_5.jpg')} />
                      <ImageBackground style={styles.imageslider}
                          source={require('../../../assets/images/user_6.jpg')} />
                      <ImageBackground style={styles.imageslider}
                          source={require('../../../assets/images/user_9.jpg')} />
                  </Swiper> */}

      </SafeAreaView>
    )

  }
  _popularPeople (){
    return(
        <View style={{width:'100%',paddingLeft:20}}>
            <View style={{width:'100%'}}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.peoples}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={styles.card}>
                            <TouchableOpacity style={styles.cartContainer}>
                                <ImageBackground source={item.place} style={{ height: 200, width: 300, }}>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',padding:20}}>
                                        <TouchableOpacity onPress={() => this.setState(state => (this.state.peoples[index].like = !this.state.peoples[index].like, state))}>
                                            <Icon name={this.state.peoples[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#fff'}} />
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                                <View style={{ width:'100%',padding: 10, }}>
                                    <Text style={[styles.cartText,{paddingBottom:5}]}>{(item.event).toUpperCase()}</Text>
                                    <Text style={[styles.descText,{paddingBottom:5,color:'#000'}]}>{item.desc}</Text>
                                    <Text style={[styles.cartText,{paddingBottom:5,color:'#a8a7b5'}]}>{item.date}</Text>
                                    <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'space-between',paddingVertical:5}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image source={item.image} style={{ height: 30, width: 30, borderRadius: 15, }} />
                                            <Text style={[styles.cartText,{marginLeft:7,color:'#000'}]}>{item.personName}</Text>
                                        </View>
                                        <Text style={[styles.descText,{color:'#000'}]}>{item.price}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                      </View>
                    }
                />
            </View>
        </View>
    
    )
}
    onSwipeUp(gestureState) {
     console.log("swiped Up")
    }
  
    onSwipeDown(gestureState) {
      console.log("swiped Down")
    }
    onSwipe(gestureName, gestureState) {
      const {SWIPE_UP, SWIPE_DOWN} = swipeDirections;
      console.log("gestureName : ",gestureName)
      console.log("gestureState : ",gestureState)
      switch (gestureName) {
        case SWIPE_UP:
          this.setState({height: Dimensions.get('screen').height/1.6,swipe:'SWIPE_UP'});
          break;
        case SWIPE_DOWN:
          this.setState({height:Dimensions.get('screen').height/5.5,swipe:'SWIPE_DOWN'});
          break;
      }
    }
    _reanderStory(image){
      return(
        <ImageBackground source={image} style={{width:'100%',height:'100%'}} resizeMode='stretch'>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity 
              onPress={()=>this.setState({swipe:'SWIPE_DOWN',height:Dimensions.get('screen').height/6})}
               style={{paddingHorizontal:10,marginLeft:-10}}>
                 <Icon name='angle-left' type='FontAwesome' style={{ color: 'white', fontSize: 35 }} />
             </TouchableOpacity>
            </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {this.state.goingbutton == true ?
                  <TouchableOpacity>
                    <Image source={require('../../../assets/images/message1.png')} style={{ height: 25, width: 25, marginRight: 15 }} />
                  </TouchableOpacity>
                  : null
                }
                <TouchableOpacity>
                  <Icon name={'favorite'} type='MaterialIcons' style={{ color: 'rgb(239,113,184)' }} />
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </ImageBackground> 
      )
    }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 50
    };
    return (
      <View style={{flex:1}}>
       
       { this.state.swipe=='SWIPE_DOWN'?
         <ImageBackground source={require('../../../assets/images/story_1.jpg')} style={{width:'100%',height:Dimensions.get('screen').height/1.15}} resizeMode='stretch'>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ height: 40, width: 40, borderRadius: 20 }} source={require('../../../assets/images/user_1.jpg')} />
              <View style={{ paddingLeft: 7 }}>
                <Text style={[styles.headingText, { fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }]}>Your story</Text>
                <Text style={[styles.headingText, { fontFamily: Platform.OS == 'ios' ? 'Lato-Light' : 'Lato Light' }]}>10min</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image style={{ height: 20, width: 20, marginRight: 10 }} source={require('../../../assets/images/dots.png')} />
              <TouchableOpacity onPress={()=>Actions.pop()}><Image style={{ height: 20, width: 20, }} source={require('../../../assets/images/close.png')} /></TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground> :
      <View  style={{height:Platform.OS=='ios'?Dimensions.get('screen').height/2.5:Dimensions.get('screen').height/3.3}}>
       <Swiper 
       dotColor='#cbcbcb'
       activeDotColor='#ffffff'
       activeDotStyle={{borderWidth:2,borderColor:'#cbcbcb',width:12,height:12,borderRadius:6}}
       showsButtons={false}>
       {this._reanderStory(require('../../../assets/images/story_1.jpg'))}
       {this._reanderStory(require('../../../assets/images/story_2.jpg'))}
       {this._reanderStory(require('../../../assets/images/story_1.jpg'))}
      </Swiper>
      </View>}
      <GestureRecognizer
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          onSwipeUp={(state) => this.onSwipeUp(state)}
          onSwipeDown={(state) => this.onSwipeDown(state)}
          config={config}
          style={{
            flex: 1,
            backgroundColor: this.state.backgroundColor
          }}
        >
          <View style={{ width: '100%', alignSelf: 'center',height:this.state.height,backgroundColor:'white',position:'absolute',bottom:0,borderTopLeftRadius:15,borderTopRightRadius:15,overflow:'hidden' }}>
          <View style={{ height: 5, width: 80, backgroundColor: '#e5e4ea', alignSelf: 'center',marginTop:10,borderRadius:50 }}></View>
                { this.state.swipe=='SWIPE_DOWN'?
                  <View style={{ width: '90%', alignSelf: 'center' }}>
                  <Text style={{ marginTop: 10, color: '#68a8fa', fontSize: RF(2.3), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}> {'Travel'.toUpperCase()} </Text>
                  <Text style={{ marginTop: 7, width: Platform.OS == 'ios' ? '75%' : '65%', color: '#000', fontSize: RF(3.5), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>Trip to Plam Shores..</Text>
                 </View>:
                  this.fullView()
               }
          </View>
        </GestureRecognizer>
        {/* <SwipeUpDown
            hasRef={ref => (this.swipeUpDownRef = ref)}
            itemMini={
              
              <View style={{ width: '90%', alignSelf: 'center' }}>
                <View style={{ height: 5, width: 80, backgroundColor: '#f2f3f5', alignSelf: 'center' }}></View>
                <Text style={{ marginTop: 10, color: '#000', fontSize: RF(2.3), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}> {'Travel'.toUpperCase()} </Text>
                <Text numberOfLines={1} style={{ marginTop: 7, width: Platform.OS == 'ios' ? '75%' : '65%', color: '#000', fontSize: RF(3.5), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>Trip to Plam Shores Beaches</Text>
              
              </View>
            }
            itemFull={
              this.fullView()
            }
            swipeHeight={Platform.OS == 'ios' ? 100 : 100}
            onShowMini={() => console.log('mini')}
            onShowFull={() => console.log('full')}
            //disablePressToShow={true}
            style={{ backgroundColor: '#fff' }}
            animation="easeInEaseOut"
          /> */}
          {this._participateModal()}
          {this._rateModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  headerView: {
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingVertical: Platform.OS == 'ios' ? 30 : 20,
    // alignSelf:'center',
    //  alignContent:'center'
  },
  backView: {
    // backgroundColor:'red',
    width: 40,
    alignItems: 'flex-start',
  },
  shareView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: Platform.OS == 'ios' ? 50 : 30
  },
  shareContainer: {
    height: 40,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingText: {
    color: '#fff',
    fontSize: RF(2.3),
  },
  imageslider: {
    flex: 1,
    height: 300,
    width: '100%',
    //  justifyContent: 'center',
    alignItems: 'stretch'
  },
  fulldescText: {
    color: '#000',
    fontSize: RF(2.3),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
  },
  fulldescTimeText: {
    color: '#a2a0af',
    fontSize: RF(2.3),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    marginTop: 3
  },
  fullViewHeadingText: {
    color: '#000',
    fontSize: RF(2.7),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
  },
  card:{
    borderRadius: 12,
    elevation: 0.7,
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius:1,
    margin: 5, flex: 1, marginTop: 18,
},  
cartContainer: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 12,
    width: '100%',
},
cartText:{
    fontSize:RF(2.5),
    fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
},
descText:{
    fontSize:RF(2.8),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
},
buttoncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: '#000',
    height: 30,
    width:'80%',
   // borderRadius: 15,
},
participateModalView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
},
participateView:{
  alignItems: 'center',
  // justifyContent: 'flex-start',
  backgroundColor: "#fff",
  paddingBottom:30,
  // height: '45%',
  marginBottom:30,
  alignSelf:'center',
  width: '90%',
  elevation: 2,
  borderRadius: 15,
},
starStyle:{
  width: 35, height: 35,
  marginHorizontal:3
},
});
