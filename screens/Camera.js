import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image, TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {FancyAlert} from 'react-native-expo-fancy-alerts';
import { useFocusEffect } from '@react-navigation/native';
import AnimatedLoader from "react-native-animated-loader";


const DetectedObjects = ({objects, imageWidth, imageHeight}) => {
    return (
        <View style={{position: 'absolute'}}>
            {objects && objects.map((object, index) => {
                const vertices = object.boundingPoly.normalizedVertices;

                const x = vertices[0].x * imageWidth;
                const y = vertices[0].y * imageHeight;

                const width = (vertices[2].x - vertices[0].x) * imageWidth;
                const height = (vertices[2].y - vertices[0].y) * imageHeight;

                let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];

                if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
                    console.warn('Invalid coordinates or dimensions:', {x, y, width, height});
                    return null;
                }

                let randomIndex = Math.floor(Math.random() * colors.length);

                return (
                    <View key={index} style={{position: 'absolute', left: x, top: y}}>
                        <View
                            style={{
                                borderColor: colors[randomIndex],
                                borderWidth: 2,
                                width: width,
                                height: height,
                            }}
                        />
                        <Text
                            style={{
                                color: '#fff',
                                backgroundColor: 'gray',
                                fontSize: 12,
                                position: 'absolute',
                                left: width + 5,
                                top: 0,
                            }}
                        >
                            {object.name}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

const CameraScreen = ({navigation}) => {


    const [image, setImage] = useState();
    const [objects, setObjects] = useState([]);
    const [names, setNames] = useState([]);
    const user = useSelector(state => state.auth.user);

    const [visible, setVisible] = React.useState(false);
    const toggleAlert = React.useCallback(() => {
        setVisible(!visible);
    }, [visible]);

    const [loading, setLoading] = useState(false) // loading status


    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(`data:image/jpeg;base64,${result.base64}`);
            detectObjects(result.base64);
        }
    };

    const selectImage = async () => {
        setImage(null)
        setObjects([])
        setNames([])
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(`data:image/jpeg;base64,${result.base64}`);
            detectObjects(result.base64);
        }
    };

    const detectObjects = (base64Image) => {
        const body = {
            requests: [
                {
                    image: {
                        content: base64Image,
                    },
                    features: [
                        {
                            type: 'OBJECT_LOCALIZATION',
                            maxResults: 50,
                        },
                    ],
                },
            ],
        };

        axios
            .post(
                'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDqiXgi_9gVoWlXHE7wZDPSBE40wwPtAmw',
                body
            )
            .then(response => {
                setObjects(response.data.responses[0].localizedObjectAnnotations);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const refresh = () => {
        setImage(null)
        setObjects([])
        setNames([])
    }

    useEffect(() => {
        if (objects) {
            const extractedNames = objects.map((data) => data.name);
            setNames(extractedNames);
        }
    }, [objects]);

    useEffect(() => {
        if (image && names.length > 0) {
            postDetection(image, names);
        }
    }, [image, names]);

    const postDetection = (img, names) => {
        console.log(names)
        let head = new Headers();
        head.append(
            "token",
            user.token
        )
        head.append("Content-Type", "application/json");
        let raw = JSON.stringify({
            "name": "Image",
            "user_id": user.user_id,
            "image": img,
            "labels": [...names]
        });

        let requestOptions = {
            method: 'POST',
            headers: head,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://192.168.4.10:8080/object-detection", requestOptions)
            .then(response => {
                console.log(response)
            })
            .then(result => console.log("result:", result))
            .catch(error => {
                console.log(error)
            });
    }



    useFocusEffect(
        React.useCallback(() => {
            setImage(null)
            setObjects([])
            setNames([])
            // console.log(user)
        }, [])
    );


    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};

    return (
        <View style={styles.container}>
            {image && (
                <View style={{position: 'relative'}}>
                    {/*<Button title="Reset" onPress={() => refresh()}/>*/}
                    <Image source={{uri: image}} style={styles.image}/>
                    <DetectedObjects objects={objects} imageWidth={400} imageHeight={400}/>
                    <View style={styles.labelContainer}>
                        {names && names.map((name, index) => (
                            <Text key={index} style={styles.label}>
                                {name}
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {/*<Button title="Take a photo" onPress={takePhoto} />*/}
            {/*<Button title="Select a photo" onPress={selectImage} />*/}

            <TouchableOpacity onPress={() => takePhoto()}>
                <View style={styles.buttons}>
                    <Text style={styles.buttonText}>
                        Fotoğraf Çek
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectImage()}>
                <View style={styles.buttons}>
                    <Text style={styles.buttonText}>
                        Fotoğraf Seç
                    </Text>
                </View>
            </TouchableOpacity>

            {/*{*/}
            {/*   <AnimatedLoader*/}
            {/*        visible={true}*/}
            {/*        overlayColor='#1e1e1e'*/}
            {/*        source={require('./loader.json')}*/}
            {/*        animationStyle={styles.lottie}*/}
            {/*        speed={2}*/}
            {/*    />*/}
            {/*}*/}

            <FancyAlert
                visible={visible}
                icon={<View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    borderRadius: 50,
                    width: '100%',
                }}><Text>🤓</Text></View>}
                style={{backgroundColor: 'white'}}
            >
                <Text style={{marginTop: -16, marginBottom: 32}}>
                    Tespit Gerçekleşti!
                </Text>
                <Button title={"Ok"} onPress={() => setVisible(false)}/>
            </FancyAlert>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e1e1e',
    },
    image: {
        width: 400,
        height: 400,
    },
    labelContainer: {
        position: 'absolute',
        left: 100,
        top: 0,
    },
    label: {
        color: '#fff',
        backgroundColor: 'gray',
        fontSize: 12,
        margin: 4,
    },
    buttons: {
        backgroundColor: "#202020",
        margin: 5,
        borderRadius: 10,
        padding:5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 24,
        marginVertical: 5
    }
});

export default CameraScreen;
