angular.module('main-app')

.controller('SearchCtrl', function() {
 })
.directive('searchResultList', function() {
  return {
    scope: {
      results: '<',
      user: '<',
      selection: '<'
    },
    restrict: 'E',
    controller: 'SearchCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultList.html'
  };
});
