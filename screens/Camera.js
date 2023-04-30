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

const CameraScreen = ({ navigation }) => {
  const user = useSelector(state => state.auth.user)
  const [image, setImage] = useState(null)
  const [objects, setObjects] = useState([])

  const [cameraRef, setCameraRef] = useState(null)
  const [photo, setPhoto] = useState(null)

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync()
      setPhoto(photo)
    }
  }

  const convertToBase64 = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 400 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    )
  }

  const saveImage = () => {
    var myHeaders = new Headers()
    myHeaders.append(
      'token',
      user.token      
    )

    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      name: user.user_id,
      user_id: user.user_id,
      image: image,
      labels: [...objects]
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('http://localhost:8080/object-detection', requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
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
          const objects =
            response.data.responses[0].localizedObjectAnnotations.map(
              object => object.name
            )
          setObjects(objects)
          saveImage()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {objects.length > 0 && (
        <Text style={{ marginTop: 10 }}>
          Objects in the image: {objects.join(', ')}
        </Text>
      )}
      <Button title='Select a photo' onPress={selectImage} />
      {/* <Button title="Take a photo" onPress={takePicture} /> */}
    </View>

    // <Camera
    //   style={{ flex: 1 }}
    //   type={Camera.Constants.Type.back}
    //   ref={ref => {
    //     setCameraRef(ref)
    //   }}
    // >
    //   <View style={{ flex: '1' }}>
    //     <TouchableOpacity
    //       style={{ flex: 1, alignSelf: 'flex-end', alignItems: 'center' }}
    //       onPress={() => takePicture()}
    //     >
    //       <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
    //         Take picture
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </Camera>
  )
}

export default CameraScreen
