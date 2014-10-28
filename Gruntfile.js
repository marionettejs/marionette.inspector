module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    preprocess: {
      agent: {
        src: 'extension/js/agent/build.js',
        dest: 'extension/js/agent/build/agent.js'
      },
      localAgent: {
        src: 'extension/js/agent/localBuild.js',
        dest: 'extension/js/agent/build/localAgent.js'
      },
    },

    watch: {
      files: ['extension/js/agent/**/*.js'],
      tasks: ['agent']
    },

    clean: {
      agent: 'extension/js/agent/build'
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.registerTask('agent', ['preprocess']);


  grunt.registerTask('build', ['agent']);

  grunt.registerTask('default', ['watch']);

};
