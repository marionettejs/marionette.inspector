module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    preprocess: {
      backboneAgent: {
        src: 'extension/js/backboneAgent/build.js',
        dest: 'extension/js/backboneAgent/build/backboneAgent.js'
      },
      localBackboneAgent: {
        src: 'extension/js/backboneAgent/localBuild.js',
        dest: 'extension/js/backboneAgent/build/localBackboneAgent.js'
      },
    },

    watch: {
      files: ['extension/js/backboneAgent/**/*.js'],
      tasks: ['backboneAgent']
    },

    clean: {
      backboneAgent: 'extension/js/backboneAgent/build'
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.registerTask('backboneAgent', ['preprocess']);


  grunt.registerTask('build', ['backboneAgent']);

  grunt.registerTask('default', ['watch']);

};
