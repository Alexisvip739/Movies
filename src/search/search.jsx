import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Función para buscar películas
    const searchMovies = async () => {
      try {
        if (searchText.trim() === '') {
          // Si el texto de búsqueda está vacío, borrar la lista de películas
          setFilteredMovies([]);
          return;
        }

        // Realizar una solicitud a la API de búsqueda de películas (reemplazar 'URL_DE_TU_API' con la URL correcta)
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=86fc4eea2d0937ec8a76131858bd492b`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parsear la respuesta a formato JSON
        const data = await response.json();

        // Actualizar el estado de las películas filtradas con los resultados de la búsqueda
        setFilteredMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // Llamar a la función de búsqueda cuando el texto de búsqueda cambie (debounce opcional)
    const debounceTimer = setTimeout(() => {
      searchMovies();
    }, 300); // Opcional: Agregar un retraso para evitar múltiples solicitudes rápidas

    // Limpiar el temporizador de debounce en cada cambio de texto
    return () => clearTimeout(debounceTimer);
  }, [searchText]);

  const handlePressImage = (item) => {
    navigation.navigate('MovieDetails', {
      id: item.id,
      title: item.title || item.name,
      poster_path: item.poster_path,
      overview: item.overview,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      backdrop_path: item.backdrop_path,
      release_date: item.release_date,
      genre_ids: item.genre_ids,
      original_language: item.original_language,
      original_title: item.original_title,
    });
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressImage(item)} style={styles.movieContainer}>
      <Image
        style={styles.movieImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` }}
        resizeMode='cover'
      />
      <Text style={styles.movieTitle}>{item.title || item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Movie"
          placeholderTextColor="white"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>
      <FlatList
        data={filteredMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Cambia el color de fondo según tus preferencias
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
    marginTop:20,
    marginBottom: 10,
  },
  searchIcon: {
    color: 'white',
    fontSize: 20,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: 'white',
  },
  movieContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'white', // Cambia el color de fondo según tus preferencias
    overflow: 'hidden',
  },
  movieImage: {
    width: '100%',
    height: 230,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  movieTitle: {
    width: '100%',
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    padding: 5,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
});
