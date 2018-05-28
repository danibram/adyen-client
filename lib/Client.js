'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * adyen-client
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2018 Daniel Biedma Ramos
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
    function Client(cfg) {
        _classCallCheck(this, Client);

        var username = cfg.username,
            password = cfg.password,
            endpoint = cfg.endpoint;


        this.username = username;
        this.password = password;
        this.endpoint = endpoint;

        this._lastRequest = null;
        this._lastResponse = null;
    }

    _createClass(Client, [{
        key: 'auth',
        value: function auth(req) {
            var userPass = [this.username, this.password].join(':');
            var token = new Buffer(userPass).toString('base64');

            req.headers['Authorization'] = 'Basic ' + token;

            return req;
        }
    }, {
        key: 'createReq',
        value: function createReq(params, path) {
            return {
                method: 'post',
                url: this.endpoint + path,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: params,
                timeout: 20000
            };
        }
    }, {
        key: 'composeOutput',
        value: function composeOutput(data, success) {
            return {
                success: success,
                data: data,
                lastResponse: this._lastResponse,
                lastRequest: this._lastRequest
            };
        }
    }, {
        key: 'makeRequest',
        value: function makeRequest(params, path) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var r = _this.auth(_this.createReq(params, path));

                _this._lastRequest = r;
                _this._lastResponse = null;

                (0, _axios2.default)(r).then(function (response) {
                    _this._lastResponse = response;
                    return resolve(_this.composeOutput(response.data, true));
                }, function (response) {
                    _this._lastResponse = response;
                    return reject(_this.composeOutput(response.data, false));
                }).catch(function (response) {
                    return reject(_this.composeOutput(response.data, false));
                });
            });
        }
    }]);

    return Client;
}();

exports.default = Client;
//# sourceMappingURL=Client.js.map