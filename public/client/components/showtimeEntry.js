angular.module('main-app')

.directive('showtimeEntry', function() {
  return {
    scope: {
      searchTheMovieDB: '<',
      searchOMDB: '<',
      searchShowtimes: '<',
      showtime: '<',
      query: '<',
    },
    restrict: 'E',
    controller: 'HomeCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/showtimeEntry.html'
  };
});
