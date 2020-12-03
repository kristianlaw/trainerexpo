import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config';
import { styles } from '../styles/SignUpStyles'; //Tyylittelyt

export default function SignUpScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Sign In')
    }

    //Salasanan tarkistus
    const onRegisterPress = () => {
         if (password !== confirmPassword) {
             alert("Passwords don't match.")
             return
         }
         firebase
             .auth()
             .createUserWithEmailAndPassword(email, password)
             .then((response) => {
                 const uid = response.user.uid //uid = userID
                 const data = { //parametrit userille
                     id: uid,
                     email,
                     fullName,
                 };
                 const usersRef = firebase.firestore().collection('users') //firebase käyttäjät
                 usersRef
                     .doc(uid)
                     .set(data)
                     .then(() => {
                         navigation.navigate("Trainingplan", {user: data}) //navigoi "Trainingplan" datan kanssa.
                     })
                     .catch((error) => {
                         alert(error)
                     });
             })
             .catch((error) => {
                 alert(error)
         });
     }

     //KB aware scrollview targettaa fokusoituun kohtaan (esim input) kun painetaan näppäimistö
    return (
      <View style={styles.container}>
          <KeyboardAwareScrollView
              style={{ flex: 1, width: '100%' }}
              keyboardShouldPersistTaps="always">
              <Image
                  style={styles.logo}
                  source={require('../assets/mikementzer2.jpg')}
              />
              <TextInput
                  style={styles.input}
                  placeholder='Fullname'
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setFullName(text)}
                  value={fullName}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TextInput
                  style={styles.input}
                  placeholder='E-mail'
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  secureTextEntry
                  placeholder='Password'
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  secureTextEntry
                  placeholder='Confirm Password'
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => onRegisterPress()}>
                  <Text style={styles.buttonTitle}>Create an account</Text>
              </TouchableOpacity>
              <View style={styles.footerView}>
                  <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
              </View>
          </KeyboardAwareScrollView>
      </View>
    )
}
