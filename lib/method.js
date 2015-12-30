var extend = require('node.extend');

module.exports = function (cfg) {
    return function (params) {
        var self = this

        var data = extend({
            merchantAccount: self.config.merchantAccount
        }, params)

        return self._checkRequiredParams(data, cfg)
            .then(function (params) {
                return self._makeRequest(params, cfg)
            })
    }
}
