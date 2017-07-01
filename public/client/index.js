angular.module('main-app', ['ngRoute'])

 .config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
})

.config(function ($locationProvider, $routeProvider) {

    $routeProvider
        .when('/user', {
            controller: 'MainCtrl',
            templateUrl: 'public/client/templates/app.html',
            controllerAs: 'ctrl'
            // hideMenus: true
        })

        .when('/', {
            controller: 'AuthPanelCtrl',
            templateUrl: 'public/client/templates/authPanel.html',
            controllerAs: 'ctrl'
        })
        .when('/home', {
            controller: 'HomeCtrl',
            templateUrl: 'public/client/templates/home.html',
            controllerAs: 'ctrl'
        })

        .otherwise({ redirectTo: '/login' });

    $locationProvider.html5Mode(true);
})
.run(function($rootScope, $location, $http) {
  // console.log('hello guys!!!', $rootScope);
        // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      //console.log('this is being triggered!', $location.$$path);
      $http.get('/userCheck').then( (session) => {
        // console.log('true?', $location.$$path === '/user' && !session.user);
        // console.log('session is ', session);
        if ($location.$$path === '/user' && session.data.user) {
          // session.user = {};
          $location.path( "/user" );
          // $location.path( "/home" );
        }
        if ($location.$$path === '/home' && session.data.user) {
          // session.user = {};
          $location.path( "/home" );
          // $location.path( "/home" );
        }
      });
      // if ( $rootScope.loggedUser == null ) {
      //   // no logged user, we should be going to #login
      //   if ( next.templateUrl == "partials/login.html" ) {
      //     // already going to #login, no redirect needed
      //   } else {
      //     // not going to #login, we should redirect now
      //     $location.path( "/login" );
      //   }
      // }
    });
 })
