angular.module('main-app') // copied mostly from ng-cast

.controller('SearchCtrl2', function($http, searchTheMovieDB) {
  this.imdb_id;
  this.$onInit = function() {
    this.TMDBservice = searchTheMovieDB

    this.handleMovieClick = function() {
      this.TMDBservice.searchById(this.result.id, this.selection, (data) => {
        this.imdb_id = data.imdb_id ? data.imdb_id : data.id

        if (this.selection === 'movie') {

          $http.post('/addMovie', {user: this.user.username, imdb_id: this.imdb_id}).then(() => {
            $http.get('/sess').then((session) => {
              this.user.movies = [{comment: "N/A", rating: "N/A", imdb_id: "tt0790612"}].concat(this.user.movies);
              console.log('this.user.movies', this.user.movies)
            });
          });
        }
        else if (this.selection === 'tv') {
          $http.post('/addTv', {user: this.user.username, imdb_id: this.imdb_id}).then(() => {
            $http.get('/sess').then((session) => {
              this.dude = session;
              console.log('getting here user', this.user.tvShows)
              console.log('getting here session', session)
              this.user.tvShows = this.dude.data.tvShows;
              console.log('then here user', this.user.tvShows)
              console.log('then here session', this.dude.data.tvShows)
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
      result: '<',
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
