/**
 * Copyright 2013 Ricard Aspeljung. All Rights Reserved.
 *
 * server.js
 * crest
 */

var fs = require("fs"),
  mongodb = require("mongodb"),
  restify = module.exports.restify = require("restify");

var DEBUGPREFIX = "DEBUG: ";

var config = {
  "db": {
    "port": 27017,
    "host": "localhost"
  },
  "server": {
    "port": 3500,
    "address": "0.0.0.0"
  },
  "flavor": "mongodb",
  "debug": false
};

var debug = module.exports.debug = function (str) {
  if (config.debug) {
    console.log(DEBUGPREFIX + str);
  }
};

try {
  config = JSON.parse(fs.readFileSync(process.cwd() + "/config.json"));
} catch (e) {
  debug("No config.json file found. Fall back to default config.");
}

module.exports.config = config;

var server = restify.createServer({
  name: "crest"
});
server.acceptable = ['application/json'];
server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());
server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.jsonp());
module.exports.server = server;

require('./lib/rest');

server.listen(config.server.port, function () {
  console.log("%s listening at %s", server.name, server.url);
});