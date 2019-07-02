
/* eslint-disable no-console */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import RF from "react-native-responsive-fontsize";
import ImagePicker from 'react-native-image-crop-picker';

const flashModeOrder = {
    off: 'on',
    on: 'off'
};


export default class CameraScreen extends React.Component {
   
        state = {
            flash: 'off',
            zoom: 0,
            autoFocus: 'on',
            autoFocusPoint: {
                normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
                drawRectPosition: {
                    x: Dimensions.get('window').width * 0.5 - 32,
                    y: Dimensions.get('window').height * 0.5 - 32,
                },
            },
            depth: 0,
            type: 'back',
            whiteBalance: 'auto',
            ratio: '16:9',
            recordOptions: {
                mute: false,
                maxDuration: 30,
                fixOrientation: true,
                skipProcessing: false,
                quality: RNCamera.Constants.VideoQuality["288p"]
            },
            isRecording: false,
            canDetectFaces: false,
            canDetectText: false,
            canDetectBarcode: false,
            faces: [],
            textBlocks: [],
            barcodes: [],
            defaultBtn: 'photo'
        
    }

    _toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    _toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    _takePicture = async function () {
        if (this.camera) {
            const options = { skipProcessing: false,
                fixOrientation: true,quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            Actions.EditStory({data:{uri:data.uri,type:'image'}})
        }
    };
 
    _pickImage() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
          }).then(image => {
           Actions.EditStory({data:{uri:image.path,type:'image'}})
        })
    }

    _takeVideo = async function () {
       if (this.camera) {
            try {
                const promise = this.camera.recordAsync(this.state.recordOptions);

                if (promise) {
                    this.setState({ isRecording: true });
                    const data = await promise;
                    this.setState({ isRecording: false });
                    console.log('takeVideo', data);
                    Actions.EditStory({data:{uri:data.uri,type:'video'}})
                    
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    renderCamera() {
        const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;

        const drawFocusRingPosition = {
            top: this.state.autoFocusPoint.drawRectPosition.y - 32,
            left: this.state.autoFocusPoint.drawRectPosition.x - 32,
        };
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                focusDepth={this.state.depth}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
            >

                <View
                    style={{
                        //flex: 0.5,
                        //height: 72,
                        paddingTop: Platform.OS == 'ios' ? 15 : 0,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '95%'

                        }}
                    >
                        {this.state.defaultBtn == "photo" ?
                            <TouchableOpacity style={styles.backView}
                                onPress={() => Actions.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#fff', fontSize: 35 }} />
                            </TouchableOpacity> : null}
                        {this.state.defaultBtn == "photo" ?
                            <TouchableOpacity style={[styles.backView, { margintTop: 12 }]} onPress={this._toggleFlash.bind(this)}>
                                {this.state.flash == 'off' ?
                                    <Icon name='flash-off' type="MaterialCommunityIcons" style={{ color: '#fff', fontSize: 30 }} />
                                    :
                                    <Icon name='flash' type="MaterialCommunityIcons" style={{ color: '#fff', fontSize: 30 }} />
                                }
                            </TouchableOpacity> : null}
                    </View>
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >

                    </View>
                </View>

                <View style={{ paddingBottom: 20 }}>

                    <View
                        style={{
                            height: 70,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignSelf: 'center',
                            width: '82%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '5%'
                        }}
                    >
                        {this.state.defaultBtn == "photo" ?
                            <TouchableOpacity onPress={() => this._pickImage()}>
                                <Icon name='picture-o' type="FontAwesome" style={{ color: '#fff',marginTop:10, fontSize: 25 }} />
                            </TouchableOpacity>
                            :
                            <View style={{ width: 25 }}></View>
                        }
                        {this.state.defaultBtn == "photo" ?
                            <View >
                                <TouchableOpacity onPress={() => this.setState({ defaultBtn: "video" })}>
                                    <Text style={{ alignSelf: 'center', padding: 5, fontSize: RF(2), color: '#fff' }}>Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._takePicture.bind(this)}
                                >
                                    <Icon name='circle-thin' type="FontAwesome" style={{ color: '#fff',paddingBottom:20, fontSize: 70 }} />
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPress={() => this.setState({ defaultBtn: "photo" })}>
                                <Text style={{ alignSelf: 'center', padding:5, fontSize: RF(2), color: '#fff' }}>Video</Text></TouchableOpacity>
                                <TouchableOpacity

                                    onPress={this.state.isRecording ? () => { } : this._takeVideo.bind(this)}
                                >
                                    {this.state.isRecording ? (
                                        <Icon name='stop-circle' type="FontAwesome" style={{ color: '#fff',paddingBottom:20, fontSize: 70 }} />
                                    ) : (
                                        <Icon name='dot-circle-o' type="FontAwesome" style={{ color: '#fff',paddingBottom:20, fontSize: 70 }} />
                                        )}

                                </TouchableOpacity>
                            </View>
                        }

                        <TouchableOpacity onPress={this._toggleFacing.bind(this)}>
                            <Icon name='ios-reverse-camera' type="Ionicons" style={{ color: '#fff',marginTop:10, fontSize: 37 }} />
                        </TouchableOpacity>

                    </View>

                </View>




            </RNCamera>
        );
    }

    render() {
        return <View style={styles.container}>{this.renderCamera()}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5
    },
   
});

