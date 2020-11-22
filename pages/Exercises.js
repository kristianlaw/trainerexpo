import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage, TextInput, FlatList, Linking } from 'react-native';
import { Text, Image, Button, ListItem, Tooltip } from 'react-native-elements';
import { styles } from '../styles/ExerciseStyles';


export default function Exercises({ navigation }) {
  const [muscle, setMuscle] = useState('');

  useEffect(() => {
     getMuscle();
  });

  const getMuscle = () => {
    fetch('https://wger.de/api/v2/exercisecategory/?format=json')
    .then(response => response.json())
    .then(data => setMuscle(data.results))
    .catch(err => console.error(err))
  }


  const listSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "80%",
            backgroundColor: "#CED0CE",
            marginLeft: "10%"
          }}
        />
      );
    };

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <Tooltip popover={<Text>{muscle.id}</Text>}>
          <Text>{muscle.name} </Text>
        </Tooltip>
        </ListItem.Content>
        <ListItem.Chevron  />
      </ListItem> )

  return (
    <View style={styles.container}>
      <Text h3 style={{color: '#1877F2'}}>Exercises & Info </Text>
      <Text style={styles.link} onPress={() => { Linking.openURL('https://wger.de/en/exercise/overview/'); }}>Extensive list of exercises (link) </Text>

      <Text style={{marginLeft: 10, marginRight: 10, fontWeight: 'bold', marginTop: 10}}>You should pair upperbody musclegroups together for an effective workout.
      For example Chest and Shoulders are a staple combo that most people use.
      </Text>

      <FlatList
        style={{marginLeft : "1%", marginTop: 10}}
        ItemSeparatorComponent={listSeparator}
        data={muscle}
        keyExtractor={item => item.results}
        renderItem={({item}) =>
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text>{item.name}</Text>
          </View>
        } />

      <StatusBar style="auto" />
    </View>

  );
}
