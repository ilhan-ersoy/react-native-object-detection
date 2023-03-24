import React, {useState} from "react";
import {View, Text, Button, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./Home";
import {TabBarMenu, TabBarMenuFocused} from "../Icons";


const SettingsScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}
const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
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
                    height:75,
            },
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        if (!focused) {
                            return  <TabBarMenuFocused size={50} />
                        }
                        return <TabBarMenu size={50} />
                    }}
                }
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        if (!focused) {
                            return  <TabBarMenuFocused size={50} />
                        }
                        return <TabBarMenu size={50} />
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
