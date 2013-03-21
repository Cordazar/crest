/**
 * Copyright 2013 Ricard Aspeljung. All Rights Reserved.
 *
 * accesscontrol.js
 * crest
 */

var mongo = require("mongodb"),
  config = module.parent.exports.config,
  debug = module.parent.exports.debug;

debug("accesscontrol.js is loaded");

/*
 * accesscontrol - handles http access control based on configuration
 */
module.exports.handle = function (req, res, next) {
  if (req.header('Origin')) {
    if (config.accessControl.allowOrigin) {
      res.header('Access-Control-Allow-Origin', config.accessControl.allowOrigin);
    }
    if (config.accessControl.allowMethods) {
      res.header('Access-Control-Allow-Methods', config.accessControl.allowMethods);
    }
    if (req.header('Access-Control-Request-Headers')) {
      res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    }
  }
  return next();
};