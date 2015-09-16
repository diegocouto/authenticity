var app = angular.module('docAuthenticity', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/form',
        controller: 'checkerController',
      })
      .when('/files/:fileKey', {
        templateUrl: 'partials/file',
        controller: 'fileController',
      });

    $locationProvider.html5Mode(true);
}]);

app.controller('checkerController', ['$scope', '$http', '$location', '$rootScope', 'notify', 
  function($scope, $http, $location, $rootScope, notify) {
    $scope.notifications = notify

    $scope.checkDocument = function() {
      $scope.loading = true;

      $http.get('/api/v1/files/' + $scope.file.key)
      .success(function(data) {
        notify.clear();

        $rootScope.file = data;
        $location.path('/files/' + $scope.file.key);
      })
      .error(function(data) {
        notify.send('We couldn\'t find any document related to this key. It could be a typo, try to confirm the document key.');
      })
      .finally(function(){
        $scope.loading = false;
      });
    };
  }
]);

app.controller('fileController', ['$scope', '$http', '$location', '$rootScope', '$routeParams', 'notify',
  function($scope, $http, $location, $rootScope, $routeParams, notify) {
    if($rootScope.file != undefined)
      $scope.file = $rootScope.file
    else {
      $http.get('/api/v1/files/' + $routeParams.fileKey)
        .success(function(data) {
          $scope.file = data;
        })
        .error(function(data) {
          notify.send('We couldn\'t find any document related to this key. It could be a typo, try to confirm the document key.');
          $location.path('/');
        });
    }
  }
]);

app.factory('notify', function() {
  var msg;

  return {
    send: function(new_msg) { msg = new_msg; },
    show: function() { return msg; },
    clear: function() { msg = ""; }
  };
});

app.directive('focusInput', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        $timeout(function() {
          element.parent().find('input')[0].focus();
        });
      });
    }
  };
});
