mayaNotes.controller('insertController', function ($scope, $state, pouchService) {


    $scope.insert = function () {

        var _title = $scope.title;
        var _text = $scope.text;
        var _tag = $scope.tag;

        if(_title) {
            pouchService.insertDoc(_title, _text, _tag);

            $state.go('home');
        } else {
            alert('Metti il titolo per inserire una nota')
        }
    };

    /*$scope.date = new Date();

    $scope.insertClick = function(){

        var x = new Object();

        if(!$scope.name) {
            alert("Serve un titolo per inserire una nuova nota :)")
        }

        else {
            x.name = $scope.name;
            x.date = $scope.date;
            x.text = $scope.text;

            dataAccess.insert(x);
            $state.go('home');
        }
    };*/

    $scope.backarrow = function () {
        $state.go('home');
    };
    
});