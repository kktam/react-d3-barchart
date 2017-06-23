# react-d3-barchart

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

react-d3-barchart is inspired by a very simple but yet well written barchart by Manning D3 in Action,
Chapter 9. 

https://github.com/emeeks/d3_in_action_2/tree/master/chapter9

This is a work in progress, and add bit by bit to add more features,
and also a path for my learning with using D3 with React.

Mixing D3 with React is not trivial. There were more solutions out there for v0.1 but since v15 came out
most of the solutions broke. The Manning solution is one of very few that actually worked for React v15 or above.

Release 1.0
- use nwb to build UMD build for npm package.
- hover and click event to parent
- simplified passing of hover data, as compared to the Manning solution.
- working on repackaging palette legend later for more options.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/kktam/react-d3-barchart.svg?branch=master

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[![Coverage Status](https://coveralls.io/repos/github/kktam/react-d3-barchart/badge.svg?branch=master)](https://coveralls.io/github/kktam/react-d3-barchart?branch=master)
