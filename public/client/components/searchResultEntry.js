angular.module('main-app') // copied mostly from ng-cast

.controller('SearchCtrl2', function($http, searchTheMovieDB, searchOMDB) {
  this.imdb_id;
  this.$onInit = function() {
    this.TMDBservice = searchTheMovieDB;
    this.OMDBService = searchOMDB;
    
    this.handleMovieClick = function() {
      this.TMDBservice.searchById(this.result.id, this.selection, (data) => {
        this.imdb_id = data.imdb_id ? data.imdb_id : data.id;
        
        if (this.selection === 'movie') {

          //query OMDB
          this.OMDBService.search({i: this.imdb_id}, (data) => {
            this.details = data;
            this.details.Poster === "N/A" || !this.details.Poster ? this.details.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' : this.details.Poster;
            $http.post('/addMovie', {user: this.user.username, imdb_id: this.imdb_id, details: this.details}).then(() => {
              $http.get('/sess').then((session) => {
              this.user.movies = session.data.movies;
              })
            })
          })
         
        } else if (this.selection === 'tv') {
          this.details = data;
          this.details.poster = data.poster_path ? 'https://image.tmdb.org/t/p/w1280' + data.poster_path :
                                                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
          console.log('poster: ', this.details.poster)
          $http.post('/addTv', {user: this.user.username, imdb_id: this.imdb_id, details: this.details}).then(() => {
            $http.get('/sess').then((session) => {
              this.user.tvShows = session.data.tvShows;
            })
          });
        }
      });
    };
  };

})
.directive('searchResultEntry', function() {
  return {
    scope: {
      result: '<',
      user: '=',
      selection: '<'
    },
    restrict: 'E',
    controller: 'SearchCtrl2',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultEntry.html'
  };
});