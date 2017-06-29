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
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/tvEntry.html'
    }
  }
)