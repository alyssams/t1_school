module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                globals: {
                    jQuery: true
                },
                files: ['./Gruntfile.js', 'public/javascripts/**/*.js'],
                ignores: ['./public/javascripts/libs/*.js']
            }
        },
        shell: {
            options: {
                stderr: true
            },
            runServer: {
                command: 'npm start & grunt concurrent:fast'
            }
        },
        watch: {
            sass: {
                options: {
                    spawn: true
                },
                files: ['public/stylesheets/**/*.scss'],
                tasks: ['prettysass:sass', 'sass:dev']
            },
            js: {
                options: {
                    spawn: true
                },
                files: ['public/javascripts/**/*.js', './Gruntfile.js'],
                tasks: ['jsbeautifier:js', 'jshint']
            },
            hbs: {
                options: {
                    spawn: false
                },
                files: ['**/*.hbs'],
                tasks: ['prettify:hbs']
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 4
            },
            fast: [
                'watch:sass',
                'watch:js',
                'watch:hbs'
            ]
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './public/stylesheets/main.css': './public/stylesheets/sass/main.scss'
                }
            },
            build: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './dist/public/stylesheets/main.css': './public/stylesheets/sass/main.scss'
                }
            }
        },
        prettify: {
            options: {
                padcomments: true,
                indent: 4
            },
            hbs: {
                expand: true,
                ext: '.hbs',
                src: ['views/**/*.hbs']
            }
        },
        clean: {
            release: ['dist']
        },
        jsbeautifier: {
            options: {
                js: {
                    braceStyle: "collase",
                    breakChainedMethods: false,
                    jslintHappy: true
                }
            },

            js: {
                src: ['./public/javascripts/**/*.js', './Gruntfile.js']
            }

        },
        prettysass: {
            options: {
                indent: 4
            },
            sass: {
                src: ['./public/stylesheets/sass/**/*.scss']
            }
        },
        uglify: {
            build: {
                files: {
                    './dist/public/javascripts/main.js': ['./public/javascripts/**/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-prettysass');

    grunt.registerTask('default', [
        'prettify:hbs',
        'jsbeautifier:js',
        'prettysass:sass',
        'sass:dev',
        'jshint',
        'shell:runServer'
    ]);

    grunt.registerTask('compile', [
        'prettify:hbs',
        'jsbeautifier:js',
        'prettysass:sass',
        'sass:dev',
        'jshint'
    ]);
};
