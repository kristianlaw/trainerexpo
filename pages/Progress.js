import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TextInput, Animated  } from 'react-native';
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Text, Image, Button, ListItem, Slider } from 'react-native-elements';
import { SliderPicker } from 'react-native-slider-picker';




export default function Progress({ route,  navigation }) {
  const [ohp, setOhp] = useState([]); //Overheadpress = pystypunnerrus
  const [bench, setBench] = useState(0); //Benchpress = penkkipunnerrus
  const [squat, setSquat] = useState(0); // Kyykky
  const [slider, setSlider] = useState(0.5);



  const data = [
  { exercise: 1, weight: 70 },
  { exercise: 2, weight: 100 },
  { exercise: 3, weight: 140 },
  { exercise: 4, weight: 200 }
];


const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 197, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};

// 1/2/3 tarkoittaa 1 levy pystypunnerrus, 2 levyä penkkipunnerrus ja 3 levyä kyykyssä. 1 levy = 20kg per puoli. Sama kuin 60kg/100kg/140kg
  return (
    <View style={styles.container}>
      <Text h3>Track your progress</Text>
      <Text style={{marginTop: 10, marginLeft: 15}}>Using the 1/2/3 standard the chart shows how close you are to it procentually</Text>


      <TextInput placeholder='Barchart' onChangeValue={ohp => setOhp(ohp)}
        value={ohp}/>

        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="exercise" y="weight" />
        </VictoryChart>

          <Slider
            value={slider}
            onValueChange={(value) => setSlider({ value })}
          />
          <Text>Value: {slider}</Text>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
