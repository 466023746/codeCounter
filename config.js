var path = require('path');

/**
 * 配置文件
 * @type {{dirs: Array, suffix: Array}}
 */
module.exports = {
    dirs: [
        path.resolve('D:/cdn/branch/js/bookOnline'),
        path.resolve('D:/cdn/branch/css/bookOnline'),
    ],
    suffix: ['js', 'tpl', 'css']
};