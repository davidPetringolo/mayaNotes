mayaNotes.controller('detailsController', function ($scope, $state, $stateParams, pouchService) {


    var _id = $stateParams.id;

    $scope.doc = pouchService.details(_id, function (err, result) {
        if(!err) {
            $scope.doc = result;
        } else {
            alert(err);
        }
    });
    
    /*$scope.id = $stateParams.id;
    var currentObj = dataAccess.getById($stateParams.id);

    $scope.id = currentObj.id;
    $scope.date = currentObj.date;
    $scope.name = currentObj.name;
    $scope.text = currentObj.text;

    $scope.deleteClick = function () {
        dataAccess.delete($scope.id);
        $state.go('home');
    };*/
    
    $scope.backarrow = function () {
        $state.go('home');
    };

    $('#deleteModal').on('shown.bs.modal', function () {
        $('#deleteModal').focus()
    })





});