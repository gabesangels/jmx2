angular.module('main-app')

.directive('actorEntry', function() {
  return {
    scope: {
      actor: '<',
      user: '<',
    },
    restrict: 'E',
    controller: function() {
      this.$onInit = function() {
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/actorEntry.html'
  }
})
