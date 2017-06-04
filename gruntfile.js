
module.exports = function(grunt) {

  // Configure Grunt
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    babel: {
      options: {
        "sourceMap": true,
        presets: ['es2015']
      },
      dist: {
        files: [{
          "expand": true,
          "cwd": "./js/src/",
          "src": ["*.js"],
          "dest": "./js/dist/",
          "ext": ".js"
        }]
      }
    },

    uglify: {
      my_target: {
        files: {
          'js/scripts.min.js': [
            './js/dist/scripts.js',
            './js/dist/header.js',
          ]
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '*.css',
            '*.php',
            'js/*.js',
          ]
        },
        options: {
          watchTask: true,
          proxy: "http://miguel.dev/testing/html-sass-grunt-template/"
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
          'style.css' : 'style.scss', 
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
        files: ['*.scss','**/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: ['./js/src/*.js'],
        tasks: ['babel','uglify'],
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