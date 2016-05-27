mayaNotes.factory("uploadManager", function() {

  var uploadManager = {};
  var bucket = new AWS.S3({params: {Bucket: 'tsac-its'}});
  var results = document.getElementById('results');
  var _url = null;

  function getS3KeyFromFileNameWithExtension (hash, ext) {
    return "MayaNotes/" + hash + "." + ext
  }

  function extensionControl (ext) {
    if(ext == "jpg" || ext == "png" || ext == "gif" || ext == "bmp" || ext == "txt")
      return ext;
    else
      alert("Estensione --> " + ext + " <-- non valida!");
  }

  function createsHash (_title) {
    var hashTitle = CryptoJS.MD5(_title);
    var hashDate = CryptoJS.MD5(new Date());
    var hash = "MN_"+hashTitle+hashDate;

    return hash
  }

  function createsUrl (valueUrl) {
    bucket.getSignedUrl('getObject', valueUrl, function (err, url) {
      //console.log("The URL is", url);
      //console.log(err);
      _url = url;   
    }); 
  }

  function splitExtension (nameWithExt) {
    var splittedFileName = nameWithExt.split(".");
    var ext = splittedFileName[1];
    return ext;
  }

  uploadManager.upload = function (fileChooser, _title, completionHandler){
    var file = fileChooser.files[0];
    if (file) {
      _extension = splitExtension(file.name);
      extensionControl(_extension);

      var _hash = createsHash(_title);
      var _path = getS3KeyFromFileNameWithExtension(_hash, _extension);
      var valueUrl = {Bucket: 'tsac-its', Key: _path};
      //var _url = createsUrl(valueUrl);
      createsUrl(valueUrl);
      var params = {Key: _path, ContentType: file.type, Body: file};

      bucket.upload(params, function (err, data) {
        //console.log(err, data);
        completionHandler(_url);;
      });
    }
  }

  return uploadManager;
});