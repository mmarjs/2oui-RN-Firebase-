import React, { Component } from 'react';
import {
    Platform, Dimensions, StyleSheet, Text, View, SafeAreaView, StatusBar, Image,
    TextInput, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import { Icon,CheckBox } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Button from '../../components/button'
import firebase from '../../components/Firebase';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
           gender:''
        }
    }
 
    _gender(gender) {
       this.setState({gender:gender},()=>this._continue())
      }
    
     
    _continue(){
        this.props.userData.gender=this.state.gender
        Actions.Birthday({userData:this.props.userData})
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                {/* <KeyboardAvoidingView behavior='padding' style={styles.subContainerView}> */}
                <View style={styles.subContainerView}>
                    <TouchableOpacity style={styles.backView}
                        onPress={() => Actions.pop()}>
                        <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                    </TouchableOpacity>
                    <View style={{ marginTop: 30, marginBottom: 20, width: '100%', }}>
                        <Text style={styles.genderText}>What's your gender ?</Text>
                    </View>

                    <View style={styles.genderSelectioncontainer}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={[styles.imageThumbnail,{tintColor:'#30c4f5'}]}
                                source={require('../../assets/images/male.png')} />
                            <Text style={styles.text}>Male</Text>
                        </View>
                        <View style={{right:10,}}>
                            <CheckBox color='#8a4cea' checked={this.state.gender == 'Male' ? true : false}
                            onPress={()=>this._gender('Male')}/>
                        </View>
                    </View>
                    <View style={styles.genderSelectioncontainer}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={[styles.imageThumbnail,{tintColor:'#f24371'}]}
                                source={require('../../assets/images/female.png')} />
                            <Text style={styles.text}>Female</Text>
                        </View>
                        <View style={{right:10,}}>
                            <CheckBox  color='#8a4cea'checked={this.state.gender == 'Female' ? true : false}
                          onPress={()=>this._gender('Female')}/>
                        </View>
                    </View>
                    <View style={styles.genderSelectioncontainer}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={[styles.imageThumbnail,{tintColor:'#ff9c27'}]}
                                source={require('../../assets/images/male.png')} />
                            <Text style={styles.text}>Other</Text>
                        </View>
                        <View style={{right:10,}}>
                            <CheckBox  color='#8a4cea' checked={this.state.gender == 'Other' ? true : false}
                            onPress={()=>this._gender('Other')}/>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <Button buttonText='Continue' onClick={()=>this._continue()}
                     disabled={this.state.gender ? false : true}
                    colors={this.state.gender ? ['#a65ae1', '#8a4cea'] : ['#e3cdf8', '#e3cdf8']} style={styles.buttoncontainer} />
                </View>
                {/* </KeyboardAvoidingView> */}
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
        flex:1,
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal:20,
        height: '100%'
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 5
    },
    genderText: {
        height: 40,
        fontSize: 25,
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        textAlign: 'center',
    },
    genderSelectioncontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        // backgroundColor:'red',
        width: '100%',
        height:70,
        borderRadius: 12,
        paddingHorizontal:20,
        marginTop: 12,
         elevation:0.5,
         shadowOffset:{  width: 1,  height: 1,  },
shadowColor: 'gray',
shadowOpacity: 0.1,
    },
    imageThumbnail: {
       height:30,
       width:30,
       borderRadius:15,
       marginRight:12,
   },
    text: {
        fontSize: 15,
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        color: '(rgba(0,0,0,1))'
    },
    buttonView: {
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
