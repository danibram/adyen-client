/*
 * adyen-client
 *
 *
 * Copyright (c) 2015 Daniel Biedma Ramos
 * Licensed under the MIT license.
 */

import Client from './Client'
import moment from 'moment'

const Config = {
    production: {
        endpoint: '',
        environment: 'production'
    },
    development: {
        endpoint: 'https://pal-test.adyen.com/pal/servlet/',
        environment: 'development'
    }
}

const Specs = {
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
}

export default class Adyen extends Client {

    constructor (config, development) {
        (development) ?
        config = Object.assign(Config['development'], config)
        : config = Object.assign(Config['production'], config)

        super(config)
        this.config = config
    }

    initCCForm () {
        return Promise.resolve({
           "key": this.config.frontKey,
           "generationTime": moment().toISOString()
       })
    }

    authorizePayment (params) {
        return this._method(params, Specs.authorizePayment)
    }

    getRecurringData (params) {
        return this._method(params, Specs.authorizePayment)
    }
    disableRecurring (params) {
        return this._method(params, Specs.authorizePayment)
    }
    capture (params) {
        return this._method(params, Specs.authorizePayment)
    }
    refund (params) {
        return this._method(params, Specs.authorizePayment)
    }
    cancelOrRefund (params) {
        return this._method(params, Specs.authorizePayment)
    }

    _method (params, cfg) {
        let data = Object.assign({
            merchantAccount: this.config.merchantAccount
        }, params)

        data = this._checkRequiredParams(data, cfg)
        return this.makeRequest(data, cfg.path)
    }

    _checkRequiredParams (params, cfg) {
        var inputKeys = Object.keys(params);

        var requiredRemainParams = Object.keys(cfg.fields).filter((key)=> {
            var cfgField = cfg.fields[key]

            if (inputKeys.indexOf(key) < 0 && cfgField.required) {
                return ky.field
            }
            return
        })

        if (requiredRemainParams.length > 0) {
            return new Error('You dont send all required params. [' + requiredRemainParams.toString() + ']')
        }

        return params
    }

}
