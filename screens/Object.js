import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView, FlatList
} from "react-native";
import {DeleteTest, Detected, GoTest, LeftArrow} from "../Icons";
import AnimatedLoader from "react-native-animated-loader";

const ObjectScreen = ({route, navigation}) => {

    const { itemId, token } = route.params;
    const [loading, setLoading] = useState(false)

    const [content, setContent] = useState({});
    const getObjectDetails = () => {
        setLoading(true)
        let myHeaders = new Headers();
        myHeaders.append(
            "token",
            token
        );

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: "",
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/object/get/${itemId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setContent(result)
                setTimeout(() => setLoading(false),1000)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            });
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getObjectDetails()
        });

        return unsubscribe;
    }, [navigation]);



    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor:"#1e1e1e" }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}>
                        <LeftArrow size={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>

                <AnimatedLoader
                    visible={loading}
                    overlayColor="#1e1e1e"
                    source={require("./loader.json")}
                    animationStyle={styles.lottie}
                    speed={2}
                >
                </AnimatedLoader>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontWeight:"bold",fontSize:32,color:"#fff",marginVertical:1}}>
                        FOTO
                    </Text>
                </View>
                <View style={styles.content}>
                    <View style={{maxHeight:240}}>

                        <Image source={{uri:content.image}} style={styles.objectImg} />
                        <View style={styles.contentContainer}>
                               <FlatList
                                   data={content.labels}
                                   renderItem={({item, index}) =>
                                       <>
                                           <View style={{position:"absolute",backgroundColor:"#2c2c2c",padding:2,zIndex:99,borderRadius:30,left:1}}>
                                               <TouchableOpacity style={{backgroundColor:"#2c2c2c",padding:10,borderRadius:30}} onPress={() => navigation.navigate("Objects", {
                                                   itemId:item.ID,
                                                   token:user.token
                                               })} activeOpacity={0.5}>
                                                   <Detected size={20} />
                                               </TouchableOpacity>
                                           </View>
                                           <View style={{flexDirection:"row",columnGap:30,alignItems: "center",margin:10,justifyContent:"center",paddingRight:40,backgroundColor: "#1e1e1e",padding:20,borderRadius:15,}}>
                                               <Text style={{fontSize:22,color:"white"}}>
                                                   {item}
                                               </Text>
                                           </View>
                                       </>
                                   }
                                   keyExtractor={object => object.id}
                               />
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
        marginTop:10,
        position:"relative"
    }
})

export default ObjectScreen;
