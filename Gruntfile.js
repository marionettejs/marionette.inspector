module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    preprocess: {
      core: {
        src: 'extension/js/agent/build/core.js',
        dest: 'extension/js/agent/build/src/core.js'
      },
      agent: {
        src: 'extension/js/agent/build/build.js',
        dest: 'extension/js/agent/build/src/agent.js'
      },
      localAgent: {
        src: 'extension/js/agent/build/localBuild.js',
        dest: 'extension/js/agent/build/src/localAgent.js'
      }
    },

    mocha: {
      test: {
        options: {
          reporter: grunt.option('mocha-reporter') || 'Nyan'
        },
        src: [
        'extension/js/test/unit/AgentSpecRunner.html',
        'extension/js/test/unit/InspectorSpecRunner.html'
        ],
        dest: './test/output/xunit.out',
      },
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'extension/css/marionette_inspector.css': 'extension/css/inspector/main.scss',
        }
      }
    },

    watch: {
      files: [
        'extension/js/agent/**/*.js',
        'extension/js/common/**/*.js',
        '!extension/js/agent/build/src/*.js',
        'extension/css/inspector/**/*.scss'
        ],
      tasks: ['build']
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-sass');


  grunt.registerTask('agent', ['preprocess']);

  grunt.registerTask('build', ['agent', 'sass']);

  grunt.registerTask('test', ['agent', 'mocha']);

  grunt.registerTask('default', ['watch']);

};
