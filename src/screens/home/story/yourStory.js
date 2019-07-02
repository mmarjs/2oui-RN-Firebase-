import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import RF from "react-native-responsive-fontsize"
import Video from 'react-native-video';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class YourStory extends Component {
  constructor(props) {
    super(props)
    this.state = {
        visible: false,
        MyEvents:[
            {
                image:require('../../../assets/images/event_3.jpg'),
                title:'Harry Potter Marathon at the cinema',
                check:false
            },
        ]

    }
  }
_yourStory(){
  return(
   <View style={styles.container}>
    <View style={styles.headerView}>
      <View style={styles.storyView}>
        <Image source={require('../../../assets/images/user_1.jpg')} style={styles.storyImg} />
        <View style={{width:'70%'}}>
        <Text style={styles.yourStoryShareText}>Your story</Text>
        <Text style={[styles.yourStoryShareText,{fontSize:RF(1.8)}]}>10min</Text>
        </View>
        </View>
        <View style={styles.iconView}>
        <TouchableOpacity>
            <Icon name='dots-horizontal' type="MaterialCommunityIcons" style={{ color: '#fff', fontSize: 30 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Actions.pop()} style={{marginLeft:2}}>
            <Icon name='close' type="MaterialCommunityIcons" style={{ color: '#fff', fontSize: 30 }} />
        </TouchableOpacity>
        </View>
    </View>

</View>
  )
}

  render() {
    if(this.props.data){
      return (
        <View style={{flex:1}}>
        {this.props.data.type=="image"?
        <ImageBackground source={{uri:this.props.data.uri}} style={styles.imageBackground}>
             {this._yourStory()}
        </ImageBackground>
         :
         <View style={{flex:1}}>
         {/* <Video source={{ uri:this.props.data.uri }} style={styles.backgroundVideo} resizeMode="contain" onLoad={()=>console.log('video loaded!')} onError={e=>console.log('video load failed!', e)} /> */}
         <Video source={{uri:this.props.data.uri}}   // Can be a URL or a local file.
         style={styles.backgroundVideo}
         muted={false}
         repeat={true}
         resizeMode={"cover"}           // Callback when video cannot be loaded
         />
          <View style={{position:'absolute',alignSelf:'center',width:'95%'}}>
           {this._yourStory()}
           </View>
         </View>
          
         }
         </View>
      );
    }
    else{
      return (
        <View style={{flex:1}}>
        <ImageBackground source={require('../../../assets/images/story_1.jpg')} style={styles.imageBackground}>
             {this._yourStory()}
        </ImageBackground>
         </View>
      );
    }
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  storyView:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:15
  },
  storyImg:{ 
    height: 50, 
    width: 50, 
    borderRadius: 25
  },
  iconView:{
      alignSelf:'flex-end',
      width:'15%',
      flexDirection:'row',
      alignItems:'center',
      marginBottom:5,
      justifyContent:'center'
  },
  headerView:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'90%',
    alignSelf:'center',
    marginTop:15
  },
  backView: {
    width: 40,
    alignItems: 'flex-start',
},
shareView:{
    width:'90%',
    flexDirection:'row',
    alignItems:'center',
    position:'absolute',
    justifyContent:'space-between',
    bottom:Platform.OS=='ios' ? 50 : 30
},
shareContainer:{
    height:40,
    width:150,
    backgroundColor:'#fff',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'
},
shareText:{
    color:'#000',
    fontSize:RF(2),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
},
yourStoryShareText:{
    width:'80%',
     fontSize: RF(2.3),
     fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
     color: '#FFF',
     paddingLeft:10
 },
backgroundVideo: {
 
position: "absolute",
top: 0,
left: 0,

bottom: 0,
right: 0
}
});
