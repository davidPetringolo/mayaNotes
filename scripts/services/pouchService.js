mayaNotes.service('pouchService', function(pouchDB) {

    var db = new pouchDB("prova");

    /*this.syncDb = function () {

     db.sync('http://127.0.0.1:5984/new', {
     live: true,
     retry: true
     })
     };*/
    
    //MODO SCORRETTO: non si rimuove un oggetto, si aggiunge un campo delete mediante l'update

    this.delDoc = function (id, rev) {

        db.remove(id, rev)
            .then(function (result) {
                //console.log(result);
            }).catch(function (err) {
            //console.log(err);
        });
    };
    
    this.insertDoc = function (title, text, tag, hasImage, urlImage) {

        db.post({
            date: new Date().toISOString(),
            title: title,
            text: text,
            tag: tag,
            hasImage: hasImage,
            urlImage: urlImage
        }).then(function (response) {
            //console.log(response);

        }).catch(function (err) {
            //console.log(err);
        });
    };

    this.editDoc = function (id, rev, title, text, tag, date, hasImage, urlImage) {

        db.put({
            date: date,
            _id: id,
            _rev: rev,
            title: title,
            text: text,
            tag: tag,
            hasImage: hasImage,
            urlImage: urlImage
        }).then(function(response) {
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    };

    this.details = function (id, completionHandler) {

        db.get(id).then(function (doc) {
            //console.log(doc);
            completionHandler(null, doc);
        }).catch(function (err) {
            //console.log(err);
            completionHandler(err);
        });
    };
    
    this.showAll = function (completionHandler) {

        db.allDocs({
            include_docs: true,
            descending: true
            //attachments: true
        }).then(function (result) {

            completionHandler(null, result);
            //console.log(result.rows);
        }).catch(function (err) {

            completionHandler(err);
            //console.log(err);
        });
    };
    
    this.delete = function () {

        db.destroy().then(function (response) {
            console.log('DATABASE DISTRUTTO');
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    };
    
    this.info = function () {
        db.info().then(function (info) {
            console.log('INFO');
            console.log(info);
        }).catch(function (err) {
            console.log(err);
        });
    };
});