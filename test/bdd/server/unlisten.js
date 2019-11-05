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
const {RuntimeError} = require('ganiyem-error');
const {Server} = require('../../../');
const helper = require('../../helper/helper');

/**
 */
describe('Server#unlisten()', () => {
	/**
	 */
	it('must be return Server', async() => {
		let server = helper.createServer();
		let listener = ()=>{};
		server.listen(listener);
		let result = server.unlisten(listener);
		assert.ok(result instanceof Server);
	});

	/**
	 */
	it('must be throw RuntimeError when server is already started', async() => {
		let server = helper.createServer();
		let listener = ()=>{};
		server.listen(listener);
		await server.start();
		try {
			server.unlisten(listener);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof RuntimeError);
		} finally {
			await server.stop();
		}
	});
});