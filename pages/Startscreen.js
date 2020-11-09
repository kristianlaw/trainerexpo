import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image, Button } from 'react-native-elements';
import Home from './Home';
import Login from './Login';


export default function Trainingplan({ route,  navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text h1>Trainerexpo</Text>
        <Text h4>Your best tool for gains</Text>
      </View>
    {/*  <Image
        source={require('../images/tartan-track.jpg')} //Ei lataa kuvaa
        style={{ width: 450, height: 200, marginTop: 20 }}
      /> */}
      <View style={styles.containertwo}>
        <View style={styles.button}>
        <Button onPress={() => navigation.navigate('Login')}
          title="Start your EPIC fitness journey!"
        />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C5FF',
  },
  containerone: {
    flex: 1,
  },
  containertwo: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 70,
    borderTopLeftRadius: 70,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  button : {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 100
  }
});
