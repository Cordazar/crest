/**
 * Copyright 2013 Ricard Aspeljung. All Rights Reserved.
 *
 * util.js
 * crest
 */

var mongo = require("mongodb"),
  config = module.parent.parent.exports.config,
  debug = module.parent.parent.exports.debug;

debug("util.js is loaded");

/*
 * flavorize - Changes JSON based on flavor in configuration
 */
module.exports.flavorize = function (doc, direction) {
  if (direction === "in") {
    if (config.flavor === "nounderscore") {
      console.log(doc);
      delete doc.id; // only do this in case flavor is set to nounderscore
      console.log(doc);
    }
  } else {
    if (config.flavor === "nounderscore") {
      var id = doc._id.toHexString();
      delete doc._id;
      doc.id = id;
    } else {
      doc._id = doc._id.toHexString();
    }
  }
  return doc;
};

module.exports.cleanParams = function (params) {
  var clean = JSON.parse(JSON.stringify(params));
  if (clean.id) {
    delete clean.id;
  }
  if (clean.db) {
    delete clean.db;
  }
  if (clean.collection) {
    delete clean.collection;
  }
  return clean;
};