angular.module('main-app')

.directive('tvEntry', function() {
  return {
    scope: {
      tvShow: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function(searchTheMovieDB, $http) {

      this.handleAddCommentClick = function() {
        var idList = this.user.tvShows.map((x) => x.imdb_id);
        var i = idList.indexOf(this.tvShow.imdb_id);

        $http.post('/addTvComment', {user: this.user.username, imdb_id: this.tvShow.imdb_id, comment: this.input}).then(() => {
          $http.get('/sess').then((session) => {

            this.user.tvShows[i].comment = session.data.tvShows[i].comment;
          });
        });
      };

      this.handleRatingClick = function(rating) {
        var idList = this.user.tvShows.map((x) => x.imdb_id);
        var i = idList.indexOf(this.tvShow.imdb_id);

        $http.post('/editTvRating', {user: this.user.username, imdb_id: this.tvShow.imdb_id, rating: this.rating}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.tvShows[i].rating = session.data.tvShows[i].rating;
          });
        });
      };

      this.handleAddToFavorites = function() {
        var idList = this.user.tvShows.map((x) => x.imdb_id);
        var i = idList.indexOf(this.tvShow.imdb_id);

        $http.post('/addTvFavorite', {user: this.user.username,
        tvShow: this.user.tvShows[idList.indexOf(this.tvShow.imdb_id)]}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.tvShows[i].isFavorite = session.data.tvShows[i].isFavorite;
          });
        });
      };

      this.handleRemoveClick = function() {
        $http.post('/removeFromTvWatched', {user: this.user.username, imdb_id: this.tvShow.imdb_id}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.tvShows = session.data.tvShows;
          });
        });
      };

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/tvEntry.html'
    }
  }
)