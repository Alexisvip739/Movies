import React, { useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faSearch, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import StackIndex from '../StackNavigation/StackIndex';
import StackSearch from '../StackNavigation/StackSearch';
import StackProfile from '../StackNavigation/StackProfile'; // Importa la pila de navegación de perfil
import { View } from 'react-native';

const TabNavigation = createBottomTabNavigator();

export default function Tab() {
  const [isSearchPressed, setIsSearchPressed] = useState(false);
  const [isProfilePressed, setIsProfilePressed] = useState(false);
  return (
    <TabNavigation.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: 'black',
          position: 'absolute',
          bottom: 15,
          left: '6%',
          right: '6%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          display: 'none', // Oculta las etiquetas de las pestañas
        },
        tabBarIconStyle: {
          backgroundColor: 'blue',
        },
      })}
    >
      <TabNavigation.Screen
        name="Home"
        component={StackIndex}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Cambia el estado solo cuando se presiona la pestaña "Home"
            setIsSearchPressed(false);
            setIsProfilePressed(false); // Agrega esta línea para desactivar el estado de perfil
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                backgroundColor: isSearchPressed || isProfilePressed   ?'transparent' : 'white',
                borderRadius: 10,
                padding: 15,
              }}
            >
              <FontAwesomeIcon icon={faHome} size={20} color={isSearchPressed || isProfilePressed  ? 'white' : 'black'} />
            </View>
          ),
        }}
      />

      <TabNavigation.Screen
        name="Search"
        component={StackSearch}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Cambia el estado cuando se presiona la pestaña "Search"
            setIsSearchPressed(true);
            setIsProfilePressed(false); // Agrega esta línea para desactivar el estado de perfil

          },
          tabBlur: (e) => {
            // Cambia el estado cuando se sale de la pestaña "Search"
            setIsSearchPressed(false);
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                backgroundColor: isSearchPressed ? 'white' : 'transparent',
                borderRadius: 10,
                padding: 15,
              }}
            >
              <FontAwesomeIcon icon={faSearch} size={20} color={isSearchPressed ? 'black' : 'white'} />
            </View>
          ),
        }}
      />

      <TabNavigation.Screen
        name="Profile"
        component={StackProfile}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Cambia el estado solo cuando se presiona la pestaña "Profile"
            setIsProfilePressed(true);
            setIsSearchPressed(false); // Agrega esta línea para desactivar el estado de búsqueda

          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                backgroundColor: isProfilePressed ? 'white' : 'transparent',
                borderRadius: 10,
                padding: 15,
              }}
            >
              <FontAwesomeIcon icon={faUser} size={20} color={isProfilePressed ? 'black' : 'white'} />
            </View>
          ),
        }}
      />

   
    </TabNavigation.Navigator>
  );
}
