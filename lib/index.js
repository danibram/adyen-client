/*
 * adyen-client
 *
 *
 * Copyright (c) 2014 Daniel Biedma Ramos
 * Licensed under the MIT license.
 */

var axios = require('axios');
var util = require('util');
var Q = require('q');
var method = require('./method');
var extend = require('node.extend');
var moment = require('moment');

var AdyenConstructor = function (config) {
    var self = this;
    self.config = {};
    cfg = null;

    /*
        Specifications for every method
    */

    self.specs = {
        authorizePayment: {
            method: 'authorizePayment',
            path: 'Payment/v12/authorise',
            fields: {}
        },
        getRecurringData: {
            method: 'listRecurringDetails',
            path: 'Recurring/v12/listRecurringDetails',
            fields: {}
        },
        disableRecurring: {
            method: 'disableRecurring',
            path: 'Recurring/v12/disable',
            fields: {}
        },
        capture: {
            method: 'capture',
            path: 'Payment/v12/capture',
            fields: {}
        },
        refund: {
            method: 'refund',
            path: 'Payment/v12/refund',
            fields: {}
        },
        cancelOrRefund: {
            method: 'cancelOrRefund',
            path: 'Payment/v12/cancelOrRefund',
            fields: {}
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

    /*
        Utils
    */

    self._checkRequiredParams = function (params, cfg) {
        return Q.fcall(function () {
            var inputKeys = Object.keys(params);
            var definitionKeys = Object.keys(cfg.fields);
            var requiredRemainParams = [];

            for (var i = 0; i < definitionKeys.length; i++) {
                var ky = definitionKeys[i];
                var cfgField = cfg.fields[ky]

                if (keys.indexOf(ky.field) < 0 && cfg.required) {
                    requiredParams.push(ky.field);
                }
            }

            if (requiredRemainParams.length > 0) {
                throw new Error('You dont send all required params. [' + requiredRemainParams.toString() + ']')
            }
            return params
        })
    }

    self._makeRequest = function (params, cfg) {
        self._lastRequest = params;
        self._lastResponse = null;
        var deferred = Q.defer();

        var userPass = [self.config.username, self.config.password].join(':');
        var token = new Buffer(userPass).toString('base64');

        var options = {
            method: 'post',
            url: self.config.endpoint + cfg.path,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token
            },
            data: params,
            timeout: 20000
        };

        axios(options)
            .then(function (response) {
                self._lastResponse = response.data;
                deferred.resolve(response.data);
            }, function (response) {
                deferred.resolve(response.data);
            })
            .catch(function (response) {
                deferred.reject(response.data);
            });

        return deferred.promise;
    };

    /*
        Methods
    */

    self.initCCForm = function () {
       return Q.thenResolve({
           "key": self.config.frontKey,
           "generationTime": moment().toISOString()
       })
   }

    var keys = Object.keys(self.specs)
    for (var i = 0; i < keys.length; i++) {
        self[keys[i]] = method.call(self, self.specs[keys[i]])
    }
};

module.exports = function createTrustlyClient (config) {
    return new AdyenConstructor(config)
};
