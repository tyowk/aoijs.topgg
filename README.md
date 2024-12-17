not finished yet.

## Setup
```javascript
const { Topgg } = require('aoijs.topgg');
const { AoiClient } = require('aoi.js');

const client = new AoiClient({ ... });

const topgg = new Topgg(client, {
    token: 'YOUR_TOPGG_API_TOKEN',
    webhook: {
        endpoint: '/webhook or whatever you want',
        authorization: 'WEBHOOK_AUTHORIZATION',
        port: 'YOUR_SERVER_PORT'
    }
});
```

## Vote Events
```javascript
topgg.voteEvent('botVote', {
    channel: 'LOG_CHANNEL_ID',
    code: '$username just voted!'
});
```

## Handlers
```javascript
client.loadVoteEvents('./votes', true);
```
