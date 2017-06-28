angular.module('main-app')

.directive('tvList', function() {
  return {
    scope: {
      tv_shows: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function() {

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/tvList.html'
  }
})
