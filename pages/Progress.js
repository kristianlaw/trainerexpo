import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage, TextInput, FlatList, Linking, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SQLite from 'expo-sqlite';
import { Text, Image, Button, ListItem } from 'react-native-elements';
import { styles } from '../styles/TrainingplanStyles';

const db = SQLite.openDatabase('progressdb.db');

export default function Progress({ navigation }) {

  const [exercise, setExercise] = useState(''); //exercise and reps
  const [weight, setWeight] = useState(''); // weight
  const [done, setDone] = useState([]);

  useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists progress (id integer primary key not null, exercise text, weight text);');
      });
      refresh();
    }, []);

    const save = () => {
        db.transaction(tx => {
            tx.executeSql('insert into progress (exercise, weight) values (?, ?);', [exercise, weight]);
          }, null, refresh
        )
      }

      const refresh = () => {
          db.transaction(tx => {
            tx.executeSql('select * from progress;', [], (_, { rows }) =>
              setDone(rows._array)
            );
          });
        }

      const deleteItem = (id) => {
        db.transaction(
          tx => {
            tx.executeSql(`delete from progress where id = ?;`, [id]);
          }, null, refresh
        )
      }


      const listSeparator = () => {
          return (
            <View
                  style={{
                    height: 5,
                    width: "80%",
                    backgroundColor: "white",
                    marginLeft: "10%"
                  }}
                />
              );
            };

  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
    <View style={styles.header}>

          <Text h2 style={{color: "white", fontWeight: "bold"}}>Progress</Text>
          <Text h5 style={{color: "white", marginLeft: 15, marginTop: 10, fontWeight: "bold"}}>Track your progress!</Text>

        <TextInput style={styles.input}
          placeholder='Exercise and repetitions'
          onChangeText={exercise => setExercise(exercise)}
          value={exercise}
          underlineColorAndroid="transparent"
          placeholderTextColor="#aaaaaa"
        />
        <TextInput style={styles.input}
          placeholder='Weight'
          onChangeText={weight => setWeight(weight)}
          value={weight}
          placeholderTextColor="#aaaaaa"
        />

    <View style={{width: 250, marginLeft: '20%', marginRight: '20%', marginTop: 15}}>
        <Button onPress={save} title="Save" />
    </View>
    </View>



    <View style={styles.containertwo}>

    <FlatList
      style={{width: '70%', marginLeft: '15%' ,marginRight: '15%', marginTop: 3}}
      keyExtractor={item => item.id.toString()}
      data={done}
      renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.exercise}</ListItem.Title>
              <ListItem.Subtitle>{item.weight}</ListItem.Subtitle>
            </ListItem.Content>
            <Text style={{fontSize: 14, color: '#C8C8C8'}} onPress={() => deleteItem	(item.id)}> Done</Text>
            <ListItem.Chevron onPress={() => deleteItem(item.id)} />
          </ListItem>
        )}
        />

        <StatusBar style="auto" />

      </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
