'use strict';

var requireBowerFiles = require('require-bower-files');
var test = require('tape');

function runTest(description, main) {
  test(description, function(t) {
    t.plan(10);

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
        '*/\n'
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
        '*/\n'
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
        '*/\n'
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
        '*/\n'
      ].join('\n'),
      'should regard `license` property as optional.'
    );

    t.equal(
      main({}),
      [
        '/*!',
        '*/\n'
      ].join('\n'),
      'should create a comment from an object without any properties.'
    );

    t.equal(
      main({}, {lastNewline: false}),
      [
        '/*!',
        '*/'
      ].join('\n'),
      'should remove the last newline using `lastNewline` option.'
    );

    t.throws(
      main.bind(null, {author: true}),
      /TypeError.*must be a string.*object/,
      'should throw a type error when the `author` property has an invalid value.'
    );

    t.throws(
      main.bind(null, {authors: true}),
      /TypeError.*must be an array.*string/,
      'should throw a type error when the `authors` property has invalid values.'
    );

    t.throws(
      main.bind(null, true),
      /TypeError.*must be an object/,
      'should throw a type error when it takes a non-object argument.'
    );

    t.throws(
      main.bind(null),
      /TypeError.*No arguments/,
      'should throw a type error when it takes no arguments.'
    );
  });
}

runTest('require(\'tiny-license\')', require('./'));

global.window = {};
requireBowerFiles({self: true});

runTest('window.tinyLicense', window.tinyLicense);
