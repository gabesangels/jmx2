angular.module('main-app')

.controller('MainCtrl', function(searchTheMovieDB, searchOMDB, $http) {
  this.user = {};
  //this is my temporary solution for recommendations - MN
  this.recommendations = [];

  this.TMDBservice = searchTheMovieDB;
  this.OMDBService = searchOMDB;
  this.intendedUser;

  

  $http.get('/sess').then((session) => {

    this.intendedUser = session;
    this.user.username = this.intendedUser.data.username;
    this.user.movies = this.intendedUser.data.movies;
    this.user.tvShows = this.intendedUser.data.tvShows;
  });
})
.directive('app', function() { // directive name is the HTML tag name REMEMBER THIS
  return {
    scope: {
      user: '='
    },
    restrict: 'E',
    controller: 'MainCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/app.html'
  };
});
