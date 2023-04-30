import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = ({ navigation }) => {
  const Quit = async () => {
    try {
      await AsyncStorage.removeItem('USER').then(navigation.navigate('Login'))
    } catch (exception) {
      console.log(exception)
      return false
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', backgroundColor: '#1e1e1e' }}
    >
      <TouchableOpacity activeOpacity={0.5} onPress={() => Quit()}>
        <View>
          <Text style={{ color: '#fff', fontSize: 32, textAlign: 'center' }}>
            Çıkış Yap
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProfileScreen
