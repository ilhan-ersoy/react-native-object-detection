import * as React from 'react';
import {Button, View, Text, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./screens/Login";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import MainScreen from "./screens/Main";
import {useState} from "react";
import ObjectScreen from "./screens/Object";
import CameraScreen from "./screens/Camera";

import { useRoute } from '@react-navigation/native';
import {Provider, useDispatch} from "react-redux";
import store from "./Redux/store";
import ProfileScreen from "./screens/Profile";



function SettingsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const Stack = createStackNavigator();

function MyStack() {



    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Main" options={{gestureEnabled:false}} component={MainScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Objects" component={ObjectScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />

        </Stack.Navigator>
    );
}

export default function App() {


    return (
        <Provider store={store}>
            <NavigationContainer style={{position: "relative"}}>
                <MyStack/>
            </NavigationContainer>
        </Provider>


    );
}

const styles = StyleSheet.create({
    MainContainer: {
        position:"absolute",
        zIndex:99,
        top:30,
        left:0
    },
    animatedBox:
        {
            width : 180,
            height: 1200,
            backgroundColor : '#202020'
        },

    text:{
        color : '#FFFFFF'
    }
})
