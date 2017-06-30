angular.module('main-app') // copied mostly from ng-cast

.controller('SearchCtrl2', function($http, searchTheMovieDB, searchOMDB) {
  this.imdb_id;
  this.$onInit = function() {
    this.TMDBservice = searchTheMovieDB;
    this.OMDBService = searchOMDB;
    
    this.handleMovieClick = function() {
      this.TMDBservice.searchById(this.result.id, this.selection, (data) => {
        this.imdb_id = data.imdb_id ? data.imdb_id : data.id
        
        if (this.selection === 'movie') {
          
          $http.post('/addMovie', {user: this.user.username, imdb_id: this.imdb_id}).then(() => {
            $http.get('/sess').then((session) => {
              this.user.movies = session.data.movies;
            }).then(() => {
              this.user.movies.forEach(movie => {
                this.OMDBService.search({i: movie.imdb_id}, (data) => {
                  movie.details = data;
                  movie.details.Poster === "N/A" || !movie.details.Poster ? movie.details.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' : movie.details.Poster;
                })
              })
            });
          });
        }
        else if (this.selection === 'tv') {
          $http.post('/addTv', {user: this.user.username, imdb_id: this.imdb_id}).then(() => {
            $http.get('/sess').then((session) => {
              this.user.tvShows = session.data.tvShows;
            }).then(() => {
              this.user.tvShows.forEach(tvShow => {
                this.TMDBservice.searchById(tvShow.imdb_id, 'tv', (data) => {
                  tvShow.details = data;
                  tvShow.poster = data.poster_path ? 'https://image.tmdb.org/t/p/w1280' + data.poster_path :
                                                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
                })
              })
            });
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