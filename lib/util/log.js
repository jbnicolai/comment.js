/*!
 * comment.js
 * Copyright (c) 2014 Denis Ciccale (@tdecs)
 * Released under the MIT license
 * https://github.com/dciccale/comment.js/blob/master/LICENSE.txt
 */

'use strict';

var log = module.exports = {};
var util = require('util');

/* jshint -W098 */
var colors = require('colors');

// Log types defaults
var types = {
  ok: {
    msg: 'OK',
    color: 'green'
  },
  warn: {
    msg: 'WARNING',
    color: 'yellow'
  },
  error: {
    msg: 'ERROR',
    color: 'red'
  }
};

log.muted = false;

function format(args) {
  // Args is a argument array so copy it in order to avoid wonky behavior.
  args = [].slice.call(args, 0);
  if (args.length > 0) {
    args[0] = String(args[0]);
  }
  return util.format.apply(util, args);
}

function write(msg) {
  msg = msg || '';

  if (!log.muted) {
    process.stdout.write(msg);
  }
}

function writeln(msg) {
  // Write blank line if no msg is passed in.
  msg = msg || '';
  write(msg + '\n');
}

// Logs a message of the specified type
function _log() {
  /* jshint validthis:true */
  var msg = format(arguments);

  if (arguments.length > 0) {
    writeln('>> '[this.color] + msg.trim().replace(/\n/g, '\n>> '[this.color]));
  } else {
    writeln(this.msg[this.color]);
  }
}

log.write = function () {
  write(format(arguments));
  return log;
};

log.writeln = function () {
  writeln(format(arguments));
  return log;
};

log.ok = function () {
  _log.apply(types.ok, arguments);
  return log;
};

log.warn = function () {
  _log.apply(types.warn, arguments);
  return log;
};

log.error = function () {
  _log.apply(types.error, arguments);
  return log;
};

log.debug = function () {
  var msg = format(arguments);
  writeln(msg.magenta);
  return log;
};