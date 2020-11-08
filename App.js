import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Progress from './pages/Progress';
import Trainingplan from './pages/Trainingplan';
import Home from './pages/Home';
import Startscreen from './pages/Startscreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Startscreen" component={Startscreen} />
        <Tab.Screen name="Progress" component={Progress} />
        <Tab.Screen name="Trainingplan" component={Trainingplan} />
        </Tab.Navigator>
    </NavigationContainer>

  );
}
