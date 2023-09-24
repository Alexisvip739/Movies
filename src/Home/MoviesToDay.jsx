import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollMenu from './ScrollMenu';
import ShowPopularMovies from './ShowPopularMovies';
import { useNavigation } from '@react-navigation/native';
import {
  API_ALL_DAY,
  API_TOP_RATED,
  API_UPCOMING,
  API_NOW_PLAYING,
  API_POPULAR,
} from '../API/api_tool';
import Search from '../search/search';

export default function MoviesToDay() {
  const [movie, setMovie] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [selectedApi, setSelectedApi] = useState('All day');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('cacheMovies');
        if (cachedData) {
          setMovie(JSON.parse(cachedData));
        }

        let data;

        if (selectedApi === 'All day') {
          data = await API_ALL_DAY();
        } else if (selectedApi === 'Top Rated') {
          data = await API_TOP_RATED();
        } else if (selectedApi === 'Up Coming') {
          data = await API_UPCOMING();
        } else if (selectedApi === 'Now Playing') {
          data = await API_NOW_PLAYING();
        }

        await AsyncStorage.setItem('cacheMovies', JSON.stringify(data.results));
        setMovie(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedApi]);

  const handleButtonPress = (buttonName) => {
    setSelectedApi(buttonName);
  };

  const handlePressSearch = (item) => {
    navigation.navigate('Search', {
      movies: item,
    });
  };

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
    <TouchableOpacity onPress={() => handlePressImage(item)} style={styles.containerMovie}>
      <View style={styles.containerMovieToDay} key={item.id}>
        <Image
          style={styles.ImamgeMovie}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` }}
          resizeMode="cover"
        />
        <Text style={styles.TextMovie}>{item.title || item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.container}>
          <ScrollMenu onButtonPress={handleButtonPress} />
          <ShowPopularMovies />
          <Text style={styles.textOther}>Others</Text>
          <FlatList
            data={movie}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        </View>
      )}
      <View style={{ height: 90 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerMovie: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMovieToDay: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  ImamgeMovie: {
    width: '100%',
    height: 230,
    borderRadius: 10,
    objectFit: 'cover',
  },
  TextMovie: {
    width: '110%',
    left: 10,
    color: 'black',
    fontWeight: '900',
  },
  columnWrapper: {
    gap: 20,
    justifyContent: 'flex-start',
  },
  container: {
    marginBottom: 60,
  },
  textOther: {
    backgroundColor: 'black',
    alignSelf: 'flex-start',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    left: 10,
  },
});
