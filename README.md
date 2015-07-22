
# Crest

[Crest](http://github.com/cordazar/crest) is a REST API Server for MongoDB built in node.js.

## About

The idea for crest was born when we needed a REST API for a MongoDB project at work and the ones we found were not what we expected from 

So this is my attempt at building a small and easy to use REST API Server for MongoDB with primary focus on json. Since this is my first time building a REST API I'll appreciate any and all feedback.

Crest stands for [Cygnus](http://en.wiktionary.org/wiki/Cygnus) REST.


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

    curl -d '{ "Key" : 42 }' -H "Content-Type: application/json" http://localhost:3500/test/example

This should add a document to the collection **example** in database **test** looking similar to this: 

    { "Key": 42, "_id": ObjectId("4e90e196b0c7f4687000000e") }

### Supported REST requests
    GET /db/collection
Returns all documents (query and options can be sent in GET body)

    GET /db/collection?query=%7B%22isDone%22%3A%20false%7D
Returns all documents satisfying query

    GET /db/collection?query=%7B%22isDone%22%3A%20false%7D&limit=2&skip=2
Ability to add options to query (limit, skip, etc)
    
    GET /db/collection/id
Returns document with _id_
    
    POST /db/collection
Insert new document in collection (document in POST body)
    
    PUT /db/collection/id
Update document with _id_ (updated document in PUT body)
    
    DELETE /db/collection/id
Delete document with _id_

### Content Type
Please make sure `application/json` is used as Content-Type when using POST/PUT/GET with data in request body.


## Setup

### Configuration parameters

These parameters are saved in __config.json__.

Database settings where username and password are optional.

    db [object]
        host [string]
        port [string]
        username [string] (optional)
        password [string] (optional)

Server settings for where and how the rest api is going to be run.

    server [object]
        port [string] 
        address [string]

General settings

    flavor [string] (mongodb or normal)
    debug [boolean]

#### Flavors
* Choose **mongodb** as flavor to keep using *\_id* as primary key for a document.
* Choose **normal** as flavor if you want to change *\_id* to *id*

### Dependencies
Application dependencies are sorted under dependencies in _package.json_ while test dependencies are sorted under devDependencies. 


## Tests
Basic tests are available and can be run via [mocha](http://visionmedia.github.com/mocha/). 

These tests require a working mongodb installation and might require changes to __config.json__

Recommended way to run mocha in terminal with mocha reporter _spec_ chosen.

    mocha -R spec
    
More indepth tests will be added at a later date. 


##Bugs

Issues can be found at [https://github.com/cordazar/crest/issues](https://github.com/cordazar/crest/issues)


## License
  
The MIT License (MIT)
Copyright (c) 2013 Ricard Aspeljung

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
