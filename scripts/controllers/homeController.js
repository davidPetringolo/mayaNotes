mayaNotes.controller('homeController', function ($scope, $state, $stateParams, dataAccess) {

    
    $scope.list = dataAccess.getAll();

    $scope.deleteClick = function ( idelement ) {
        var person_to_delete = idelement;

        dataAccess.delete(person_to_delete);
        
    };

    
    $scope.clearStorage = function(){
        localStorage.clear();
        window.location.reload()
    };

    $('#deleteModal').on('shown.bs.modal', function () {
        $('#deleteModal').focus()
    })

});