module.exports = function(app, databaseObj) {

  const db = databaseObj.db('factsdb')
  var ObjectID = require('mongodb').ObjectID;

//GET random fact
  app.get('/random/:id', (req, res) => {
      // const id = req.params.id;
      const details = { '_id': req.params.id };
      db.collection('factslist').findOne(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred while fetching data'});
        } else {
          res.send(item);
        }
      });
  });

};
