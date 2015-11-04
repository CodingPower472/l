#! /usr/bin/env node

'use strict';

let fs = require('fs');
let chalk = require('chalk');
let yargs = require('yargs');

let argv = yargs.argv;

let dir = argv._[0];

fs.readdir(dir, (err, files) => {
  files.forEach(file => {
    if (file.charAt(0) === '.') return;
    let lastChar = dir.substr(dir.length - 1);
    if (lastChar !== '/') dir += '/';
    fs.stat(dir + file, (err, stats) => {
      if (err) throw new Error(err);
      if (stats.isFile()) {
        console.log(chalk.green(file));
      } else if (stats.isDirectory()) {
        console.log(chalk.blue(file));
      }
    });
  });
});
