module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            dist: {
                files: ['**/*'],
                options: {
                    livereload: true,
                }
            }
        } // watch
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};