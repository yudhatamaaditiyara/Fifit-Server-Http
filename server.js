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
	 * @var {boolean}
	 */
	isStarted = false;

	/**
	 * @param {Object} config
	 */
	constructor(config){
		this.config = Object.assign({}, config);
		this.resource = this._createServerResource();
	}
	
	/**
	 * @param {function} listener
	 * @throws {Error}
	 * @returns {Server}
	 */
	listen(listener){
		if (this.isStarted) {
			throw new Error('The server is started');
		}
		this.resource.on('request', listener);
		return this;
	}

	/**
	 * @param {function} listener
	 * @throws {Error}
	 * @returns {Server}
	 */
	unlisten(listener){
		if (this.isStarted) {
			throw new Error('The server is started');
		}
		this.resource.removeListener('request', listener);
		return this;
	}
	
	/**
	 * @returns {Promise}
	 */
	start(){
		if (this.isStarted) {
			return Promise.reject(new Error('The server is started'));
		}
		return new Promise((resolve, reject) => {
			this.resource.once('error', reject);
			this.resource.listen(this.config.port, this.config.host, () => {
				this.resource.removeListener('error', reject);
				this.isStarted = true;
				resolve();
			});
		});
	}

	/**
	 * @returns {Promise}
	 */
	stop(){
		if (!this.isStarted) {
			return Promise.reject(new Error('The server is not started'));
		}
		return new Promise((resolve) => {
			this.resource.close(() => {
				this.isStarted = false;
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
	 * @returns {http.Server}
	 */
	_createServerResource(){
		return http.createServer(this._createServerOptions());
	}
}

/**
 * @+
 */
module.exports = Server;