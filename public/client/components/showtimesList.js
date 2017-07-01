angular.module('main-app')

.directive('showtimesList', function() {
  return {
    scope: {
      searchTheMovieDB: '<',
      searchOMDB: '<',
      showtimes: '<',
      query: '<',
      movie: '<',
    },
    restrict: 'E',
    controller: 'HomeCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/showtimesList.html'
  };
});
