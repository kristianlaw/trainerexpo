import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Login({ route,  navigation }) {
  return (
    <View style={styles.container}>
      <Text>Loginpage!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
