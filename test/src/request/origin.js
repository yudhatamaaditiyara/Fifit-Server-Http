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
const http = require('http');
const {Request} = require('../../../');
const helper = require('../../helper');

describe('Request#origin', () => {
  it('must be used protected field', () => {
    let request = new Request();
    request._origin = 'http://hostname:9000';
    assert.ok(request.origin === request._origin);
  });

  it('must be work with createServer()', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(request.origin);
    });
    server.start().then(() => {
      let options = {
        host: server.options.host,
        port: server.options.port,
        path: '/'
      };
      http.get(options, (response) => {
        let buffer = '';
        response.setEncoding('utf-8');
        response.on('data', string => buffer += string);
        response.on('end', async() => {
          assert.strictEqual(buffer, 'http://' + options.host + ':' + options.port);
          await server.stop();
          done();
        });
      });
    });
  });

  it('must be work with createServerDefaultPort()', (done) => {
    let server = helper.createServerDefaultPort();
    server.listen((request, response) => {
      response.end(request.origin);
    });
    server.start().then(() => {
      let options = {
        host: server.options.host,
        path: '/'
      };
      http.get(options, (response) => {
        let buffer = '';
        response.setEncoding('utf-8');
        response.on('data', string => buffer += string);
        response.on('end', async() => {
          assert.strictEqual(buffer, 'http://' + options.host);
          await server.stop();
          done();
        });
      });
    });
  });

  it('must be work with createServerIpv6Host()', (done) => {
    let server = helper.createServerIpv6Host();
    server.listen((request, response) => {
      response.end(request.origin);
    });
    server.start().then(() => {
      let options = {
        host: server.options.host,
        port: server.options.port,
        path: '/'
      };
      http.get(options, (response) => {
        let buffer = '';
        response.setEncoding('utf-8');
        response.on('data', string => buffer += string);
        response.on('end', async() => {
          assert.strictEqual(buffer, 'http://[' + options.host + ']:' + options.port);
          await server.stop();
          done();
        });
      });
    });
  });

  it('must be work with createServerIpv6HostDefaultPort()', (done) => {
    let server = helper.createServerIpv6HostDefaultPort();
    server.listen((request, response) => {
      response.end(request.origin);
    });
    server.start().then(() => {
      let options = {
        host: server.options.host,
        path: '/'
      };
      http.get(options, (response) => {
        let buffer = '';
        response.setEncoding('utf-8');
        response.on('data', string => buffer += string);
        response.on('end', async() => {
          assert.strictEqual(buffer, 'http://[' + options.host + ']');
          await server.stop();
          done();
        });
      });
    });
  });
});