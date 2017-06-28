// this service is mostly used to retrieve useful infos about movies
angular.module('main-app')
.service('queryString', function($location){
  this.getFilters = function(filterObj) {
    var qs = $location.search();
    for (var param in filterObj) {
      if (param in qs) {
        filterObj[param] = qs[param];
      }
    }
    return filterObj;
  };
});
