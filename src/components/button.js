import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class Login extends Component {

    render() {
        return (
            <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onClick} style={[styles.buttonStyle, this.props.style]}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={this.props.colors} style={{ width: '100%', borderRadius: 25, alignItems: 'center', height: 50, justifyContent: 'center' }}>  
                {  this.props.loading?
                 <ActivityIndicator size='small' color='white'/>:
                 <Text style={{ color: 'white', fontSize: 18, fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>{this.props.buttonText}</Text>
                 }
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    buttonStyle: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8
    }

});
