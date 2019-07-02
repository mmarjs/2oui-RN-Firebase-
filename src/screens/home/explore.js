import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, TextInput, ActivityIndicator,FlatList,
    ImageBackground,ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image,
    Dimensions,
    Animated
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import RF from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height:new Animated.Value(0),
            peopleSearchResult:[],
            eventSearchResult:[],
            stories: [
                {
                    name: 'Izabella',
                    image: require('../../assets/images/user_9.jpg'),
                    read:true
                },
                {
                    name: 'Thomasssruirtu',
                    image: require('../../assets/images/user_5.jpg'),
                    read:false
                },
                {
                    name: 'Virendra',
                    image: require('../../assets/images/user_6.jpg'),
                    read:false
                },
                {
                    name: 'jack',
                    image: require('../../assets/images/user_1.jpg'),
                    read:true
                },
                {
                    name: 'Jone',
                    image: require('../../assets/images/user_1.jpg'),
                    read:true
                },
            ],
            events: [
                {
                    event: 'Travel',
                    place: require('../../assets/images/event_1.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date:'27-31 July',
                    time:'11:00 UTC+2',
                    image: require('../../assets/images/user_9.jpg'),
                    personName: 'Anje',
                    price : '2000$'
                },
                {
                    event: 'Science',
                    place: require('../../assets/images/event_2.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date:'31 July',
                    time:'11:00 UTC+2',
                    image: require('../../assets/images/user_11.jpg'),
                    personName: 'Leo',
                    price : '3000$'
                },
                {
                    event: 'Travel',
                    place: require('../../assets/images/user_3.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date:'27-31 July',
                    time:'11:00 UTC+2',
                    image: require('../../assets/images/user_9.jpg'),
                    personName: 'Anje',
                    price : '2000$'
                },
                {
                    event: 'Travel',
                    place: require('../../assets/images/user_4.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date:'27-31 July',
                    time:'11:00 UTC+2',
                    image: require('../../assets/images/user_9.jpg'),
                    personName: 'Anje',
                    price : '2000$'
                },
            ],
            peoples: [
                {
                    name: 'Izabella',
                    age: 22,
                    prof: 'Veterinarian',
                    dist: '40km',
                    image: require('../../assets/images/user_9.jpg'),
                },
                {
                    name: 'Adaora',
                    age: 21,
                    prof: 'Archeologist',
                    dist: '61km',
                    image: require('../../assets/images/user_8.jpg'),
                },
                {
                    name: 'Virendra',
                    age: 22,
                    prof: 'Florist',
                    dist: '25km',
                    image: require('../../assets/images/user_6.jpg'),
                },
                {
                    name: 'jack',
                    age: 25,
                    prof: 'Veterinarian',
                    dist: '40km',
                    image: require('../../assets/images/user_1.jpg'),
                },
            ],
            relatedEvents:[
                {
                    image:require('../../assets/images/event_4.jpg'),
                    category:'Restaurant',
                    title:'Epicurean brunch in the hear of Paris',
                    titleColor:'rgb(255,146,121)',
                    date :'12 April',
                    time:'18:00 UTC+2',
                    eventManager:{
                        name:'Aasiya',
                        image:require('../../assets/images/user_10.jpg')
                    },
                    price:'350$'
                },
                {
                    image:require('../../assets/images/event_5.jpg'),
                    category:'Sport',
                    title:'Friendly golf tournament',
                    titleColor:'rgb(239,113,184)',
                    date :'27 - 31 July',
                    time:'11:00 UTC+2',
                    eventManager:{
                        name:'Thomasson',
                        image:require('../../assets/images/user_5.jpg')
                    },
                    price:'80$'
                },
                {
                    image:require('../../assets/images/event_6.jpg'),
                    category:'Art',
                    title:'Art Club: Introduction to Painting',
                    titleColor:'rgb(239,113,184)',
                    date :'4 May',
                    time:'14:00 UTC+2',
                    eventManager:{
                        name:'Izabella',
                        image:require('../../assets/images/user_9.jpg')
                    },
                    price:'150$'
                },
                {
                    image:require('../../assets/images/event_7.jpg'),
                    category:'Health',
                    title:'Spa Day for mums, sisters, daughters &...',
                    titleColor:'rgb(108,171,247)',
                    date :'20 June',
                    time:'10:00 UTC+2',
                    eventManager:{
                        name:'Alicia',
                        image:require('../../assets/images/user_3.jpg')
                    },
                    price:'400$'
                }
            ]
            
        }
    }
    _events() {
        const dot = <Icon name='dot-single' type='Entypo' style={{fontSize:10,color:'grey',marginHorizontal:4}} />
        return (
            <View style={{ width:'100%',paddingLeft:20,marginTop:15 }}>
                <Text style={styles.headingText}>Popular events this week</Text>
                <View style={{width:'100%'}}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.events}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.card}>
                                <View style={styles.cartContainer}>
                                    <ImageBackground resizeMode='cover' source={item.place} style={{ height: 200, width: 300,alignItems:'flex-end' }}>
                                    <TouchableOpacity onPress={() => this.setState(state => (this.state.events[index].like = !this.state.events[index].like, state))}>
                                        <Icon name={this.state.events[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{color:'#ec527b',padding:12   }}/>
                                   </TouchableOpacity>
                                    </ImageBackground>
                                    {/* <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 30, }} />
                                <Text numberOfLines={1} style={[styles.storyText, { width: 70, textAlign: 'center' }]}>{item.name}</Text> */}
                                
                                <View style={{ width:'100%',padding: 10 }}>
                                    <Text style={[styles.cartText,{paddingBottom:5}]}>{(item.event).toUpperCase()}</Text>
                                    <Text style={[styles.descText,{paddingBottom:5,color:'#000'}]}>{item.desc}</Text>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Text style={[styles.cartText,{paddingBottom:5,color:'#a8a7b5',alignItems:'center',fontSize:RF(2)}]}>{item.date}</Text>
                                        {dot}
                                        <Text style={[styles.cartText,{paddingBottom:5,color:'#a8a7b5',alignItems:'center',fontSize:RF(2)}]}>{item.time}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'space-between',paddingVertical:5}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image source={item.image} style={{ height: 30, width: 30, borderRadius: 15, }} />
                                            <Text style={[styles.cartText,{marginLeft:7,color:'#000'}]}>{item.personName}</Text>
                                        </View>
                                        <Text style={[styles.descText,{color:'#000'}]}>{item.price}</Text>
                                    </View>
                                </View>
                                </View>
                               
                            </View>
                        }
                    />
                </View>
            </View>
        )
    }

    _popularPeople(){
        const dot = <Icon name='dot-single' type='Entypo' style={{fontSize:10,color:'grey',marginHorizontal:4}} />
        return(
            <View style={{width:'100%',marginTop:15,paddingLeft:20}}>
                <Text style={styles.headingText}>Popular People this week</Text>
                <View style={{width:'100%'}}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.peoples}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.card}>
                                <TouchableOpacity onPress={()=>this.props._pageNavigate(0,'profile',{image:item.image,name:item.name,prof:item.prof})} style={styles.cartContainer}>
                                    <ImageBackground resizeMode='cover' source={item.image} style={{ height: 350, width: 300, }}>
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:20}}>
                                            <TouchableOpacity >
                                                <Icon name='close' type='MaterialIcons' style={{ color: '#fff', }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setState(state => (this.state.peoples[index].like = !this.state.peoples[index].like, state))}>
                                                <Icon name={this.state.peoples[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#fff'}} />
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                               
                                    {/* <View style={{ width: '100%', padding: 10, backgroundColor: 'gray' }}> */}
                                        <View style={{ width: '100%', padding: 10,paddingHorizontal:20,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                            <View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>{(item.name)}</Text>
                                                    <Text style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>,</Text>
                                                    <Text style={[styles.descText, { paddingBottom: 5, paddingLeft: 5, color: '#000' }]}>{item.age}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5' }]}>{(item.prof)}</Text>
                                                    {dot}
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5' }]}>{item.dist}</Text>
                                                </View>
                                            </View>
                                        <TouchableOpacity style={[styles.buttoncontainer]}>
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{flexDirection:'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 35, justifyContent: 'center' }}>
                                                    <Icon name='plus' type='Entypo' style={{color:'#fff',fontSize:20,right:5}}/>
                                                    <Text style={{ color: 'white', fontSize: 18, fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Invite</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        </View>
                                    {/* </View> */}
                                </TouchableOpacity>
                          </View>
                        }
                    />
                </View>
            </View>
        
        )
    }
    _relatedEvents(){
        const dot = <Icon name='dot-single' type='Entypo' style={{fontSize:10,color:'grey',marginHorizontal:4}} />
        return (
            <View style={{ width: '100%', marginTop:15,paddingLeft:20 }}>
                <Text style={[styles.headingText,{marginBottom:10}]}>Related events</Text>
                <FlatList
                    data={this.state.relatedEvents}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={styles.relatedEventsMainView}>
                            <View style={styles.relatedEventsCardView}>
                                <View style={{ width: '35%'}}>
                                    <Image resizeMode='cover' source={item.image} style={{ height: 125 , width: '100%' }} />
                                </View>
                                <View style={styles.relatedEventsDetailsView}>
                                    <View style={{ width: '100%' }}>
                                        <View style={styles.relatedEventsCategoryView}>
                                            <Text style={[styles.relatedEventsCategoryText,{color: item.titleColor }]}>{item.category.toLocaleUpperCase()}</Text>
                                            <Image source={require('../../assets/images/saved.png')} style={{ height: 16, width: 18, tintColor: index % 2 != 0 ? '#f05d87' : null }} />
                                        </View>
                                        <View style={{ width: '90%' }}>
                                            <Text style={styles.relatedEventsTitle}>{item.title}</Text>
                                            <Text style={styles.relatedEventsSubtitle}>{item.date}{dot}{item.time}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.relatedEventsHandlerView}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                            <Image source={item.eventManager.image} style={{ height: 25, width: 25, borderRadius: 12.5 }} />
                                            <Text style={{ marginLeft: 5, color: 'black',fontSize: RF(1.8), }}>{item.eventManager.name}</Text>
                                        </View>
                                        <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',fontSize: RF(2) }}>{item.price}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
    _relatedPeople(){
        const dot = <Icon name='dot-single' type='Entypo' style={{fontSize:10,color:'grey',marginHorizontal:4}} />
        return(
            <View style={{width:'100%',marginTop:15,paddingLeft:20}}>
                <Text style={styles.headingText}>Related People</Text>
                <View style={{width:'95%'}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.peoples}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.card}>
                                <View style={[styles.cartContainer]}>
                                    <ImageBackground resizeMode='cover' source={item.image} style={{ height: 350, width: '100%', }}>
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:20}}>
                                            <TouchableOpacity >
                                                <Icon name='close' type='MaterialIcons' style={{ color: '#fff', }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setState(state => (this.state.peoples[index].like = !this.state.peoples[index].like, state))}>
                                                <Icon name={this.state.peoples[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#fff'}} />
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                               
                                    {/* <View style={{ width: '100%', padding: 10, backgroundColor: 'gray' }}> */}
                                        <View style={{ width: '100%', padding: 10,paddingHorizontal:20,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                            <View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>{(item.name)}</Text>
                                                    <Text style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>,</Text>
                                                    <Text style={[styles.descText, { paddingBottom: 5, paddingLeft: 5, color: '#000' }]}>{item.age}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5',fontSize:RF(2) }]}>{(item.prof)}</Text>
                                                    {dot}
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5',fontSize:RF(2) }]}>{item.dist}</Text>
                                                </View>
                                            </View>
                                        <TouchableOpacity style={[styles.buttoncontainer]}>
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{flexDirection:'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 35, justifyContent: 'center' }}>
                                                    <Icon name='plus' type='Entypo' style={{color:'#fff',fontSize:20,right:5}}/>
                                                    <Text style={{ color: 'white', fontSize: 18, fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Invite</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        </View>
                                    {/* </View> */}
                                </View>
                          </View>
                        }
                    />
                </View>
            </View>
        
        )
    }
    _searchList(){
        const dot = <Icon name='dot-single' type='Entypo' style={{fontSize:10,color:'grey'}} />
        console.log('result',this.state.peopleSearchResult,this.state.eventSearchResult)
        return(
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{width:'74%'}}>
                <View style={{alignItems:'center'}}>
                    {this.state.peopleSearchResult.length > 0 ? <View style={{flexDirection:'row',width:'90%',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',fontSize:RF(3.5),color:'black'}}>People</Text>
                        <TouchableOpacity onPress={()=>Actions.Search({data:this.state.peoples})}><Text style={{fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',fontSize:RF(2.3),color:'#a65ae1'}}>See all</Text></TouchableOpacity>
                    </View>: null}
                    <View style={{width:'90%',padding:5}}>
                    <FlatList 
                      extraData={this.state}
                      data={this.state.peopleSearchResult}
                      renderItem={({item})=>
                      <View style={{flexDirection:'row',width:'90%',alignItems:'center',marginVertical:10}}>
                        <Image source={item.image} style={{height:50,width:50,borderRadius:25}} />
                        <View style={{paddingLeft:10}}>
                            <Text style={{fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',fontSize:RF(2.8),color:'black'}}>{item.name}</Text>
                            <Text style={{fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',fontSize:RF(2.0)}}>{item.prof}</Text>
                        </View>
                      </View>}
                      keyExtractor={(index)=>index.toString()}
                    />
                    </View>
                    {this.state.eventSearchResult.length > 0 ? <View style={{flexDirection:'row',width:'90%',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',fontSize:RF(3.5),color:'black'}}>Events</Text>
                        <TouchableOpacity onPress={()=>Actions.Search({data:this.state.events})}><Text style={{fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',fontSize:RF(2.3),color:'#a65ae1'}}>See all</Text></TouchableOpacity>
                    </View> : null }
                    <View style={{width:'90%',padding:5}}>
                    <FlatList 
                      extraData={this.state}
                      data={this.state.eventSearchResult}
                      renderItem={({item,index})=>
                      <View style={styles.relatedEventsMainView}>
                      <View style={styles.relatedEventsCardView}>
                          <View style={{ width: '35%' }}>
                              <Image resizeMode='cover' source={item.image} style={{ height: 125, width: '100%' }} />
                          </View>
                          <View style={styles.relatedEventsDetailsView}>
                              <View style={{ width: '100%' }}>
                                  <View style={styles.relatedEventsCategoryView}>
                                      <Text style={[styles.relatedEventsCategoryText,{color: item.titleColor }]}>{item.category.toLocaleUpperCase()}</Text>
                                      <Image source={require('../../assets/images/saved.png')} style={{ height: 16, width: 18, tintColor: index % 2 != 0 ? '#f05d87' : null }} />
                                  </View>
                                  <View style={{ width: '90%' }}>
                                      <Text style={styles.relatedEventsTitle}>{item.title}</Text>
                                      <Text style={styles.relatedEventsSubtitle}>{item.date}{dot}{item.time}</Text>
                                  </View>
                              </View>
                              <View style={styles.relatedEventsHandlerView}>
                                  <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                      <Image source={item.eventManager.image} style={{ height: 25, width: 25, borderRadius: 12.5 }} />
                                      <Text style={{ marginLeft: 5, color: 'black',fontSize: RF(2), }}>{item.eventManager.name}</Text>
                                  </View>
                                  <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',fontSize: RF(2) }}>{item.price}</Text>
                              </View>
                          </View>
                      </View>
                  </View>}
                      keyExtractor={(index)=>index.toString()}
                    />
                    </View>
                </View>
                </ScrollView>
        )
    }
    _search(search){
        var peopleSearchResult = []
        var eventSearchResult =[]
        if(search){
           peopleSearchResult = this.state.peoples.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
           eventSearchResult = this.state.relatedEvents.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))
           this.setState({peopleSearchResult:peopleSearchResult,eventSearchResult:eventSearchResult})
        }
          else{
            this.setState({peopleSearchResult:[],eventSearchResult:[]})
          }
        console.log('search Data',peopleSearchResult,eventSearchResult)
    }
    _scrolltoTop(){
        this.scrollRef.scrollTo({y:0,animated:true})
    }
    render() {
        const marginTop = this.state.height.interpolate({
            inputRange : [100,150,200],
            outputRange : [0,-25,-55],
            extrapolate: 'clamp'
        })
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                {/* ================ Search bar View ==================== */}
                <Animated.View style={{width:'100%',alignItems:'center',paddingBottom:10,borderBottomColor:'#f2f3f5',borderBottomWidth:1,top:marginTop,position:'absolute',zIndex:1,backgroundColor:'#fff'}}>
                    <View style={[styles.searchView]}>
                            <View style={{width:'80%'}}>
                                <Image source={require('../../assets/images/logo.png')} style={{height:70,width:70,tintColor:'#8a42e8'}} />
                            </View>
                            <TouchableOpacity onPress={()=>Actions.Map()} style={{padding:2}}><Image source={require('../../assets/images/map.png')} style={{ height: 25, width: 25,tintColor:"#8a42e8" }} /></TouchableOpacity>
                            <TouchableOpacity style={{padding:2}} onPress={()=>Actions.Filter()}><Image source={require('../../assets/images/filter.png')} style={{ height: 25, width: 25,tintColor:"#8a42e8" }} /></TouchableOpacity>
                            {/* <Icon name='location' type='Entypo' style={{color:'#8a42e8'}}/> */}
                            {/* <Icon name='filter' type='FontAwesome5' style={{color:'#8a42e8'}}/> */}
                    </View>
                    <View style={[styles.searchinputcontainer]}>
                                <Icon name='search1' type='AntDesign' style={{ color: '#a8a7b5',fontSize:20 }} />
                                <TextInput
                                    style={styles.text}
                                    placeholder='Search'
                                    autoCorrect={false}
                                    keyboardType='default'
                                    onChangeText={(text) => this._search(text)}
                                />
                    </View>
                </Animated.View>
                {this.state.peopleSearchResult.length > 0 || this.state.eventSearchResult > 0 ? 
                this._searchList() :
                <ScrollView 
                ref={(ref)=>this.scrollRef = ref}
                scrollEventThrottle={16}
                onScroll={Animated.event([{nativeEvent:{contentOffset:{y:this.state.height}}}])} showsVerticalScrollIndicator={false}>
{/* ====================== Story View ===================== */}
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.storyView}>
                        <TouchableOpacity onPress={()=>Actions.Camera()} style={{ alignItems: 'center'}}>
                            <View style={styles.addStoryContainer}>
                                <Icon name='camera' type='Entypo' style={{ color: '#101010' }} />
                            </View>
                            <Text style={styles.storyText}>Add new</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.YourStory()} style={{ alignItems: 'center', marginLeft: 5 }}>
                            <View style={{padding:3,borderWidth:2,borderColor:'#8a42e8',alignItems:'center',justifyContent:'center',borderRadius:40}}>
                                <Image source={require('../../assets/images/user_1.jpg')} style={{ height: 60, width: 60, borderRadius: 30, }} />
                            </View>
                            <Text style={[styles.storyText,{width:70,textAlign:'center'}]}>Your story</Text>
                        </TouchableOpacity>
                        <View >
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.stories}
                                extraData={this.state}
                                scrollEnabled={false}
                                initialNumToRender={this.state.stories.length}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity onPress={()=>Actions.Event()} style={{ alignItems: 'center', marginLeft: 5}}>
                                        <View style={{padding:3,borderWidth:2,borderColor:item.read ? 'transparent' : '#8a42e8',alignItems:'center',justifyContent:'center',borderRadius:40}}>
                                            <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                        </View>
                                        <Text numberOfLines={1} style={[styles.storyText,{width:70,textAlign:'center' }]}>{item.name}</Text>
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                    </View>
                    </ScrollView>                    
                    {this._events()}
                    {this._popularPeople()}
                    {this._relatedEvents()}
                    {this._relatedPeople()}
                    </ScrollView> 
                }
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
        //paddingHorizontal:10
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        //padding: 10,
        width:'90%',
        justifyContent: 'space-between',
    },
    searchinputcontainer: {
        flexDirection: 'row',
        //alignItems: 'center',
        backgroundColor: '#f2f3f5',
        height: 40,
        width: '85%',
        borderRadius: 10,
        padding: 10,
        // marginTop: 12
    },
    text: {
        width:'85%',
        fontSize: RF(2.3),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        marginLeft: 5,
        color: '#a8a7b5'
    },
    storyView: {
        flexDirection: 'row',
        //marginVertical: 15,
        marginTop: 130,
        paddingVertical: 15,
        paddingHorizontal:20,
        borderColor: '#f2f3f5',
        //borderTopWidth: 1,
        borderBottomWidth: 1
    },
    addStoryContainer: {
        height: 70,
        width: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f3f5'
    },
    storyText:{
        color: "#000", 
        fontSize: RF(1.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', 
        marginTop: 8 
    },
    headingText:{
        fontSize: RF(2.8),
        color: '#000',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        marginLeft:5
    },
    imageBackground: {
        width: '90%',
        height: 300,
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
        fontSize:RF(1.8),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    },
    descText:{
        fontSize:RF(2.3),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 30,
        width: 100,
       // borderRadius: 15,
    },
    relatedEventsMainView:{
        alignItems: 'center', 
        width: '95%', 
        marginVertical: 10, 
        elevation: 0.8, 
        borderRadius: 15, 
        shadowOffset: { height: 1, width: 0 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 1,
    },
    relatedEventsCardView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        overflow: 'hidden', 
        borderRadius: 15, 
        //height: Platform.OS == 'android' ? 120 : 135,
        backgroundColor: 'white'
    },
    relatedEventsCategoryView:{
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'space-between', 
        paddingVertical: 3
    },
    relatedEventsCategoryText:{
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontSize: RF(1.6),
    },
    relatedEventsTitle:{
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RF(2.2),
        color: 'black' 
    },
    relatedEventsSubtitle:{
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Light', 
        //fontSize: 14, 
        fontSize: RF(2),
        width:'95%',
        color: '#a8a7b5',
        marginVertical: 2
    },
    relatedEventsHandlerView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '100%', 
        justifyContent: 'space-between', 
        paddingVertical: 5
    },
    relatedEventsDetailsView:{
        width: '65%', 
        justifyContent: 'space-between', 
        paddingHorizontal: 8
    }


});
