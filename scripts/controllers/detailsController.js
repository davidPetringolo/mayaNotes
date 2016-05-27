mayaNotes.controller('detailsController', function ($scope, $state, $stateParams, pouchService) {
    
    var _id = $stateParams.id;
    var rev = "";

    $scope.doc = pouchService.details(_id, function (err, result) {
        if(!err) {
            $scope.doc = result;
            rev = result._rev;
            console.log(result);
        } else {
            alert(err);
        }
    });
    
    $scope.del = function () {
        pouchService.delDoc(_id, rev);
        $state.go('home');
    };
    
    $scope.backarrow = function () {
        $state.go('home');
    };
    
    $('#deleteModal').on('shown.bs.modal', function () {
        $('#deleteModal').focus()
    })
    
});