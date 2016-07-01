module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      app: {
        files: [
          {
            expand: true,
            cwd: 'client',
            src: '**/*',
            dest: 'public'
          }
        ]
      },
      lib: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/',
            /*
             * here, specify all the libraries in node_modules to be included
             */
            src: [
              'angular/angular.min.js',
              'angular-route/angular-route.min.js'
            ],
            dest: 'public/lib'
          }
        ],
      },
    },
    watch: {
      all: {
        files: ['client/**/*'],
        tasks: ['copy'],
        options: {
          spawn: false,
        },
      },
    }
  });

  // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'watch']);
};
