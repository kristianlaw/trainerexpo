import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Text, View, TouchableOpacity } from 'react-native';

//Sivun tarkoituksena käyttää laitteen ominaisuuksia
//ja tuoda kameralle uuden tarkoituksen peilinä
//Monilla saleilla ei ole joka kohdassa peiliä, josta katsoa miten tekee liikkeitä
//Kameran mittasuhteet pidemmät => näkee itsensä paremmin
export default function GymCamera({navigation}) {
  const [gotPerm, setGotPerm] = useState(null); //Saako laite hyväksynnän kameralle
  const [type, setType] = useState(Camera.Constants.Type.back); //Etu-taka kamera


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setGotPerm(status === 'granted');
    })();
  }, []);

  //Saako luvan kameraan vai ei
  if (gotPerm === null) {
    return <View />;
  }

  if (gotPerm === false) {
    return <Text>Trainerexpo can't access the camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
    <Text style={{color: 'black', marginLeft: 20, marginTop: 10}}>Use this camera overlay as a mirror for your form</Text>
    <Text style={{color: 'black', marginLeft: 75}}>Press the button to turn the camera</Text>
      <Camera style={{flex: 1}} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            {/*kääntää kameran*/}
            <Text style={{ fontSize: 35, marginBottom: 10, color: 'white' }}>🔄</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
