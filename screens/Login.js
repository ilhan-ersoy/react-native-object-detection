import React, {useState} from "react";
import {View, Text, Button, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity} from "react-native";
import {LoginIcon, LoginLogo, PasswordIcon} from "../Icons";
import Spinner from "react-native-loading-spinner-overlay";



const LoginScreen = ({ navigation }) => {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    console.log(loading)
    const handleLogin = () => {
        navigation.navigate("Main")
        /*setLoading(true)
        let myHeaders = new Headers();
        setLoading(false)
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "first_name": "elif",
            "last_name": "tug",
            "email": "elif@tug.com",
            "password": "ares123.",
            "phone": "123456789"
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/users/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                navigation.navigate("Main")
            })
            .catch(error => {
                console.log('error', error)
                setLoading(false)
            }); */
    }


    return (
       <SafeAreaView style={styles.container}>
           <View style={{flex:1}}>
               <View style={styles.img}>
                   <LoginLogo />
                   <Text style={{fontSize:32, color:"#fff", marginVertical: 10, fontWeight:"700"}}>
                       VISION AL APP
                   </Text>

               </View>

               <View style={styles.LoginContainer}>
                   <View>
                       <Text style={styles.label}>
                           Mail
                       </Text>
                       <View style={{position:"relative"}}>
                           <View style={{position:"absolute", top:"25%",zIndex:99, right:30}}>
                               <LoginIcon />
                           </View>
                           <TextInput
                               onChangeText={(text) => setMail(text)}
                               style={styles.input}
                               value={mail}
                               placeholderTextColor={"#f2f2f2"}
                           />
                       </View>
                   </View>
                   <View>
                       <Text style={styles.label}>
                           Şifre
                       </Text>
                       <View>
                           <View style={{position:"absolute", top:"25%",zIndex:99, right:30}}>
                               <PasswordIcon />
                           </View>
                           <TextInput
                               onChangeText={(text) => setPassword(text)}
                               style={styles.input}
                               value={password}
                               placeholderTextColor={"#f2f2f2"}
                               secureTextEntry={true}
                           />
                       </View>
                   </View>
                   <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()} activeOpacity={0.6}>
                       <Text style={{fontSize:16, fontWeight:"bold", justifyContent:"center",color:"#fff"}}>
                           GİRİŞ YAP
                       </Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.loginButton} activeOpacity={0.6}>
                       <Text style={{fontSize:16, fontWeight:"bold", justifyContent:"center",color:"#fff"}}>
                           Henüz bir hesabın yok mu? Kayıt ol
                       </Text>
                   </TouchableOpacity>
               </View>
           </View>
       </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#1e1e1e',
    },
    img: {
        flex:3,
        justifyContent:"center",
        alignItems:"center",
        marginTop:55
    },
    LoginContainer: {
        flex:8,
        paddingVertical: 12,
        paddingHorizontal:10,
        marginTop:20,
        rowGap:10
    },
    input: {
        width:"100%",
        height: 48,
        paddingHorizontal: 14,
        margin:10,
        backgroundColor:'#3d3d3d',
        borderRadius:15,
        color:'#fff',
        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    label: {
        color:'#fff',
        fontSize:18,
        marginLeft: 15,
        fontWeight: "bold"
    },
    loginButton: {
        width:"100%",
        height: 48,
        paddingHorizontal: 14,
        margin:10,
        backgroundColor:'#3d3d3d',
        borderRadius:15,
        color:'#fff',
        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        justifyContent:"center",
        alignItems:"center",
    }
})

export default LoginScreen;
