import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage, TextInput, FlatList, Linking } from 'react-native';
import { Text, Image, Button, ListItem, Tooltip } from 'react-native-elements';
import { styles } from '../styles/ExerciseStyles';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Exercises and info
export default function Exercises({ navigation }) {
  const [muscle, setMuscle] = useState('');
  const [data, setData] = useState([
      {exercise: 1, weight: 60 },
      {exercise: 2, weight: 100 },
      {exercise: 3, weight: 140 },
      {exercise: 4, weight: 180 }
      ])
  const exercises = [
  {
    id: 'Overheadpress',
    weight: '60kg'
  },
  {
    id: 'Benchpress',
    weight: '100kg'
  },
  {
    id: 'Squat',
    weight: '140kg'
  },
  {
    id: 'Deadlift',
    weight: '180kg'
  }
]

  useEffect(() => {
     getMuscle();
  });

  //Hakee lihasryhmiä apista
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
    <KeyboardAwareScrollView
        style={{ flex: 1, width: '95%' }}
        keyboardShouldPersistTaps="always">


      <Text h3 style={{color: 'white', marginLeft: 75}}>Exercises & Info </Text>

      <View style={styles.linkcontainer}>
      <Text style={styles.link} onPress={() => { Linking.openURL('https://wger.de/en/exercise/overview/'); }}>Extensive list of exercises (link) </Text>
      </View>

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

    <View style={styles.containertwo}>
    <Text h3 style={{color: '#00C5FF'}}>Standards</Text>
    <Text style={{marginLeft: 15, marginRight: 7, fontWeight: 'bold', marginTop: 10}}>Here are some widely known standards that people use
      as a goal to follow. *See Chart*
    </Text>
    <Text style={{marginLeft: 0, marginRight: 0, fontWeight: 'bold', marginTop: 10}}>
      1/2/3/4 = plates per side on exercise
    </Text>
    <Text style={{marginLeft: 0, marginRight: 0, marginTop: 0}}>
      1plate*2 + bar = 60kg for OHP. (Plate/Bar = 20kg)
    </Text>


    <FlatList
      style={{marginLeft : "0%", marginTop: 10}}
      ItemSeparatorComponent={listSeparator}
      data={exercises}
      keyExtractor={item => item.id}
      renderItem={({item}) =>
        <View style={{flex:1, flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>{item.id} {item.weight}</Text>
        </View>
      } />

    <VictoryChart width={350} theme={VictoryTheme.material}>
      <VictoryBar data={data} x="exercise" y="weight" />
    </VictoryChart>
</View>
      </KeyboardAwareScrollView>
      <StatusBar style="auto" />
    </View>

  );
}
