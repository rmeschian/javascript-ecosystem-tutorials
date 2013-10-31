module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg    : grunt.file.readJSON('package.json'),
        uglify : {
            options   : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target : {
                files : {
                    //'build/bad.min.js' : ['src/js/bad.js'],
                    //'build/good.min.js' : ['src/js/good.js']
                    'build/output.min.js' : ['src/js/*.js']
                }
            }
        },
        cssmin    : {
            add_banner : {
                options : {
                    banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files   : {
                    'build/output.css' : ['src/css/*.css']
                }
            }
        },
        htmlcompressor: {
    compile: {
      files: {
        'build/index.html': 'src/index.html'
      },
      options: {
        type: 'html',
        preserveServerScript: true
      }
    }
  }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-htmlcompressor');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 'htmlcompressor']);


};
