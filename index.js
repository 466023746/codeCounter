/**
 * calculate multi directory code line
 * include comment
 * exclude blank line
 */

var fs = require('fs');
var path = require('path');
var os = require('os');

var config = require('./config');

let eol = os.EOL;
const rLines = new RegExp('[^' + eol + ']+(' + eol + ')?', 'g');

function counter(files) {
    return new Promise((resolve, reject) => {
        var line = 0,
            len = files.length, index = 0;

        if (len == 0) return resolve(line);

        files.forEach(file => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) throw err;
                index++;
                var result = data.match(rLines);
                if (result) line += result.length;
                if (index == len) resolve(line);
            });
        });
    })
}

/**
 * only deal with suffix files
 */
function counterProxy(files) {
    return new Promise((resolve, reject) => {
        var suffix = config.suffix;
        var result = new Map();

        var len = suffix.length, index = 0;

        suffix.forEach(suf => {
            var _files = files.filter(item => {
                return new RegExp('\.' + suf + '$').test(item)
            });

            counter(_files).then(data => {
                index++;
                result.set(suf, data);
                if (index == len) resolve(result)
            })
        });
    })
}

function readFiles(dirname) {
    return new Promise((resolve, reject) => {
        var result = [];

        fs.stat(dirname, (err, stats) => {
           if (stats.isDirectory()) {
               fs.readdir(dirname, (err, files) => {
                   if (err) throw(err);

                   var len = files.length, index = 0;

                   if (len == 0) return resolve(result);

                   files.forEach(file => {
                       file = path.resolve(dirname, file);

                       fs.stat(file, (err, stats) => {
                           if (err) throw(err);

                           if (stats.isDirectory()) {
                               readFiles(file).then(data => {
                                   index++;
                                   result = result.concat(data);
                                   if (index == len) resolve(result);
                               })
                           } else {
                               index++;
                               result.push(file);
                               if (index == len) resolve(result);
                           }
                       })
                   });
               });
           } else {
               result.push(dirname);
               resolve(result);
           }
        });
    })
}

function calculate() {
    return new Promise((resolve, reject) => {
        var files = [];
        var dirs = config.dirs;

        var len = dirs.length, index = 0;

        dirs.forEach(dir => {
            readFiles(dir).then(data => {
                index++;
                files = files.concat(data);
                if (index == len) {
                    counterProxy(files).then(data => {
                        resolve(data)
                    });
                }
            })
        });
    })
}

calculate().then(data => {
    for (var [key, item] of data) {
        console.log(key + ':', 'Total lines is', item);
    }
});

