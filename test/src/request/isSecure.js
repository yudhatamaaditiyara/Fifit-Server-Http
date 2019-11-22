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
const https = require('https');
const helper = require('../../helper');

describe('Request#isSecure', () => {
  it('must be createServer() -> isSecure === false', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(request.isSecure ? 'true' : 'false');
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
          assert.strictEqual(buffer, 'false');
          await server.stop();
          done();
        });
      });
    });
  });

  it('must be createServerDefaultPort() -> isSecure === false', (done) => {
    let server = helper.createServerDefaultPort();
    server.listen((request, response) => {
      response.end(request.isSecure ? 'true' : 'false');
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
          assert.strictEqual(buffer, 'false');
          await server.stop();
          done();
        });
      });
    });
  });

  it('must be createServerIpv6Host() -> isSecure === false', (done) => {
    let server = helper.createServerIpv6Host();
    server.listen((request, response) => {
      response.end(request.isSecure ? 'true' : 'false');
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
          assert.strictEqual(buffer, 'false');
          await server.stop();
          done();
        });
      });
    });
  });

  it('must be createServerIpv6HostDefaultPort() -> isSecure === false', (done) => {
    let server = helper.createServerIpv6HostDefaultPort();
    server.listen((request, response) => {
      response.end(request.isSecure ? 'true' : 'false');
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
          assert.strictEqual(buffer, 'false');
          await server.stop();
          done();
        });
      });
    });
  });

  it('must be createSecureServer() -> isSecure === true', (done) => {
    let server = helper.createSecureServer();
    server.listen((request, response) => {
      response.end(request.isSecure ? 'true' : 'false');
    });
    server.start().then(() => {
      let options = {
        rejectUnauthorized: false,
        host: server.options.host,
        port: server.options.port,
        path: '/'
      };
      https.get(options, (response) => {
        let buffer = '';
        response.setEncoding('utf-8');
        response.on('data', string => buffer += string);
        response.on('end', async() => {
          assert.strictEqual(buffer, 'true');
          await server.stop();
          done();
        });
      });
    });
  });

  it('must be createSecureServerDefaultPort() -> isSecure === true', (done) => {
    let server = helper.createSecureServerDefaultPort();
    server.listen((request, response) => {
      response.end(request.isSecure ? 'true' : 'false');
    });
    server.start().then(() => {
      let options = {
        rejectUnauthorized: false,
        host: server.options.host,
        path: '/'
      };
      https.get(options, (response) => {
        let buffer = '';
        response.setEncoding('utf-8');
        response.on('data', string => buffer += string);
        response.on('end', async() => {
          assert.strictEqual(buffer, 'true');
          await server.stop();
          done();
        });
      });
    });
  });
});