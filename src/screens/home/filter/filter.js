import React, { Component } from 'react';
import {
    Platform, FlatList, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Button from '../../../components/button'
import RF from "react-native-responsive-fontsize"
import { ListItem } from "react-native-elements";


export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: true,
            eventList: [{
                "name": "Budget",
                "option": "Any",
            },
            {
                "name": "Date",
                "option": "Any",
            },
            {
                "name": "Location",
                "option": "Any",
            },
            {
                "name": "Host rating",
                "option": "Any",
            },
            {
                "name": "Category",
                "option": "Any",
            },
            {
                "name": "Gender diversity",
                "option": "Any",
            }],
            peopleList: [{
                "name": "Gender",
                "option": "Any"
            },
            {
                "name": "Age",
                "option": "Any"
            },
            {
                "name": "Distance",
                "option": "Any"
            },
            {
                "name": "Host rating",
                "option": "Any"
            }]
        }
        this._eventValue = this._eventValue.bind(this)
        this._peopleValue = this._peopleValue.bind(this)
    }

    _eventValue(type, data) {
        console.log('Event Data', data)
        this.setState(state => (this.state.eventList.find((search) => {
            if (search.name == type) {
                search.option = data
            }
        }), state))
    }
    _peopleValue(type, data) {
        console.log('People Data', data)
        this.setState(state => (this.state.peopleList.find((search) => {
            if (search.name == type) {
                search.option = data
            }
        }), state))
    }
    _filter(name, value) {
        if (name == 'Budget') {
            Actions.FilterBudget({ event: this._eventValue, value: value })
        }
        if (name == 'Date') {
            Actions.FilterDate({ event: this._eventValue, value: value })
        }
        if (name == 'Location') {
            Actions.FilterLocation({ event: this._eventValue, value: value })
        }
        if (name == 'Gender diversity') {
            Actions.FilterDiversity({ event: this._eventValue, value: value })
        }
        if (name == 'Category') {
            Actions.FilterCategory({ event: this._eventValue, value: value })
        }
        if (name == 'Host rating') {
            Actions.FilterHostRating({ event: this._eventValue, value: value })
        }
        if (name == 'Gender') {
            Actions.FilterGender({ people: this._peopleValue, value: value })
        }
        if (name == 'Distance') {
            Actions.FilterDistance({ people: this._peopleValue, value: value })
        }
        if (name == 'Age') {
            Actions.FilterAge({ people: this._peopleValue, value: value })
        }
    }

    render() {
        console.log('Event List', this.state.eventList)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />

                <View style={styles.subContainerView}>
                <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                    <View style={{ width: '90%',alignSelf:'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => Actions.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>Filters</Text>
                        <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                    </View>
                    </View>
                    <View style={{  width: '90%',alignSelf:'center',marginTop: 30, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 12 }}>
                        <TouchableOpacity onPress={() => { this.setState({ events: true }) }} style={[styles.eventBtn, { backgroundColor: this.state.events == true ? '#9246e6' : 'transparent' }]}>
                            <Text style={[styles.eventTxt, { color: this.state.events == true ? '#fff' : '#000' }]}>Events</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ events: false }) }} style={[styles.eventBtn, { backgroundColor: this.state.events == false ? '#9246e6' : 'transparent' }]}>
                            <Text style={[styles.eventTxt, { color: this.state.events == false ? '#fff' : '#000' }]}>People</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>

                        <FlatList
                            data={this.state.events == true ? this.state.eventList : this.state.peopleList}
                            extraData={this.state}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { }}>
                                    <ListItem onPress={() => this._filter(item.name, item.option)}
                                        roundAvatar
                                        rightIcon={<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ fontSize: RF(1.5), color: '#A9A8B6', marginBottom: 5 }} >{item.option}</Text>
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Icon
                                                    name="ios-arrow-forward"
                                                    size={14}
                                                    style={{ marginRight: 10, marginLeft: 10, color: '#A9A8B6', alignSelf: 'center' }}
                                                />
                                            </View>
                                        </View>}
                                        title={<Text style={{ fontSize: RF(2), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#000' }}>{item.name}</Text>}
                                        containerStyle={{  borderBottomWidth: 1, borderColor: '#f2f3f5', height: 70, backgroundColor: 'white', justifyContent: 'center' }}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.name}

                            onEndReachedThreshold={50}
                        />

                    </View>

                </View>

                <View style={styles.buttonView}>
                    <Button buttonText='Apply' onClick={() => { }} colors={['#a65ae1', '#8a4cea']} style={styles.buttoncontainer} />
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
    },
    backView: {
        width: 30,
    },
    headerText: {
        height: 40,
        fontSize: RF(2.5),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        marginTop: 8
    },
    clearText: {
        height: 40,
        fontSize: RF(2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#9246e6',
        marginTop: 12
    },
    eventBtn: {
        width: '50%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,

    },
    eventTxt: {
        fontSize: RF(2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',

    },
    buttonView: {
        height: 80,
        justifyContent: 'center',
        borderColor: '#f2f3f5',
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
