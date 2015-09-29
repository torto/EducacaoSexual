module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            dist: {
                files: ['**/*'],
                options: {
                    livereload: true,
                }
            }
    }
    });
    // require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};
