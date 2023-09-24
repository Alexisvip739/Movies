import axios from "axios"

const URL_API_ALL_DAY='https://api.themoviedb.org/3/trending/all/day';
const API_URL_TOP_RATED='https://api.themoviedb.org//3/movie/top_rated';
const API_URL_UPCOMING='https://api.themoviedb.org/3/movie/upcoming';
const URL_API_NOW_PLAYING='https://api.themoviedb.org/3/movie/now_playing';
const API_URL_POPULAR='https://api.themoviedb.org/3/movie/popular';
const API_URL_GENRENS='https://api.themoviedb.org/3/genre/movie/list'

export  function API_NOW_PLAYING() {
    const queryParams = {
      api_key: '86fc4eea2d0937ec8 a76131858bd492b',
    };
  
    return axios.get(URL_API_NOW_PLAYING, { params: queryParams })
      .then(response => {
        // Handle the response data here
        return response.data;
      })
      .catch(error => {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
    });
}
  
export  function API_POPULAR() {
    const queryParams = {
      api_key: '86fc4eea2d0937ec8a76131858bd492b',
    };
    return axios.get(API_URL_POPULAR, { params: queryParams })
    .then(response => {
        // Handle the response data here
        return response.data;
    }).catch(error => {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
    });
}


export  function API_UPCOMING() {
    const queryParams = {
      api_key: '86fc4eea2d0937ec8a76131858bd492b',
    };
  
    return axios.get(API_URL_UPCOMING, { params: queryParams })
      .then(response => {
        // Handle the response data here
        return response.data;
      })
      .catch(error => {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
    });
}
  
export  function API_TOP_RATED() {
    const queryParams = {
      api_key: '86fc4eea2d0937ec8a76131858bd492b',
    };
    return axios.get(API_URL_TOP_RATED, { params: queryParams })
    .then(response => {
        // Handle the response data here
        return response.data;
    }).catch(error => {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
    });
}

export  function API_ALL_DAY() {
    const queryParams = {
      api_key: '86fc4eea2d0937ec8a76131858bd492b',
    };
    return axios.get(URL_API_ALL_DAY, { params: queryParams })
    .then(response => {
        // Handle the response data here
        return response.data;
    }).catch(error => {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
    });
}

export  function getGenresAPI() {
  const queryParams = {
    api_key: '86fc4eea2d0937ec8a76131858bd492b',
  };
  return axios.get(API_URL_GENRENS, { params: queryParams })
  .then(response => {
      // Handle the response data here
     
      return response.data;
  }).catch(error => {
      console.error("Error fetching data:", error);
      throw error;
  });
}