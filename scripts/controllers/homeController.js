mayaNotes.controller('homeController', function ($scope, $state, $stateParams, pouchService) {
    
    var idDel = '';
    var revDel = '';
    
    $scope.setvar = function (var1, var2) {
        idDel = var1;
        revDel = var2;
        $scope.del = function () {
            pouchService.delDoc(idDel, revDel);
            $state.reload('home')
        }
    };
    
    pouchService.showAll(function (err, result) {
        if(!err) {
            $scope.list = result.rows;
            //console.log(result);
        }
    });
   
    $('#deleteModal').on('shown.bs.modal', function () {
        $('#deleteModal').focus();
        console.log('modale');
    });
    
});