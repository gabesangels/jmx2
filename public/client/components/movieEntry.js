angular.module('main-app')

.directive('movieEntry', function() {
  return {
    scope: {
      movie: '<',
      user: '<',
      details: '<',
      handleDetails: '<',
      handleRender: '<',

    },
    restrict: 'E',
    controller: function(searchOMDB, searchTheMovieDB, $http) {
      

      this.handleViewDetails = function() {
        console.log('clicked', this.movie.details)

      }

      this.handleAddToFavorites = function() {
        var idList = this.user.movies.map((x) => x.imdb_id);
        var i = idList.indexOf(this.movie.imdb_id);

        $http.post('/addFavorite', {user: this.user.username,
        movie: this.user.movies[idList.indexOf(this.movie.imdb_id)]}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.movies[i].isFavorite = session.data.movies[i].isFavorite;
          });
        });
      };

      this.handleAddCommentClick = function() {
        var idList = this.user.movies.map((x) => x.imdb_id);
        var i = idList.indexOf(this.movie.imdb_id);

        $http.post('/addComment', {user: this.user.username, imdb_id: this.movie.imdb_id, comment: this.input}).then(() => {
          $http.get('/sess').then((session) => {

            this.user.movies[i].comment = session.data.movies[i].comment;
          });
        });
      };

      this.handleRatingClick = function(rating) {
        var idList = this.user.movies.map((x) => x.imdb_id);
        var i = idList.indexOf(this.movie.imdb_id);

        $http.post('/editRating', {user: this.user.username, imdb_id: this.movie.imdb_id, rating: this.rating}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.movies[i].rating = session.data.movies[i].rating;
          });
        });
      };

      this.handleRemoveClick = function() {
        $http.post('/removeFromWatched', {user: this.user.username, imdb_id: this.movie.imdb_id}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.movies = session.data.movies;
          });
        });
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieEntry.html'
  };
});
