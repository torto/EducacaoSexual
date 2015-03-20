module.exports = function(grunt) {

    grunt.initConfig({
        express: {
            options: {
                port: 3000,
                hostname: '*'
            }
        },
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