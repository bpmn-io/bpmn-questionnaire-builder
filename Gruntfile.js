'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        src: 'client/index.js',
        dest: 'dist/index.js'
      }
    },

    watch: {
      files: [ 'client/**/*.js' ],
      tasks: [ 'browserify:dist' ]
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [ 'build' ]);
  grunt.registerTask('build', [ 'browserify' ]);
  grunt.registerTask('auto-build', ['watch'])

};