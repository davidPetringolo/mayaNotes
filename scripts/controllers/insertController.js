mayaNotes.controller('insertController', function ($scope, $state, pouchService, uploadManager, $http) {

    $scope.insert = function () {

        var fileChooser = document.getElementById('file-chooser');

        var _title = $scope.title;
        var _text = $scope.text;
        var _tag = $scope.tags;
        var _hasImage = false;
        var _urlImage = "";

        if(document.getElementById('file-chooser').files[0] != null){
            uploadManager.upload(fileChooser, _title, function (url){
                if(url != ""){
                    _hasImage = true;
                    _urlImage = url;
                    //console.log("url insertController " + url)
                }

                insertNote(_title, _text, _tag, _hasImage, _urlImage);
            });
        } else{
            insertNote(_title, _text, _tag, _hasImage, _urlImage);

        }

        $scope.loadTags = function (query) {
            return $http.get('/tags?query=' + query);
        };    
    };

    function insertNote (_title, _text, _tag, _hasImage, _urlImage){
        if(_title) {
            pouchService.insertDoc(_title, _text, _tag, _hasImage, _urlImage);
            $state.go('home');
        } else {
            alert('Metti il titolo per inserire una nota')
        }
    }

    $scope.backarrow = function () {
        $state.go('home');
    };
    
});