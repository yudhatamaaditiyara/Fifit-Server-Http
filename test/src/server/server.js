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
const config = require('../../helper/config');

describe('Server', () => {
  it('must be Server#options.host === config.server.host', () => {
    let server = helper.createServer();
    assert.strictEqual(server.options.host, config.server.host);
  });

  it('must be Server#options.port === config.server.port', () => {
    let server = helper.createServer();
    assert.strictEqual(server.options.port, config.server.port);
  });

  it('must be Server#resource instanceof http.Server', () => {
    let server = helper.createServer();
    assert.ok(server.resource instanceof http.Server);
  });

  it('must be Server#isStarted === false', () => {
    let server = helper.createServer();
    assert.ok(server.isStarted === false);
  });
});