import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MoviesToDay from './MoviesToDay';
export default function Index() {
  return (
   
      <View style={style.container}>
        <Text style={style.TextIndex}>Movie DB</Text>
        <MoviesToDay/>
      </View>
   
  );
}


const style= StyleSheet.create({
  container:{
    width:'100%',
    marginTop:50,
  },
  TextIndex:{
    color: 'black',
    textAlign:'center',
    fontSize: 25,
    fontWeight: 'bold',
  }
})