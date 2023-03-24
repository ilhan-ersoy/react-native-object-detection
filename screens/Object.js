import React, {useState} from "react";
import {View, Text, Button, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from "../components/Main/Header";
import apiRequest from "../apiRequest";

const ObjectScreen = ({route, navigation}) => {

    const { itemId } = route.params;

    console.log(itemId)

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor:"#1e1e1e" }}>
            <View>
                <Text>
                    10
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default ObjectScreen;
