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

    run: {
      test: {
        args: [
          'scripts/test.js'
        ]
      }
    },

    sass: {
      options: {
        expanded: true
      },
      dist: {
        files: {
         'extension/css/marionette_inspector.css':  'extension/css/inspector/main.scss'
        }
      }
    },

    watch: {
      files: [
        'extension/js/agent/**/*.js',
        'extension/js/common/**/*.js',
        '!extension/js/agent/build/src/*.js',
        'extension/css/inspector/**/*.scss',
        'extension/templates/devTools/**/*.html'
        ],
      tasks: ['build']
    },

    handlebars: {
      compile: {
        options: {
          namespace: '__devToolsTemplates',
          amd: true,
          processName: function(filePath) {
            return filePath.replace(/extension\/templates\/devTools\//, '');
          },
          processPartialName: function(filePath) {
            var pieces = filePath.split('/');
            return pieces[pieces.length - 1];
          }
        },
        files: {
          'extension/js/inspector/templates.js': 'extension/templates/devTools/**/*.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-run');


  grunt.registerTask('agent', ['preprocess']);

  grunt.registerTask('build', ['agent', 'sass', 'handlebars']);

  grunt.registerTask('test', ['agent', 'run:test']);

  grunt.registerTask('default', ['watch']);

};
