mayaNotes.service('pouchService', function(pouchDB) {

    var db = new pouchDB("localnotes");
    var remdb = new pouchDB("http://ec2-52-40-220-228.us-west-2.compute.amazonaws.com:5984/mayadb"); //Oregon new
    //var remdb = new pouchDB("http://ec2-52-58-116-62.eu-central-1.compute.amazonaws.com:5984/mayadb"); //Frankfurt ew
    //var remdb = new pouchDB("http://ec2-52-39-178-119.us-west-2.compute.amazonaws.com:5984/mayadb"); //Oregon old

    db.sync(remdb, {
      live: true,
      retry: true
    }).on('change', function (change) {
      console.log("Changes");
    }).on('paused', function (info) {
      console.log("Replicaton paused");
    }).on('active', function (info) {
      console.log("Replication resumed");
    }).on('error', function (err) {
      console.log(err);
    });
    
    //MODO SCORRETTO: non si rimuove un oggetto, si aggiunge un campo delete mediante l'update
    //Change name of "delDoc" to "emptyTrash"

    this.delDoc = function (id, rev) {

        db.remove(id, rev)
            .then(function (result) {
                //console.log(result);
            }).catch(function (err) {
            //console.log(err);
        });
    }; 

    //Change the name of "realDelDoc" to "delDoc" <- fix parameters errors
    
    //Doesn't remove the object, changest the "isDel" value instead to "true"
    this.realDelDoc = function (_id) {
        /**
         *retrives info using details,
         *sets "isDel" as true using editdoc
         */
        
        //probably this doesn't work. Also it's a very trivial way to do it
        pouchService.details(_id, function (err, result) {
            if(!err) {
                this.editDoc(result.id, 
                    result.rev,
                    result.title, 
                    result.text, 
                    result.tag, 
                    result.date, 
                    result.hasImage, 
                    result.urlImage,
                    true); //"deletes" the note -> sets isDel as true
            } else {
                Console.error("Error while retriving note details.")
            }
        });
        
    }

    this.insertDoc = function (title, text, tag, hasImage, urlImage, isDel) {

        db.post({
            date: new Date().toISOString(), 
            /*The ISO format doesn't consider the timezone.
             *Add the amount of seconds corresponding on the Italian timezone(2h from UTC+0 <- Greenwich Meridian).*/
            title: title,
            text: text,
            tag: tag,
            hasImage: hasImage,
            urlImage: urlImage,
            isDel: isDel
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
            urlImage: urlImage,
            isDel: false
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