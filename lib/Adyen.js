'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Client2 = require('./Client');

var _Client3 = _interopRequireDefault(_Client2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * adyen-client
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 Daniel Biedma Ramos
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Config = {
    production: {
        endpoint: '',
        production: true
    },
    development: {
        endpoint: 'https://pal-test.adyen.com/pal/servlet/',
        development: true
    }
};

var Specs = {
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

var Adyen = function (_Client) {
    _inherits(Adyen, _Client);

    function Adyen(config) {
        _classCallCheck(this, Adyen);

        var env = config.development ? 'development' : 'production';
        config = Object.assign(Config[env], config);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Adyen).call(this, config));

        _this.config = config;
        return _this;
    }

    _createClass(Adyen, [{
        key: 'initCCForm',
        value: function initCCForm() {
            return Promise.resolve({
                "key": this.config.frontKey,
                "generationTime": (0, _moment2.default)().toISOString()
            });
        }
    }, {
        key: 'authorizePayment',
        value: function authorizePayment(params) {
            return this._method(params, Specs.authorizePayment);
        }
    }, {
        key: 'getRecurringData',
        value: function getRecurringData(params) {
            return this._method(params, Specs.getRecurringData);
        }
    }, {
        key: 'disableRecurring',
        value: function disableRecurring(params) {
            return this._method(params, Specs.disableRecurring);
        }
    }, {
        key: 'capture',
        value: function capture(params) {
            return this._method(params, Specs.capture);
        }
    }, {
        key: 'refund',
        value: function refund(params) {
            return this._method(params, Specs.refund);
        }
    }, {
        key: 'cancelOrRefund',
        value: function cancelOrRefund(params) {
            return this._method(params, Specs.cancelOrRefund);
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