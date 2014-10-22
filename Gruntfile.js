module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    preprocess: {
      backboneAgent: {
        src: 'extension/js/backboneAgent/build.js',
        dest: 'extension/js/backboneAgent/build/backboneAgent.js'
      },
    },

    watch: {
      files: ['extension/js/backboneAgent/**/*.js'],
      tasks: ['preprocess']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-preprocess');


  grunt.registerTask('backboneAgent', ['preprocess']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
