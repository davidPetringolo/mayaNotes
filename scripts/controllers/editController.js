mayaNotes.controller('editController', function ($scope, $state, $stateParams, pouchService, uploadManager) {
    
    var _id = $stateParams.id;

    pouchService.details(_id, function (err, result) {
        if(!err) {
            $scope.title = result.title;
            $scope.text = result.text;
            $scope.tag = result.tag;
            $scope.hasImage = result.hasImage;
            $scope.urlImage = result.urlImage;
        } else {
            alert(err);
        }
    });
    
    $scope.edit = function () {
        var fileChooser = document.getElementById('file-chooser');

        var _date = new Date().toISOString();
        var _id = $stateParams.id;
        var _rev = $stateParams.rev;
        var _title = $scope.title;
        var _text = $scope.text;
        var _tag = $scope.tag;
        var _hasImage = $scope.hasImage;
        var _urlImage = $scope.urlImage;

        if(document.getElementById('file-chooser').files[0] != null){
            uploadManager.upload(fileChooser, _title, function (url){
                if(url != ""){
                    _hasImage = true;
                    _urlImage = url;
                    //console.log("url insertController " + url)
                }

                pouchService.editDoc(_id, _rev, _title, _text, _tag, _date, _hasImage, _urlImage);
            });
        } else{
                pouchService.editDoc(_id, _rev, _title, _text, _tag, _date, _hasImage, _urlImage);
        }

        $state.go('home');
    };
    
    $scope.backarrow = function () {
        $state.go('home');
    };

});