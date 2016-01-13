var util = require('util'),
    client = require('../lib'),
    cfg = require('./configTest.js');

var aClient = client(cfg);

aClient
    .authorizePayment({
        "shopperEmail": "s.hopper@test.com",
        "shopperReference": "SimonHopper1",
        "recurring": {
            "contract": "RECURRING"
        },
        "reference":"store-card-simonhopper1",
        "amount": {
            "value": "0",
            "currency": "EUR"
        },
        "additionalData": {
            "card.encrypted.json": "adyenjs_0_1_15$f6/V74X8k6zIISwiijAKx0ZN8eCEWiifiGYnyJCLLOkRoBNGJ/4OrTEGnOvXiSdBkIkgbrg8+kbRoiEKtQdJAoHZR0NTroAkF0aX/atQ7hVY478gtq/XygyDg/7wTzHdm+ZIaJAhqYY7D1mqj6OrL7eZa8mijxg6srXplqQSs4v8SR0bFeXjpJCbH/vE0r7AfLRfFFWq498rNLSGT+XWb5l906Kt+7jOxj2SUoLaLIokspPo0es9yEBdlF1brVltnx5fUlUJIIqp27LNHVbOOtzXt9rv3aBEnwqxUfsdwVp7QjwSM9urpyyW+GG0z92t2TIn4b12dnEmwmuBH4FjBg==$NHjtL/d9UgJdec/sDUKP9s4TSyH9qJ+nG54IMMb0HRp4/3z7ov1YtY/x5nTf4iA6HvYdvd9DOAFTV1TA7LmFpQ4gkDroPxZZsmiIzY1yVZvfv8NChgyPLzpxua+RQGS27Qe5shYzDDnIuxGPpOzJ7gJkWx07vKFFaYHRM2n3y/vcbUskGwROhJkzQV/2oLI0jqHpkTwPUzakW2Jh9NKUjJuhPGXj05Jwhk4d6VOiosBH/xFpUJA6m+GUIBErJ6mKJlNElxyy6eKJheFT+jz7GWWDxyGn7eriC0vuOGHU/i3j31/A+wyoj9PADGff1bfS1o4s5Khk0+n6ayQqqb7YaoXKbrOA4cSN5q2dJV6VsXkrOUU3CRhko881/5KDle6pBU70Ix/uyDKYboT9"
        }
    })
    .then(function (response) {
        console.log(util.inspect(response, false, 20, true));
    }, function (error) {
        console.log(util.inspect(error, false, 20, true));

    });

aClient
    .getRecurringData({
        "shopperReference": "SimonHopper1",
        "recurring": {
            "contract": "RECURRING"
        }
    }).then(function (response) {
        console.log(util.inspect(response, false, 20, true));
    }, function (error) {
        console.log(util.inspect(error, false, 20, true));
    });


aClient
    .initCCForm().then(function (response) {
        console.log(util.inspect(response, false, 20, true));
    });
