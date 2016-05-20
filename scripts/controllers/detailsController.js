mayaNotes.controller('detailsController', function ($scope, $state, $stateParams, dataAccess) {


    
    $scope.id = $stateParams.id;
    var currentObj = dataAccess.getById($stateParams.id);

    $scope.id = currentObj.id;
    $scope.date = currentObj.date;
    $scope.name = currentObj.name;
    $scope.text = currentObj.text;

    $scope.deleteClick = function () {
        dataAccess.delete($scope.id);
        $state.go('home');
    };

    $('#deleteModal').on('shown.bs.modal', function () {
        $('#deleteModal').focus()
    })





});