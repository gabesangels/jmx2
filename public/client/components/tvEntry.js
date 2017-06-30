angular.module('main-app')

.directive('tvEntry', function() {
  return {
    scope: {
      tvShow: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function(searchTheMovieDB, $http) {
      this.$onInit = function() {
        this.TMDBService = searchTheMovieDB;
        this.TMDBService.searchById(this.tvShow.imdb_id,'tv', (data) => {
          console.log('tvShow data: ', data)
          this.tvShow.details = data;
          this.tvShow.poster = data.poster_path ? 'https://image.tmdb.org/t/p/w1280' + data.poster_path :
                                                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
        })
      }

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

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/tvEntry.html'
    }
  }
)