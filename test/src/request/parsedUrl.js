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
const url = require('url');
const Url = require('fifit-url');
const {Request} = require('../../../');
const helper = require('../../helper');

describe('Request#parsedUrl', () => {
  it('must be instanceof fifit.Url', () => {
    let request = Object.create(Request.prototype);
    request.url = 'http://hostname/path?query=value';
    assert.strictEqual(request._parsedUrl, void 0);
    assert.ok(request.parsedUrl instanceof Url);
    assert.strictEqual(request._parsedUrl, request.parsedUrl);
  });

  it('must be instanceof fifit.Url when fail to parse url', () => {
    let request = Object.create(Request.prototype);
    request.url = null;
    assert.strictEqual(request._parsedUrl, void 0);
    assert.ok(request.parsedUrl instanceof Url);
    assert.strictEqual(request._parsedUrl, request.parsedUrl);
  });

  it('must be work with request url "/"', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(url.format(request.parsedUrl));
    });
    server.start().then(() => {
      helper.createHttpRequest({
        host: server.config.host,
        port: server.config.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, '/');
        server.stop().then(done);
      });
    });
  });

  it('must be work with request url "/path?query=value"', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(url.format(request.parsedUrl));
    });
    server.start().then(() => {
      helper.createHttpRequest({
        host: server.config.host,
        port: server.config.port,
        path: '/path?query=value'
      }).then(({buffer}) => {
        assert.strictEqual(buffer, '/path?query=value');
        server.stop().then(done);
      });
    });
  });

  it('must be work with request url "http://hostname/"', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(url.format(request.parsedUrl));
    });
    server.start().then(() => {
      helper.createHttpRequest({
        host: server.config.host,
        port: server.config.port,
        path: 'http://hostname/'
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http://hostname/');
        server.stop().then(done);
      });
    });
  });

  it('must be work with request url "http://hostname/path?query=value"', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(url.format(request.parsedUrl));
    });
    server.start().then(() => {
      helper.createHttpRequest({
        host: server.config.host,
        port: server.config.port,
        path: 'http://hostname/path?query=value'
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http://hostname/path?query=value');
        server.stop().then(done);
      });
    });
  });
});