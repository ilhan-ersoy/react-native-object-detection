import React, {useState} from "react";
import {View, Text, Button, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity} from "react-native";
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';


const CameraScreen = ({navigation}) => {

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    let permissionResponsePromise = Camera.requestCameraPermissionsAsync();



    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    // const base64 = FileSystem.readAsStringAsync("https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1.jpg", { encoding: 'base64' });






    const callGoogleVisionApi = async (base64) => {
        let googleVisionRes = await fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDqiXgi_9gVoWlXHE7wZDPSBE40wwPtAmw", {
            method: 'POST',
            body: JSON.stringify({
                "requests": [
                    {
                        "image": {
                            "content": base64
                        },
                        features: [
                            { type: "LABEL_DETECTION", maxResults: 10 },
                            { type: "LANDMARK_DETECTION", maxResults: 5 },
                            { type: "FACE_DETECTION", maxResults: 5 },
                            { type: "LOGO_DETECTION", maxResults: 5 },
                            { type: "TEXT_DETECTION", maxResults: 5 },
                            { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
                            { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                            { type: "IMAGE_PROPERTIES", maxResults: 5 },
                            { type: "CROP_HINTS", maxResults: 5 },
                            { type: "WEB_DETECTION", maxResults: 5 }
                        ],
                    }
                ]
            })
        });

        await googleVisionRes.json()
            .then(googleVisionRes => {
                console.log(googleVisionRes)
                if (googleVisionRes) {
                    this.setState(
                        {
                            loading: false,
                            googleVisionDetetion: googleVisionRes.responses[0]
                        }
                    )
                    console.log('this.is response', this.state.googleVisionDetetion);
                }
            }).catch((error) => { console.log(error) })
    }

    return (
        <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
                {/*<TouchableOpacity style={styles.button} onPress={toggleCameraType}>*/}
                {/*    <Text style={styles.text}>Flip Camera</Text>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity onPress={() => callGoogleVisionApi(img)} style={styles.take} activeOpacity={0.5}>
                    <View>
                        <Text>
                            Take
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Camera>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    take: {
        flexDirection:"column",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:"#fff",
        flex:2
    },
    buttonContainer:{
        flex:1,
    }

});

export default CameraScreen;
