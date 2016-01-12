"use strict";

require("babel-polyfill");

var _Adyen = require("./Adyen");

var _Adyen2 = _interopRequireDefault(_Adyen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * adyen-client
 *
 *
 * Copyright (c) 2015 Daniel Biedma Ramos
 * Licensed under the MIT license.
 */

module.exports = function createTrustlyClient(config, development) {
  return new _Adyen2.default(config, development);
};
//# sourceMappingURL=index.js.map