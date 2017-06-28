angular.module('main-app')

.directive('tvEntry', function() {
  return {
    scope: {
      tv_show: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function(searchOMDB, $http) {
      this.$onInit = function() {
        this.OMDBService = searchOMDB;
        this.OMDBService.search({i: this.tv_show.imdb_id}, (data) => {
          this.tv_show.details = data;
          this.tv_show.details.Poster === "N/A" || !this.tv_show.details.Poster ? this.tv_show.details.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' : this.tv_show.details.Poster
        }, 'series');
      };

      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'public/client/templates/tvEntry.html'
    }
  }
})