import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image } from 'react-native-elements';


export default function Trainingplan({ route,  navigation }) {
  return (
    <View style={styles.container}>
      <Text h1>Trainerexpo</Text>
      <Text h4>Your best tool for gains</Text>

      <Image
        source={('../images/tartan-track.jpg')} //Ei toimi vielä
        style={{ width: 450, height: 300 }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: "bold"
  }
});
