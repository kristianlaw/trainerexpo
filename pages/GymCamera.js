import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';

//Sivun tarkoituksena käyttää laitteen ominaisuuksia
//ja tuoda kameralle uuden tarkoituksen peilinä
//Monilla saleilla ei ole joka kohdassa peiliä, josta katsoa miten tekee liikkeitä

export default function GymCamera({navigation}) {
  const [gotPerm, setGotPerm] = useState(null); //Saako laite hyväksynnän kameralle
  const [type, setType] = useState(Camera.Constants.Type.back); //Etu-taka kamera
  const cameraRef = useRef();
  let [takenPhoto, setTakenPhoto] = useState('');


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
  const snap = async () => {
      if (cameraRef) {
        let photo = await cameraRef.current.takePictureAsync();
        alert(photo.uri)
        setTakenPhoto(photo.uri)
      }
}

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{flex: 1}} type={type} ref={cameraRef}>


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
            >

            <View style={{flex:1, flexDirection:"row", margin: 40}}>

                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }} onPress={snap}>
                  <FontAwesome
                      name="camera"
                      style={{ color: "#fff", fontSize: 40}}/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }} onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}>
                  <MaterialCommunityIcons
                      name="camera-switch"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>

              </View>
          </TouchableOpacity>
        </View>
      </Camera>
      <Image source={{ uri: takenPhoto }} resizeMode="contain" style={{ width: 100, height: 100 }} />
    </View>
  );
}
