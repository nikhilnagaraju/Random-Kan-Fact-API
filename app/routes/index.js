const appRoutes = require('./fact_routes');

module.exports = function(app, db){
  appRoutes(app, db);
};
