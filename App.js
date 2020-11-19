import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LoadingScreen from './pages/LoadingScreen';
import HomeScreen from './pages/HomeScreen';
import SignUpScreen from './pages/SignUpScreen'; //Register
import SignInScreen from './pages/SignInScreen'; //Login
import Trainingplan from './pages/Trainingplan'; //Trainingplan


const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);



  return (
    <NavigationContainer>
          <Stack.Navigator>
            { user ? (
              <Stack.Screen name="Home">
                {props => <HomeScreen {...props} extraData={user} />}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen name="Sign In" component={SignInScreen} />
                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen name="Trainingplan" component={Trainingplan} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>

  );
}
