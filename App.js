import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './pages/HomeScreen';
import SignUpScreen from './pages/SignUpScreen'; //Register
import SignInScreen from './pages/SignInScreen'; //Login
import Trainingplan from './pages/Trainingplan'; //Trainingplan
import Progress from './pages/Progress'; //Trainingplan
import Exercises from './pages/Exercises'; //Exerciselist
import GymCamera from './pages/GymCamera'; //GymCamera
import Magnetometer from './pages/Magnetometer'; //Magnetometer
const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
//Jos käyttäjä kirjautuu (user) niin näyttää Trainingplan propseilla.
  return (
    <NavigationContainer>
          <Stack.Navigator>
            { user ? (
              <Stack.Screen name="Trainingplan">
                {props => <Trainingplan {...props} extraData={user} />}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen name="Sign In" component={SignInScreen} />
                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen name="Trainingplan" component={Trainingplan} />
                <Stack.Screen name="Progress" component={Progress} />
                <Stack.Screen name="Exercises" component={Exercises} />
                <Stack.Screen name="GymCamera" component={GymCamera} />
                <Stack.Screen name="Magnetometer" component={Magnetometer} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>

  );
}
