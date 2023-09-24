import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../../Profile/Profile';
const Stack=createNativeStackNavigator();
export default function StackIndex() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Profile" component={Profile} /> 
    </Stack.Navigator>
  )
}