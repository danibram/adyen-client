# Adyen Client

[![Dependency Status](https://david-dm.org/danibram/adyen-client.svg)](https://david-dm.org/danibram/adyen-client)

Adyen client for basic integrations.


## Getting started

Install the module with: `npm install adyen-client`

```javascript
var adyenClient = require('adyen-client')
var aClient = adyenClient({
    merchantAccount: 'YOUR MERCHANT ACCOUNT'
    username: 'YOUR USERNAME',
    password: 'YOUR PASSWORD'
});
aClient
    .getRecurringData({
        "shopperReference": "SimonHopper1",
        "recurring": {
            "contract": "RECURRING"
        }
    }).then(function (response) {
        console.log(util.inspect(response, false, 20, true));
    })
    .fail(function (error) {
        console.log(util.inspect(error, false, 20, true));
    });
```

## Documentation

## Release History

#### (1.0.5)
- Firsts step.
- Added basic methods

## License
Licensed under the MIT license. 2015
