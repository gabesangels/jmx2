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

    this.user.movies.forEach(item => {
      this.OMDBService.search({i: item.imdb_id}, (data) => {
        item.details = data;
        if(item.details.Actors !== "N/A" && item.details.Actors) {
          this.actors = item.details.Actors.split(', ')
        }
        item.details.Poster === "N/A" || !item.details.Poster ? item.details.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' : item.details.Poster
      })
    });

    this.user.tvShows.forEach(tvShow => {
      this.TMDBservice.searchById(tvShow.imdb_id, 'tv', (data) => {
        tvShow.details = data;
        tvShow.poster = data.poster_path ? 'https://image.tmdb.org/t/p/w1280' + data.poster_path :
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
      })
    })
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
