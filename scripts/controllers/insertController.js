mayaNotes.controller('insertController', function ($scope, $state, pouchService, uploadManager, $http) {


    $scope.insert = function () {
        var fileChooser = document.getElementById('file-chooser');

        var _title = $scope.title;
        var _text = $scope.text;
        var _tag = $scope.tag;
        var _hasImage = false;
        var _urlImage = "";

        var hashTitle = CryptoJS.MD5(_title);
        var hashDate = CryptoJS.MD5(_title);
        var hash = hashTitle+hashDate;

        console.log(document.getElementById('file-chooser').files[0]);

        if(document.getElementById('file-chooser').files[0] != null){
            uploadManager.upload(fileChooser, function (url){
                if(url != ""){
                    _hasImage = true;
                    _urlImage = url;
                    console.log("uploadManager");
                    console.log("_hasImage " + _hasImage);
                    console.log("_urlImage " + _urlImage);
                    console.log("hash " + hash);
                }

                if(_title) {
                    pouchService.insertDoc(_title, _text, _tag, _hasImage, _urlImage);
                    $state.go('home');
                } else {
                    alert('Metti il titolo per inserire una nota')
                }
            }); 
        } else {
            if(_title) {
                    pouchService.insertDoc(_title, _text, _tag, _hasImage, _urlImage);
                    $state.go('home');
                } else {
                    alert('Metti il titolo per inserire una nota')
                }
        }

        $scope.loadTags = function(query) {
            return $http.get('/tags?query=' + query);
        };

        

        
    };

    /*$scope.date = new Date();

    $scope.insertClick = function(){

        var x = new Object();

        if(!$scope.name) {
            alert("Serve un titolo per inserire una nuova nota :)")
        }

        else {
            var fileChooser = document.getElementById('file-chooser');

            x.name = $scope.name;
            x.date = $scope.date;
            x.text = $scope.text;
            x.hasImage = false

            uploadManager.upload(fileChooser, function (url){
                if(url != ""){
                    x.hasImage = true
                    x.urlImage = url
                    console.log(url)
                }
            });

            dataAccess.insert(x);
            $state.go('home');
        }
    };*/

    $scope.backarrow = function () {
        $state.go('home');
    };
    
});