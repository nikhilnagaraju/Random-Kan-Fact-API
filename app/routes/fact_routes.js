module.exports = function(app, databaseObj) {

  const db = databaseObj.db('factsdb')
  var ObjectID = require('mongodb').ObjectID;
  var util = require('util');
  // var stringify1 = require('json-stringify-safe');

  const mini=1;
  var maxi=0;


  //GET Status for default path
  app.get('/', (req, res) => {
  var item = {
    "status":"alive",
    "message":"say thanks to SOF, API is alive",
    "possible requests": {
      "GET /random": "Get a random kannada fact",
      "GET /facts": "Get an array of random kannada facts [array of size 10]",
      "POST /fact": "Create/Add a fact on hosted db; requires a json with 'fact' model as body",
      "PUT /fact/:id": "Update a fact using (integer)id on hosted DB; requires a json with 'fact' model as body",
      "DELETE /fact/:id": "Delete a fact with (integer)id on hosted DB"
    }};
    res.send(item);
  });


  //GET random fact
  app.get('/random', (req, res) => {
      var dbcount =0;
      // let coll = db.collection('factslist');
      // var dbcount = coll.count().then(function() {
      var getid = ""+getRandomIntInclusive(1, 260);

      const details = { '_id': getid };
      db.collection('factslist').findOne(details, (err, item) => {
        if (err) {
          res.send({ "status" : "failure", 'error':'An error has occurred while fetching data' });
        } else {
          if (item)
            res.send(item);
          else
            res.send({ "status" : "undetermined", 'error':'An error has occurred while fetching data' });
        }
      });
  });

  // GET an array of 10 Random Facts
  app.get('/facts', (req, res) => {
      var objt= {};
        db.collection('factslist').aggregate([{$match: {}}, { $sample: { size: 10 } }]).toArray( function (err, item) {
          if (err) {
            res.send({'error':'An error has occurred while fetching data'});
          } else {
            objt.randomArray = item;
            console.log(objt);
            res.send(objt);
          }
        });
  });

  // POST a random fact
  app.post('/fact', (req, res) => {
    const fact = {
                  _id: req.body.id ,
                  enfact: req.body.enfact,
                  knfact: req.body.knfact ,
                  imgurl: req.body.imgurl
                 };
    if (fact._id == null || !typeof parseInt(fact.id) === 'number' || fact.knfact== null || fact.knfact== "" || fact.enfact== null || fact.enfact== ""){
      res.send({
        "status" : "failure",
        "error": "An error has occurred while posting data, Please request body should have valid data",
        "valid data" : {
          "id" : "an integer",
          "enfact" : "string",
          "knfact" : "string",
          "imgurl" : "string"
        }
      });
    }
    else {
      db.collection('factslist').insert(fact, (err, result) => {
        if (err) {
          res.send({ "status" : "failure", "error": "An error has occurred while posting data, possibly a redundant data or an authorization error" });
          console.log(err);
        } else {
          res.send({ "status" : "success", "fact added" : result.ops[0] });
        }
      });
    }
  });

  // DELETE a Random fact with id
  app.delete('/fact/:id', (req, res) => {
    const details = { _id: req.params.id };
    db.collection('factslist').remove(details, (err, item) => {
      if (err) {
        res.send({ "status" : "failure", "error":"An error has occurred while deleting data" });
      } else {
        res.send({ "status" : "success", "fact": req.params.id + " deleted" });
      }
    });
  });

  // UPDATE a Random fact with id
  app.put('/fact/:id', (req, res) => {
    const replace = { _id: req.params.id };
    const fact = { enfact: req.body.enfact,
                   knfact: req.body.knfact ,
                   imgurl: req.body.imgurl
                 };
    if ( !typeof parseInt(req.params.id) === 'number' || fact.knfact== null || fact.knfact== "" || fact.enfact== null || fact.enfact== ""){
      res.send({ "status" : "failure", "error": "An error has occurred while posting data, Please provide valid data" });
    }
    else {
      db.collection('factslist').update(replace, fact, (err, result) => {
        if (err) {
            res.send({ "status" : "failure", "error":"An error has occurred while updating data" });
        } else {
            res.send(fact);
        }
      });
    }
  });

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  function getRandomArray(){
    randArr = [];
    for (var i=0; i<10 ; i++){
      var zz= "" + getRandomIntInclusive(1, 260);
      randArr.push(zz);
    }
    return randArr;
  }

};
