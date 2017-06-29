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
      this.$onInit = () => {
        // console.log(this.movie)
        this.OMDBService = searchOMDB;
        this.TMDBService = searchTheMovieDB;
        this.currentMovieBoolean = false;
        this.TMDBService.searchById(this.movie.imdb_id,'movie', (data) => {
          this.TMDBService.getVideos(data.id, (data) => {
            this.movie.video = data;
            if (this.movie.video.results.length === 0) {
              this.movie.video.results.push({id:"533ec652c3a368544800015b", iso_639_1:"en",iso_3166_1:"US", key:"R3siRkmzaBI"})
            }
          })
        })
        this.OMDBService.search({i: this.movie.imdb_id}, (data) => {
          this.movie.details = data;
          console.log(typeof this.movie.details.Actors)
          if(this.movie.details.Actors !== "N/A" && this.movie.details.Actors) {
            this.actors = this.movie.details.Actors.split(', ')
          }

          this.movie.details.Poster === "N/A" || !this.movie.details.Poster ? this.movie.details.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' : this.movie.details.Poster
        }, 'movie');
      };

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
