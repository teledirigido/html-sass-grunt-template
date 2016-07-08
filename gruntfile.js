
module.exports = function(grunt) {

    // Configure Grunt
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            my_target: {
                files: {
                    'preview/js/min/scripts.min.js': [
                        'preview/js/scripts.js',
                        'preview/js/header.js',
                    ]
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'preview/*.css',
                        'preview/*.php',
                        'preview/js/*.js',
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: "http://blacksheepdesign.dev/template/preview"
                }
            }
        },

        sass: {
            dist: {
                options: {
                    // Output style. Can be nested, compact, compressed, expanded.
                    style: 'compressed',
                },
                files: {
                    'preview/style.css' : 'preview/style.scss', 
                }
            }
        },

        // grunt-watch will monitor the projects files
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            template: {
                files: ['preview/*.php'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['preview/*.scss','preview/**/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: ['preview/js/*.js'],
                options: {
                    livereload: true
                }
            }
        },

    });
    
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Creates the `server` task
    grunt.registerTask('preview', [
        'browserSync',
        'uglify',
        'sass',
        'watch',
    ]);


};