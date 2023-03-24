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

const Header = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
               <View>
                   <MenuIcon width={30} height={30}/>
               </View>
                <View>
                    <Text style={{fontSize: 22, color:"#fff"}}>
                        Welcome, ilhan.
                    </Text>
                </View>
                <View>
                    <Camera width={30} height={30}/>
                </View>
            </View>
            <Text style={{fontSize:32,color:"#fff",alignSelf:"center", fontWeight:"bold",marginBottom:7}}>
                Recents Tests
            </Text>
            <View style={styles.content}>

                <ScrollView>
                    <TouchableOpacity onPress={() => navigation.navigate("Objects",{itemId: "321019239012"})} activeOpacity={0.6}>
                        <View style={styles.objectContainer}>
                            <View>
                                <Text style={{fontSize:32,color:"#fff"}}>
                                    1.
                                </Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center",columnGap:10}}>
                                <View>
                                    <Text style={styles.detecteds}>
                                        Image Name
                                    </Text>
                                </View>
                                <Image source={{uri:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"}} style={styles.objectImg} />
                            </View>
                        </View>
                    </TouchableOpacity>
                        <View style={styles.objectContainer}>
                            <View>
                                <Text style={{fontSize:32,color:"#fff"}}>
                                    1.
                                </Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center",columnGap:10}}>
                                <View>
                                    <Text style={styles.detecteds}>
                                        Image Name
                                    </Text>
                                </View>
                                <Image source={{uri:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"}} style={styles.objectImg} />
                            </View>
                        </View>
                        <View style={styles.objectContainer}>
                            <View>
                                <Text style={{fontSize:32,color:"#fff"}}>
                                    1.
                                </Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center",columnGap:10}}>
                                <View>
                                    <Text style={styles.detecteds}>
                                        Image Name
                                    </Text>
                                </View>
                                <Image source={{uri:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"}} style={styles.objectImg} />
                            </View>
                        </View>
                        <View style={styles.objectContainer}>
                            <View>
                                <Text style={{fontSize:32,color:"#fff"}}>
                                    1.
                                </Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center",columnGap:10}}>
                                <View>
                                    <Text style={styles.detecteds}>
                                        Image Name
                                    </Text>
                                </View>
                                <Image source={{uri:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"}} style={styles.objectImg} />
                            </View>
                        </View>



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
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    objectContainer: {
        flexDirection:"row",
        marginVertical:10,
        paddingHorizontal:20,
        columnGap:20,
        alignItems:"center",
        justifyContent:"space-between",
        paddingVertical:10
    },
    objectImg:{
        width:90,
        height:90,
        borderRadius:10
    },
    detecteds:{
        fontSize:16,
        fontWeight:"bold",
        color:"#fff"
    }
})

export default Header;
