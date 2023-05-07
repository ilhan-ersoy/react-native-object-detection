import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native'


import { Camera, CameraType } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import { useSelector } from 'react-redux'
import * as ImageManipulator from 'expo-image-manipulator'

const DetectedObjects = ({ objects, imageWidth, imageHeight }) => {
    return (
        <View style={{position:"absolute"}}>
            {objects.map((object, index) => {
                const vertices = object.boundingPoly.normalizedVertices;
                const x = vertices[0].x * imageWidth;
                const y = vertices[0].y * imageHeight;
                const width = (vertices[2].x - vertices[0].x) * imageWidth;
                const height = (vertices[2].y - vertices[0].y) * imageHeight;
                return (
                    <View
                        key={index}
                        style={{
                            borderColor: 'red',
                            borderWidth: 2,
                            position: 'absolute',
                            left: x,
                            top: y,
                            width: width,
                            height: height,
                        }}
                    />
                );
            })}
        </View>
    );
};



const CameraScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.user)
    const [rawObjects, setRawObjects] = useState()
    const [image, setImage] = useState(null)
    const [objects, setObjects] = useState([])

    const [photo, setPhoto] = useState(null)

    const convertToBase64 = async () => {
        const manipResult = await ImageManipulator.manipulateAsync(
            photo.uri,
            [{ resize: { width: 400 } }],
            { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG, base64: true }
        )
    }


    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        })

        if (!result.canceled) {
            setImage(`data:image/jpeg;base64,${result.base64}`)
            const body = {
                requests: [
                    {
                        image: {
                            content: result.base64
                        },
                        features: [
                            {
                                type: 'OBJECT_LOCALIZATION',
                                maxResults: 50
                            }
                        ]
                    }
                ]
            }

            axios
                .post(
                    'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDqiXgi_9gVoWlXHE7wZDPSBE40wwPtAmw',
                    body
                )
                .then(response => {
                    setObjects(response.data.responses[0].localizedObjectAnnotations)
                    // setRawObjects(response.data.responses[0].normalizedVertices[0])
                    // saveImage()
                    console.log("objects =>", objects)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }


    objects && objects.map((object) => console.log(object.name))


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image && (
                <View style={{position:"relative"}}>
                    <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />
                    {/*<DetectedObjects objects={objects} imageWidth={400} imageHeight={400} />*/}
                </View>
            )}
            {/*{objects.length > 0 && (*/}
            {/*    <Text style={{ marginTop: 10 }}>*/}
            {/*        Objects in the image: {objects}*/}
            {/*    </Text>*/}
            {/*)}*/}
            <Button title='Select a photo' onPress={selectImage} />
            {/* <Button title="Take a photo" onPress={takePicture} /> */}
        </View>

    )
}

export default CameraScreen
