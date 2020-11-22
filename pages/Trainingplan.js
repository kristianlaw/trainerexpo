import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage, TextInput, FlatList, Linking, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SQLite from 'expo-sqlite';
import { Text, Image, Button, ListItem } from 'react-native-elements';
import { styles } from '../styles/TrainingplanStyles';

const db = SQLite.openDatabase('trainingdb.db');

export default function Trainingplan({ navigation }) {

  const [exercise, setExercise] = useState('');
  const [amount, setAmount] = useState(''); // repetitions and sets
  const [done, setDone] = useState([]);

  useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists training (id integer primary key not null, exercise text, amount text);');
      });
      refresh();
    }, []);

    const save = () => {
        db.transaction(tx => {
            tx.executeSql('insert into training (exercise, amount) values (?, ?);', [exercise, amount]);
          }, null, refresh
        )
      }

      const refresh = () => {
          db.transaction(tx => {
            tx.executeSql('select * from training;', [], (_, { rows }) =>
              setDone(rows._array)
            );
          });
        }

      const deleteItem = (id) => {
        db.transaction(
          tx => {
            tx.executeSql(`delete from training where id = ?;`, [id]);
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


      const onFooterLinkPress = () => {
            navigation.navigate('Exercises')
        }

  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
    <View style={styles.header}>

          <Text h2 style={{color: "white", fontWeight: "bold"}}>Custom gym routine</Text>
          <Text h5 style={{color: "white", marginLeft: 15, marginTop: 10, fontWeight: "bold"}}>Make your own gym routine and after completing an exercise press 'Done' on the list</Text>
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>Click here for list of exercises</Text>

        <TextInput style={styles.input}
          placeholder='Exercise'
          onChangeText={exercise => setExercise(exercise)}
          value={exercise}
          underlineColorAndroid="transparent"
          placeholderTextColor="#aaaaaa"
        />
        <TextInput style={styles.input}
          placeholder='Reps x Sets'
          onChangeText={amount => setAmount(amount)}
          value={amount}
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
              <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
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
