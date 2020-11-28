import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'; //Firebase config file *PRIVATE*
import { styles } from '../styles/SignInStyles'; //Tyylittelyt

export default function SignInScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Sign-in or Login navigation
    const navigationLink = () => {
        navigation.navigate('Sign Up')
    }

    //Trainingplan navigation
    const navigationLink2 = () => {
        navigation.navigate('Trainingplan')
    }
    //Progress navigation
    const navigationLink3 = () => {
        navigation.navigate('Progress')
    }
    //GymCamera navigation
    const navigationLink4 = () => {
        navigation.navigate('GymCamera')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("There is no user named this.") //jos ei löydy käyttäjää
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate("Home", {
                          params: { user } //Vaihda mahdollisesti
                        })
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/mikementzer.jpg')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Login</Text>
                </TouchableOpacity>

                <View style={styles.footerView}>
                    <Text onPress={navigationLink} style={styles.link}>Make an account</Text>
                    <Text onPress={navigationLink2} style={styles.link}>Trainingplan</Text>
                    <Text onPress={navigationLink3} style={styles.link}>Progress</Text>
                    <Text onPress={navigationLink4} style={styles.link}>GymCamera</Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
