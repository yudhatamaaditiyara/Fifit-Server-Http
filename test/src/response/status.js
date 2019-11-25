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
const helper = require('../../helper');

describe('Response#status', () => {
  it('must be valid status', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.status = 404;
      response.end(String(response.status));
    });
    server.start().then(() => {
      helper.createHttpRequest({
        host: server.options.host,
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, '404');
        server.stop().then(done);
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
      helper.createHttpRequest({
        host: server.options.host,
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, '404');
        server.stop().then(done);
      });
    });
  });
});