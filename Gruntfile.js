'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        src: 'client/index.js',
        dest: 'dist/js/index.js'
      }
    },

    copy: {
      dist: {
        src: 'client/css/base.css',
        dest: 'dist/css/base.css'
      },
    },

    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      files: [ 'client/**/*.js', 'client/**/*.css' ],
      tasks: [ 'browserify:dist', 'copy:dist', 'cssmin:dist' ]
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [ 'build' ]);
  grunt.registerTask('build', [ 'browserify:dist', 'copy:dist', 'cssmin:dist' ]);
  grunt.registerTask('auto-build', ['watch'])

};