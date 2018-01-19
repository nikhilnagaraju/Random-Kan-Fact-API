module.exports = function(app, databaseObj) {

  const db = databaseObj.db('factsdb')
  var ObjectID = require('mongodb').ObjectID;

  const mini=1;
  var maxi=0;

//GET random fact

  app.get('/random', (req, res) => {
      var dbcount =0;
      // let coll = db.collection('factslist');
      // var dbcount = coll.count().then(function() {
      var getid = ""+getRandomIntInclusive(1, 260);

      const details = { '_id': getid };
      db.collection('factslist').findOne(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred while fetching data'});
        } else {
          res.send(item);
        }
      });
  });


  app.post('/fact', (req, res) => {
    const fact = {
                  _id: req.body.id ,
                  enfact: req.body.enfact,
                  knfact: req.body.knfact ,
                  imgurl: req.body.imgurl
                 };
    if (fact._id == null || !typeof parseInt(fact.id) === 'number' || fact.knfact== null || fact.knfact== "" || fact.enfact== null || fact.enfact== ""){
      res.send({ 'error': 'An error has occurred while posting data, Please provide valid data' });
    }
    else {
      db.collection('factslist').insert(fact, (err, result) => {
        if (err) {
          res.send({ 'error': 'An error has occurred while posting data, possibly a redundant data/ an authorization error' });
          console.log(err);
        } else {
          res.send(result.ops[0]);
        }
      });
    }
  });

  app.delete('/fact/:id', (req, res) => {
    const details = { _id: req.params.id };
    db.collection('factslist').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred while deleting data'});
      } else {
        res.send({'fact': req.params.id + ' deleted'});
      }
    });
  });

  app.put('/fact/:id', (req, res) => {
    const replace = { _id: req.params.id };
    const fact = { enfact: req.body.enfact,
                   knfact: req.body.knfact ,
                   imgurl: req.body.imgurl
                 };
    if ( !typeof parseInt(req.params.id) === 'number' || fact.knfact== null || fact.knfact== "" || fact.enfact== null || fact.enfact== ""){
      res.send({ 'error': 'An error has occurred while posting data, Please provide valid data' });
    }
    else {
      db.collection('factslist').update(replace, fact, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred while updating data'});
        } else {
            res.send(fact);
        }
      });
    }
  });

  app.get('/facts', (req, res) => {
      var idArr = getRandomArray();
      var factitems= [];
      var objt= {}
        db.collection('factslist').find( { '_id': { $all: idArr }}, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred while fetching data'});
          } else {
            console.log(JSON.stringify(item));
            res.send(item);
            // factitems.push(item);
          }
        });
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
