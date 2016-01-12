/*
 * adyen-client
 *
 *
 * Copyright (c) 2015 Daniel Biedma Ramos
 * Licensed under the MIT license.
 */

import axios from 'axios'

export default class Client {
    constructor (cfg) {
        let {username, password, endpoint} = cfg

        this.username = username
        this.password = password
        this.endpoint = endpoint

        this._lastRequest = null
        this._lastResponse = null
    }

    auth (req) {
        var userPass = [this.username, this.password].join(':');
        var token = new Buffer(userPass).toString('base64');

        req.headers['Authorization'] = 'Basic ' + token

        return req
    }

    createReq (params, path) {
        return {
            method: 'post',
            url: this.endpoint + path,
            headers: {
                'Content-Type': 'application/json'
            },
            data: params,
            timeout: 20000
        }
    }

    composeOutput (data) {
        return {
            data: data,
            lastResponse: this._lastResponse,
            lastRequest: this._lastRequest
        }
    }

    makeRequest (params, path) {
        return new Promise((resolve, reject) => {
            this._lastRequest = params;
            this._lastResponse = null;

            var r = this.auth(this.createReq(params, path))

            axios(r)
                .then((response) => {
                    this._lastResponse = response;
                    return resolve(this.composeOutput(response.data));
                }, (response) => {
                    this._lastResponse = response;
                    return resolve(this.composeOutput(response.data));
                })
                .catch((response) => {
                    return reject(this.composeOutput(response.data));
                });
        })
    };
}
