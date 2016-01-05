# Adyen Client

[![Dependency Status](https://david-dm.org/danibram/adyen-client.svg)](https://david-dm.org/danibram/adyen-client)

Adyen client for basic integrations.


## Getting started

Install the module with: `npm install adyen-client`

```javascript
var adyenClient = require('adyen-client')
var aClient = adyenClient({
    frontKey: 'YOUR FRONT END KEY', //Only used for the initCCForm
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

First of all you need to initialize the client passing your merchant account, username, password and front end key (only if you need to do the frontend initialization).
```javascript
var adyenClient = require('adyen-client')
var aClient = adyenClient({
    frontKey: 'YOUR FRONT END KEY', //Only used for the initCCForm
    merchantAccount: 'YOUR MERCHANT ACCOUNT'
    username: 'YOUR USERNAME',
    password: 'YOUR PASSWORD'
});
```
Then you have the client initialized, now you have access to this methods, every method return a promise, and you need to follow the adyen documentation to know how pass the data:

- ***initCCForm***: Promise that returns the structure you need for the CSE encryption in frontend.
    ```javascript
    aClient.initCCForm()
        .then(function(data){
            console.log(data)
            /*
            {
                "key": '10008|927D950...', // your Front-end key
                "generationTime": '2016-01-01T00:00:00.000Z' // ISO date string
            }
             */
        })
    ```

- ***authorizePayment***

    ```javascript
    aClient.authorizePayment({
        "shopperEmail": "s.hopper@test.com",
        "shopperReference": "SimonHopper1",
        "recurring": {
            "contract": "RECURRING"
        },
        "reference":"authorize-simonhopper1",
        "amount": {
            "value": "0",
            "currency": "EUR"
        },
        "additionalData": {
            "card.encrypted.json": "adyenjs_0_1_15$......"
        }
    })
        .then(function(data){
            console.log(data)
        })
    ```
- ***getRecurringData***

    ```javascript
    aClient.getRecurringData({
        'shopperReference': 'SimonHopper1',
        'recurring': {
            "contract": "RECURRING"
        }
    })
        .then(function(data){
            console.log(data)
        })
    ```

- ***disableRecurring***

    ```javascript
    aClient.disableRecurring({
        "shopperReference": 'SimonHopper1',
        "recurringDetailReference": 'CC TOKENIZED' //if you need to remove a specific one
    })
        .then(function(data){
            console.log(data)
        })
    ```

- ***capture***

    ```javascript
    aClient.capture({
        "modificationAmount": {
            "currency": 'EUR',
            "value": '0'
        },
        "originalReference": 'YOUR AUTH REFERENCE',
        "reference": "capture-" + data.transactionId
    })
        .then(function(data){
            console.log(data)
        })
    ```

- ***refund***

    ```javascript
    aClient.refund( {
        "modificationAmount": {
            "currency": 'EUR',
            "value": '0'
        },
        "originalReference": 'YOUR REFERENCE'
    })
        .then(function(data){
            console.log(data)
        })
    ```

- ***cancelOrRefund***:

    ```javascript
    aClient.cancelOrRefund({
        "originalReference": 'YOUR REFERENCE',
    })
        .then(function(data){
            console.log(data)
        })
    ```

## Release History

#### (1.0.8)
- Internal Refactor
- Added more methods
- Better docs

#### (1.0.7)
- Fix dependencies
- Firsts step.
- Added basic methods

## License
Licensed under the MIT license. 2015
