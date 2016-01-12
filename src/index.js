/*
 * adyen-client
 *
 *
 * Copyright (c) 2015 Daniel Biedma Ramos
 * Licensed under the MIT license.
 */

import Adyen from './Adyen'

module.exports = function createTrustlyClient (config, development) {
    return new Adyen (config, development)
};
