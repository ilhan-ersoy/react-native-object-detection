import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./Home";
import {Camera, CameraFocused, Profile, ProfileFocused, TabBarMenu, TabBarMenuFocused} from "../Icons";
import CameraScreen from "./Camera";
import { useRoute } from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../Redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileScreen from "./Profile";

const SettingsScreen = () => {

    const removeUserFromStorage = async () => {
        try {
            await AsyncStorage.removeItem('USER');
            return true;
        }
        catch(exception) {
            return false;
        }
    }

    const getUserFromStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('USER');
            if (value !== null) {
                console.log(value);
            } else {
                console.log("data doesnt exits.")
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title={"exit"} onPress={() => removeUserFromStorage()}/>
            <Button title={"test user"} onPress={() => getUserFromStorage()} />
        </View>
    );
}
const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.user);
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
                    elevation: 0,
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
                        if (focused) {
                            return <CameraFocused size={25} />
                        } else {
                            return <Camera size={25} />
                        }
                    }}
                }
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        if (focused) {
                            return <ProfileFocused size={25} />
                        } else {
                            return <Profile size={25} />
                        }
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
