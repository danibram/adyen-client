var Q = require('q'),
    extend = require('node.extend');

var Method = function (specs, client) {
    'use strict';

    var self = this;

    self.specs = specs;
    self.config = client.config;

    self.exec = function (params, callback) {
        var deferred = Q.defer(),
            data = {},
            attributes = {},
            fields = self.specs.fields,
            cfg = self.config;

        Q.fcall(function () {
            var keys = Object.keys(params),
                requiredParams = [];
            for (var i = 0; i < fields.length; i++) {
                var ky = fields[i];

                if (keys.indexOf(ky.field) < 0 && ky.required) {
                    requiredParams.push(ky.field);
                }
            }

            if (requiredParams.length > 0) {
                throw new Error('You dont send all required params. [' + requiredParams.toString() + ']');
            }

            var data = extend({
                merchantAccount: cfg.merchantAccount
            }, params)

            return {
                path: self.specs.path,
                data: data
            }
        })
        .then(client._makeRequest)
        .then(function (response) {
            deferred.resolve(response);
        })
        .fail(function (error) {
            deferred.reject(error);
        });

        deferred.promise.nodeify(callback);
        return deferred.promise;
    };

};
module.exports = Method;
