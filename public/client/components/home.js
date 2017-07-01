angular.module('main-app')
.controller('HomeCtrl', function(searchTheMovieDB, searchOMDB, $http, searchShowtimes) {
  this.user = {};
  this.searchTheMovieDB = searchTheMovieDB
  this.searchOMDB = searchOMDB
  this.searchShowtimes  = searchShowtimes
  this.intendedUser
  this.movies = []
  this.movie
  this.showtimes = []
  this.query = {startDate: '2017-06-30',numDays: '7', postalCode: '78633'}
  $http.get('/sess').then((session) => {

    this.intendedUser = session;
    console.log(this.intendedUser)
    this.user.username = this.intendedUser.data.username;
    this.user.postalCode = this.intendedUser.data.postalCode;
    this.user.movies = this.intendedUser.data.movies;
    this.user.tvShows = this.intendedUser.data.tvShows;
    this.query = {startDate: '2017-06-30',numDays: '7', postalCode: this.intendedUser.data.postalCode}
  })
  this.handleSubmit = function() {
    console.log('Hey')
    this.searchShowtimes.search(this.query, (data) => {
      console.log('data', data)
      this.movies = data;
      this.movie = this.movies[0]
      this.showtimes = this.movie.showtimes
    })
  }

})
.directive('home', function() {
  return {
    restrict: 'E',
    controller: 'HomeCtrl',
    // function (searchTheMovieDB, searchOMDB, searchShowtimes) {
    //   this.$onInit = function() {
    //     this.searchTheMovieDB = searchTheMovieDB
    //     this.searchOMDB = searchOMDB
    //     this.searchShowtimes  = searchShowtimes
    //     this.showtimes = '[2, 3]'
    //     console.log('hey');
    //   }
    // },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/home.html'
  };
});
