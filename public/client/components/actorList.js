angular.module('main-app')

.directive('actorList', function() {
  return {
    scope: {
      actors: '<',
      user: '<',
    },
    restrict: 'E',
    controller: function() {
      this.$onInit = function() {
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/actorList.html'
  }
})
