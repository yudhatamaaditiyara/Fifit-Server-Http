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

const https = require('https');
const config = require('./config');
const {Server} = require('../../');

/**
 */
class SecureServer extends Server{
	_createServerOptions(){
		return Object.assign({}, this.options.options, super._createServerOptions());
	}
	_createServerResource(){
		return https.createServer(this._createServerOptions());
	}
}

/**
 * @+
 */
module.exports = {};
module.exports.createServer = () => new Server(config.server);
module.exports.createServerDefaultPort = () => new Server(config.serverDefaultPort);
module.exports.createServerIpv6Host = () => new Server(config.serverIpv6Host);
module.exports.createServerIpv6HostDefaultPort = () => new Server(config.serverIpv6HostDefaultPort);
module.exports.createSecureServer = () => new SecureServer(config.secureServer);
module.exports.createSecureServerDefaultPort = () => new SecureServer(config.secureServerDefaultPort);
module.exports.createSecureServerIpv6Host = () => new SecureServer(config.secureServerIpv6Host);
module.exports.createSecureServerIpv6HostDefaultPort = () => new SecureServer(config.secureServerIpv6HostDefaultPort);