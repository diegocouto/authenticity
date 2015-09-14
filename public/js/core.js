var docAuthenticity = angular.module('docAuthenticity', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $scope.checkDocument = function(file_key) {
        $http.get('/api/v1/files/' + file_key)
            .success(function(data) {
                $scope.file = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
