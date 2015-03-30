'use strict';

var rp = require('request-promise');

module.exports = function getTileUrl(url) {
  var account;

  return rp(url)
  .then(fetchNamedDetails)
  .then(createUrl);
};

function fetchNamedDetails(data) {
  var result = JSON.parse(data);
  var namedMaps = result.layers.filter(function (item) {
    return item.type === 'namedmap';
  });

  if (namedMaps && namedMaps.length) {
    var first = namedMaps[0];
    var name = first.options.named_map.name;
    var account = first.options.user_name;
    var templateId = account + '@' + name;

    return rp({
      uri: 'http://' + account + '.cartodb.com/api/v1/map/named/' + templateId,
      method: 'POST',
      json: true,
      body: ''
    })
    .then(function (data) {
      return {
        account: account,
        details: data
      };
    });
  }
}

function createUrl(data) {
  var url = 'https://' + data.account + '.cartodb.com/api/v1/map/' + data.details.layergroupid + '/{z}/{x}/{y}.png';
  return url;
}
