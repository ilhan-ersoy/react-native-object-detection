import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { LoginIcon, LoginLogo, PasswordIcon } from '../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLoader from 'react-native-animated-loader';

const LoginScreen = ({ navigation }) => {


    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [secureText, setSecureText] = useState(true);

    const saveUserInStore = async (user) => {
        try {
            await AsyncStorage.setItem('USER', JSON.stringify(user));
        } catch (error) {
            console.log(error);
        }
    };

    const getUserFromStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('USER');
            if (value !== null) {
                // We have data!!
                return value;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const showAlert = (alertTitle, alertMessage) => {
        Alert.alert(alertTitle, alertMessage, [
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
            },
        ]);
    };

    useEffect(() => {
        getUserFromStorage().then((r) => {
            if (r) {
                console.log(r)
                // navigation.navigate('Main');
            }
        });
    }, []);

    const handleLogin = () => {
        if (!mail || !password) {
            showAlert('Hata', 'E-posta ve şifre boş bırakılamaz.');
            return;
        }
        setLoading(true);
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let raw = JSON.stringify({
            email: mail,
            password: password,
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://192.168.4.10:8080/users/login', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    console.log(result.error);
                    showAlert('Hata', 'E-posta veya şifre yanlış.');
                    setLoading(false)
                } else {
                    dispatch(setUser(result));
                    saveUserInStore(result).then((r) => {});
                    setLoading(true);

                    navigation.navigate('Main');
                    console.log(result)
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.log('Login Error!');
                console.log(error)
                setLoading(false)
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={styles.img}>
                    <LoginLogo />
                    <Text
                        style={{
                            fontSize: 28,
                            color: '#fff',
                            marginVertical: 10,
                            fontWeight: '900',
                        }}
                    >
                        GİRİŞ YAP
                    </Text>
                </View>
                {/*<AnimatedLoader*/}
                {/*    visible={loading}*/}
                {/*    overlayColor='#1e1e1e'*/}
                {/*    source={require('./loader.json')}*/}
                {/*    animationStyle={styles.lottie}*/}
                {/*    speed={2}*/}
                {/*></AnimatedLoader>*/}
                <View style={styles.LoginContainer}>
                    <View>
                        <Text style={styles.label}>E - Posta</Text>
                        <View style={{ position: 'relative' }}>
                            <View
                                style={{
                                    position: 'absolute',
                                    top: '25%',
                                    zIndex: 99,
                                    right: 30,
                                }}
                            >
                                <LoginIcon />
                            </View>
                            <TextInput
                                autoCapitalize={'none'}
                                onChangeText={(text) => setMail(text)}
                                style={styles.input}
                                value={mail}
                                placeholderTextColor={'#f2f2f2'}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Şifre</Text>
                        <View>
                            <View
                                style={{
                                    position: 'absolute',
                                    top: '25%',
                                    zIndex: 99,
                                    right: 30,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setSecureText(!secureText)}
                                >
                                    <PasswordIcon />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                autoCapitalize={'none'}
                                onChangeText={(text) => setPassword(text)}
                                style={styles.input}
                                value={password}
                                placeholderTextColor={'#f2f2f2'}
                                secureTextEntry={secureText}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => handleLogin()}
                        activeOpacity={0.6}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                justifyContent: 'center',
                                color: '#fff',
                            }}
                        >
                            GİRİŞ YAP
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                        style={styles.loginButton}
                        activeOpacity={0.6}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                justifyContent: 'center',
                                color: '#fff',
                            }}
                        >
                            Henüz bir hesabın yok mu? Kayıt ol
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    img: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 55,
    },
    lottie: {},
    LoginContainer: {
        flex: 8,
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginTop: 20,
        rowGap: 10,
        marginRight: 10,
    },
    input: {
        width: '100%',
        height: 48,
        paddingHorizontal: 14,
        margin: 10,
        backgroundColor: '#3d3d3d',
        borderRadius: 15,
        color: '#fff',
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    label: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 15,
        fontWeight: 'bold',
    },
    loginButton: {
        width: '100%',
        height: 48,
        paddingHorizontal: 14,
        margin: 10,
        backgroundColor: '#3d3d3d',
        borderRadius: 15,
        color: '#fff',
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;
