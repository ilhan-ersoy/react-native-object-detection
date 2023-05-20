import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';


const DetectedObjects = ({ objects, imageWidth, imageHeight }) => {
    return (
        <View style={{ position: 'absolute' }}>
            {objects && objects.map((object, index) => {
                const vertices = object.boundingPoly.normalizedVertices;
                const x = vertices[0].x * imageWidth;
                const y = vertices[0].y * imageHeight;
                const width = (vertices[2].x - vertices[0].x) * imageWidth;
                const height = (vertices[2].y - vertices[0].y) * imageHeight;
                let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];

                if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
                    console.warn('Invalid coordinates or dimensions:', { x, y, width, height });
                    return null;
                }

                let randomIndex = Math.floor(Math.random() * colors.length);

                return (
                    <View key={index} style={{ position: 'absolute', left: x, top: y }}>
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

const CameraScreen = () => {
    const [image, setImage] = useState(null);
    const [objects, setObjects] = useState([]);
    const [names, setNames] = useState([]);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (objects && objects.length > 0) {
            const objectNames = objects.map(object => object.name);
            if (objectNames != null && names != null) {
                setNames(prevNames => [...prevNames, ...objectNames]);
            }
        }

    }, [objects]);

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(`data:image/jpeg;base64,${result.base64}`);
            const body = {
                requests: [
                    {
                        image: {
                            content: result.base64,
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
        }
    };

    const selectImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(`data:image/jpeg;base64,${result.base64}`);
            const body = {
                requests: [
                    {
                        image: {
                            content: result.base64,
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
        }
    };


    const refresh = () => {
        setImage(null)
        setNames([])
    }


    console.log(names)

    return (
        <View style={styles.container}>

            {image && (
                <View style={{ position: 'relative' }}>
                    <Button title="Reset" onPress={() => refresh()} />
                    <Image source={{ uri: image }} style={styles.image} />
                    <DetectedObjects objects={objects} imageWidth={400} imageHeight={400} />
                    <View style={styles.labelContainer}>
                        {names && names.map((name, index) => (
                            <Text key={index} style={styles.label}>
                                {name}
                            </Text>
                        ))}
                    </View>
                </View>
            )}
            <Button title="Take a photo" onPress={takePhoto} />
            <Button title="Select a photo" onPress={selectImage} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
});

export default CameraScreen;
