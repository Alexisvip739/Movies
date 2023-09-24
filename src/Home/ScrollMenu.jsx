import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function ScrollMenu({ onButtonPress }) {
  const buttons = ['All day', 'Top Rated', 'Up Coming', 'Now Playing'];
  const [selectedButton, setSelectedButton] = useState('All day');

  const handlePress = (text) => {
    setSelectedButton(text);
    console.log(`Pulsaste: ${text}`);
    onButtonPress(text);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.containerScroll}>
        {buttons.map((text, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.textScroll,
              {
                backgroundColor: selectedButton === text ? 'black' : 'white',
                
              },
              
            ]}
            onPress={() => handlePress(text)}
          >
            <Text style={[
                styles.text,
                {
                  color: selectedButton === text ? 'white' : 'black',
                },
              ]}>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerScroll: {
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    flex: 1,
    gap:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textScroll: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
    
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
});
