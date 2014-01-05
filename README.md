# express-attic [![Build Status](https://api.travis-ci.org/phillipj/node-express-attic.png)](http://travis-ci.org/phillipj/node-express-attic)

An express.js middleware representing an attic of old things which may have moved. This often happens when rewriting old websites where old resource URLs **must** exist also in the new application, primarly to respect third party sites linking to these resources.

All redirects are permanent with status code `301`.

### Usage
The attic requires an object representing a map of old paths to the new one.

Moving a resource from `/valuableAsset.pdf` to `/archive/assets/valuable.pdf`:
```js
var express = require("express"),
    attic = require("express-attic");

var app = express();

app.use(attic({
  '/valuableAsset.pdf': '/archive/assets/valuable.pdf'
}));
```