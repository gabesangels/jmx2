angular.module('main-app')

.directive('movieList', function() {
  return {
    scope: {
      movies: '<',
      user: '<',
      details: '<',
    },
    restrict: 'E',
    controller: function() {
      this.$onInit = function() {
        this.details = true;
      }
      this.handleDetails = (e) => {
        if(this.details === true) {
          this.mooovies = this.movies
          this.movies = this.movies.slice(e,e+1)
          this.details = false;
        }
      }
      this.handleRender = (e) => {
        this.movies = this.mooovies
        this.details  = true
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieList.html'
  };
});
