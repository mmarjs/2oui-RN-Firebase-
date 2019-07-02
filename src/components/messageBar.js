
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Animated
} from 'react-native';
export default class MessageBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:new Animated.Value(0),
      opacity:new Animated.Value(0)
    }
  }
  _animateMessage(){  
      Animated.parallel([
        Animated.timing(this.state.height,{toValue:60,duration:1000}),
        Animated.timing(this.state.opacity,{toValue:1,duration:1000})
    ]).start();
    setTimeout(()=>{
      Animated.parallel([
        Animated.timing(this.state.height,{toValue:0,duration:1000}),
        Animated.timing(this.state.opacity,{toValue:0,duration:1000})
      ]).start();
    },3000)
  }
  render() {
    return (
        <Animated.View style={[styles.bar,{height:this.state.height,opacity:this.state.opacity,backgroundColor:this.props.success ? 'black' : 'red'}]}>
             <Text style={styles.message}>{this.props.error}</Text>
        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  bar:{
    backgroundColor:'red',
    width:"100%",
    alignItems:'center',
    position:'absolute',
    bottom:0,
    justifyContent:'center'
  },
  message:{
    color:'white',
    fontSize:16,
    textAlign:'center'
  }
});
