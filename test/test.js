/**
 * Copyright 2013 Ricard Aspeljung. All Rights Reserved.
 *
 * test.js
 * crest
 */

var main = require('../server'),
  supertest = require('supertest'),
  assert = require('assert'),
  http = require('http');

var objectId;
var request = supertest(main.server);

/* Setting up configuration for testing */
main.config.flavor = "normal";
main.config.debug = false;
delete main.config.db.username;
delete main.config.db.password;

describe("Testing crest", function () {

  after(function (done) {
    main.server.close();
    done();
  });

  it("Should create a simple document", function (done) {
    request
      .post('/tests/tests')
      .type('application/json')
      .send({"test" : "create"})
      .expect(201)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(res.body, {"ok": 1});
        var location = res.header.location.split('/').slice(1);
        assert.equal(location[0], 'tests');
        assert.equal(location[1], 'tests');
        assert.equal(location[2].length, 24);
        objectId = location[2];
        done();
      });
  });

  it("Should check that document exists", function (done) {
    request
      .get('/tests/tests/' + objectId)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(res.body, {
          "test": "create",
          "id": objectId
        });
        done();
      });
  });

  it("Should update a document", function (done) {
    request
      .put('/tests/tests/' + objectId)
      .type('application/json')
      .send({"test" : "updated"})
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(res.body, {"ok": 1});
        done();
      });
  });

  it("Should check that document is updated", function (done) {
    request
      .get('/tests/tests/' + objectId)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(res.body, {
          "test": "updated",
          "id": objectId
        });
        done();
      });
  });

  it("Should delete a document", function (done) {
    request
      .del('/tests/tests/' + objectId)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(res.body, {"ok": 1});
        done();
      });
  });

  it("Should check that document is deleted", function (done) {
    request
      .get('/tests/tests/' + objectId)
      .expect(404, done);
  });

});