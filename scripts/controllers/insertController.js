/**
 * Created by Phil on 12/05/2016.
 */


mayaNotes.controller('insertController', function ($scope, $state, dataAccess) {

    $scope.insertClick = function(){

        var x = new Object();

        x.name = $scope.name;
        x.date = $scope.date;
        x.text = $scope.text;
        
            dataAccess.insert(x);
            $state.go('home');

    }



});