import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView,Image,StatusBar} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import RF from "react-native-responsive-fontsize"
import Explore from './explore';
import PeopleProfile from './profile'
import Profile from './profile/index'
import SubProfile from './profile/profile'
import EditProfile from './profile/editprofile'
import Saved from './saved'
import Activity from './profile/activity'
import People from './profile/people'
import Setting from './profile/setting'
import Message from './message'
import Event from './event/createEvent'
export default class Home extends Component {
  constructor(props){
      super(props)
      this.state={
          activeTab:0,
          index:0,
          tab1:'',
          tab5:'',
          subpage:'explore'
      }
      this._pageNavigate=this._pageNavigate.bind(this)
  }
  _pageNavigate(tab,subPage,data){
    if(tab==4){
      if(subPage=='view'){
        this.setState({tab5:<SubProfile userData={data} _pageNavigate={this._pageNavigate}/>})
      }
      else if(subPage=='edit'){
        this.setState({tab5:<EditProfile userData={data} _pageNavigate={this._pageNavigate}/>})
      }
      else if(subPage=='setting'){
        this.setState({tab5:<Setting userData={data} _pageNavigate={this._pageNavigate}/>})
      }
      else if(subPage=='Last activity'){
        this.setState({tab5:<Activity userData={data} _pageNavigate={this._pageNavigate}/>})
      }
      else if(subPage=='people'){
        this.setState({tab5:<People userData={data} _pageNavigate={this._pageNavigate}/>})
      }
      else{
        this.setState({tab5:<Profile userData={data} _pageNavigate={this._pageNavigate}/>})
      }
    }
    if(tab==0){
      if(subPage == 'profile'){
        this.setState({tab1:<PeopleProfile  data={data} _pageNavigate={this._pageNavigate} />,subpage:'profile'})
      }
      else{
        this.setState({tab1:<Explore  ref={(ref)=>this.exploreRef = ref} _pageNavigate={this._pageNavigate}/>,subpage:'explore'})
      }
    }
  }
  render() {
    console.log('Props',this.props.userData)
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
        <Tabs locked initialPage={this.state.activeTab} onChangeTab={(tab)=> this.setState({index:tab.i},()=>{ tab.i == 0 && tab.from == 0 ?this.state.subpage=='explore'?this.exploreRef._scrolltoTop(): null:null})} tabBarUnderlineStyle={{backgroundColor:'transparent'}} tabBarPosition='bottom' >
          <Tab heading={<TabHeading style={styles.tabHeading} >
                          <Image source={require('../../assets/images/explore.png')} style={{ height: 20, width: 20,tintColor:this.state.index == 0 ? '#9246e6' : null,marginVertical:2 }} />
                          <Text style={[styles.tabTitle,{color:this.state.index == 0 ? '#9246e6' : '#a8a7b5'}]}>Explore</Text>
                      </TabHeading>}>
              {this.state.tab1 ? this.state.tab1 : <Explore ref={(ref)=>this.exploreRef = ref} _pageNavigate={this._pageNavigate}/>}
          </Tab>
          <Tab heading={ <TabHeading style={styles.tabHeading}>
                            <Image source={require('../../assets/images/saved.png')} style={{height:18,width:20,tintColor:this.state.index == 1 ? '#9246e6' : null,marginVertical:2 }} />
                            <Text style={[styles.tabTitle,{color:this.state.index == 1 ? '#9246e6' : '#a8a7b5'}]}>Saved</Text>
                        </TabHeading>}>
                    <Saved/>
          </Tab>
          <Tab heading={ <TabHeading style={styles.tabHeading}>
                            <Image source={require('../../assets/images/events.png')} style={{height:20,width:20,tintColor:this.state.index == 2 ? '#9246e6' : null,marginVertical:2 }} />
                            <Text style={[styles.tabTitle,{color:this.state.index == 2 ? '#9246e6' :'#a8a7b5'}]}>Events</Text>
                        </TabHeading>}>
                    <Event />
          </Tab>
          <Tab heading={ <TabHeading style={styles.tabHeading}>
                            <Image source={require('../../assets/images/messages.png')} style={{height:20,width:21,tintColor:this.state.index == 3 ? '#9246e6' : null,marginVertical:2 }} />
                            <Text style={[styles.tabTitle,{color:this.state.index == 3 ? '#9246e6' : '#a8a7b5'}]}>Messages</Text>
                        </TabHeading>}>
                    <Message />
          </Tab>
          <Tab heading={ <TabHeading style={styles.tabHeading}>
                            <Image source={require('../../assets/images/profile.png')} style={{height:20,width:18,tintColor:this.state.index == 4 ? '#9246e6' : null,marginVertical:2 }} />
                            <Text style={[styles.tabTitle,{color:this.state.index == 4 ? '#9246e6' : '#a8a7b5'}]}>Profile</Text>
                        </TabHeading>}>
                 {this.state.tab5?this.state.tab5:<Profile userData={this.props.userData} _pageNavigate={this._pageNavigate}/>}
          </Tab>
        </Tabs>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabHeading:{
    flexDirection:'column',
    backgroundColor:'#fff',
  },
  tabTitle:{
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    marginVertical:2,
    fontSize:RF(1.6)
  }
});
