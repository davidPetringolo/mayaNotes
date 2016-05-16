mayaNotes.controller('homeController', function ($scope, $state, dataAccess) {

    

    $scope.list = dataAccess.getAll();

    $scope.clearStorage = function(){
        localStorage.clear();
    };



});