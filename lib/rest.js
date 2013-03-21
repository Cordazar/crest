/**
 * Copyright 2013 Ricard Aspeljung. All Rights Reserved.
 *
 * rest.js
 * crest
 */

var mongo = require("mongodb"),
  server = module.parent.exports.server,
  config = module.parent.exports.config,
  debug = module.parent.exports.debug,
  util = require("./util"),
  BSON = mongo.BSONPure;

debug("rest.js is loaded");

/**
 * Query
 */
function handleGet(req, res, next) {
  debug("GET-request recieved");
  var o;
  var query = req.query.query ? JSON.parse(req.query.query) : {};
  // Providing an id overwrites giving a query in the URL
  if (req.params.id) {
    query = {
      '_id': new BSON.ObjectID(req.params.id)
    };
  }
  var options = req.params.options || {};

  var test = ['limit', 'sort', 'fields', 'skip', 'hint', 'explain', 'snapshot', 'timeout'];

  for (o in req.query) {
    if (test.indexOf(o) >= 0) {
      options[o] = req.query[o];
    }
  }

  var mongoclient = new mongo.MongoClient(new mongo.Server(config.db.host, config.db.port, {
    native_parser: true,
    auto_reconnect: true
  }));

  mongoclient.open(function (err, mongoclient) {
    var db = mongoclient.db(req.params.db);
    db.authenticate(config.db.username, config.db.password, function () {
      db.collection(req.params.collection, function (err, collection) {
        collection.find(query, options, function (err, cursor) {
          cursor.toArray(function (err, docs) {
            var result = [];
            if (req.params.id) {
              if (docs.length > 0) {
                result = util.flavorize(docs[0], "out");
                res.header('Content-Type', 'application/json');
                res.send(result);
              } else {
                res.send(404);
              }
            } else {
              docs.forEach(function (doc) {
                result.push(util.flavorize(doc, "out"));
              });
              res.header('Content-Type', 'application/json');
              res.send(result);
            }
            db.close();
          });
        });
      });
    });
  });
}

server.get('/:db/:collection/:id?', handleGet);
server.get('/:db/:collection', handleGet);


/**
 * Insert
 */
server.post('/:db/:collection', function (req, res) {
  debug("POST-request recieved");
  if (req.params) {
    var mongoclient = new mongo.MongoClient(new mongo.Server(config.db.host, config.db.port, {
      native_parser: true,
      auto_reconnect: true
    }));

    mongoclient.open(function (err, mongoclient) {
      var db = mongoclient.db(req.params.db);
      db.authenticate(config.db.username, config.db.password, function () {
        db.collection(req.params.collection, function (err, collection) {
          // We only support inserting one document at a time
          collection.insert(Array.isArray(req.params) ? util.cleanParams(req.params[0]) : util.cleanParams(req.params), function (err, docs) {
            res.header('Location', '/' + req.params.db + '/' + req.params.collection + '/' + docs[0]._id.toHexString());
            res.header('Content-Type', 'application/json');
            res.send(201, '{"ok":1}');
            db.close();
          });
        });
      });
    });
  } else {
    res.header('Content-Type', 'application/json');
    res.send(200, '{"ok":0}');
  }
});

/**
 * Update
 */
server.put('/:db/:collection/:id', function (req, res) {
  debug("PUT-request recieved");
  var spec = {
    '_id': new BSON.ObjectID(req.params.id)
  };

  var mongoclient = new mongo.MongoClient(new mongo.Server(config.db.host, config.db.port, {
    native_parser: true,
    auto_reconnect: true
  }));

  mongoclient.open(function (err, mongoclient) {
    var db = mongoclient.db(req.params.db);
    db.authenticate(config.db.username, config.db.password, function () {
      db.collection(req.params.collection, function (err, collection) {
        collection.update(spec, util.cleanParams(req.params), true, function (err, docs) {
          res.header('Content-Type', 'application/json');
          res.send('{"ok":1}');
        });
      });
    });
  });
});

/**
 * Delete
 */
server.del('/:db/:collection/:id', function (req, res) {
  debug("DELETE-request recieved");
  var spec = {
    '_id': new BSON.ObjectID(req.params.id)
  };

  var mongoclient = new mongo.MongoClient(new mongo.Server(config.db.host, config.db.port, {
    native_parser: true,
    auto_reconnect: true
  }));

  mongoclient.open(function (err, mongoclient) {
    var db = mongoclient.db(req.params.db);
    db.authenticate(config.db.username, config.db.password, function () {
      db.collection(req.params.collection, function (err, collection) {
        collection.remove(spec, function (err, docs) {
          res.header('Content-Type', 'application/json');
          res.send('{"ok":1}');
          db.close();
        });
      });
    });
  });
});
