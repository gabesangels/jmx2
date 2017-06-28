// Please read carefully, I used 2 different APIs for this project
// OMDB and The MovieDB
// The MovieDB is used to search for movie title since it supports a more flexible search query
// OMDB is used to retrieve movie infos since The MovieDB does not provide us much informations about movie title
// The 2 APIs "communicate" using unique imdb intendedUser


angular.module('main-app')
.service('searchTheMovieDB', function($http) {
  //please refactor out these keys, my bad - MN
  var API_KEYS = '4d3017fc8de9100e02bc619b7791f472'

  // this is used to query search
  this.search = function(query, selection, callback) {
    $http({
    url: 'https://api.themoviedb.org/3/search/' + selection + '?include_adult=false&api_key=' + API_KEYS + '&query=' + query.split(' ').join('+'),
    method: 'GET',
    dataType: 'json'
    }).then(function successCallback(response) {
      if (callback) {
        callback(response.data);
      }
    }, function errorCallback(response) {
      console.log('Error')
    });
  }

  // this is used to retrieve additional infos from TMDB after getting TMDB id for titles
  // I know this is confusing so apologies in advance, please reference both of the docs for both APIs
  this.searchById = function(id, selection, callback) {
    $http({
    url: 'https://api.themoviedb.org/3/' + selection + '/' + id + '?api_key=' + API_KEYS,
    method: 'GET',
    dataType: 'json'
    }).then(function successCallback(response) {
      if (callback) {
        callback(response.data);
      }
    }, function errorCallback(response) {
      console.log('Error')
    });
  }

  // this is used to get recommendations
  this.getRecommendations = function(id, callback) {
    $http({
      url: 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=' + API_KEYS,
      method: 'GET',
      dataType: 'json'
      }).then(function successCallback(response) {
        if (callback) {
          callback(response.data);
        }
      }, function errorCallback(response) {
        console.log('Error')
      });
    }
    
  //this is used to get videos
  this.getVideos = function(id, callback) {
    $http({
      url: 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + API_KEYS,
      method: 'GET',
      dataType: 'json'
      }).then(function successCallback(response) {
        if (callback) {
          callback(response.data);
        }
      }, function errorCallback(response) {
        console.log('Error')
      });
    }
});
