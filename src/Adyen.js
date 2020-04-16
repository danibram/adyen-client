/*
 * adyen-client
 *
 *
 * Copyright (c) 2018 Daniel Biedma Ramos
 * Licensed under the MIT license.
 */

import moment from 'moment';
import Client from './Client';

const Config = {
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

const Specs = {
    authorizePayment: function(version) {
        return {
            method: 'authorizePayment',
            path: `Payment/${version}/authorise`,
            fields: {}
        };
    },
    authorize3dPayment: function(version) {
        return {
            method: 'authorize3dPayment',
            path: `Payment/${version}/authorise3d`,
            fields: {}
        };
    },
    authorize3ds2Payment: function(version) {
        return {
            method: 'authorize3ds2Payment',
            path: `Payment/${version}/authorise3ds2`,
            fields: {}
        };
    },
    getRecurringData: function(version) {
        return {
            method: 'listRecurringDetails',
            path: `Recurring/${version}/listRecurringDetails`,
            fields: {}
        };
    },
    disableRecurring: function(version) {
        return {
            method: 'disableRecurring',
            path: `Recurring/${version}/disable`,
            fields: {}
        };
    },
    capture: function(version) {
        return {
            method: 'capture',
            path: `Payment/${version}/capture`,
            fields: {}
        };
    },
    refund: function(version) {
        return {
            method: 'refund',
            path: `Payment/${version}/refund`,
            fields: {}
        };
    },
    cancelOrRefund: function(version) {
        return {
            method: 'cancelOrRefund',
            path: `Payment/${version}/cancelOrRefund`,
            fields: {}
        };
    }
};

export default class Adyen extends Client {
    constructor(config) {
        let env = config.development ? `development` : `production`;
        config = Object.assign(Config[env], config);

        super(config);
        this.config = config;
    }

    initCCForm() {
        return Promise.resolve({
            key: this.config.frontKey,
            generationTime: moment().toISOString()
        });
    }

    authorizePayment(params) {
        return this._method(params, Specs.authorizePayment(this.config.version));
    }
    authorize3dPayment(params) {
        return this._method(params, Specs.authorize3dPayment(this.config.version));
    }
    authorize3ds2Payment(params) {
        return this._method(params, Specs.authorize3ds2Payment(this.config.version));
    }
    getRecurringData(params) {
        return this._method(params, Specs.getRecurringData(this.config.version));
    }
    disableRecurring(params) {
        return this._method(params, Specs.disableRecurring(this.config.version));
    }
    capture(params) {
        return this._method(params, Specs.capture(this.config.version));
    }
    refund(params) {
        return this._method(params, Specs.refund(this.config.version));
    }
    cancelOrRefund(params) {
        return this._method(params, Specs.cancelOrRefund(this.config.version));
    }

    _method(params, cfg) {
        let data = Object.assign(
            {
                merchantAccount: this.config.merchantAccount
            },
            params
        );

        data = this._checkRequiredParams(data, cfg);
        return this.makeRequest(data, cfg.path);
    }

    _checkRequiredParams(params, cfg) {
        var inputKeys = Object.keys(params);

        var requiredRemainParams = Object.keys(cfg.fields).filter(key => {
            var cfgField = cfg.fields[key];

            if (inputKeys.indexOf(key) < 0 && cfgField.required) {
                return ky.field;
            }
            return;
        });

        if (requiredRemainParams.length > 0) {
            return new Error(
                `You dont send all required params. [` +
                    requiredRemainParams.toString() +
                    `]`
            );
        }

        return params;
    }
}
