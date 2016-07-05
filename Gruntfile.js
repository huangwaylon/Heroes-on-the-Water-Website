module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['public/*'],
    copy: { // Task that copies the html partials
      app: {
        files: [
          {
            expand: true,
            cwd: 'client',
            src: '**/*.html',
            dest: 'public'
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: 'client',
            src: 'images/**/*',
            dest: 'public'
          }
        ]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      jslib: {
        src: [ // List all of the javascript libraries in node_modules that the client needs
          'node_modules/angular/angular.min.js',
          'node_modules/angular-route/angular-route.min.js',
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: 'public/lib.js' // They will all be concatenated in a single file here
      },
      csslib: {
        src: ['node_modules/bootstrap/dist/css/bootstrap.min.css'], // Same for CSS libraries
        dest: 'public/lib.css'
      },
      ngApp: {
        src: [
          'client/modules/**/*.config.js',
          'client/modules/**/*.service.js',
          'client/modules/**/*.factory.js',
          'client/modules/**/*.filter.js',
          'client/modules/**/*.ctrl.js',
          'client/modules/**/*.directive.js',
          'client/ng-app.js'
        ],
        dest: 'public/ng-app.js'
      },
      css: {
        src: ['client/**/*.css'],
        dest: 'public/application.css'
      }
    },
    watch: { // Task that updates client application code in the public folder in real time
      all: {
        files: ['client/**/*'],
        tasks: ['copy', 'concat'],
        options: {
          spawn: false,
        },
      },
    }
  });

  // Load the plugin that provides the "clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s). Copy code to the public folder and update as necessary.
  grunt.registerTask('default', ['copy', 'concat', 'watch']);
};
