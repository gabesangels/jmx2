angular.module('main-app')

.directive('movieDetails', function() {
  return {
    scope: {
      movie: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function(searchOMDB,searchTheMovieDB, $http) {
      console.log('I ran too', this.user);
      this.$onInit = function() {
      console.log("I ran")
      this.OMDBService = searchOMDB;
      this.TMDBService = searchTheMovieDB;
          this.TMDBService.searchById(this.movie.imdb_id, (data) => {
            this.TMDBService.getVideos(data.id, (data) => {
              this.movie.video = data;
              console.log('data~~~~~~',data)
            })
          })
          this.OMDBService.search({i: this.movie.imdb_id}, (data) => {
            this.movie.details = data;
            this.movie.details.Poster === "N/A" || !this.movie.details.Poster ? this.movie.details.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' : this.movie.details.Poster
          });
      };


      this.handleAddToFavorites = function() {
        var idList = this.user.watched.map((x) => x.imdb_id);
        var i = idList.indexOf(this.movie.imdb_id);

        $http.post('/addFavorite', {user: this.user.username,
        movie: this.user.watched[idList.indexOf(this.movie.imdb_id)]}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.watched[i].isFavorite = session.data.watched[i].isFavorite;
          });
        });
      };

      this.handleViewDetails = function() {
        console.log('clicked', this.user)
      }

      this.handleAddCommentClick = function() {
        var idList = this.user.watched.map((x) => x.imdb_id);
        var i = idList.indexOf(this.movie.imdb_id);

        $http.post('/addComment', {user: this.user.username, imdb_id: this.movie.imdb_id, comment: this.input}).then(() => {
          $http.get('/sess').then((session) => {

            this.user.watched[i].comment = session.data.watched[i].comment;
          });
        });
      };

      this.handleRatingClick = function(rating) {
        var idList = this.user.watched.map((x) => x.imdb_id);
        var i = idList.indexOf(this.movie.imdb_id);

        $http.post('/editRating', {user: this.user.username, imdb_id: this.movie.imdb_id, rating: this.rating}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.watched[i].rating = session.data.watched[i].rating;
          });
        });
      };

      this.handleRemoveClick = function() {
        $http.post('/removeFromWatched', {user: this.user.username, imdb_id: this.movie.imdb_id}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.watched = session.data.watched;
          });
        });
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieDetails.html'
  };
});
