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


function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Notifications"
                onPress={() => navigation.navigate('Notifications')}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

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
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Objects" component={ObjectScreen} />
        </Stack.Navigator>
    );
}

export default function App() {

    return (
        <NavigationContainer style={{position: "relative"}}>
            <MyStack/>
        </NavigationContainer>
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
