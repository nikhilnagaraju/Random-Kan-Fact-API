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

  app.get('/facts', (req, res) => {
      var idArr = getRandomArray();
      var factitems= [];
      var objt= {}
      for (var i = 0; i < idArr.length; i++) {
        var details = { '_id': idArr[i] };
        db.collection('factslist').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred while fetching data'});
          } else {
            factitems.push(item);
          }
        });
      }

      res.send(factitems);
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
