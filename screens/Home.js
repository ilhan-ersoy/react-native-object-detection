import React, {useState} from "react";
import {View, Text, Button, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from "../components/Main/Header";
import apiRequest from "../apiRequest";

const HomeScreen = ({navigation}) => {



    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor:"#1e1e1e" }}>
            <Header navigation={navigation}/>
        </SafeAreaView>
    );
}

export default HomeScreen;
