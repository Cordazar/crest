# crest

[crest](http://github.com/cordazar/crest) is a REST API Server for MongoDB.
crest stands for [Cygnus](http://en.wiktionary.org/wiki/Cygnus) REST.


## Usage
Run server with `node server`

### Quick try
After starting the server you can quickly try it out by issuing the following from the command line:
`curl -d '{ "example key" : " }' -H "Content-Type: application/json" http://localhost:3500/tests/example`

This should add a document to the collection **example** in database **tests**, like so: `{ "A1": 201, "_id": ObjectId("4e90e196b0c7f4687000000e") }`


## Installation
Clone repository and you can just run it directly from the repository folder. NPM install will come at a later time.


## Tests
Basic tests are available and can be run via [mocha](http://visionmedia.github.com/mocha/).


## License
  
The MIT License (MIT)
Copyright (c) 2013 Ricard Aspeljung

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.