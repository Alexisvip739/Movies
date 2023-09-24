import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator,Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { API_POPULAR } from '../API/api_tool';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ScrollMenu from './ScrollMenu';

export default function MoviesToDay() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
                

        const data = await API_POPULAR();
        
        setMovie(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  const handlePressImage = (item)=>{
    navigation.navigate('MovieDetails',{
        id:item.id,
        title:item.title,
        name:item.name,
        poster_path:item.poster_path,
        overview:item.overview,
        vote_average:item.vote_average,
        vote_count:item.vote_count,
        backdrop_path:item.backdrop_path,
        release_date:item.release_date,
        genre_ids:item.genre_ids,
        original_language:item.original_language,
        original_title:item.original_title,
    })
}

  return (
    
      <View >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
            
            {movie.map((item) => (
              <TouchableOpacity onPress={() => handlePressImage(item) }>
                <View key={item.id} style={styles.containerMovieToDay}>
                <Image
                    style={styles.ImamgeMovie}
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` }}
                />
                <Text style={styles.titlePopularMovie}>{item.title}</Text>
                </View>
                </TouchableOpacity> 
            ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerMovieToDay: {
    width: 390, // Ancho fijo para mostrar una imagen a la vez
    height: 200,
    margin: 3,
    
    flex: 1,
  },
  ImamgeMovie: {
    flex: 1, // Para ocupar todo el espacio disponible en el contenedor
    borderRadius: 10,
    width:'100%',

  },
  container: {
    marginBottom: 10,
    marginRight: 10,
    
  },
  
  titlePopularMovie:{
    position:'absolute',
    fontSize:20,
    color:'white',
    top:153,
    left:0,
    zIndex:1000,
    backgroundColor:'rgba(0,0,0,0.9)',
    padding:10,
    borderRadius:10,
  }
});
