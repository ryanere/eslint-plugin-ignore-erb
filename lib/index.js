/**
 * @fileoverview Ignore ERB
 * @author Ryan Recht
 * @copyright 2016 Ryan Recht. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------




// import processors
module.exports.processors = {
  ".erb": {
      // takes text of the file and filename
      preprocess: function(text, filename) {
          // here, you can strip out any non-JS content
          // and split into multiple strings to lint
          text = text.replace(/=[\s+]?<%([\S\s]*?)\%>;/g, '= IgnoredERB; /* global IgnoredERB */');

          text = text.replace(/<%([\S\s]*?)\%>\,?/g, '/* Ignored ERB */');

          return [text];  // return an array of strings to lint
      },

      // takes a Message[][] and filename
      postprocess: function(messages, filename) {
          // `messages` argument contains two-dimensional array of Message objects
          // where each top-level array item contains array of lint messages related
          // to the text that was returned in array from preprocess() method

          // you need to return a one-dimensional array of the messages you want to keep
          return messages[0];
      }
  }
};
