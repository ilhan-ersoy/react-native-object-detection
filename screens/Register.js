import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { LoginIcon, LoginLogo, PasswordIcon } from '../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [hidePassword, setHidePassword] = useState(false);
    const [secureText, setSecureText] = useState(false)

    const cleanUp = () => {
        setFirstName('');
        setMail('');
        setPassword('');
    };

    const saveUserInStore = async (user) => {
        try {
            await AsyncStorage.setItem('USER', user);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignup = () => {
        if (!firstName || !mail || !password) {
            Alert.alert('Hata', 'İsim, e-posta ve şifre boş bırakılamaz.');
            return;
        }

        if (!validateEmail(mail)) {
            Alert.alert('Hata', 'Geçerli bir e-posta adresi girin.');
            return;
        }

        setLoading(true);
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let raw = JSON.stringify({
            name: firstName,
            email: mail,
            password: password,
            user_type: 'USER',
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://192.168.4.10:8080/users/signup', requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                dispatch(setUser(result));
                setLoading(false);
                navigation.navigate('Login');
            })
            .catch((error) => {
                setLoading(false);
                console.log('error', error);
            });
    };

    const validateEmail = (email) => {
        // Email validation logic
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
                        KAYIT OL
                    </Text>
                </View>

                <View style={styles.LoginContainer}>
                    <View>
                        <Text style={styles.label}>İsim</Text>
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
                                onChangeText={(text) => setFirstName(text)}
                                style={styles.input}
                                value={firstName}
                                placeholderTextColor={'#f2f2f2'}
                            />
                        </View>
                    </View>
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
                        onPress={() => handleSignup()}
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
                            KAYIT OL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
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
                            Hesabın var mı? Hemen Giriş Yap!
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
        flex: 1,
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

export default RegisterScreen;
