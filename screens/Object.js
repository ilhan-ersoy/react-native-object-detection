import React, {useState} from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from "../components/Main/Header";
import apiRequest from "../apiRequest";
import {LeftArrow} from "../Icons";

const ObjectScreen = ({route, navigation}) => {

    const { itemId } = route.params;

    console.log(itemId)

    callGoogleVIsionApi = async (base64) => {
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor:"#1e1e1e" }}>
            <View style={styles.container}>

                <View style={styles.header}>

                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}>
                        <LeftArrow size={24} color={"#fff"}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={{maxHeight:240}}>
                        <Image source={{uri:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"}} style={styles.objectImg} />
                        <Text style={{color:"#fff",fontSize:22,marginVertical:4,fontWeight:"bold"}}>
                            Detected Objects
                        </Text>
                           <View style={styles.contentContainer}>
                               <ScrollView>
                                   {Array.from(Array(4), (_, i) => (
                                       <View key={i} style={{flexDirection:"row",columnGap:30,alignItems: "center",margin:10,justifyContent:"center",paddingRight:40,backgroundColor: "#1e1e1e",padding:10,borderRadius:15,}}>
                                           <Text style={{fontSize:16,color:"white"}}>
                                               {i+1}     Building
                                           </Text>
                                       </View>
                                   ))}
                               </ScrollView>
                           </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        flexDirection: "column",
        justifyContent: "center"
    },
    header:{
        flex:1,
    },
    content:{
        flex:16,
        justifyContent:"center",
        flexDirection:"row"

    },
    objectImg:{
        width:300,
        height:300,
        borderRadius:10,
        borderWidth:5,
        borderColor:"#1e1e1e"
    },
    detects:{

    },
    contentContainer:{
        padding: 20,
        flexDirection:"column",
        columnGap:20,
        backgroundColor:"#2C2C2C",
        borderRadius: 30,
        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
        shadowOpacity: 1,
        shadowRadius: 3,
        marginTop:10
    }
})

export default ObjectScreen;
