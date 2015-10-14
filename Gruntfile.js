module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      dist: {
        files: ['public/**/*'],
        options: {
          livereload: true,
        }
      }
    },
    copy: {
      project: {
        expand: true,
        cwd: '.',
        src: ['**', '!Gruntfile.js', '!package.json',
          '!public/bower.json'
        ],
        dest: 'dist'
      }
    },
    clean: {
      dist: {
        src: 'dist'
      }
    },
    usemin: {
      html: 'app/views/**/*.ejs'
    },
    useminPrepare: {
      options: {
        root: 'public',
        dest: 'public'
      },
      html: 'app/views/**/*.ejs'
    },
    uglify: {
            options: {
                mangle: false
            }
        }
  });
  // require('load-grunt-tasks')(grunt);

  grunt.registerTask('dev', ['watch']);

  grunt.registerTask('default', ['dist', 'minifica']);
  grunt.registerTask('dist', ['clean', 'copy']);
  grunt.registerTask('minifica', ['useminPrepare', 'concat',
    'uglify', 'cssmin', 'usemin'
  ]);
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
