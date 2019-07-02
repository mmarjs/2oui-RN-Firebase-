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
    TouchableOpacity, 
    Image,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Modal
} from 'react-native';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Button from '../../components/button'
import ImagePicker from 'react-native-image-crop-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default class CompleteYourProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            occupation: '',
            city:'',
            bio:'',
            profile:'',
            photoLoading:false,
            search:false
        }
        console.log('User Key',this.props.userId) 
    }
    openSearchModal() {
        // RNGooglePlaces.openAutocompleteModal()
        // .then((place) => {
        //     console.log(place);
        //     // place represents user's selection from the
        //     // suggestions and it is a simplified Google Place object.
        // })
        // .catch(error => console.log(error.message));  // error is a Javascript Error object
        
      }
     _addPhoto(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            //includeBase64: true
          }).then(image => {
            console.log(image);
            this.setState({profile:image.path})
      })
    }
    _completeProfile(){
        this.props.userData.profile=this.state.profile
        this.props.userData.occupation=this.state.occupation
        this.props.userData.city=this.state.city,
        this.props.userData.bio=this.state.bio
        console.log("data : ",this.props.userData)
        Actions.Gender({userData:this.props.userData})    
    }
    render() {
       console.log('image',this.state.profile)
       if(this.state.search){
        return(
            <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
            <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'google'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              console.log(data, details);
              this.setState({search:false,city:details.name})
             
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
                width: '100%'
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
            renderLeftButton={()  =>  <TouchableOpacity style={styles.backView} onPress={()=>this.setState({search:false})}>
            <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
          </TouchableOpacity>        }
            //renderRightButton={() => <Text>Custom text after the input</Text>}
          /></SafeAreaView>)
       }
       else{
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                <TouchableOpacity style={[styles.backView,{marginHorizontal:10}]}
                        onPress={() => Actions.pop()}>
                        <Icon name='angle-left' type='FontAwesome' style={{ color: '#9c53e4', fontSize: 35 }} />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{paddingBottom:Platform.OS == 'ios' ? '40%' : '5%'}}>
                <KeyboardAvoidingView  behavior={Platform.OS == 'ios' ? 'padding' : null}>
                <View style={{ width: '100%', paddingHorizontal: 20, alignItems:'center'}}>
                    
                    <View style={{ marginTop: '10%', marginBottom: '5%', width: '100%', }}>
                        <Text style={styles.forgotText}>Complete your profile</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this._addPhoto()} style={{alignItems:'center',width:'30%'}}>
                    {   this.state.photoLoading?<View style={{height:60,width:60,borderRadius:30,justifyContent:'center'}}><ActivityIndicator size='large' color='#9c53e4'/></View>:
                       <Image source={this.state.profile ? {uri:this.state.profile} : require('../../assets/images/defaultProfile.png')} style={{height:60,width:60,borderRadius:30}} />}
                        {/* <Image source={{ uri: this.state.image }} style={{height:200,width:200}} /> */}
                        <Text style={{color:"#9c53e4",fontSize:16,marginVertical:8}}>{this.state.profile ? 'Edit' : 'Add photo'}</Text>
                    </TouchableOpacity>
                    <View style={styles.textinputcontainer}>
                        <TextInput
                            style={styles.text}
                            placeholder='Occupation'
                            placeholderTextColor='rgba(0,0,0,0.5)'
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={this.state.occupation}
                            autoFocus={true}
                            returnKeyType = {"next"}
                            onSubmitEditing={() => this.city.focus()}
                            onChangeText={(text) => { this.setState({ occupation: text }) }}
                        />
                    </View>
                    <View style={styles.textinputcontainer}>
                        <TextInput
                            style={styles.text}
                            placeholder='City'
                            //onFocus={()=>this.setState({search:true})}
                            placeholderTextColor='rgba(0,0,0,0.5)'
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={this.state.city}
                            ref={(ref) => {this.city = ref;}}
                            returnKeyType = {"next"}
                            onSubmitEditing={() => this.bio.focus()}
                            onChangeText={(text) => { this.setState({ city: text }) }}
                        />
                    </View>
                    <View style={styles.textinputcontainer}>
                        <TextInput
                            style={styles.text}
                            placeholder='Bio'
                            multiline={true}
                            placeholderTextColor='rgba(0,0,0,0.5)'
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={this.state.bio}
                            ref={(ref) => {this.bio = ref;}}
                            onChangeText={(text) => { this.setState({ bio: text }) }}
                        />
                    </View>
                </View>
                </KeyboardAvoidingView>
                </ScrollView>
                <View style={styles.buttonView}>
                    <Button buttonText='Continue' 
                    onClick={()=>this._completeProfile()}
                    disabled={this.state.occupation && this.state.city && this.state.bio && this.state.profile ? false : true} colors={this.state.occupation && this.state.city && this.state.bio && this.state.profile ? ['#a65ae1', '#8a4cea'] : ['#e3cdf8', '#e3cdf8']} style={styles.buttoncontainer} />
                </View>
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
    subContainerView: {
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        alignItems:'center',
        justifyContent:'center'
    },
    forgotText: {
        height: 40,
        fontSize: 25,
        color: '#000',
        textAlign: 'center',
        fontFamily:Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
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
        justifyContent: 'center',
        backgroundColor: '#f2f3f5',
        //height: 50,
        width: '100%',
        borderRadius: 12,
        paddingLeft: 15,
        marginTop: 12
    },
    text: {
        fontSize: 15,
        color: '(rgba(0,0,0,0.5))',
        height:50,
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
    }
});
