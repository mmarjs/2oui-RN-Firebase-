import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Scene, Router, Stack } from 'react-native-router-flux';
import Login from './screens/login'
import Login1 from './screens/login/login'
import Forgot from './screens/login/forgotPassword'
import SignUp from './screens/signUp'
import CompleteYourProfile from './screens/signUp/completeYourProfile'
import Gender from './screens/signUp/gender'
import Birthday from './screens/signUp/birthday'
import CompletePhone from './screens/signUp/completePhone'
import Otp from './screens/signUp/otp'
import Home from './screens/home/'
import Filter from './screens/home/filter/filter'
import FilterDate from './screens/home/filter/date'
import FilterLocation from './screens/home/filter/location'
import FilterDiversity from './screens/home/filter/diversity'
import FilterCategory from './screens/home/filter/category'
import FilterHostRating from './screens/home/filter/hostRating'
import FilterGender from './screens/home/filter/gender'
import FilterDistance from './screens/home/filter/distance'
import FilterAge from './screens/home/filter/age'
import FilterBudget from './screens/home/filter/budget'
import Map from './screens/home/map'
import Profile from './screens/home/profile'
import People from './screens/home/profile/people'
import Upgrade from './screens/home/profile/upgrade'
import Search from './screens/home/search'
import Saved from './screens/home/saved/index'
import Invite from './screens/home/invite'
import Camera from './screens/home/story/camera'
import EditStory from './screens/home/story/editStory'
import Share from './screens/home/story/share'
import YourStory from './screens/home/story/yourStory'
import Chats from './screens/home/message/chats'
import LiveLocation from './screens/home/message/livelocation'
import Event from './screens/home/event/event'
import CreateEvent from './screens/home/event/createEvent'
import AddEvent from './screens/home/event/createEvent/addEvent'
import AddEventFilter from './screens/home/event/createEvent/filter/filter'
import AddEventFilterLocation from './screens/home/event/createEvent/filter/location'
import AddEventFilterCategory from './screens/home/event/createEvent/filter/category'
import AddEventFilterRating from './screens/home/event/createEvent/filter/rating'
import SetEvent from './screens/home/event/createEvent/setEvent'
import AddEventSetGuest from './screens/home/event/createEvent/setGuest/setGuest'
import SetGuestAge from './screens/home/event/createEvent/setGuest/age'
import SetGuestGender from './screens/home/event/createEvent/setGuest/gender'
import SetGuestGuests from './screens/home/event/createEvent/setGuest/guests'
import SearchEvent from './screens/home/event/createEvent/searchEvent'
import SetBudget from './screens/home/event/createEvent/setBudget'
import ReviewAndPay from './screens/home/event/createEvent/reviewandPay'
import EditEvent from './screens/home/event/createEvent/editEvent'
import InviteGuest from './screens/home/event/createEvent/inviteGuest'
import SearchGuest from './screens/home/event/createEvent/searchGuest'
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
export default class App extends Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar>
                    <Scene key="Login" component={Login} initial />
                    <Scene key="Login1" component={Login1} />
                    <Scene key="Forgot" component={Forgot} />
                    <Scene key="SignUp" component={SignUp} />
                    <Scene key="Gender" component={Gender} />
                    <Scene key="CompleteYourProfile" component={CompleteYourProfile} />
                    <Scene key="CompletePhone" component={CompletePhone} />
                    <Scene key="Otp" component={Otp} />
                    <Scene key="Birthday" component={Birthday} />
                    <Scene key="Home" component={Home} />
                    <Scene key='Filter' component={Filter} />
                    <Scene key='FilterDate' component={FilterDate} />
                    <Scene key='FilterLocation' component={FilterLocation} />
                    <Scene key='FilterDiversity' component={FilterDiversity} />
                    <Scene key='FilterCategory' component={FilterCategory} />
                    <Scene key='FilterHostRating' component={FilterHostRating} />
                    <Scene key='FilterGender' component={FilterGender} />
                    <Scene key='FilterDistance' component={FilterDistance} />
                    <Scene key='FilterAge' component={FilterAge} />
                    <Scene key='FilterBudget' component={FilterBudget} />
                    <Scene key='Map' component={Map} />
                    <Scene key='Profile' component={Profile} />
                    <Scene key="People" component={People} />
                    <Scene key="Upgrade" component={Upgrade} />
                    <Scene key='Search' component={Search} />
                    <Scene key='Saved' component={Saved} />
                    <Scene key='Invite' component={Invite} />
                    <Scene key='Camera' component={Camera} />
                    <Scene key='EditStory' component={EditStory} />
                    <Scene key='Share' component={Share} />
                    <Scene key='YourStory' component={YourStory} />
                    <Scene key='Event' component={Event} />
                    <Scene key='Chats' component={Chats} />
                    <Scene key='LiveLocation' component={LiveLocation} />
                    <Scene key='CreateEvent' component={CreateEvent} />
                    <Scene key='AddEvent' component={AddEvent} />
                    <Scene key='SetEvent' component={SetEvent} />
                    <Scene key='AddEventSetGuest' component={AddEventSetGuest} />
                    <Scene key='SetGuestAge' component={SetGuestAge} />
                    <Scene key='SetGuestGender' component={SetGuestGender} />
                    <Scene key='SetGuestGuests' component={SetGuestGuests} />
                    <Scene key='AddEventFilter' component={AddEventFilter} />
                    <Scene key='AddEventFilterLocation' component={AddEventFilterLocation} />
                    <Scene key='AddEventFilterCategory' component={AddEventFilterCategory} />
                    <Scene key='AddEventFilterRating' component={AddEventFilterRating} />
                    <Scene key='SearchEvent' component={SearchEvent} />
                    <Scene key='SetBudget' component={SetBudget} />
                    <Scene key='ReviewAndPay' component={ReviewAndPay} />
                    <Scene key='EditEvent' component={EditEvent} />
                    <Scene key='InviteGuest' component={InviteGuest} />
                    <Scene key='SearchGuest' component={SearchGuest}  />
                </Stack>
            </Router>
        );
    }
}
