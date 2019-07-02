import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    Dimensions,
    FlatList,
    ImageBackground,
    SafeAreaView,
    TextInput,
    TouchableHighlight,
    ScrollView,
    Modal
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { Icon, Header } from 'native-base';
import RF from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';
import RNGooglePlaces from 'react-native-google-places';
import GestureRecognizer, { swipeDirections } from '../../../../lib/react-native-swipe-gestures-master';
var height = Platform.OS == 'ios' ? Dimensions.get('screen').height - 45 : Dimensions.get('screen').height - 70
export default class SearchEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude:this.props.location.lat,
            longitude:this.props.location.long,
            relatedEvents: this.props.searchData ,
            height: Platform.OS == 'ios' ? Dimensions.get('screen').height / 2.2 : Dimensions.get('screen').height / 2.4,
            swipe: 'SWIPE_DOWN',
            modalVisible: false,
            cardImg: [
                {
                    image: require('../../../../assets/images/location_5.jpg')
                },
                {
                    image: require('../../../../assets/images/location_2.jpg')
                },
                {
                    image: require('../../../../assets/images/location_3.jpg')
                },
                {
                    image: require('../../../../assets/images/location_4.jpg')
                },
                {
                    image: require('../../../../assets/images/event_3.jpg')
                },
            ],
            review: [
                {
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales lorem ipsum dolor sit amet, consectetur adipiscing elit. sodales lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    name: 'Abagail libbie',
                    star_img: require('../../../../assets/images/star.png'),
                    rating: '4.9',
                    view: '(48)',
                },
                {
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    name: 'Harsha Buksh',
                    star_img: require('../../../../assets/images/star.png'),
                    rating: '4.9',
                    view: '(48)',
                },
                {
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    name: 'Em Assinder',
                    star_img: require('../../../../assets/images/star.png'),
                    rating: '4.9',
                    view: '(48)',
                }
            ],
            details:'',
            data:'',
            openingHours:''
        }
    }
    componentWillMount(){
        
    }
    _placeDetails(id,data){
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=name,rating,formatted_phone_number,opening_hours,website,reviews,formatted_address,photos&key=AIzaSyAkZM7082Byir8GLAEmrYZLr34bP5hQ19Q`)
        .then((res)=>res.json())
        .then((result)=>{
            console.log('Details Result',result)
            if(result.result){
                var images = []
                result.result.photos.map((item,index)=>{
                    var image = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=AIzaSyAkZM7082Byir8GLAEmrYZLr34bP5hQ19Q`
                    images.push(image)
                })
                var details = result.result
                details.photos = images
                console.log('Details',details,data)
                var openingHours = details.opening_hours.weekday_text
                var openingHoursData = openingHours.map((item)=>item.split(': '))
                console.log('OPeningHours Data',openingHoursData)
                this.setState({details:details,data:data,modalVisible:!this.state.modalVisible,openingHours:openingHoursData})
            }
        })
    }
    _select(){
        var serachData = this.state.data
        serachData.place_images=this.state.details.photos
        this.setState({ modalVisible: false })
        Actions.SetEvent({serachData:this.state.data})
    }
    _cardInfo() {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setState({modalVisible:!this.state.modalVisible})
                }}>
                <SafeAreaView style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', }}>
                    {/* <StatusBar backgroundColor='red' barStyle="dark-content" /> */}
                    <View style={{ width: '100%', alignSelf: 'center', height: height, backgroundColor: 'white', position: 'absolute', bottom: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: 'hidden' }}>
                        <View style={{ height: 5, width: 80, backgroundColor: '#e5e4ea', alignSelf: 'center', marginTop: 10, borderRadius: 50 }}></View>
                        <View style={[styles.searchView, { paddingHorizontal: 20 }]}>
                            <TouchableOpacity style={[styles.backView, { alignItems: 'flex-start' }]} onPress={() => {this.setState({modalVisible:!this.state.modalVisible}) }}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                            </TouchableOpacity>
                            <View>
                            </View>
                            <TouchableOpacity 
                            onPress={()=>this._select()}
                            style={[styles.buttoncontainer]}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: RF(2.0), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Select</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        {this._cardImage()}

                        <ScrollView
                            contentContainerStyle={{ paddingHorizontal: 20, width: '100%', paddingBottom: '5%' }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.relatedEventsDetailsView}>
                                <View style={{ width: '100%' }}>
                                    <View style={styles.relatedEventsCategoryView}>
                                        <Text style={[styles.relatedEventsCategoryText, { color: 'rgb(239,113,184)' }]}>{this.state.data.category}</Text>
                                    </View>
                                    <View style={{ width: '90%', flexDirection: 'row', paddingTop: 5 }}>
                                        <Text style={styles.relatedEventsTitle}>{this.state.data.id}{this.state.data.title}</Text>
                                    </View>
                                </View>
                                <View style={styles.relatedEventsHandlerView}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                        <Image source={require('../../../../assets/images/star.png')} style={{ height: 16, width: 16 }} />
                                        <Text style={{ marginLeft: 3, color: 'black', fontSize: RF(2), }}>{this.state.data.rating}</Text>
                                        <Text style={{ marginLeft: 5, color: 'black', fontSize: RF(2) }}>({this.state.data.view})</Text>
                                    </View>
                                </View>
                            </View>

                            {/* <View style={{ marginVertical: 25, width: '100%' }}>
                                <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>About</Text>
                                <View style={{ marginTop: 7, width: '100%' }}>
                                    <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </Text>
                                </View>
                            </View> */}

                            <View style={{ width: '100%', marginVertical: 25 }}>
                                <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>Opening hours</Text>
                                <View style={{ marginTop: 7, width: '100%' }}>
                                   {this.state.openingHours ? this.state.openingHours.map((item,index)=>
                                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>
                                                {item[0]}
                                            </Text>
                                            <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>{item[1]}</Text>
                                        </View>
                                    ) : null }
                                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>
                                            Sunday
                                        </Text>
                                        <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Closed</Text>
                                    </View> */}
                                </View>
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>Address</Text>
                                <View style={{ marginTop: 7, width: '50%' }}>
                                    <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>
                                        {this.state.data.address}
                                    </Text>
                                    {/* <Text style={{ marginTop: 5, fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>
                                        75009 Paris, France
                                    </Text> */}
                                </View>
                            </View>

                            <View style={{marginVertical:25, width: '100%' }}>
                                <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>Telephone</Text>
                                <View style={{ marginTop: 7, width: '100%' }}>
                                    <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>
                                        {this.state.details.formatted_phone_number}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>Website</Text>
                                <View style={{ marginTop: 7, width: '100%' }}>
                                    <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>
                                        {this.state.details.website}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ width: '100%',marginVertical:25 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>
                                        Reviews
                                    </Text>
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: RF(2.1), color: '#9c60e9', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>Open Google Reviews</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 7, width: '100%' }}>
                                    {this._reviews()}
                                </View>
                            </View>

                        </ScrollView>

                    </View>
                </SafeAreaView>
            </Modal>
        )
    }

    _reviews() {
        return (
            <View style={{ width: '100%' }}>
                <FlatList
                    contentContainerStyle={{ paddingVertical: 10 }}
                    showsVerticalScrollIndicator={false}
                    data={this.state.details.reviews}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={{ width: '100%' }}>
                            <View style={[styles.relatedEventsCardView, { backgroundColor: '#f3f3f5', marginVertical: 7 }]}>
                                <View style={{ width: '100%', paddingHorizontal: 15, paddingBottom: 5 }}>
                                    <View style={{ paddingVertical: 10, width: '90%' }}>
                                        <Text numberOfLines={3} style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>{item.text}</Text>
                                    </View>
                                    <View style={{ paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: RF(2.1), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>{item.author_name}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '20%' }}>
                                            <Image source={require('../../../../assets/images/star.png')} style={{ height: 16, width: 16 }} />
                                            <Text style={{ marginLeft: 3, color: 'black', fontSize: RF(2), }}>{item.rating}</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                    }
                />
            </View>
        )
    }

    _cardImage() {
        return (
            <View style={{ width: '100%' }}>
                <FlatList
                    horizontal
                    removeClippedSubviews={true}
                    contentContainerStyle={{ paddingVertical: 15, paddingLeft: 20 }}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.details.photos}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingRight: 10 }}>
                            <Image resizeMode='cover' source={{uri:item}} style={{ height: 150, width: 200, borderRadius: 15 }} />
                        </View>
                    }
                />
            </View>
        )
    }

    _fullView() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        return (
            <View style={{ width: '100%', }}>
                <FlatList
                    horizontal={false}
                    removeClippedSubviews={true}
                    contentContainerStyle={{ paddingLeft: 20, paddingTop: 10, paddingBottom: '10%' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={this.state.relatedEvents}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={styles.relatedEventsMainView}>
                            <TouchableHighlight style={[styles.relatedEventsCardView, { backgroundColor: 'white' }]} onPress={() => { this._placeDetails(item.placeId,item) }} >
                                <View style={[styles.relatedEventsCardView, { backgroundColor: 'white' }]}>
                                    <View style={{ width: '35%' }}>
                                        <Image resizeMode='cover' source={{uri:item.image}} style={{ height: 100, width: '100%' }} />
                                    </View>
                                    <View style={[styles.relatedEventsDetailsView, { paddingHorizontal: 8 }]}>
                                        <View style={{ width: '100%' }}>
                                            <View style={styles.relatedEventsCategoryView}>
                                                <Text style={[styles.relatedEventsCategoryText, { color: item.titleColor }]}>{item.category.toLocaleUpperCase()}</Text>
                                            </View>
                                            <View style={{ width: '90%', flexDirection: 'row', paddingTop: 5 }}>
                                                <Text style={styles.relatedEventsTitle}>{item.id}</Text>
                                                <Text numberOfLines={1} style={styles.relatedEventsSubtitle}>{item.title}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.relatedEventsHandlerView}>
                                        {item.rating ? <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                                <Image source={item.star_img} style={{ height: 16, width: 16 }} />
                                                <Text style={{ marginLeft: 3, color: 'black', fontSize: RF(2), }}>{item.rating}</Text>
                                                { item.view  ? <Text style={{ marginLeft: 5, color: 'black', fontSize: RF(2) }}>{`(${item.view})`}</Text> : null}
                                            </View> : null }
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    }
                />
            </View>
        )
    }


    _relatedEvents() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        return (
            <View style={{ width: '100%',alignItems:'center'}}>
                <FlatList
                    horizontal={false}
                    scrollEnabled={false}
                    contentContainerStyle={{paddingTop: 10,alignItems:'center'}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={this.state.relatedEvents}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={styles.relatedEventsMainView}>
                            <TouchableHighlight style={[styles.relatedEventsCardView, { backgroundColor: 'white' }]} onPress={() => { this._placeDetails(item.placeId,item) }} >
                                <View style={[styles.relatedEventsCardView, { backgroundColor: 'white' }]}>
                                    <View style={{ width: '35%' }}>
                                        <Image resizeMode='cover' source={{uri:item.image}} style={{ height: 100, width: '100%' }} />
                                    </View>
                                    <View style={[styles.relatedEventsDetailsView, { paddingHorizontal: 8 }]}>
                                        <View style={{ width: '100%' }}>
                                            <View style={styles.relatedEventsCategoryView}>
                                                <Text style={[styles.relatedEventsCategoryText, { color: item.titleColor }]}>{item.category.toLocaleUpperCase()}</Text>
                                            </View>
                                            <View style={{ width: '90%', flexDirection: 'row', paddingTop: 5 }}>
                                                <Text style={styles.relatedEventsTitle}>{item.id}</Text>
                                                <Text style={styles.relatedEventsSubtitle}>{item.title}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.relatedEventsHandlerView}>
                                           {item.rating ? <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                                <Image source={item.star_img} style={{ height: 16, width: 16 }} />
                                                <Text style={{ marginLeft: 3, color: 'black', fontSize: RF(2), }}>{item.rating}</Text>
                                                { item.view  ? <Text style={{ marginLeft: 5, color: 'black', fontSize: RF(2) }}>{`(${item.view})`}</Text> : null}
                                            </View> : null }
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    }
                />
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
        const { SWIPE_UP, SWIPE_DOWN } = swipeDirections;
        console.log("gestureName : ", gestureName)
        console.log("gestureState : ", gestureState)
        switch (gestureName) {
            case SWIPE_UP:
                this.setState({ height: Platform.OS == 'ios' ? Dimensions.get('screen').height - 45 : Dimensions.get('screen').height - 70, swipe: 'SWIPE_UP' });
                //this.setState({ height: Dimensions.get('screen').height - 80, swipe: 'SWIPE_UP' });
                break;
            case SWIPE_DOWN:
                this.setState({ height: Platform.OS == 'ios' ? Dimensions.get('screen').height / 2.2 : Dimensions.get('screen').height / 2.4, swipe: 'SWIPE_DOWN' });
                break;
        }
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 50
        };
        return (
            <View style={[styles.container]}>
                <Header style={{ width: '100%', flexDirection: 'row', backgroundColor: this.state.swipe == 'SWIPE_DOWN' ? '#fff' : 'rgba(0,0,0,0.5)' }}>
                    <View style={styles.searchView}>
                        <TouchableOpacity style={[styles.backView, { alignItems: 'center' }]} onPress={() => Actions.pop()}>
                            <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                        </TouchableOpacity>
                        <View style={styles.searchinputcontainer}>
                            <Icon name='search1' type='AntDesign' style={{ color: '#a8a7b5', fontSize: 20 }} />
                            <TextInput
                                style={styles.text}
                                placeholder='Search'
                                placeholderTextColor='#a8a7b5'
                                autoCorrect={false}
                                keyboardType='default'
                                onChangeText={(text) => { this.setState({ search: text }) }}
                            />
                        </View>
                        <TouchableOpacity style={{ padding: 2 }} onPress={() => Actions.AddEventFilter()}><Image source={require('../../../../assets/images/filter.png')} style={{ height: 25, width: 25 }} /></TouchableOpacity>

                    </View>
                </Header>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />

                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                        flex: 1,
                        width: '100%'
                    }}
                    region={{
                        latitude:this.state.latitude,
                        longitude:this.state.longitude,
                        latitudeDelta: 0.0175,
                        longitudeDelta: 0.0225,
                    }}
                >
                    {this.state.relatedEvents.map((item,index)=>
                        <Marker
                        coordinate={{latitude: item.location.lat,longitude: item.location.lng,}}>
                            <ImageBackground source={require('../../../../assets/images/eventmarker.png')} style={{ height: 45, width: 43, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>{index+1}</Text>
                            </ImageBackground>
                        </Marker>
                    )}
                    {/* <Marker
                        coordinate={{
                            latitude: 44.163343829,
                            longitude: -77.379841188,
                        }}>
                        <ImageBackground source={require('../../../../assets/images/eventmarker.png')} style={{ height: 45, width: 43, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>2</Text>
                        </ImageBackground>
                    </Marker>
                    <Marker
                        coordinate={{
                            latitude: 44.160,
                            longitude: -77.38641188,
                        }}>
                        <ImageBackground source={require('../../../../assets/images/eventmarker.png')} style={{ height: 45, width: 43, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>3</Text>
                        </ImageBackground>
                    </Marker>
                    <Marker
                        coordinate={{
                            latitude: 44.1645,
                            longitude: -77.37641188,
                        }}>
                        <ImageBackground source={require('../../../../assets/images/eventmarker.png')} style={{ height: 45, width: 43, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>4</Text>
                        </ImageBackground>
                    </Marker>
                    <Marker
                        coordinate={{
                            latitude: 44.162,
                            longitude: -77.37801188,
                        }}>
                        <ImageBackground source={require('../../../../assets/images/eventmarker.png')} style={{ height: 45, width: 43, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>5</Text>
                        </ImageBackground>
                    </Marker> */}
                </MapView>

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
                        <View style={{ width: '100%', alignSelf: 'center', height: this.state.height, backgroundColor:'white', position: 'absolute', bottom: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: 'hidden',alignItems:'center' }}>
                            <View style={{ height: 5, width: 80, backgroundColor: '#e5e4ea', alignSelf: 'center', marginTop: 10, borderRadius: 50 }}></View>
                            {this.state.swipe == 'SWIPE_DOWN' ?
                                this._relatedEvents()
                                :
                                this._fullView()
                            }
                        </View>
                </GestureRecognizer>
                {this._cardInfo()}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    cartContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 12,
        elevation: 0.7,
        shadowOffset: { width: 1, height: 1, },
        shadowColor: 'gray',
        shadowOpacity: 0.1,
        width: '100%',
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        //padding: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    searchinputcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f3f5',
        height: 40,
        width: '75%',
        borderRadius: 12,
        paddingLeft: 10,
        // marginTop: 12
    },
    cartText: {
        fontSize: RF(2.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    },
    descText: {
        fontSize: RF(2.8),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        // height: 20,
        width: 80,
        // marginRight:10
        // borderRadius: 15,
    },
    relatedEventsMainView: {
        alignItems: 'center',
        width: '95%',
        marginVertical: 5,
        //marginRight: 20,
        elevation: 0.7,
        borderRadius: 15,
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    relatedEventsCardView: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 15,
    },
    relatedEventsCategoryView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    relatedEventsCategoryText: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontSize: RF(2.0),
    },
    relatedEventsTitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RF(2.5),
        color: 'black'
    },
    relatedEventsSubtitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RF(2.5),
        width: '95%',
        color: '#000',
        marginLeft: 3
        // marginVertical: 2
    },
    relatedEventsHandlerView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        //justifyContent: 'space-between', 
        paddingVertical: 5
    },
    relatedEventsDetailsView: {
        width: '65%',
        justifyContent: 'space-between',
    },
    text: {
        width: '85%',
        fontSize: RF(2.3),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        marginLeft: 5,
        color: '#000'
    },
    backView: {
        width: 30,
        height: 35,
        justifyContent: 'center',
    },


});
