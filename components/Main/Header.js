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
    Animated,
    TouchableWithoutFeedback, ScrollView
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Camera, HomeLogo, LoginIcon, LoginLogo, MenuIcon} from "../../Icons";
import LoginScreen from "../../screens/Login";
import {useSelector, useDispatch} from "react-redux";


const Header = ({navigation}) => {

    const user = useSelector(state => state.auth.user);
    const [object, setObjects] = useState([])
    const dispatch = useDispatch()

    const getUserDetections = () => {
        let myHeaders = new Headers();
        myHeaders.append("token", user.token);

        let raw = "";

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/objects/6421b25ee2fee38cdb0a518a", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    getUserDetections()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
               <View>
                   <MenuIcon width={30} height={30}/>
               </View>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize: 22, color:"#fff"}}>
                        <Text>
                            Welcome
                        </Text>
                    </Text>
                    <Text style={{fontSize: 18, color:"#fff",fontWeight:"bold",marginTop:10}}>
                        <Text>
                            {user.name}
                        </Text>
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Camera")} activeOpacity={0.6}>
                    <Camera width={30} height={30}/>
                </TouchableOpacity>
            </View>
            <Text style={{fontSize:32,color:"#fff",alignSelf:"center", fontWeight:"bold",marginBottom:7}}>
                Recents Tests
            </Text>
            <View style={styles.content}>
                <ScrollView>
                        <TouchableOpacity onPress={() => navigation.navigate("Objects",{
                            itemId:"23321"
                        })} activeOpacity={0.6}>
                            <View style={styles.objectContainer}>
                                <View style={{flexDirection:"row", alignItems:"center",columnGap:40}}>
                                    <View style={styles.detecteds}>
                                        <Text style={{color: "#fff"}}>
                                            IMAGE - 1
                                        </Text>
                                    </View>
                                    <Image source={{uri:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"}} style={styles.objectImg} />
                                </View>
                            </View>
                        </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#1e1e1e",
        paddingHorizontal:30,
        paddingVertical:20,
        paddingBottom:100
    },
    header : {
        flex:4,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    content: {
        flex:7,
        backgroundColor:"#2C2C2C",
        padding:10,
        marginBottom:20,
        borderRadius:30,
        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
        shadowOpacity:1,
        shadowRadius: 3,
    },
    objectContainer: {
        flexDirection:"row",
        marginVertical:10,
        paddingHorizontal:20,
        alignItems:"center",
        justifyContent:"space-between",
        paddingVertical:10,
    },
    objectImg:{
        width:90,
        height:90,
        borderRadius:10,
        borderWidth:5,
        borderColor:"#1e1e1e"
    },
    detecteds:{
        fontSize:16,
        fontWeight:"bold",
        color:"#fff",
        backgroundColor:"#1e1e1e",
        padding: 15,
        borderWidth:5,
        borderColor:"#1e1e1e",
        borderRadius:10
    }
})

export default Header;
