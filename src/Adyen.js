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
        production: true
    },
    development: {
        endpoint: 'https://pal-test.adyen.com/pal/servlet/',
        development: true
    }
}

const Specs = {
    authorizePayment: {
        method: 'authorizePayment',
        path: 'Payment/v12/authorise',
        fields: {}
    },
    authorize3dPayment: {
        method: 'authorize3dPayment',
        path: 'Payment/v12/authorise3d',
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

    constructor (config) {

        let env = (config.development) ? 'development' : 'production'
        config = Object.assign(Config[env], config)

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
    authorize3dPayment (params) {
        return this._method(params, Specs.authorize3dPayment)
    }
    getRecurringData (params) {
        return this._method(params, Specs.getRecurringData)
    }
    disableRecurring (params) {
        return this._method(params, Specs.disableRecurring)
    }
    capture (params) {
        return this._method(params, Specs.capture)
    }
    refund (params) {
        return this._method(params, Specs.refund)
    }
    cancelOrRefund (params) {
        return this._method(params, Specs.cancelOrRefund)
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
