/*!
 * tiny-license | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/tiny-license.js
*/
var blockComment = require('block-comment');
var packageAuthorNames = require('package-author-names');
var packageLicenseTypes = require('package-license-types');

module.exports = function tinyLicense(data) {
  'use strict';

  if (arguments.length === 0) {
    throw new TypeError('No arguments. (One argument required)');
  }

  if (typeof data !== 'object') {
    throw new TypeError('Argument must be an object.');
  }

  var licenseTypes = packageLicenseTypes(data);
  var authorNames = packageAuthorNames(data);

  var licenseStr = [
    licenseTypes.join(', '),
    authorNames.length !== 0 ? '(c) ' + authorNames.join(', ') : ''
  ].filter(Boolean).join(' ');

  var lines = [
    [data.name, licenseStr].filter(Boolean).join(' | '),
    data.homepage
  ].filter(Boolean);

  return blockComment(lines, {start: '!'});
};
