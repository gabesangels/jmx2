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
    controller: function() {
      this.$onInit = () => {
        var d = new Date(this.showtime.dateTime);
        this.dateTime = this.formatDate(d);
      }
      this.formatDate = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/showtimeEntry.html'
  };
});
