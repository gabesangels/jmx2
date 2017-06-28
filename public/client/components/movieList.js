angular.module('main-app')

.directive('movieList', function() {
  return {
    scope: {
      movies: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function() {
      
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieList.html'
  };
});
