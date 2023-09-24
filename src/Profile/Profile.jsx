import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../Context/AuthProvider';

export default function Profile() {
  const [detailColor, setDetailColor] = useState(true);
  const [detailFavorite, setDetailFavorite] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteObjects, setFavoriteObjects] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // Nuevo estado para mostrar detalles

  const { logout, currentUser } = useAuth();
  const { username, name, lastName, email } = currentUser;

  useEffect(() => {
    if (showFavorites) {
      showFavoritesProfile();
    }
  }, [showFavorites]);

  const changeColorFavorites = () => {
    setDetailColor(false);
    setDetailFavorite(true);
    setShowFavorites(true);
    setShowDetails(false); // Ocultar detalles al cambiar a Favoritos
  };

  const changeColorDetail = () => {
    setDetailColor(true);
    setDetailFavorite(false);
    setShowFavorites(false);
    setShowDetails(true); // Mostrar detalles al cambiar a Detalles
  };

  const Logout = () => {
    logout();
  };

  const showFavoritesProfile = async () => {
    try {
      const objetoJsonRecuperado = await AsyncStorage.getItem('favoriteObjects');
      if (objetoJsonRecuperado !== null) {
        const objetoRecuperado = JSON.parse(objetoJsonRecuperado);
        setFavoriteObjects(objetoRecuperado);
       
      } else {
        console.log('No se encontró el objeto en AsyncStorage');
      }
    } catch (error) {
      console.error('Error al recuperar el objeto:', error);
    }
  };

  const renderDetails = () => {
    if (showDetails) {
      return (

        <View style={style.containerDetail}>
          <View>
            <Text  style={style.DetailText}>Name</Text>
            <Text style={style.showText}> {name}</Text>
          </View>
          <View>
            <Text style={style.DetailText}>Last Name</Text>
            <Text style={style.showText}> {lastName}</Text>
          </View>

          <View>
            <Text style={style.DetailText}>Email</Text>
            <Text style={style.showText}>{email}</Text>
          </View>

          <View>
            <Text style={style.DetailText}>Add Favorites</Text>
            <Text style={style.showText}>{favoriteObjects.length}</Text>
          </View>
         
        </View>
      );
    }
    return null;
  };
  const renderFavoriteMovies = () => {
    if (showFavorites) {
      return (
        <ScrollView style={style.favoriteMoviesCarousel} horizontal>
          {favoriteObjects.map((movie, index) => (
            <View key={index} style={style.favoriteMovieContainer}>
              <Image
                style={style.favoriteMovieImage}
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
              />
              <Text style={style.favoriteMovieName}>{movie.title}</Text>
            </View>
          ))}
        </ScrollView>
      );
    }
    return null;
  };

  return (
    <View style={style.container}>
      <View style={style.displayHeard}>
        <Text style={style.textContainer} key={currentUser.id}>
          {username}
        </Text>
        <TouchableOpacity style={style.ButtonLogout} onPress={Logout}>
          <Text style={style.textContainerLogout}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={style.containerImageProfile}>
        <Image
          style={style.Image}
          source={{
            uri:
              'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
          }}
        />
        <Text style={style.textUsername}>
          {name} {lastName}
        </Text>
      </View>

      <View style={style.DetailsRows}>
        <TouchableOpacity
          style={[
            style.containerInformation,
            detailFavorite ? style.activeButton : style.inactiveButton,
          ]}
          onPress={changeColorFavorites}
        >
          <Text
            style={[
              style.infotamtionText,
              detailFavorite ? style.textWhiteInfo : style.textBlackInfo,
            ]}
          >
            Favorite
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            style.containerInformation,
            detailColor ? style.activeButton : style.inactiveButton,
          ]}
          onPress={changeColorDetail}
        >
          <Text
            style={[
              style.infotamtionText,
              detailColor ? style.textWhiteInfo : style.textBlackInfo,
            ]}
          >
            Details
          </Text>
        </TouchableOpacity>
      </View>

      {renderDetails()}
      {renderFavoriteMovies()}
    </View>
  );
}

// Resto de tu código de estilos (style)...

const style = StyleSheet.create({
  displayHeard:{
    justifyContent:'space-between',
    flexDirection:'row'
  },
  container: {
    marginTop: 50,
  },
  textContainer: {
    backgroundColor: 'black',
    color: 'white',
    alignSelf: 'flex-start',
    padding: 5,
    fontSize: 20,
    borderRadius: 20,
    left: 20,
  },
  containerImageProfile: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  Image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: 'hidden',
  },
  textUsername: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    top: 10,
    fontSize: 20,
  },
  DetailsRows: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    flexDirection: 'row',
    gap: 20,
  },
  containerInformation: {
    backgroundColor: 'black',
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 100,
  },
  infotamtionText: {
    textAlign: 'center',
    fontWeight: '900',
  },
  textWhiteInfo: {
    color: 'white',
  },
  textBlackInfo: {
    color: 'black',
  },
  activeButton: {
    backgroundColor: 'black',
    borderWidth: 0,
  },
  inactiveButton: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 2,
  },

  TextFavorite:{
    color:'black'
  },
  
  textContainerLogout: {
    borderWidth: 1, // Grosor del borde
    borderColor: 'black', // Color del borde
    right: 30,
    padding: 10,
    borderRadius: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  containerDetail:{
    width:'90%',
    justifyContent:'center',
  
    left:20,
    gap:20,
    marginTop:20,
    paddingBottom:20,
    backgroundColor:'black',
    borderRadius:20
  },
  DetailText:{
    color:'white',
    fontWeight:'bold',
    left:20,
    fontSize:17,
    marginTop:10,
   
  },
  showText:{
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    color: 'black',
    left:10
  },
  favoriteMoviesCarousel: {
    marginTop: 40,
    flexDirection:'row'
  },
  favoriteMovieContainer: {
    alignItems: 'center',
    padding: 10,
  },
  favoriteMovieImage: {
    width: 250,
    height: 280,
    objectFit:'contain',
    borderRadius: 10,
  },
  favoriteMovieName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
