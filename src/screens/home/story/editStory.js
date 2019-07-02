import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import RF from "react-native-responsive-fontsize"
// import RNMediaEditor from 'react-native-media-editor';
import Video from 'react-native-video';

const { height } = Dimensions.get("window").height
//import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
//import { RNPhotoEditor } from 'react-native-photo-editor'

//import RNFS from 'react-native-fs'
//import RNFetchBlob from 'rn-fetch-blob'

//import photo from '../../assets/images/user_1.jpg'
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        visible: false,
        muted:true,
        loading: false,
        assetType: 'image',
        asset: null,
        text: 'Hello world',
        fontSize: 50,
        colorCode: '#ffffff',
        textBackgroundColor: '#ff00e0',
        rate: 0,
        camera: false

    }
  }


  // toVerticalString(str) {
  //   let verStr = '';
  //   for (s of str) {
  //     verStr += s + '\n';
  //   }
  //   return verStr;
  // }

//   componentDidMount(){
//     let photoPath = RNFS.DocumentDirectoryPath + "/photo.jpg";
//     let binaryFile = resolveAssetSource(photo)

//     RNFetchBlob.config({ fileCache: true })
//       .fetch("GET", binaryFile.uri)
//       .then(resp => {
//         RNFS.moveFile(resp.path(), photoPath)
//           .then(success => {
//             console.log("FILE WRITTEN!");
//           })
//           .catch(err => {
//             console.log(err.message);
//           });
//       })
//       .catch(err => {
//         console.log(err.message);
//       });
//   }

// toVerticalString(str) {
//   let verStr = '';
//   for (s of str) {
//     verStr += s + '\n';
//   }
//   return verStr;
// }

  _onPress(){
    // let filter;
    // if (Platform.OS === 'ios') {
    //   filter = [];
    // } else if (Platform.OS === 'android') {
    //   filter = ".*\\.*";
    // }

    // RNPhotoEditor.Edit({
    //   path: RNFS.DocumentDirectoryPath + "/photo.jpg",
    //   stickers: [
    //     "sticker0",
    //     "sticker1",
    //     "sticker2",
    //     "sticker3",
    //     "sticker4",
    //     "sticker5",
    //     "sticker6",
    //     "sticker7",
    //     "sticker8",
    //     "sticker9",
    //     "sticker10"
    //   ],
    //   hiddenControls: [],
    //   colors: undefined,
    //   onDone: () => {
    //     console.log('on done')
    //   },
    //   onCancel: () => {
    //     console.log('on cancel')
    //   }
    // });
  }

  _renderStory(){
    return(
    <View style={styles.container}>
    <View style={styles.headerView}>
        <TouchableOpacity style={styles.backView}
            onPress={() => Actions.pop()}>
            <Image style={{ height: 25, width: 25, }} source={require('../../../assets/images/back.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 40, alignItems: 'flex-end' }}
           onPress={()=>this._onPress()} >
            <Image style={{ height: 25, width: 25, }} source={require('../../../assets/images/textedit.png')} />
        </TouchableOpacity>
    </View>
    <View style={styles.shareView}> 
    <TouchableOpacity style={styles.backView} onPress={()=>this.setState({muted:this.state.muted==true?false:true})}> 
            <Image style={{ height: 25, width: 25, }} source={require('../../../assets/images/sound.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareContainer}
        onPress={()=>Actions.Share({data:{uri:this.props.data.uri,type:this.props.data.type=="image"?"image":"video"}})}>
            <Text>Share your story</Text>
        </TouchableOpacity>
    </View>
</View>
    )
  }
  render() {
   
    return (
      <View style={{flex:1}}>
      {this.props.data.type=="image"?
      <ImageBackground source={{uri:this.props.data.uri}} style={styles.imageBackground}>
          {this._renderStory()}
      </ImageBackground>
      :
      <View style={{flex:1}}>
      <Video source={{uri:this.props.data.uri}}   // Can be a URL or a local file.
      style={styles.backgroundVideo}
      muted={this.state.muted}
      repeat={true}
      resizeMode={"cover"}           // Callback when video cannot be loaded
      />
       <View style={{position:'absolute',height:'100%',alignSelf:'center',width:'90%'}}>
        {this._renderStory()}
        </View>
      </View>
       
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // position: "absolute",
   // justifyContent: 'center',
  
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  headerView:{
    flexDirection:'row',
    justifyContent:'space-between',
   // position:'absolute',
    width:'90%',
   paddingVertical:Platform.OS=='ios' ? 50 : 20,
   // alignSelf:'center',
  //  alignContent:'center'
},
  backView: {
    // backgroundColor:'red',
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
    justifyContent:'center',
   // position:'absolute'
},
shareText:{
    color:'#000',
    fontSize:RF(2),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
},
backgroundVideo: {
  //height: height,
position: "absolute",
top: 0,
left: 0,
//alignItems: "stretch",
bottom: 0,
right: 0
}
});
