module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
              options: {
                separator: ';'
              },
              dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
              }
            },
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n"use strict";\n'
          },
          dist: {
            files: {
              'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
          }
        },
        qunit: {
          files: ['test/**/*.html']
        },
        sass: {

            dist: {

                files: {

                    'dist/<%= pkg.name %>.css': 'style/**/*.scss'

                }

            }

        },
        watch: {
          files: ['<%= concat.dist.src %>'],
          tasks: ['qunit', 'concat', 'uglify', 'sass']
        }
      });

      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-qunit');
      grunt.loadNpmTasks('grunt-contrib-sass');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-concat');

      grunt.registerTask('test', ['qunit']);

      grunt.registerTask('default', ['qunit', 'concat', 'uglify', 'sass']);

};

