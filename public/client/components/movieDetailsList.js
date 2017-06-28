angular.module('main-app')

.controller('DetailsCtrl', function(searchTheMovieDB, searchOMDB, $http, AuthModel) {
  this.user = {};
  //this is my temporary solution for recommendations - MN
  this.recommendations = [];
  this.AuthModel = AuthModel;
  this.TMDBservice = searchTheMovieDB;
  this.OMDBService = searchOMDB;
  this.intendedUser;

  $http.get('/sess').then((session) => {
    this.intendedUser = session;
    this.user.username = this.intendedUser.data.username;
    this.user.watched = this.intendedUser.data.watched;
    console.log('I also ran', this.user.watched)
  })
  this.recommendations = this.recommendations.filter((item, i, arr) => item !== arr[i + 1])
})
.directive('movieDetailsList', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: 'DetailsCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieDetailsList.html'
  }
})
