angular.module('main-app')

.directive('tvList', function() {
  return {
    scope: {
      tvShows: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function() {
      console.log('this.user at list', this.user)
      console.log('tvShows at List', this.tvShows)

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/tvList.html'
  }
})
