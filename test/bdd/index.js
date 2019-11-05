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
const Server = require('../../lib/server');
const Request = require('../../lib/request');
const Response = require('../../lib/response');
const http = require('../../');

/**
 */
describe('index', () => {
	/**
	 */
	it('must be exports http.Server', async() => {
		assert.ok(http.Server === Server);
	});

	/**
	 */
	it('must be exports http.Request', async() => {
		assert.ok(http.Request === Request);
	});
	
	/**
	 */
	it('must be exports http.Response', async() => {
		assert.ok(http.Response === Response);
	});
});