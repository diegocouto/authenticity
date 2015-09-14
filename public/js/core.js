var app = angular.module('docAuthenticity', []);

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

app.controller('checkerController', ['$scope', '$http', function($scope, $http) {
    $scope.file = {};

    $scope.checkDocument = function() {
        $scope.loading = true;

        $http.get('/api/v1/files/' + $scope.file.key)
            .success(function(data) {
                $scope.file = data;
                console.log(data);
            })
            .error(function(data) {
                console.log(data);
            })
            .finally(function(){
                $scope.loading = false;
            });
    };
}]);
