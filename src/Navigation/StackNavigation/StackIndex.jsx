import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Index from '../../Home/Index';
import MovieDetails from '../../Home/DetailsMovies/MovieDetails';
const Stack=createNativeStackNavigator();
export default function StackIndex() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Index} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        
    </Stack.Navigator>
  )
}