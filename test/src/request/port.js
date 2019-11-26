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

describe('Request#port', () => {
  it('must be used protected field', () => {
    let request = Object.create(Request.prototype);
    request._port = '9000';
    assert.strictEqual(request.port, request._port);
  });

  it('must be work with createServer()', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(request.port);
    });
    server.start().then(() => {
      helper.createHttpRequest({
        host: server.config.host,
        port: server.config.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, String(server.config.port));
        server.stop().then(done);
      });
    });
  });

  it('must be work with createServerDefaultPort()', (done) => {
    let server = helper.createServerDefaultPort();
    server.listen((request, response) => {
      response.end(request.port);
    });
    server.start().then(() => {
      helper.createHttpRequest({
        host: server.config.host
      }).then(({buffer}) => {
        assert.strictEqual(buffer, '');
        server.stop().then(done);
      });
    });
  });

  it('must be work with createSecureServer()', (done) => {
    let server = helper.createSecureServer();
    server.listen((request, response) => {
      response.end(request.port);
    });
    server.start().then(() => {
      helper.createHttpSecureRequest({
        host: server.config.host,
        port: server.config.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, String(server.config.port));
        server.stop().then(done);
      });
    });
  });

  it('must be work with createSecureServerDefaultPort()', (done) => {
    let server = helper.createSecureServerDefaultPort();
    server.listen((request, response) => {
      response.end(request.port);
    });
    server.start().then(() => {
      helper.createHttpSecureRequest({
        host: server.config.host
      }).then(({buffer}) => {
        assert.strictEqual(buffer, '');
        server.stop().then(done);
      });
    });
  });
});