import { Magnetometer } from 'expo-sensors';
import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/MagnetometerStyles.js';
import { Text, Button } from 'react-native-elements';

//Mittaa magneettikentän vaihtelua

export default function Accelerometer() {
  const [data, setData] = useState({
          x: 0,
          y: 0,
          z: 0,
        });

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    toggle();
    return () => {
      unsub();
    };
  }, []);

  //Päälle tai pois
  const toggle = () => {
    if (subscription) {
      unsub();
    } else {
      subscribe();
    }
  };

  //Päivitysintervallit hidas-nopea
  const slow = () => {
    Magnetometer.setUpdateInterval(1000);
  };

  const fast = () => {
    Magnetometer.setUpdateInterval(16);
  };

  const subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {
        setData(result);
      })
    );
  };

  const unsub = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const { x, y, z } = data;
  return (
    <View style={styles.sensor}>
      <Text h3>Magnetometer</Text>
      <View style={{marginTop: 20}}>

      <Text h4>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggle} style={styles.button}>
          <Text>Toggle on/off</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}
