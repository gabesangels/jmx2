angular.module('main-app') // copied mostly from ng-cast

.controller('SearchCtrl2', function($http, searchTheMovieDB) {
  this.imdb_id;
  this.$onInit = function() {
    this.TMDBservice = searchTheMovieDB
    
    this.handleMovieClick = function() {
      this.TMDBservice.searchById(this.movie.id, this.selection, (data) => {
        this.imdb_id = data.imdb_id ? data.imdb_id : data.id
        
        if (this.selection === 'movie') {
          
          $http.post('/addMovie', {user: this.user.username, imdb_id: this.imdb_id}).then(() => {
            $http.get('/sess').then((session) => {
              this.user.movies = session.data.movies;
            });
          });
        }
        else if (this.selection === 'tv') {
          $http.post('/addTv', {user: this.user.username, imdb_id: this.imdb_id}).then(() => {
            $http.get('/sess').then((session) => {
              this.user.tv_shows = session.data.tv_shows;
            })
          })
        }
      });
    };
  };

})
.directive('searchResultEntry', function() {
  return {
    scope: {
      movie: '<',
      tv_show: '<',
      user: '<',
      selection: '<'
    },
    restrict: 'E',
    controller: 'SearchCtrl2',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultEntry.html'
  };
});