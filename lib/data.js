/*
 * Library for storing and editing data
 *
 */

// Dependencies
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

// Container for module (to be exported)
const lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname,'/../.data/');


// Read data from a file
lib.read = function (dir, file) {

  return new Promise((resolve, reject) => {

    const normFile = file.replace('@', '_');
    fs.readFile(lib.baseDir + dir + '/' + normFile + '.json', 'utf8', function (err,data) {
      if (!err && data) {
        const parsedData = helpers.parseJsonToObject(data);
        resolve(parsedData);
      } else {
        reject(err);
      }
    });
  });
};


// List all the items in a directory
lib.list = function (dir) {

  return new Promise((resolve, reject) => {

    fs.readdir(lib.baseDir + dir + '/', function (err,data) {
      if (!err && data && data.length > 0) {
        const trimmedFileNames = data.map(fileName => {
          return fileName.replace('.json','');
        });
        resolve(trimmedFileNames);
      } else {
        reject(err);
      }
    });
  });
};

// Export the module
module.exports = lib;
