# calculate code lines

now support html,js,css,include comment,exclude black line

1、edit config.js

    module.exports = {
        // your code directories
        dirs: [
            path.resolve('D:/cdn/branch/js/bookOnline'),   
            path.resolve('D:/cdn/branch/css/bookOnline')
        ],
        // file suffix
        suffix: ['js', 'html', 'css']
    }
    
2、start calculate

    $ node index.js
    
3、result look like this

    $ js：Total lines is 115469
      css：Total lines is 15687
      html：Total lines is 12568

