/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const assert = require('assert');
const {Request} = require('../../../');
const helper = require('../../helper');

describe('Request#protocol', () => {
  it('must be used protected field', () => {
    let request = Object.create(Request.prototype);
    request._protocol = 'http:';
    assert.strictEqual(request.protocol, request._protocol);
  });

  it('must be "http:" with createServer()', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(request.protocol);
    });
    server.start().then(() => {
      helper.createHttpRequest({
        host: server.options.host,
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http:');
        server.stop().then(done);
      });
    });
  });

  it('must be "https:" with createSecureServer()', (done) => {
    let server = helper.createSecureServer();
    server.listen((request, response) => {
      response.end(request.protocol);
    });
    server.start().then(() => {
      helper.createHttpSecureRequest({
        host: server.options.host,
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'https:');
        server.stop().then(done);
      });
    });
  });
});