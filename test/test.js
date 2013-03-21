var main = require('../server'),
  request = require('supertest'),
  assert = require('assert'),
  http = require('http');

var objectId;

describe("Testing crest", function () {

  after(function (done) {
    main.server.close();
    done();
  });

  it("Should create a simple document", function (done) {
    var post_data = '{"test":"create"}';
    var post_options = {
      host: main.config.server.host,
      port: main.config.server.port,
      path: '/tests/tests',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': post_data.length
      }
    };
    var post_req = http.request(post_options, function (res) {
      res.on('data', function (body) {
        if (body instanceof Error) {
          return body.stack;
        }
        var chunk;
        if (Buffer.isBuffer(body)) {
          chunk = body.toString();
        }
        assert.equal(JSON.parse(chunk), '{"ok":1}');
        assert.equal(res.statusCode, 201);
        var location = res.header('Location').split('/').slice(1);

        assert.equal(location[0], 'tests');
        assert.equal(location[1], 'tests');
        assert.notEqual(location[2], null);
        assert.equal(location[2].length, 24);
        objectId = location[2];
        done();
      });
    });
    post_req.write(post_data);
    post_req.end();
  });

  it("Should check that document exists", function (done) {
    var get_options = {
      host: main.config.server.host,
      port: main.config.server.port,
      path: '/tests/tests/' + objectId,
      method: 'GET'
    };
    http.get(get_options, function (res) {
      res.on('data', function (body) {
        assert.deepEqual(JSON.parse(body), {
          "test": "create",
          "_id": objectId
        });
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  it("Should update a document", function (done) {
    var update_data = '{"test": "updated"}';
    var update_options = {
      host: main.config.server.host,
      port: main.config.server.port,
      path: '/tests/tests/' + objectId,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    var update_req = http.request(update_options, function (res) {
      res.on('data', function (body) {
        if (body instanceof Error) {
          return body.stack;
        }
        var chunk;
        if (Buffer.isBuffer(body)) {
          chunk = body.toString();
        }
        assert.equal(JSON.parse(chunk), '{"ok":1}');
        assert.equal(res.statusCode, 200);
        done();
      });
    });
    update_req.write(update_data);
    update_req.end();
  });

  it("Should check that document is updated", function (done) {
    var get_options = {
      host: main.config.server.host,
      port: main.config.server.port,
      path: '/tests/tests/' + objectId,
      method: 'GET'
    };
    http.get(get_options, function (res) {
      res.on('data', function (body) {
        assert.deepEqual(JSON.parse(body), {
          "test": "updated",
          "_id": objectId
        });
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  it("Should delete a document", function (done) {
    var delete_options = {
      host: main.config.server.host,
      port: main.config.server.port,
      path: '/tests/tests/' + objectId,
      method: 'DELETE'
    };
    var delete_req = http.request(delete_options, function (res) {
      res.on('data', function (body) {
        if (body instanceof Error) {
          return body.stack;
        }
        var chunk;
        if (Buffer.isBuffer(body)) {
          chunk = body.toString();
        }
        assert.equal(JSON.parse(chunk), '{"ok":1}');
        assert.equal(res.statusCode, 200);
        done();
      });
    });
    delete_req.end();
  });

  it("Should check that document is deleted", function (done) {
    var get_options = {
      host: main.config.server.host,
      port: main.config.server.port,
      path: '/tests/tests/' + objectId,
      method: 'GET'
    };
    http.get(get_options, function (res) {
      res.on('end', function (body) {
        assert.equal(res.statusCode, 404);
        done();
      });
    });
  });

});