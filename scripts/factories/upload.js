mayaNotes.factory("uploadManager", function() {

  var uploadManager = {};

  var bucket = new AWS.S3({params: {Bucket: 'tsac-its'}});
  var results = document.getElementById('results');

  function getS3KeyFromFileNameWithExtension(name) {
    return "MayaNotes/" + name; //+ "." + ext
  }

  uploadManager.upload = function (fileChooser, completionHandler){
    var file = fileChooser.files[0];
    if (file) {
      results.innerHTML = '';

      var _extension = file.toString().split(".");
      //if(_extension.length<=1) _extension = "txt"
      //else _extension = _extension.splice(-1)

      var _path = getS3KeyFromFileNameWithExtension(file.name);
      var _url = ""

      var params = {Key: _path, ContentType: file.type, Body: file};
      var valueUrl = {Bucket: 'tsac-its', Key: _path};

      bucket.getSignedUrl('getObject', valueUrl, function (err, url) {
        console.log("The URL is", url);
        console.log(err);
        _url = url;
      });

      bucket.upload(params, function (err, data) {
        console.log(err, data);
        completionHandler(_url);
        results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
      });
      
    }
  };

  return uploadManager;
});