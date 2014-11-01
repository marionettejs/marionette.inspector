module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    preprocess: {
      agent: {
        src: 'extension/js/agent/build/build.js',
        dest: 'extension/js/agent/build/src/agent.js'
      },
      localAgent: {
        src: 'extension/js/agent/build/localBuild.js',
        dest: 'extension/js/agent/build/src/localAgent.js'
      },
      core: {
        src: 'extension/js/agent/build/core.js',
        dest: 'extension/js/agent/build/src/core.js'
      },
    },

    mocha: {
      test: {
        options: {
          reporter: 'Nyan'
        },
        src: ['extension/js/SpecRunner.html'],
        dest: './test/output/xunit.out',
      },
    },

    watch: {
      files: ['extension/js/agent/**/*.js', 'extension/js/common/**/*.js'],
      tasks: ['agent']
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha');


  grunt.registerTask('agent', ['preprocess']);


  grunt.registerTask('build', ['agent']);

  grunt.registerTask('test', ['mocha']);

  grunt.registerTask('default', ['watch']);

};
