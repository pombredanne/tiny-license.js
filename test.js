'use strict';

var requireBowerFiles = require('require-bower-files');
var test = require('tape');

function runTest(description, main) {
  test(description, function(t) {
    t.plan(9);

    t.equal(
      main({
        name: 'foo',
        author: 'Bob <bar@email> (baz.com)',
        license: 'MIT',
        homepage: 'qux.com'
      }),
      [
        '/*!',
        ' * foo | MIT (c) Bob',
        ' * qux.com',
        '*/'
      ].join('\n'),
      'should create a comment from an object.'
    );

    t.equal(
      main({
        name: 'foo',
        authors: ['Bob', 'Sue']
      }),
      [
        '/*!',
        ' * foo | (c) Bob, Sue',
        '*/'
      ].join('\n'),
      'should regard `homepage` property as optional.'
    );

    t.equal(
      main({
        authors: ['Bob'],
        licenses: ['MIT', 'BSD-3-Clause']
      }),
      [
        '/*!',
        ' * MIT, BSD-3-Clause (c) Bob',
        '*/'
      ].join('\n'),
      'should regard `name` property as optional.'
    );

    t.equal(
      main({
        authors: ['Bob'],
        homepage: 'foo.com'
      }),
      [
        '/*!',
        ' * (c) Bob',
        ' * foo.com',
        '*/'
      ].join('\n'),
      'should regard `license` property as optional.'
    );

    t.equal(
      main({}),
      [
        '/*!',
        '*/'
      ].join('\n'),
      'should create a comment from an object without any properties.'
    );

    t.throws(function() {
      main({author: true});
    }, /TypeError/, 'should throw a type error when the `author` property has an invalid value.');

    t.throws(function() {
      main({authors: true});
    }, /TypeError/, 'should throw a type error when the `authors` property has invalid values.');

    t.throws(function() {
      main(true);
    }, /TypeError/, 'should throw a type error when it takes a non-object argument.');

    t.throws(function() {
      main();
    }, /TypeError/, 'should throw a type error when it takes no arguments.');
  });
}

runTest('require(\'tiny-license\')', require('./'));

global.window = {};
requireBowerFiles({self: true});

runTest('window.tinyLicense', window.tinyLicense);
