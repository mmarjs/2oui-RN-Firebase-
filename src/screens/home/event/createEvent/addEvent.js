import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity,
    Image, SectionList,TextInput
} from 'react-native';
import RF from "react-native-responsive-fontsize";
import { Header, Icon, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class AddEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude:'',
            longitude:'',
            categories: [
                {
                    title: 'Food',
                    data: [
                        {
                            name: 'Restaurants',
                            image: require('../../../../assets/images/restaurant.png'),
                            checked: true,
                            value:'restaurant'
                        },
                        {
                            name: 'Bars',
                            image: require('../../../../assets/images/glass.png'),
                            checked: false,
                            value:'bat'

                        },
                        {
                            name: 'Cafes',
                            image: require('../../../../assets/images/cafe.png'),
                            checked: false,
                            value:'cafe'
                        },
                    ]
                },
                {
                    title: 'Hobbies',
                    data: [
                        {
                            name: 'Night life',
                            image: require('../../../../assets/images/night_life.png'),
                            checked: false,
                            value:'night life'
                        },
                        {
                            name: 'Attractions',
                            image: require('../../../../assets/images/attraction.png'),
                            checked: false,
                            value:'attraction'

                        },
                        {
                            name: 'Movies',
                            image: require('../../../../assets/images/movie.png'),
                            checked: true,
                            value:'multiplex'
                        },
                        {
                            name: 'Art',
                            image: require('../../../../assets/images/art.png'),
                            checked: true,
                            value:'art'
                        },
                        {
                            name: 'Science',
                            image: require('../../../../assets/images/science.png'),
                            checked: false,
                            value:'science'
                        },
                        {
                            name: 'Sport',
                            image: require('../../../../assets/images/sport.png'),
                            checked: false,
                            value:'sport'
                        },
                    ]
                },
                {
                    title: 'Others',
                    data: [
                        {
                            name: 'Travel',
                            image: require('../../../../assets/images/travel.png'),
                            checked: true,
                            value:'travel'
                        },
                        {
                            name: 'Health',
                            image: require('../../../../assets/images/health.png'),
                            checked: false,
                            value:'health'
                        },
                        {
                            name: 'Shopping',
                            image: require('../../../../assets/images/shopping.png'),
                            checked: false,
                            value:'shopping'
                        },
                    ]
                },

            ]

        }
    }
    _search(search){
        navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude})
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=1000&types=${search}&key=AIzaSyAkZM7082Byir8GLAEmrYZLr34bP5hQ19Q`)
            .then((res)=>res.json())
            .then((result)=>{
                console.log('Places Result',result)
                if(result.results.length > 0){
                    var data = []
                    result.results.map((item,index)=>{
                        if(item.types.includes(search)){
                            console.log('Item',item.types[0])
                        var image = item.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=AIzaSyAkZM7082Byir8GLAEmrYZLr34bP5hQ19Q` : 'https://firebasestorage.googleapis.com/v0/b/new-2oui.appspot.com/o/images%2F1558429895907.jpg?alt=media&token=7149ed83-1841-44fd-a0e0-7311d0d28366'
                        var data1 = {
                            location:item.geometry.location,
                            placeId:item.place_id,
                            image:image,
                            title:item.name,
                            address:item.vicinity,
                            star_img: require('../../../../assets/images/star.png'),
                            rating:item.rating,
                            view:item.user_ratings_total,
                            id: (index+1)+'.',
                            titleColor: 'rgb(239,113,184)',
                            category: search.toUpperCase(),
                        }
                        data.push(data1)
                        }
                        
                    })
                    console.log('data',data)
                    //this.setState({relatedEvents:data})
                    Actions.SearchEvent({searchData:data,location:{lat:this.state.latitude,long:this.state.longitude}})
                }

            })
        },
        err => console.log('Location error',err),
        ) 
    }
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />

                <View style={styles.subContainerView}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}>
                            <View style={{ alignSelf: 'flex-start' }}>
                                <TouchableOpacity style={styles.backView}
                                    onPress={() => Actions.pop()}>
                                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headerText}>Step 1 of 5</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '90%', alignSelf: 'center', marginTop: 10 }}>
                            <Text style={{ color: '#000', fontSize: RF(3.0), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Find a place</Text>
                        </View>
                        <View style={styles.searchinputcontainer}>
                            <Icon name='search1' type='AntDesign' style={{ color: '#a8a7b5', fontSize: 20 }} />
                             <TextInput
                                style={styles.text}
                                placeholder='Search'
                                placeholderTextColor='#a8a7b5'
                                autoCorrect={false}
                                keyboardType='default'
                            /> 
                        </View>
                    </View>

                    <View>
                        <SectionList
                            extraData={this.state}
                            contentContainerStyle={{ paddingBottom: '50%' }}
                            sections={this.state.categories}
                            stickySectionHeadersEnabled={false}
                            renderSectionHeader={({ section }) =>
                                <View style={{ padding: 25, width: '100%', }}>
                                    <Text style={styles.categoryText}>{section.title}</Text>
                                </View>
                            }
                            renderItem={({ item, index, section }) =>
                                <TouchableOpacity onPress={() => this._search(item.value) } style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                                    <View style={styles.cartcontainer}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ height: 50, width: 50, borderRadius: 18 }} source={item.image} />
                                            <Text style={styles.itemText}>{item.name}</Text>
                                        </View>
                                        <View style={{ right: 10, }}>
                                        <Icon name='angle-right' type='FontAwesome' style={{color:'grey', fontSize:25}} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }

                        />
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
        // alignItems: 'center',
        backgroundColor: '#FFF',
    },
    subContainerView: {
        flex: 1,
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
        // height: 40,
        fontSize: RF(2.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#afaebc',
        marginTop: 10,
        marginBottom: 5
    },
    clearText: {
        height: 40,
        fontSize: RF(2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#9246e6',
        marginTop: 18
    },
    categoryText: {
        fontSize: RF(2.3),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000'
    },
    itemText: {
        fontSize: RF(2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000',
        paddingLeft: 15
    },
    cartcontainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderBottomWidth:1,
        // borderColor:'#f2f3f5'
    },
    searchinputcontainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems:'center',
        backgroundColor: '#f2f3f5',
        height: 40,
        width: '90%',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginBottom:15
    },
    text: {
        width:'85%',
        height:40,
        fontSize: RF(2.3),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        marginLeft: 5,
        color: '#a8a7b5'
    },
});
