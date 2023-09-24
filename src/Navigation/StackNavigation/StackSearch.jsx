import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../../search/search';
const Stack=createNativeStackNavigator();
export default function StackIndex() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  )
}