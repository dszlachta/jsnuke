module.exports = function(grunt) {

    var name = '<%= pkg.name %>-<%= pkg.version%>';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {

            dist: {

                files: [

                    /* CodeMirror */
                    {expand: true, src: ['components/CodeMirror/lib/codemirror.js', 'components/CodeMirror/mode/javascript/javascript.js'], dest: 'src/lib/' },
                    {expand: true, src: ['components/CodeMirror/lib/codemirror.css'], dest: 'dist/' },

                    /* Bootstrap */
                    {expand: true, src: ['components/jquery/jquery.js', 'components/bootstrap-javascript/bootstrap.js'], dest: 'src/lib/' },
                    {expand: true, src: ['components/bower-bootstrap-css/bootstrap.min.css'], dest: 'dist/' }

                ]

            }

        },
        concat: {
              options: {
                separator: ';'
              },
              dist: {
                src: ['src/jsnuke.js', 'src/editor.js', 'src/expand.js', 'src/inspector.js', 'src/console.js'],
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

                    //'dist/<%= pkg.name %>.css': 'style/**/*.scss'
                    'dist/<%= pkg.name %>.css': 'style/main.scss'

                }

            }

        },
        watch: {
          files: ['<%= concat.dist.src %>', 'style/**/*.scss'],
          tasks: ['copy', 'qunit', 'concat', /*'uglify', */ 'sass']
        }
      });

      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-qunit');
      grunt.loadNpmTasks('grunt-contrib-sass');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-concat');

      grunt.registerTask('test', ['concat', 'qunit']);

      grunt.registerTask('default', ['copy', 'concat', 'qunit', /*'uglify', */ 'sass']);

};

