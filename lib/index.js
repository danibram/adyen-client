/*
 * adyen-client
 *
 *
 * Copyright (c) 2014 Daniel Biedma Ramos
 * Licensed under the MIT license.
 */

var axios = require('axios');
var fs = require('fs');
var util = require('util');
var Q = require('q');
var uuid = require('node-uuid');
var crypto = require('crypto');
var Method = require('./method');
var extend = require('node.extend');
var b64 = require('base64url');

var AdyenConstructor = function (config) {
    var self = this;
    self.config = {};

    /*
        Specifications for every method
    */

    self.specs = {
        authorizePayment: {
            method: 'authorizePayment',
            path: 'Payment/v12/authorise',
            fields: []
        },
        getRecurringData: {
            method: 'listRecurringDetails',
            path: 'Recurring/v12/listRecurringDetails',
            fields: []
        },
        capture: {
            method: 'capture',
            path: 'Payment/v12/capture',
            fields: []
        },
        cancelOrRefund: {
            method: 'cancelOrRefund',
            path: 'Payment/v12/cancelOrRefund',
            fields: []
        }
    };

    /*
        Init Class, depending on the environment
    */

    if (config.environment === 'production') {
        self.config = extend({
            endpoint: ''
        }, config);
    } else {
        self.config = extend({
            endpoint: 'https://pal-test.adyen.com/pal/servlet/',
            environment: 'development'
        }, config);
    };

    self.init = function (callback) {
        var deferred = Q.defer();

        Q.fcall(function () {

            var kys = Object.keys(self.specs);

            for (var i = 0; i < kys.length; i++) {
                var k = kys[i],
                    config = self.specs[k];
                var method = new Method(config, self);
                self[k] = method.exec;
            }

            deferred.resolve();
        })
            .fail(function (error) {
                deferred.reject(error);
            });

        deferred.promise.nodeify(callback);
        return deferred.promise;
    };

    /*
        Utils
    */

    self._makeRequest = function (req) {
        self._lastRequest = req;
        self._lastResponse = null;
        var deferred = Q.defer(),
            parseErr = function (err) {
                var error = {
                    lastRequest: self._lastRequest,
                    lastResponse: self._lastResponse,
                    adyenError: null,
                    clientError: null
                };
                if (err && err.error) {
                    var tError = {};

                    tError.method = (err.error.error.method ? err.error.error.method : null);
                    tError.uuid = (err.error.error.uuid ? err.error.error.uuid : null);
                    tError.message = (err.error.message ? err.error.message : null);
                    tError.code = (err.error.code ? err.error.code : null);

                    error.adyenError = tError;
                } else {
                    error.clientError = err;
                }

                deferred.reject(error);
            };

        var userPass = [self.config.username, self.config.password].join(':');
        var token = new Buffer(userPass).toString('base64');
        var options = {
            method: 'post',
            url: self.config.endpoint + req.path,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token
            },
            data: req.data,
            timeout: 20000
        };

        axios(options)
            .then(function (response) {
                //console.log(response)
                console.log(response.statusCode);
                console.log(response.statusMessage);

                self._lastResponse = response.data;
                deferred.resolve(response.data);

            })
            .catch(function (response) {
                console.log(response);
            });

        return deferred.promise;
    };

};

module.exports = function createTrustlyClient (config) {
    return new AdyenConstructor(config)
};
