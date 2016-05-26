mayaNotes.controller('editController', function ($scope, $state, $stateParams, pouchService) {
    
    var _id = $stateParams.id;

    pouchService.details(_id, function (err, result) {
        if(!err) {
            $scope.title = result.title;
            $scope.text = result.text;
            $scope.tag = result.tag;
        } else {
            alert(err);
        }
    });

    
    $scope.edit = function () {

        var _date = new Date().toISOString();
        var _id = $stateParams.id;
        var _rev = $stateParams.rev;
        var _title = $scope.title;
        var _text = $scope.text;
        var _tag = $scope.tag;

        pouchService.editDoc(_id, _rev, _title, _text, _tag, _date);

        $state.go('home');
    };
    

    $scope.backarrow = function () {
        $state.go('home');
    };

});