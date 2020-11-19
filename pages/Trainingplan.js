import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage, TextInput, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Text, Image, Button, ListItem } from 'react-native-elements';

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


  return (
    <View style={styles.container}>
    <View style={styles.header}>
          <Text h2>Custom gym routine</Text>
          <Text h5>Make your own gym routine and after completing an exercise press 'Done' on the list</Text>

        <TextInput style={styles.textinput} placeholder='Exercise' onChangeText={exercise => setExercise(exercise)}
          value={exercise}/>
        <TextInput style={styles.textinput} placeholder='Reps x Sets' onChangeText={amount => setAmount(amount)}
          value={amount}/>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C5FF',
  },
  containerone: {
    flex: 1,
  },
  containertwo: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 70,
    borderTopLeftRadius: 70,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0
  },
  button : {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  textinput: {
  marginTop: 10,
  width: 250,
  alignItems: 'center',
  borderWidth: 1,
},
listcontainer: {
    flexDirection: 'row',
  alignItems: 'center'
},
});
