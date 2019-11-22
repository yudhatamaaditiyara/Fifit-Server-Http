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
const helper = require('../../helper');

describe('Response#status', () => {
  it('must be valid value', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.status = 200;
      response.end(String(response.status));
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
          assert.strictEqual(buffer, '200');
          await server.stop();
          done();
        });
      });
    });
  });

  it('must be ignore status when headerSent === true', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.status = 404;
      response.flushHeaders();
      response.status = 200;
      response.end(String(response.status));
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
          assert.strictEqual(buffer, '404');
          await server.stop();
          done();
        });
      });
    });
  });
});