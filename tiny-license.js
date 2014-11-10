/*!
 * tiny-license | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/tiny-license.js
*/
window.tinyLicense = function tinyLicense(data, option) {
  'use strict';

  option = option || {};
  if (option.lastNewline === undefined) {
    option.lastNewline = true;
  }

  if (arguments.length === 0) {
    throw new TypeError('No arguments. (One argument required)');
  }

  if (typeof data !== 'object') {
    throw new TypeError('Argument must be an object.');
  }

  var licenseTypes = window.packageLicenseTypes(data);
  var authorNames = window.packageAuthorNames(data);

  var licenseStr = [
    licenseTypes.join(', '),
    authorNames.length !== 0 ? '(c) ' + authorNames.join(', ') : ''
  ].filter(Boolean).join(' ');

  var lines = [
    [data.name, licenseStr].filter(Boolean).join(' | '),
    data.homepage
  ].filter(Boolean);

  return window.blockComment(lines, {start: '!'}) + (option.lastNewline ? '\n' : '');
};
