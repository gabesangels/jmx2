// this service is mostly used to retrieve useful infos about movies
angular.module('main-app')
.service('searchShowtimes', function($http){
  //please refactor this key
  var API_KEYS = 'nmq2kzmegnz3uuc9gtwgms6c';
  //this function make the url for the request
  var makeQueryString = function(url, params) {
    var paramsArray = []
    for (p in params) {
      paramsArray.push(p + '=' + params[p]);
    }
    return url + paramsArray.join('&');
  }

  this.search = function(query, callback) {
    $http({
    url: makeQueryString('http://data.tmsapi.com/v1.1/movies/showings?', query) + '&numDays=2&radius=20&api_key=' + API_KEYS,
    method: 'GET',
    dataType: 'json',
    }).then(function successCallback(response) {
      if (callback) {
        callback(response.data);
      }
    }, function errorCallback(response) {
      console.log('Error')
    });
  };
});
