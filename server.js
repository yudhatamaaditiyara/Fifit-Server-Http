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
'use strict';

const http = require('http');
const Request = require('./request');
const Response = require('./response');

/**
 */
class Server
{
	/**
	 * @param {Object} config
	 */
	constructor(config){
		this.config = Object.assign({}, config);
		this.created = false;
		this.started = false;
	}
	
	/**
	 * @param {function} listener
	 * @throws {Error}
	 * @returns {Server}
	 */
	create(listener){
		if (this.created) {
			throw new Error('The server is already created');
		}
		this.created = true;
		this.options = this._createServerOptions();
		this.resource = this._createServerResource(this.options, listener);
		return this;
	}

	/**
	 * @returns {Promise}
	 */
	start(){
		if (this.started) {
			return Promise.reject(new Error('The server is already started'));
		}
		if (!this.created) {
			return Promise.reject(new Error('The server is not created'));
		}
		this.started = true;
		return new Promise((resolve, reject) => {
			this.resource.once('error', reject);
			this.resource.listen(this.config.port, this.config.host, () => {
				this.resource.removeListener('error', reject);
				resolve();
			});
		});
	}

	/**
	 * @returns {Promise}
	 */
	stop(){
		if (!this.started) {
			return Promise.reject(new Error('The server is not started'));
		}
		this.started = false;
		return new Promise((resolve) => {
			this.resource.close(() => {
				resolve();
			});
		});
	}

	/**
	 * @returns {Object}
	 */
	_createServerOptions(){
		return {
			IncomingMessage: Request.class(this),
			ServerResponse: Response.class(this)
		}
	}

	/**
	 * @params {Object} options
	 * @params {function} listener
	 * @returns {http.Server}
	 */
	_createServerResource(options, listener){
		return http.createServer(options, listener);
	}
}

/**
 * @+
 */
module.exports = Server;