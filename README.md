# crest

[crest](http://github.com/cordazar/crest) is a REST API Server for MongoDB.
crest stands for [Cygnus](http://en.wiktionary.org/wiki/Cygnus) REST.


## Installation

### Recommended way
	npm install crest -g

This will install crest globally so that it may be run from the command line.

### As node.js module
	npm install crest

This will install crest as a module to be used as a part of some other project.

### Clone with git
	git clone git://github.com/Cordazar/crest.git


## Usage
If installed globally you can just run

	crest


### Quick try
After starting the server you can quickly try it out by issuing the following from the command line:

	curl -d '{ "example key" : " }' -H "Content-Type: application/json" http://localhost:3500/tests/example

This should add a document to the collection **example** in database **tests** looking similar to this: 

	{ "A1": 201, "_id": ObjectId("4e90e196b0c7f4687000000e") }

### Supported REST requests
* `GET /db/collection` - Returns all documents
* `GET /db/collection` - Returns all documents (query and options in GET body)
* `GET /db/collection?query=%7B%22isDone%22%3A%20false%7D` - Returns all documents satisfying query
* `GET /db/collection?query=%7B%22isDone%22%3A%20false%7D&limit=2&skip=2` - Ability to add options to query (limit, skip, etc)
* `GET /db/collection/id` - Returns document with _id_
* `POST /db/collection` - Insert new document in collection (document in POST body)
* `PUT /db/collection/id` - Update document with _id_ (updated document in PUT body)
* `DELETE /db/collection/id` - Delete document with _id_

### Content Type
* Please make sure `application/json` is used as Content-Type when using POST/PUT/GET with data in request body.


## Setup

### Configuration parameters
* `db` [object]
	* `host` [string]
	* `port` [string]
    * `username` [string]
    * `password` [string]
* `server` [object]
	* `port` [string]
	* `address` [string]
* `flavor` [string] _mongodb_ or _normal_
* `debug` [boolean]

#### Flavors
* Choose **mongodb** as flavor to keep using *_id* as primary key for a document.
* Choose **normal** as flavor if you want to change *_id* to *id*

### Dependencies
Application dependencies are sorted under dependencies in _package.json_ while test dependencies are sorted under devDependencies. 
All dependencies can be installed via `npm install -l`


## Tests
Basic tests are available and can be run via [mocha](http://visionmedia.github.com/mocha/).


## License
  
The MIT License (MIT)
Copyright (c) 2013 Ricard Aspeljung

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
