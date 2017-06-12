# carto-utils

## Usage

```sh
npm install -g cartodb-utils
```

## `viz-url`

### CLI

```sh
viz-url [viz.json url here]
# tiles url for using in web map
```

### API

```js
var utils = require('cartodb-utils');
var vizUrl = 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json';

utils.vizTileUrl(vizUrl)
  .then(tileUrl => console.log(tileUrl))
  .catch(error => console.error(error));
```
