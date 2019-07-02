import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TextInput,
    TouchableOpacity, FlatList,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Modal
} from 'react-native';
import { Icon, CheckBox } from 'native-base'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import RF from "react-native-responsive-fontsize"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { DatePicker } from 'react-native-wheel-datepicker';
import firebase from '../../../components/Firebase';
import RNfirebase from 'react-native-firebase';
import MessageBar from '../../../components/messageBar'
var moment = require('moment');
var images = []
export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.value,
            occupation: '',
            name: '',
            location: '',
            birthday: new Date(),
            bio: '',
            profile: '',
            editabout: 0,
            editImage: '',
            aboutImages:[],
            aboutImages1: '',
            aboutImages2: '',
            aboutImages3: '',
            photoLoading: false,
            search: false,
            clickbirth: false,
            birthtext: false,
            msg:'',
            success:'',
            error:'',
            profileUpdate:false,
            aboutImagesUpdate1:false,
            aboutImagesUpdate2:false,
            aboutImagesUpdate3:false,
        }

    }
    componentDidMount(){
        
        console.log('user Data : ',this.props.userData)
        var user=this.props.userData
        var aboutImagesData=[]
        if(user.aboutImages1){
            aboutImagesData.push({image:user.aboutImages1,update:false})
        }
        if(user.aboutImages2){
            aboutImagesData.push({image:user.aboutImages2,update:false})
        }
        if(user.aboutImages3){
            aboutImagesData.push({image:user.aboutImages3,update:false})
        }
      
        this.setState({
            occupation: user.occupation,
            name:user.name,
            location:user.city,
            birthday:user.birthday?user.birthday: new Date(),
            birthtext: user.birthday?true:false,
            bio:user.bio,
            profile:user.profile,
            aboutImages1:user.aboutImages1,
            aboutImages2:user.aboutImages2,
            aboutImages3:user.aboutImages3,
            aboutImages: aboutImagesData.length>0?aboutImagesData:[],
            selected:user.imSearchingFor?user.imSearchingFor:''
        })
    }
    _selectBirthday(birthday) {
        var BirthDay = birthday
        this.setState({ birthday: BirthDay.toDateString() })
        //this.setState({clickbirth:false})
    }

    _addPhoto(value, index) {
        // var images = []
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            //includeBase64: true
        }).then(image => {
            console.log(image);
            if (value === 'profile') {
                this.setState({ profile: image.path,profileUpdate:true })
            }
            if (value === 'edit') {
                this.setState(state => (this.state.aboutImages[index] = {image:image.path,update:true}, state))
            }
                    this.setState({aboutImages1:image.path,aboutImagesUpdate1:true})
            if (value === 'about') {
                if(this.state.aboutImages.length==0){
                    this.setState({aboutImages1:image.path,aboutImagesUpdate1:true})
                }
                else if(this.state.aboutImages.length==1){
                   this.setState({aboutImages2:image.path,aboutImagesUpdate2:true})
                } 
                else if(this.state.aboutImages.length==2){
                    this.setState({aboutImages3:image.path,aboutImagesUpdate3:true})
                } 
                var images=this.state.aboutImages
                images.push({image:image.path,update:true})
                this.setState({ aboutImages: images })
                console.log('add===', images)
            }
        })
    }
    _inputBox(name, onChange, value,mline, ) {
        return (
            <View style={styles.textinputcontainer}>
                <View style={{ width: '30%', }}>
                    <Text style={{ fontSize: RF(2), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>{name}</Text>
                </View>
                <View style={{ width: '70%', }}>
                    <TextInput
                        style={styles.text}
                        placeholder={name}
                        multiline={mline}
                        placeholderTextColor='rgba(0,0,0,0.5)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={value}
                        keyboardType='email-address'
                        // autoFocus={true}
                        // returnKeyType={"next"}
                        //  onSubmitEditing={() => this.city.focus()}
                        onChangeText={onChange}
                    />
                </View>
            </View>
        )
    }
    _showView(view) {
        return (
            <View style={{ flexDirection: 'row', }}>
                {view.map((index) =>
                    <View style={styles.imageViewContainer}>
                    </View>
                )}
            </View>
        )
    }
    _about() {
       console.log("about image : ",this.state.aboutImages)
        return (
            <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#f2f3f5', marginTop: 20, paddingVertical: 10 }}>
                <Text style={{ paddingHorizontal: 20, fontSize: RF(2.8), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>About</Text>
                <View style={{ marginTop: 15, flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
                        <FlatList
                            horizontal={true}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            data={this.state.aboutImages}
                            extraData={this.state}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() => { this._addPhoto('edit', index) }} style={{ alignItems: 'center', marginRight: 15 }}>
                                    <View style={styles.addImageContainer}>
                                        <Image source={{ uri: item.image }} style={{ height: 60, width: 60, borderRadius: 15 }} />
                                    </View>
                                    <Text style={{ color: "#9c53e4", fontSize: RF(2), marginVertical: 8 }}>Edit</Text>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item,index)=>index.toString()}
                        />

                        {this.state.aboutImages.length >= 3 ? null
                            :
                            <TouchableOpacity onPress={() => this._addPhoto('about',this.state.aboutImages.length)} style={{ alignItems: 'center', marginRight: 15, }}>
                                <View style={styles.addImageContainer}>
                                    <Image source={require('../../../assets/images/addimage.png')} style={{ height: 20, width: 25, }} />
                                </View>
                                <Text style={{ color: "#9c53e4", fontSize: RF(2), marginVertical: 8 }}>Add</Text>
                            </TouchableOpacity>

                        }
                        {this.state.aboutImages.length == 0 ?
                            this._showView([1, 2])
                            :
                            this.state.aboutImages.length == 1 ?
                                this._showView([1])
                                :
                                null
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }

    _renderList(title) {
        return (
            <TouchableOpacity onPress={() => this.setState({ selected: title })} style={styles.searchContainer}>
                <View style={styles.searchView}>
                    <Text style={styles.searchText}>{title}</Text>
                    <View style={{ right: 10, }}>
                        <CheckBox onPress={()=>this.setState({ selected: title })} color='#8a4cea' checked={this.state.selected == title ? true : false} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    searchFor() {
        return (
            <View style={{ width: '100%', marginTop: 20, paddingVertical: 10 }}>
                <Text style={{ paddingHorizontal: 20, paddingBottom: 10, fontSize: RF(2.8), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>I'm searching for</Text>
                {this._renderList('Love')}
                {this._renderList('Friends')}
                {this._renderList('Both')}
            </View>
        )
    }
    _uploadImage (image,userProfile,photo) {
        var aboutImages=[]
        var userId=this.props.userData.userId
        const ext = image.split('.').pop(); // Extract image extension
        const filename = `${Date.now()}.${ext}`; // Generate unique name
        this.setState({ uploading: true });
       return RNfirebase
          .storage()
          .ref(`images/${filename}`)
          .putFile(image).then(res=>{
            if(userProfile){
                         user = firebase.database().ref().child('Users/'+userId).update({profile:res.downloadURL})
                     }
                     else{ 
                            if(photo==1){
                                user = firebase.database().ref().child('Users/'+userId).update({aboutImages1:res.downloadURL})
                                this.setState(state=>(this.state.aboutImages[0].image=res.downloadURL,state))
                            }
                            if(photo==2){
                                user = firebase.database().ref().child('Users/'+userId).update({aboutImages2:res.downloadURL})
                                this.setState(state=>(this.state.aboutImages[1].image=res.downloadURL,state))
                            }
                            if(photo==3){
                                user = firebase.database().ref().child('Users/'+userId).update({aboutImages3:res.downloadURL})
                                this.setState(state=>(this.state.aboutImages[2].image=res.downloadURL,state))
                            }
                           
                     }    
          })
      };
      _done(){
        var userId=this.props.userData.userId
        // this.props._pageNavigate(4, 'view', this.props.userData)
        let {occupation,name,location,birthday,bio,profile,aboutImages,selected,
            profileUpdate,aboutImages1,aboutImages2,aboutImages3,
            aboutImagesUpdate1,aboutImagesUpdate2,aboutImagesUpdate3
          }=this.state
             console.log("this state : ",this.state)
             console.log('user Id : ',userId)
             user = firebase.database().ref().child('Users/'+userId).update({
                bio:bio,
                birthday:birthday,
                city: location,
                name: name,
                occupation: occupation,
                imSearchingFor:selected
             },(error)=>{console.log("error : ",error)})
             if(profileUpdate)
             this._uploadImage(profile,true)

             if(aboutImages.length>0){
                if(aboutImages[0].update){
                    setTimeout(()=>{
                        this._uploadImage(aboutImages[0].image,false,1)
                    },1000)
                   
                }
                if(aboutImages[1].update){
                    setTimeout(()=>{
                    this._uploadImage(aboutImages[1].image,false,2)
                },2000)
                }
                if(aboutImages[2].update){
                    setTimeout(()=>{
                    this._uploadImage(aboutImages[2].image,false,3)
                },3000)
                }
             }
              this.props._pageNavigate(4, 'view', this.props.userData)
           
     }
    render() {
        console.log('about o=image : ',this.state.aboutImages)
        if (this.state.search) {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                    <GooglePlacesAutocomplete
                        placeholder='Search your location'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'google'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                            this.setState({ search: false, location: details.name })

                        }}
                        getDefaultValue={() => ''}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyAkZM7082Byir8GLAEmrYZLr34bP5hQ19Q',
                            language: 'en', // language of the results
                            types: '(cities)' // default: 'geocode'
                        }}
                        styles={{
                            textInputContainer: {
                                backgroundColor: '#fff',
                                width: '100%',
                                borderColor: '#f2f3f5',
                                borderBottomWidth: 0.5,
                                borderTopWidth: 0
                            },
                            textInput: {
                                backgroundColor: '#f2f3f5',
                                marginLeft: 20,
                                marginRight: 0,
                                // height: 38,
                                //   color: '#5d5d5d',
                                fontSize: RF(2)
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            }
                        }}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            type: 'cafe'
                        }}
                        GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'formatted_address',
                        }}
                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        // predefinedPlaces={[homePlace, workPlace]}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        // renderLeftButton={() => <TouchableOpacity style={styles.backView} onPress={() => this.setState({ search: false })}>
                        //     <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                        // </TouchableOpacity>}
                        renderRightButton={() => <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ search: false })}>
                            <Text style={{ fontSize: RF(2) }}>Cancel</Text>
                        </TouchableOpacity>}
                    /></SafeAreaView>)
        }
        else {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                    <View style={styles.headerView}>
                        <TouchableOpacity style={styles.backView}
                            onPress={() => this.props._pageNavigate(4, 'view', this.props.userData)}>
                            <Text style={{ color: '#9246e6', fontSize: RF(2.2), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Cancel</Text>
                        </TouchableOpacity>
                        <View style={{ width: '70%', alignItems: 'center', paddingRight: '10%' }}>
                            <Text style={{ fontSize: RF(2.2), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#000' }}>Edit Profile</Text>
                        </View>
                        <TouchableOpacity style={[styles.backView, { width: '150%' }]}
                            onPress={() =>this._done()}>
                            <Text style={{ color: 'grey', fontSize: RF(2.2), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Done</Text>
                        </TouchableOpacity>
                    </View>
            
                    <ScrollView contentContainerStyle={{ paddingBottom: '5%' }}>
                    {/* <KeyboardAvoidingView style={{ width: '100%', alignItems: 'center', }} behavior={Platform.OS == 'ios' ? 'padding' : null}> */}
                        {/* <View style={{ width: '100%', flex: 1, alignItems: 'center', }}> */}

                            <View style={{ width: '100%', alignItems: 'center', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#f2f3f5', paddingVertical: 18 }}>
                                <TouchableOpacity onPress={() => this._addPhoto('profile')} style={{ alignItems: 'center', width: '30%' }}>
                                    {this.state.photoLoading ? <View style={{ height: 60, width: 60, borderRadius: 30, justifyContent: 'center' }}><ActivityIndicator size='large' color='#9c53e4' /></View> :
                                        <Image source={this.state.profile ? { uri: this.state.profile } : require('../../../assets/images/defaultProfile.png')} style={{ height: 60, width: 60, borderRadius: 30 }} />}
                                    {/* <Image source={{ uri: this.state.image }} style={{height:200,width:200}} /> */}
                                    <Text style={{ color: "#9c53e4", fontSize: RF(2), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', marginVertical: 8 }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            {this._inputBox('Name', (text) => { this.setState({ name: text }) },this.state.name, false)}
                            {this._inputBox('Occupation', (text) => { this.setState({ occupation: text }) },this.state.occupation, false)}

                            {this._about()}

                            <View style={[styles.textinputcontainer, { paddingVertical: 15 }]}>
                                <View style={{ width: '30%' }}>
                                    <Text style={{ fontSize: RF(2), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>Birthday</Text>
                                </View>
                                <View>
                                    <Text onPress={() => { this.setState({ clickbirth: true, birthtext: true }) }}>
                                        {this.state.birthtext == false ? 'Birthday' : moment(this.state.birthday).format('DD MMMM YYYY')}
                                    </Text>

                                </View>
                            </View>
                            {this.state.clickbirth == true ?
                                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#f2f3f5', }}>
                                    <DatePicker
                                        textSize={18}
                                        date={new Date(this.state.birthday)}
                                        mode="date"
                                        onDateChange={date => this._selectBirthday(date)}
                                        style={{ width: '70%', alignSelf: 'center', backgroundColor: 'transparent' }}
                                    />
                                </View>
                                : null}

                            <View style={styles.textinputcontainer}>
                                <View style={{ width: '30%' }}>
                                    <Text style={{ fontSize: RF(2), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>Location</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.text}
                                        placeholder='Location'
                                        onFocus={() => this.setState({ search: true, clickbirth: false })}
                                        placeholderTextColor='rgba(0,0,0,0.5)'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        value={this.state.location}
                                        keyboardType='email-address'
                                        //  autoFocus={true}
                                        //  returnKeyType={"next"}
                                        // onSubmitEditing={() => this.city.focus()}
                                        onChangeText={(text) => { this.setState({ location: text }) }}
                                    />
                                </View>
                            </View>

                            {/* {this._inputBox('Location',(text)=>{this.setState({location:text})},false,()=>this.setState({search:true}) )} */}
                            {this._inputBox('Bio', (text) => { this.setState({ bio: text }) },this.state.bio, true)}
                            {this.searchFor()}
                        {/* </View> */}
                        {/* </KeyboardAvoidingView> */}
                        <MessageBar success={this.state.success} ref={ref => this.messagebar = ref} error={this.state.msg} />
                    </ScrollView>
                
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //height:Dimensions.get('window').height,
        backgroundColor: '#fff',
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        backgroundColor:'#fff',
        paddingVertical: 15,
        alignSelf: 'center',
        alignItems: 'center'
    },
    backView: {
        // backgroundColor:'red',
        width: '20%',
        alignItems: 'flex-start',
    },
    subContainerView: {
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
    },

    forgotText: {
        height: 40,
        fontSize: 25,
        color: '#000',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    },
    descText: {
        // height: 40, 
        fontSize: 15,
        width: '90%',
        // fontWeight: '400', 
        color: '#000',
        textAlign: 'center',
    },
    textinputcontainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: Platform.OS == 'ios' ? 15 : 0,
        borderColor: '#f2f3f5'
    },
    addImageContainer: {
        height: 60,
        width: 60,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f3f5'
    },
    imageViewContainer: {
        height: 60,
        width: 60,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#f2f3f5',
        marginRight: 15,
        borderWidth: 1
    },
    text: {
        fontSize: RF(2),
        color: '#a8a7b5',

    },
    buttonView: {
        // bottom:0,
        // position:'absolute',
        width: '100%',
        height: 80,
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
    buttonText: {
        fontSize: 16,
        color: '#fff'
    },
    searchText: {
        fontSize: RF(2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000'
    },
    searchView: {
        width: '90%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    searchContainer: {
        borderBottomWidth: 1,
        borderColor: '#f2f3f5'
    }
});
