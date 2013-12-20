module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg    : grunt.file.readJSON('package.json'),

        // 2. Configure Uglify
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

        cssmin : {
            add_banner : {
                options : {
                    banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files   : {
                    'build/output.css' : ['src/css/main.css']
                }
            }
        },

        htmlcompressor : {
            compile : {
                files   : {
                    'build/index.html' : 'src/index.html'
                },
                options : {
                    type                 : 'html',
                    preserveServerScript : true
                }
            }
        },

        sass: {
            dist: {
                files: {
                    'src/css/main.css': 'src/sass/main.scss'
                }
            }
        },


        watch: {
            files: "src/sass/*",
            tasks: ["sass"]
        }

    });


    // 3. Tell Grunt what plugins we want to use
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-htmlcompressor');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['uglify', 'cssmin']);
};