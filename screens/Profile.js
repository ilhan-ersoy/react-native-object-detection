import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {QuitApp} from "../Icons";

const ProfileScreen = ({ navigation }) => {
  const Quit = async () => {
    try {
      await AsyncStorage.removeItem('USER').then(navigation.navigate( 'Login'))
    } catch (exception) {
      console.log(exception)
      return false
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => Quit()}>
        <View style={styles.button}>
          <Text style={styles.button}>
            Çıkış Yap
          </Text>
          <View >
            <QuitApp size={90} />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign:"center",
    backgroundColor: '#1e1e1e',
    flexDirection:"row"
  },
  button: {
    justifyContent:"center",
    textAlign:"center",
    margin:60,
    alignItems:"center",
    flexDirection:"column",
    color:"#fff",
    fontSize:28,
    fontWeight:"bold"
  }
})
