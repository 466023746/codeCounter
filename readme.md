# calculate code lines

now support html,js,css,include comment,exclude black line

edit config.js

    module.exports = {
        // your code directories
        dirs: [
            path.resolve('D:/cdn/branch/js/bookOnline'),   
            path.resolve('D:/cdn/branch/css/bookOnline')
        ],
        // file suffix
        suffix: ['js', 'tpl', 'css']
    }
    
start calculate

    $ node index.js

