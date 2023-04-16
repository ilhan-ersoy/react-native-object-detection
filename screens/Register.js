import React, {useState} from "react";
import {View, Text, Button, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity, LogBox} from "react-native";
import {LoginIcon, LoginLogo, PasswordIcon} from "../Icons";
import Spinner from "react-native-loading-spinner-overlay";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../Redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnimatedLoader from "react-native-animated-loader";


const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const cleanUp = () => {
        setFirstName("")
        setMail("")
        setPassword("")
    }

    console.log("user status:",user)


    const saveUserInStore = async (user) => {
        try {
            await AsyncStorage.setItem(
                'USER',
                user,
            );
        } catch (error) {
            console.log(error)
        }
    };

    const handleSignup = () => {
        setLoading(true)
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "name": firstName,
            "email": mail,
            "password": password,
            "user_type": "USER"
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/users/signup", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                dispatch(setUser(result))
                setLoading(false)
                navigation.navigate("Login")
            })
            .catch(error => {
                console.log('error', error)
                setLoading(false)
            });
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <View style={styles.img}>
                    <LoginLogo />
                    <Text style={{fontSize:28, color:"#fff", marginVertical: 20, fontWeight:"900"}}>
                        REGISTER
                    </Text>
                </View>
                <AnimatedLoader
                    visible={loading}
                    overlayColor="#1e1e1e"
                    source={require("./loader.json")}
                    animationStyle={styles.lottie}
                    speed={2}
                >
                </AnimatedLoader>
                <View style={styles.LoginContainer}>
                    <View>
                        <Text style={styles.label}>
                            İsim
                        </Text>
                        <View  style={{position:"relative"}}>
                            <View style={{ position: "absolute", top: "25%", zIndex: 99, right: 35 }}>
                                <LoginIcon />
                            </View>
                            <TextInput
                                autoCapitalize={"none"}
                                onChangeText={(text) => setFirstName(text)}
                                style={styles.input}
                                value={firstName}
                                placeholderTextColor={"#f2f2f2"}
                            />
                        </View>

                    </View>
                    <AnimatedLoader
                        visible={loading}
                        overlayColor="#1e1e1e"
                        source={require("./loader.json")}
                        animationStyle={styles.lottie}
                        speed={1.2}
                    >
                    </AnimatedLoader>
                    <View>
                        <Text style={styles.label}>
                            Mail
                        </Text>
                        <TextInput
                            autoCapitalize={"none"}

                            onChangeText={(text) => setMail(text)}
                            style={styles.input}
                            value={mail}
                            placeholderTextColor={"#f2f2f2"}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>
                            Şifre
                        </Text>
                        <View style={{position:"relative"}}>
                            <View style={{ position: "absolute", top: "25%", zIndex: 99, right: 37 }}>
                                <PasswordIcon />
                            </View>
                            <TextInput
                                autoCapitalize={"none"}

                                onChangeText={(text) => setPassword(text)}
                                style={styles.input}
                                value={password}
                                placeholderTextColor={"#f2f2f2"}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={() => handleSignup()} activeOpacity={0.6}>
                        <Text style={{fontSize:16, fontWeight:"bold", justifyContent:"center",color:"#fff"}}>
                            KAYIT OL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginButton} activeOpacity={0.6}>
                        <Text style={{fontSize:16, fontWeight:"bold", justifyContent:"center",color:"#fff"}}>
                            Hesabın var mı? Giriş yap
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
        backgroundColor:"#1e1e1e",
    },
    img: {
        flex:2,
        justifyContent:"center",
        alignItems:"center",
        marginTop:35
    },
    LoginContainer: {
        flex:8,
        paddingVertical: 12,
        paddingHorizontal:10,
        marginTop:20,
        rowGap:10
    },
    input: {
        width:"90%",
        height: 48,
        paddingHorizontal: 14,
        margin:10,
        backgroundColor:"#3d3d3d",
        borderRadius:15,
        color:"#fff",
        shadowOffset: {width: -2, height: 4},
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    label: {
        color:"#fff",
        fontSize:18,
        marginLeft: 15,
        fontWeight: "bold"
    },
    loginButton: {
        width:"94%",
        height: 48,
        paddingHorizontal: 14,
        margin:10,
        backgroundColor:'#3d3d3d',
        borderRadius:15,
        color:'#fff',
        shadowOffset: {width: -2, height: 4},
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        justifyContent:"center",
        alignItems:"center",
    }
})

export default RegisterScreen;
