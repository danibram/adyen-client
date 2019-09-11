'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Client2 = require('./Client');

var _Client3 = _interopRequireDefault(_Client2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * adyen-client
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2018 Daniel Biedma Ramos
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Config = {
    production: {
        endpoint: 'https://pal-live.adyen.com/pal/servlet/',
        version: 'v12',
        production: true
    },
    development: {
        endpoint: 'https://pal-test.adyen.com/pal/servlet/',
        version: 'v12',
        development: true
    }
};

var Specs = {
    authorizePayment: function authorizePayment(version) {
        return {
            method: 'authorizePayment',
            path: 'Payment/' + version + '/authorise',
            fields: {}
        };
    },
    authorize3dPayment: function authorize3dPayment(version) {
        return {
            method: 'authorize3dPayment',
            path: 'Payment/' + version + '/authorise3d',
            fields: {}
        };
    },
    authorize3ds2Payment: function authorize3ds2Payment(version) {
        return {
            method: 'authorize3ds2Payment',
            path: 'Payment/' + version + '/authorise3ds2',
            fields: {}
        };
    },
    getRecurringData: function getRecurringData(version) {
        return {
            method: 'listRecurringDetails',
            path: 'Recurring/' + version + '/listRecurringDetails',
            fields: {}
        };
    },
    disableRecurring: function disableRecurring(version) {
        return {
            method: 'disableRecurring',
            path: 'Recurring/' + version + '/disable',
            fields: {}
        };
    },
    capture: function capture(version) {
        return {
            method: 'capture',
            path: 'Payment/' + version + '/capture',
            fields: {}
        };
    },
    refund: function refund(version) {
        return {
            method: 'refund',
            path: 'Payment/' + version + '/refund',
            fields: {}
        };
    },
    cancelOrRefund: function cancelOrRefund(version) {
        return {
            method: 'cancelOrRefund',
            path: 'Payment/' + version + '/cancelOrRefund',
            fields: {}
        };
    }
};

var Adyen = function (_Client) {
    _inherits(Adyen, _Client);

    function Adyen(config) {
        _classCallCheck(this, Adyen);

        var env = config.development ? 'development' : 'production';
        config = Object.assign(Config[env], config);

        var _this = _possibleConstructorReturn(this, (Adyen.__proto__ || Object.getPrototypeOf(Adyen)).call(this, config));

        _this.config = config;
        return _this;
    }

    _createClass(Adyen, [{
        key: 'initCCForm',
        value: function initCCForm() {
            return Promise.resolve({
                key: this.config.frontKey,
                generationTime: (0, _moment2.default)().toISOString()
            });
        }
    }, {
        key: 'authorizePayment',
        value: function authorizePayment(params) {
            return this._method(params, Specs.authorizePayment(this.config.version));
        }
    }, {
        key: 'authorize3dPayment',
        value: function authorize3dPayment(params) {
            return this._method(params, Specs.authorize3dPayment(this.config.version));
        }
    }, {
        key: 'authorize3ds2Payment',
        value: function authorize3ds2Payment(params) {
            return this._method(params, Specs.authorize3ds2Payment(this.config.version));
        }
    }, {
        key: 'getRecurringData',
        value: function getRecurringData(params) {
            return this._method(params, Specs.getRecurringData(this.config.version));
        }
    }, {
        key: 'disableRecurring',
        value: function disableRecurring(params) {
            return this._method(params, Specs.disableRecurring(this.config.version));
        }
    }, {
        key: 'capture',
        value: function capture(params) {
            return this._method(params, Specs.capture(this.config.version));
        }
    }, {
        key: 'refund',
        value: function refund(params) {
            return this._method(params, Specs.refund(this.config.version));
        }
    }, {
        key: 'cancelOrRefund',
        value: function cancelOrRefund(params) {
            return this._method(params, Specs.cancelOrRefund(this.config.version));
        }
    }, {
        key: '_method',
        value: function _method(params, cfg) {
            var data = Object.assign({
                merchantAccount: this.config.merchantAccount
            }, params);

            data = this._checkRequiredParams(data, cfg);
            return this.makeRequest(data, cfg.path);
        }
    }, {
        key: '_checkRequiredParams',
        value: function _checkRequiredParams(params, cfg) {
            var inputKeys = Object.keys(params);

            var requiredRemainParams = Object.keys(cfg.fields).filter(function (key) {
                var cfgField = cfg.fields[key];

                if (inputKeys.indexOf(key) < 0 && cfgField.required) {
                    return ky.field;
                }
                return;
            });

            if (requiredRemainParams.length > 0) {
                return new Error('You dont send all required params. [' + requiredRemainParams.toString() + ']');
            }

            return params;
        }
    }]);

    return Adyen;
}(_Client3.default);

exports.default = Adyen;
//# sourceMappingURL=Adyen.js.map