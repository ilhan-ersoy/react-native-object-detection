import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./Home";
import {Camera, Profile, TabBarMenu, TabBarMenuFocused} from "../Icons";
import CameraScreen from "./Camera";
import { useRoute } from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../Redux/authSlice";

const SettingsScreen = () => {



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}
const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {

    const user = useSelector(state => state.auth.user);

    console.log("giris yapan user:", user)

    return (
        <Tab.Navigator
            screenOptions={{
                    tabBarShowLabel:false,
                    headerShown:false,
                    tabBarStyle: {
                    position: 'absolute',
                    backgroundColor:"#3D3D3D",
                    borderRadius:10,
                    borderColor:"#1e1e1e",
                    bottom:20,
                    borderWidth:0,
                    elevation: 0,   // for Android
                    borderTopWidth:0,
                    height:60,
                    marginHorizontal:20
            },
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        if (!focused) {
                            return  <TabBarMenuFocused size={25} />
                        }
                        return <TabBarMenu size={25} />
                    }}
                }
            />
            <Tab.Screen
                name="Camera"
                component={CameraScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        if (!focused) {
                            return  <Camera width={25} height={25}/>
                        }
                        return  <Camera width={25} height={25}/>
                    }}
                }
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        if (!focused) {
                            return  <Profile size={23} />
                        }
                        return <Profile size={23} />
                    }}
                }
            />
        </Tab.Navigator>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#1e1e1e',
    },
    tabbar: {
        position: 'absolute',
        backgroundColor:"#3D3D3D",
        borderRadius:10,
        borderColor:"#1e1e1e",
        bottom:10,
        borderWidth:1,
        height:80,

    }
})
