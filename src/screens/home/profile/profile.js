import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Animated,
    ActivityIndicator,
    AsyncStorage,
    TouchableOpacity, Image, FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import RF from "react-native-responsive-fontsize"
import firebase from '../../../components/Firebase';
import moment from 'moment'
var Data = ''
var chatref = ''
export default class profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            user: '',
            saved: false,
            following: false,
            edit: false,
            scrollY: new Animated.Value(0),
            relatedEvents: [
                {
                    image: require('../../../assets/images/event_6.jpg'),
                    category: 'Art',
                    title: 'Art Club: Introduction to Painting',
                    titleColor: 'rgb(239,113,184)',
                    date: '4 May',
                    time: '14:00 UTC+2',
                    eventManager: {
                        name: 'Izabella',
                        image: require('../../../assets/images/user_9.jpg')
                    },
                    price: '150$'
                },
                {
                    image: require('../../../assets/images/event_8.jpg'),
                    category: 'Travel',
                    title: 'Retreat in the clam mountains',
                    titleColor: 'rgb(108,171,247)',
                    date: '18 Feb',
                    time: '9:00 UTC+2',
                    eventManager: {
                        name: 'Izabella',
                        image: require('../../../assets/images/user_9.jpg')
                    },
                    price: '800$'
                }
            ],
            events:[],
        }

    }
    componentWillMount() {
        var events = []
        chatref = firebase.database().ref()
        AsyncStorage.getItem('userData').then(user => {
            user = JSON.parse(user)
            //console.log("user : ",user)
            if (user) {
                chatref.child('Users/' + user.userId)
                    .on('value', (snapshot) => {
                        console.log(snapshot.val());
                        if (snapshot.val()) {
                            var userData = snapshot.val()
                            userData.userId = snapshot.key
                            this.setState({ user: userData, loading: false })

                        }
                    })
                firebase.database().ref().child('Events').orderByChild('event_creater').equalTo(user.userId)
                .once('value',snap => {
                    snap.forEach((item)=>{
                        console.log('Snap',item.val())
                        events.push(item.val())
                    })
                    this.setState({events:events})
                })
                console.log('Events',events)
               
            }
            else {
                this.setState({ loading: false })
            }
        })
    }
    componentWillUnmount() {
        //chatref.off()
    }
    _profile(profileHeight, profileWidth, profileLeft) {
        return (
            <View style={styles.profileMainView}>
                <View style={styles.profileImageView}>
                    <Animated.Image source={{ uri: this.state.user.profile }} style={{ marginLeft: profileLeft, height: profileHeight, width: profileWidth, borderRadius: 30, }} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: RF(3), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#000' }}>{this.state.user.name}</Text>
                        <Text style={styles.aboutText}>{this.state.user.occupation}</Text>
                    </View>
                </View>
                <View style={[styles.profileImageView, { justifyContent: 'space-around' }]}>
                    <View style={{ paddingBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 25, width: 25 }} source={require('../../../assets/images/star.png')} />
                            <Text style={[styles.relatedEventsTitle, { color: '#9246e6' }]}>4.9</Text>
                        </View>
                        <Text style={styles.profileText}>Reviews</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props._pageNavigate(4, 'people', user)} >
                        <Text style={[styles.relatedEventsTitle, { textAlign: 'center', color: '#9246e6' }]}>4890</Text>
                        <Text style={styles.profileText}>Followers</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.relatedEventsTitle, { textAlign: 'center', color: '#9246e6' }]}>43</Text>
                        <Text style={styles.profileText}>Following</Text>
                    </View>
                </View>
            </View>
        )
    }
    setFollow(visible) {
        this.setState({ following: visible });
    }
    setSave(save) {
        this.setState({ saved: save });
    }
    // _inviteButton(){
    //     return(
    //         <View style={styles.inviteMainView}>
    //             <View style={styles.inviteSubView}>
    //                 <TouchableOpacity style={{ alignItems: 'center',width:'25%' }}
    //                 onPress={() => { this.setFollow(!this.state.following) }}>
    //                     <Image style={{ height: 50, width: 50, }} source={this.state.following ? require('../../../assets/images/following.png') : require('../../../assets/images/follow.png')} />
    //                     <Text style={[styles.inviteText,{color: this.state.following ? 'black' : '#8941e6',}]}>{this.state.following ? 'Following' : 'Follow'}</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={{ alignItems: 'center' ,width:'25%'}}
    //                 onPress={() => { this.setSave(!this.state.saved) }}>
    //                     <Image style={{ height: 50, width: 50, }} source={this.state.saved ?  require('../../../assets/images/saved_1.png') : require('../../../assets/images/save.png')} />
    //                     <Text style={[styles.inviteText,{color: this.state.saved ? 'black' : '#8941e6',}]}>Save</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={{ alignItems: 'center',width:'25%' }}>
    //                     <Image style={{ height: 50, width: 50, }} source={require('../../../assets/images/message.png')} />
    //                     <Text style={[styles.inviteText,{color: '#8941e6',}]}>Message</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity onPress={()=>Actions.Invite()} style={{ alignItems: 'center',width:'25%' }}>
    //                     <Image style={{ height: 50, width: 50, }} source={require('../../../assets/images/invite.png')} />
    //                     <Text style={[styles.inviteText,{color: '#8941e6',}]}>Invite</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     )
    // }
    _about() {
        return (
            <View style={{ width: '100%' }}>
                <View style={styles.aboutHeadingView}>
                    <Text style={styles.headingText}>About</Text>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '65%', alignItems: 'center', height: 215, justifyContent: 'center' }}>
                        {this.state.user.aboutImages1 ? <Image style={{ width: '100%', height: 215, borderRadius: 15 }} source={{ uri: this.state.user.aboutImages1 }} /> : <Text>No image available</Text>}
                    </View>
                    <View style={{ width: '35%', marginLeft: 10, justifyContent: 'space-between', justifyContent: 'center' }}>
                        {this.state.user.aboutImages2 ? <Image style={{ width: '100%', height: 100, borderRadius: 15, marginBottom: 15 }} source={{ uri: this.state.user.aboutImages2 }} /> : <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}><Text style={{ textAlign: 'center' }}>No image available</Text></View>}
                        {this.state.user.aboutImages3 ? <Image style={{ width: '100%', height: 100, borderRadius: 15 }} source={{ uri: this.state.user.aboutImages3 }} /> : <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}><Text style={{ textAlign: 'center' }}>No image available</Text></View>}
                    </View>
                </View>
                <View style={[styles.aboutDescView,{paddingHorizontal:5}]}>
                    <View style={{ flexDirection: 'row',alignItems:'center' }}>
                        <Image style={{ width: 14, height: 16, }} source={require('../../../assets/images/profile.png')} />
                        <Text style={[styles.aboutText, { paddingLeft: 10, }]}>  {moment().diff(this.state.user.birthday, 'years', false)} Yo</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 25,alignItems:'center' }}>
                        <Image style={{ width: 20, height: 20, }} source={require('../../../assets/images/pinpoint.png')} />
                        <Text style={[styles.aboutText, { paddingLeft: 10, }]}>{this.state.user.city}</Text>
                    </View>
                </View>
                <View style={{ width: '90%', alignSelf: 'center',paddingHorizontal:5 }}>
                    <Text style={styles.aboutText}>
                        {this.state.user.bio}
                    </Text>
                </View>
            </View>
        )
    }
    _relatedEvents() {
        console.log('EVENYS',this.state.events)
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        return (
            <View style={{ width: '100%' }}>
                <View style={{ width: '90%', alignSelf: 'center', paddingVertical: 20 }}>
                    <Text style={styles.headingText}>Events</Text>
                </View>
                <FlatList
                    data={this.state.events}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={styles.relatedEventsMainView}>
                            <View style={styles.relatedEventsCardView}>
                                <View style={{ width: '35%' }}>
                                    <Image source={{uri:item.event_image}} style={{ height: 125, width: '100%' }} />
                                </View>
                                <View style={styles.relatedEventsDetailsView}>
                                    <View style={{ width: '100%' }}>
                                        <View style={styles.relatedEventsCategoryView}>
                                            <Text style={[styles.relatedEventsCategoryText, { color: 'rgb(239,113,184)' }]}>{item.category}</Text>
                                            <Image source={require('../../../assets/images/saved.png')} style={{ height: 16, width: 18, tintColor: '#f05d87' }} />
                                        </View>
                                        <View style={{ width: '90%' }}>
                                            <Text style={styles.relatedEventsTitle}>{item.event_title}</Text>
                                            <Text style={styles.relatedEventsSubtitle}>{ moment(item.date).format('d MMM')}{dot}{item.event_start_time}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.relatedEventsHandlerView}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                                            <Image source={{uri:this.state.user.profile}} style={{ height: 25, width: 25, borderRadius: 12.5 }} />
                                            <Text style={{ marginLeft: 5, color: 'black', fontSize: RF(2), }}>{this.state.user.name}</Text>
                                        </View>
                                        <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', fontSize: RF(2) }}>{item.budget.value}{item.budget.currency}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>

        )
    }
    render() {
        const profileOpacity = this.state.scrollY.interpolate({
            inputRange: [50, 60],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        const profileHeight = this.state.scrollY.interpolate({
            inputRange: [0, 70],
            outputRange: [60, 35],
            extrapolate: 'clamp',
        });
        const profileWidth = this.state.scrollY.interpolate({
            inputRange: [0, 70],
            outputRange: [60, 35],
            extrapolate: 'clamp',
        });
        const profileLeft = this.state.scrollY.interpolate({
            inputRange: [0, 70],
            outputRange: [0, 30],
            extrapolate: 'clamp',
        });
        console.log("data -0-=0-- ", this.state.user)
        if (this.state.loading)
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                    <ActivityIndicator size='large' color='#9246e6' />
                </View>
            )
        else
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                    <View style={styles.headerView}>
                        <TouchableOpacity style={styles.backView}
                            onPress={() => this.props._pageNavigate(4, '', this.state.user)}>
                            <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                        </TouchableOpacity>
                        <Animated.View style={{ width: '70%', opacity: profileOpacity }}>
                            <View style={[styles.profileImageView, { alignSelf: 'flex-start', }]}>
                                <Image source={{ uri: this.state.user.profile }} style={{ height: 35, width: 35, borderRadius: 17.5, }} />
                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={{ fontSize: RF(2.5), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#000' }}>{this.state.user.name}</Text>
                                </View>
                            </View>
                        </Animated.View>
                        <TouchableOpacity style={styles.backView}
                            onPress={() => this.props._pageNavigate(4, 'edit', this.state.user)}>
                            <Text style={{ color: '#9246e6', fontSize: RF(2.2) }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                        )}
                        showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: '5%' }}>
                        {this._profile(profileHeight, profileWidth, profileLeft)}
                        {/* {this._inviteButton()} */}
                        {this._about()}
                        {this._relatedEvents()}
                    </ScrollView>
                </SafeAreaView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerView: {
        flexDirection: 'row',
        //justifyContent:'space-between',
        width: '100%',
        //backgroundColor:'gray',
        paddingVertical: 10,
        alignItems: 'center'
    },
    backView: {
        //backgroundColor:'red',
        width: '15%',
        alignItems: 'center',
    },
    profileText: {
        color: '#aeadba',
        fontSize: RF(2.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
    },
    inviteText: {
        fontSize: RF(2.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
    },
    headingText: {
        fontSize: RF(3.5),
        color: '#000',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    },
    relatedEventsMainView: {
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 5,
        elevation: 0.8,
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
        backgroundColor: 'white'
    },
    relatedEventsCategoryView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 3
    },
    relatedEventsCategoryText: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontSize: RF(1.6),
    },
    relatedEventsTitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RF(2.2),
        color: 'black'
    },
    relatedEventsSubtitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Light' : 'Lato Light',
        //fontSize: 14, 
        fontSize: RF(2),
        marginVertical: 2
    },
    relatedEventsHandlerView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    relatedEventsDetailsView: {
        width: '65%',
        justifyContent: 'space-between',
        paddingHorizontal: 8
    },
    aboutText: {
        fontSize: RF(2.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000'
    },
    aboutDescView: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    aboutHeadingView: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 20,
    },
    inviteMainView: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#f2f3f5'
    },
    inviteSubView: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 10,
        flexDirection: 'row',
        // justifyContent: 'space-around' 
    },
    profileMainView: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#f2f3f5'
    },
    profileImageView: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

});
