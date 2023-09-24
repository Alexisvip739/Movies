import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../Context/AuthProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, login } = useAuth();

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <View>
      <View style={style.containerLogin}>
        <Text style={style.TextLogin}>Bienvenido a Movies DB</Text>
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={style.Input}
          placeholderTextColor={'white'}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={style.Input}
          placeholderTextColor={'white'}
        />
        <TouchableOpacity title="Iniciar sesión" style={style.buttonLogin} onPress={handleLogin}>
          <Text>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  containerLogin: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  Input: {
    width: '90%',
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 10,
    color: 'white',
  },
  TextLogin: {
    fontSize: 30,
    marginTop: 20, // Adjust the marginTop as needed
    fontWeight: '900',
  },
  buttonLogin:{
    borderWidth:1,
    borderColor:'black',
    padding:10,
    borderRadius:20
  }
});
