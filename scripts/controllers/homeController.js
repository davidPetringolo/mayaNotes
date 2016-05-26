mayaNotes.controller('homeController', function ($scope, $state, $stateParams, pouchService) {


    
    pouchService.showAll(function (err, result) {
        if(!err) {
            $scope.list = result.rows;
            //console.log(result);
        }
    });


    var _id = $scope.id;
    var _rev = $scope.rev;
    console.log(_id);
    console.log(_rev);

    $scope.del = function () {

        pouchService.delDoc(_id, _rev);
        console.log('ci passa')
        console.log(_id);
        console.log(_rev);
    };
   
   
    $('#deleteModal').on('shown.bs.modal', function () {
        $('#deleteModal').focus();
        console.log('modale');
    });







    $scope.open = function (_customer) {

        var modalInstance = $modal.open({
            controller: "ModalInstanceCtrl",
            templateUrl: 'myModalContent.html',
            resolve: {
                customer: function()
                {
                    return _customer;
                }
            }
        });

    };







    /*$scope.list = dataAccess.getAll();

    $scope.deleteClick = function (el) {
        dataAccess.delete(el);
    };

    
    $scope.clearStorage = function(){
        localStorage.clear();
        window.location.reload()
    };*/

    

});