import React, {useEffect, useState} from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    RefreshControl,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {
    Camera,
    CameraFocused, ClearAllIcon,
    DeleteIcon,
    DeleteTest,
    GoTest,
    LoginLogo,
    MenuIcon,
    SearchIcon,
} from "../Icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({navigation}) => {
    const user = useSelector((state) => state.auth.user);
    const [objects, setObjects] = useState([]);
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            getUserDetection();
        }, 2000);
    }, []);

    useEffect(() => {
        return navigation.addListener("focus", () => {
            getUserDetection();
            onRefresh();
        });
    }, [navigation]);

    const handeDeleteItem = (item) => {
        Alert.alert(`Testi silmek istediğinizde emin misiniz?`, "Testi Sil", [
            {
                text: "Iptal",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Testi Sil",
                style: "destructive",
                onPress: () => deleteItem(item.ID),
            },
        ]);
    };


    const deleteAllItems = () => {
        var raw = "";

        if (!user) {
            alert("error")
            return
        }

        var requestOptions = {
            method: 'DELETE',
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://192.168.4.10:8080/objects/delete/${user.user_id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    const deleteItem = (itemID) => {
        let myHeaders = new Headers();

        myHeaders.append("token", user.token);

        // console.log(itemID)
        let requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: "",
            redirect: "follow",
        };

        fetch(`http://192.168.0.8:8080/object/delete/${itemID}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                onRefresh();
            })
            .catch((error) => console.log("error", error));
    };

    const getUserDetection = () => {
        if (user) {
            let myHeaders = new Headers();
            myHeaders.append("token", user.token);

            let requestOptions = {
                method: "GET",
                headers: myHeaders,
                body: "",
                redirect: "follow",
            };

            fetch(`http://192.168.4.10:8080/objects/${user.ID}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setObjects(result.data);
                })
                .catch((error) => console.log("HOME ERROR!", error));
        }
    };


    return (
        <SafeAreaView
            style={{flex: 1, justifyContent: "center", backgroundColor: "#1e1e1e"}}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View>
                            <MenuIcon width={30} height={30}/>
                        </View>
                    </TouchableOpacity>

                    <View style={{alignItems: "center"}} onn>
                        <Text style={{fontSize: 22, color: "white"}}>
                            Hoşgeldin, {user && user.name}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Camera")}
                        activeOpacity={0.6}
                    >
                        <CameraFocused size={30}/>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        margin: 30,
                        columnGap: 25,
                        alignItems: "center",
                    }}
                >
                    <View>
                        <LoginLogo size={80}/>
                    </View>
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <Text
                            style={{
                                fontSize: 32,
                                color: "#fff",
                                alignSelf: "center",
                                fontWeight: "bold",
                                marginBottom: 7,
                            }}
                        >
                            Geçmiş Testlerim
                        </Text>
                        <Text style={{color: "#fff", fontSize: 24, fontWeight: "bold"}}>
                            ({objects ? objects.length : "Test yok!"})
                        </Text>
                        <TouchableOpacity style={{justifyContent:"center", flexDirection:"row", alignItems:"center"}} onPress={() => deleteAllItems()}>
                            <Text style={styles.clearAllButton}>
                                Testleri Temizle
                            </Text>
                            <ClearAllIcon size={22} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content}>
                    <FlatList
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                        }
                        data={objects}
                        renderItem={({item, index}) => (
                            <View
                                key={index}
                                style={{
                                    alignItems: "center",
                                    rowGap: 10,
                                    flexDirection: "column",
                                    position: "relative",
                                }}
                            >
                                <View style={styles.detectedObjectContainer}>
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            rowGap: 10,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "#fff",
                                                fontWeight: "bold",
                                                fontSize: 16,
                                            }}
                                        >
                                            IMAGE
                                        </Text>
                                        <Image
                                            source={{uri: item.image}}
                                            style={{width: 100, height: 100, borderRadius: 10}}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            rowGap: 10,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "#fff",
                                                fontWeight: "bold",
                                                fontSize: 16,
                                            }}
                                        >
                                            Objects
                                        </Text>
                                        <View
                                            style={{
                                                width: 100,
                                                height: 100,
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    backgroundColor: "#2c2c2c",
                                                    width: 100,
                                                    height: 100,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: 10,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "#fff",
                                                        fontSize: 22,
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {item.labels && item?.labels?.length}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{position: "relative"}}>
                                        <View
                                            style={{
                                                position: "absolute",
                                                top: -88,
                                                zIndex: 99,
                                                right: -20,
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: "#2c2c2c",
                                                    padding: 10,
                                                    borderRadius: 30,
                                                }}
                                                onPress={() =>
                                                    navigation.navigate("Objects", {
                                                        itemId: item.ID,
                                                        token: user.token,
                                                    })
                                                }
                                                activeOpacity={0.5}
                                            >
                                                <GoTest size={22}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                position: "absolute",
                                                bottom: -88,
                                                zIndex: 99,
                                                right: -20,
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => handeDeleteItem(item)}
                                                style={{
                                                    backgroundColor: "#2c2c2c",
                                                    padding: 10,
                                                    borderRadius: 30,
                                                }}
                                                activeOpacity={0.5}
                                            >
                                                <DeleteIcon size={22}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(object) => object.id}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1e1e1e",
        paddingVertical: 20,
        paddingBottom: 100,
        paddingHorizontal: 20,
    },
    header: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    content: {
        flex: 7,
        backgroundColor: "#2C2C2C",
        marginBottom: 20,
        borderRadius: 30,
        padding: 20,
        shadowOffset: {width: -2, height: 4},
        shadowColor: "#171717",
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    objectContainer: {
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    objectImg: {
        width: 90,
        height: 90,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "#1e1e1e",
    },
    detecteds: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#1e1e1e",
        padding: 15,
        borderWidth: 5,
        borderColor: "#1e1e1e",
        borderRadius: 10,
    },
    detectedObjectContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        marginVertical: 20,
        backgroundColor: "#1e1e1e",
        paddingHorizontal: 20,
        borderRadius: 20,
        shadowOffset: {width: -2, height: 4},
        shadowColor: "#171717",
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    scrollView: {},
    clearAllButton: {
        color: "#fff",
        margin: 14,
        fontSize: 14,
        backgroundColor: "#3d3d3d",
        padding: 10,
        borderWidth: 1,
        borderColor: "#3d3d3d",
        fontWeight: "bold",
    }
});

export default HomeScreen;
