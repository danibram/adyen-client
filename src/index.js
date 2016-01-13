/*
 * adyen-client
 *
 *
 * Copyright (c) 2015 Daniel Biedma Ramos
 * Licensed under the MIT license.
 */

import "babel-polyfill"
import Adyen from './Adyen'

module.exports = function createTrustlyClient (config) {
    return new Adyen (config)
};
