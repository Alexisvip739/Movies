

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getGenresAPI } from '../../API/api_tool';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieDetails({ route, navigation }) {
  const movieDetail = route.params;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [genres, setGenres] = useState([]);
  const snapPoints = ['15%', '45%'];

  useEffect(() => {
    getGenresAPI()
      .then(response => {
        const genreObjects = movieDetail.genre_ids.map(genreId => {
          return response.genres.find(genre => genre.id === genreId) || null;
        });
        setGenres(genreObjects);
      })
      .catch(error => {
        console.log(error);
      });

    console.log(AsyncStorage.getItem('favoriteMoviesDetail'));
  }, []);

  const toggleHeart = async () => {
    setIsHeartFilled(!isHeartFilled);
    const objetoJsonFavorite = JSON.stringify(movieDetail);
    if (!isHeartFilled) {
      try {
        const currentFavorites = await AsyncStorage.getItem('favoriteObjects');
        let favoriteObjects = [];
        if (currentFavorites) {
          favoriteObjects = JSON.parse(currentFavorites);
          const existingObjectIndex = favoriteObjects.findIndex(
            (obj) => obj.id === movieDetail.id
          );
          if (existingObjectIndex === -1) {
            favoriteObjects.push(movieDetail);
            await AsyncStorage.setItem(
              'favoriteObjects',
              JSON.stringify(favoriteObjects)
            );

            console.log('Objeto guardado exitosamente');
          } else {
            console.log('El objeto ya existe en la lista de favoritos',favoriteObjects);
          }
        } else {
          favoriteObjects.push(movieDetail);
          await AsyncStorage.setItem(
            'favoriteObjects',
            JSON.stringify(favoriteObjects)
          );

          console.log('Objeto guardado exitosamente');
        }
      } catch (error) {
        console.error('Error al guardar el objeto:', error);
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, position: 'relative' }}>
      <View style={styles.container}>
        <Icon
          name="arrowleft"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Animatable.View
          animation={isHeartFilled ? 'tada' : null}
          style={styles.heartContainer}
        >
          <Icon
            name={isHeartFilled ? 'heart' : 'hearto'}
            style={styles.iconHeart}
            onPress={toggleHeart}
          />
        </Animatable.View>
        <Image
          style={styles.imageDetail}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`,
          }}
        />
        {movieDetail.title ? (
          <Text style={styles.TextIndex}> {movieDetail.title}</Text>
        ) : (
          <Text style={styles.TextIndex}> {movieDetail.name}</Text>
        )}
        <Text style={styles.TextDescription}> {movieDetail.overview}</Text>
      </View>
      <BottomSheet
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <BottomSheetView>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomSheetContainer}>
              <View style={styles.bottomSheetIconContainer}>
                <Icon
                  name="star"
                  style={styles.bottomSheetIcon}
                  color="gold"
                />
                <Text style={styles.bottomSheetText}>
                  {movieDetail.vote_average}
                </Text>
              </View>
              <View style={styles.bottomSheetIconContainer}>
                <Icon
                  name="like1"
                  style={styles.bottomSheetIcon}
                  color="green"
                />
                <Text style={styles.bottomSheet}>
                  {movieDetail.vote_count}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.containerDate}>
            <FontAwesomeIcon icon={faCalendar} style={styles.iconCalendar} />
            <Text style={styles.TextDate}>
              Release Date: {movieDetail.release_date}
            </Text>
          </View>
          <View style={styles.genrensList}>
            <Text style={styles.genText}>Genres:</Text>
            <View style={styles.containerGenre}>
              {genres.length > 0 ? (
                genres.map((genre, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.TextGenre,
                      { textAlign: 'center' },
                    ]}
                  >
                    {genre && genre.name}
                  </Text>
                ))
              ) : (
                <Text
                  style={[
                    styles.TextGenre,
                    { textAlign: 'center' },
                  ]}
                >
                  There are no genres
                </Text>
              )}
            </View>
            <View style={styles.containerDate}>
              <Text style={styles.TextDate}>
                Language: {movieDetail.original_language === 'es' ? 'Spanish' : movieDetail.original_language === 'en' ? 'English' : movieDetail.original_language}
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}



const styles = StyleSheet.create({
  bottomContainer: {
    width: '100%',
  },
  container: {
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor:'black',
  
    paddingBottom:20,
    marginTop:0
  },
  TextIndex: {
    color: 'white',
    
    fontSize: 25,
    fontWeight: '900',
    marginLeft: 30,
  },
  imageDetail: {
    width: '90%',
    marginTop:50,
    height: 400,
    borderRadius: 10,
    left:25,
    resizeMode: 'cover',
    backgroundColor:'black',
    padding:20,
    borderRadius: 10,
    
  },
  icon: {
    position: 'absolute',
    zIndex: 100,
    color: 'black',
    top: 70,
    left: 30,
    backgroundColor:'black',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10,
  },
  heartContainer: {
    position: 'absolute',
    zIndex: 100,
    top: 75,
    right: 25,
  },
  iconHeart: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    paddingLeft: 12,
  },
  TextDescription: {
    color: 'white',
    textAlign: 'start',
    fontSize: 15,
    marginLeft: 30,
    marginTop: 20,
    width: '90%',
  },
  bottomSheetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign:'center',
    padding: 10,
  },
  bottomSheetIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSheetIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  bottomSheet: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSheetText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  genreContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 50,
    gap:20,
    alignItems: 'center',
  },
  
  containerDate:{
    marginTop:10,
    left: 20,
  },
  TextDate:{
    fontWeight:'700',
    fontSize: 18,
  },
  genrensList:{
    marginTop:20,
    
  },
  containerGenre:{
    width:"99%",
    backgroundColor: 'black',
    flexDirection:'row',
    gap:20,
    left: 2,
    alignItems:'center',
    justifyContent:'space-around',
    marginTop: 20,
    padding:10,
    borderRadius: 20,
  },
  genText:{
    left:20,
    fontWeight:'900',
    fontSize:20,
  },
  TextGenre:{
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    
    flexDirection:'row',
    backgroundColor:'white',
    padding:4,

    borderRadius: 20,
  }
});
