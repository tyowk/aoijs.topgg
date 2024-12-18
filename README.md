not finished yet.

## Setup
```javascript
const { Topgg } = require('aoijs.topgg');
const { AoiClient } = require('aoi.js');

const client = new AoiClient({ ... });

const topgg = new Topgg(client, {
    token: 'your_topgg_api_token',
    webhook: {
        endpoint: '/webhook or whatever you want',
        authorization: 'webhook_authorization',
        port: 'your_server_port'
    }
});
```

## Vote Events
```javascript
const topgg = new Topgg({ ... });

topgg.<eventName>({
    channel: 'log_channel_id',
    code: '$username just voted!'
});
```

## Handlers
```javascript
const topgg = new Topgg({ ... });

topgg.loadVoteEvents('./votes', true);
```
