mayaNotes.controller('homeController', function ($scope, $state, dataAccess) {

    $("#menu-toggle").click(function(e) {
        e.preventDefault();

        $("#wrapper").toggleClass("toggled");
    });


    $scope.list = dataAccess.getAll();

    $scope.clearStorage = function(){
        localStorage.clear();
    };



});