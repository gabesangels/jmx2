angular.module('main-app')

.controller('SearchController', function(searchTheMovieDB, searchOMDB) {

  this.selection = '';

  this.results = []
  this.TMDBservice = searchTheMovieDB;
  this.OMDBService = searchOMDB;
  this.handleClick = () => {
    this.TMDBservice.search(this.input, this.selection, (data) => {
      this.results = data.results.slice(0,5)
      this.results.map(item => {
        if (item.poster_path === null) {
          item.poster_path = 'http://www.aliciburada.com/assets/image/site/icon-user.png';
        } else {
          item.poster_path = 'http://image.tmdb.org/t/p/w92/' + item.poster_path;
        }
      })
    });
  };
})

.directive('search', function($document) {
  return {
    scope: {
      user: '<'
    },
    restrict: 'E',
    controller: 'SearchController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/search.html',
    link: function(scope, element, attr){

      scope.isPopupVisible = false;

      scope.toggleSelect = function(){
        scope.isPopupVisible = true;
      };

      // hide search bar on body click
      $document.bind('click', function(event){
        scope.ctrl.input = null;
        scope.isPopupVisible = false;
        scope.$apply();
      });
    }
  };
});
