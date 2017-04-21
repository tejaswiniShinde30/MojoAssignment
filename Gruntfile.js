module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dev: {
                files: {
                    'app/scripts/vendor.min.js': ['node_modules/jquery/dist/jquery.js', 'node_modules/angular/angular.js', 'node_modules/angular-animate/angular-animate.js', 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js', 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js', 'custom_modules/angular-ui-router/angular-ui-router.js', 'custom_modules/angular-mock/angular-mocks.js', 'custom_modules/ngStorage/ngStorage.js', 'node_modules/angular-resource/angular-resource.js', 'custom_modules/lodash/lodash.min.js', 'node_modules/angular-messages/angular-messages.min.js',
                        'custom_modules/angular-notify/angular-notify.min.js', 'node_modules/angular-smart-table/dist/smart-table.js', 'node_modules/angular-sanitize/angular-sanitize.js', 'node_modules/angular-ui-mask/dist/mask.min.js', 'custom_modules/ngProgress/ngprogress.min.js', 'custom_modules/base64/angular-base64.min.js', 'node_modules/angular-md5/angular-md5.min.js'
                    ],
                    'app/scripts/script.min.js': ['app/scripts/config/config.js', 'app/common/services/common.services.js', 'app/common/services/*.js', 'app/common/directive/*.js', 'app/scripts/app/*.js', 'app/scripts/controllers/*.js', 'app/scripts/login/*.js',
                        'app/common/filters/*.js', 'app/common/error/*.js','app/backendMock/*.js','app/components/users/*.js','app/components/administrator/*.js'
                    ]
                },
                options: {
                    mangle: false,
                    beautify: true,
                    compress: false
                }
            },
            debug: {
                files: {
                    'dist/scripts/vendor.min.js': ['node_modules/angular/angular.js'],
                    'dist/scripts/script.min.js': ['app/scripts/*.js', 'app/scripts/controllers/*.js']
                },
                options: {
                    mangle: false,
                    beautify: true,
                    compress: false
                }
            },
            prod: {
                files: {
                    'dist/scripts/vendor.min.js': ['node_modules/angular/angular.js'],
                    'dist/scripts/script.min.js': ['app/scripts/*.js', 'app/scripts/controllers/*.js']
                },
                options: {
                    mangle: false,
                    beautify: false,
                    compress: true
                }
            }
        },
        cssmin: {

            dev: {
                files: {
                    'app/styles/css/vendor.min.css': ['custom_modules/angular-notify/angular-notify.min.css', 'custom_modules/bootstrap/bootstrap.min.css', 'custom_modules/ngProgress/ngProgress.css'],
                    'app/styles/css/main.min.css': ['app/styles/css/prefix/main-prefix.css'],
                    'app/styles/css/login.min.css': ['app/styles/css/prefix/login-prefix.css'],
                    
                }
            },
            debug: {
                files: {
                    'dist/styles/vendor.min.css': ['node_modules/bootstrap/dist/css/bootstrap.min.css'],
                    'dist/styles/styles.min.css': ['app/styles/css/*.css']
                }
            },
            prod: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    'dist/styles/vendor.min.css': ['node_modules/bootstrap/dist/css/bootstrap.min.css'],
                    'dist/styles/styles.min.css': ['app/styles/css/*.css']
                }
            },
            img: {
                files: {

                    'app/styles/styles1.min.css': ['app/styles/styles.min.css']
                }
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                // files: {
                //   "app/styles/css/main/scss-css-main.css" :["app/styles/scss/main/custom.scss","app/styles/scss/main/createuser.scss"],
                //   "app/styles/css/login/scss-css-login.css" :"app/styles/scss/login/*.scss"
                // }
                files: [{
                    expand: true, // 2
                    cwd: 'app/styles/scss/main/',
                    src: ['*.scss'],
                    dest: 'app/styles/sass-process/main',
                    ext: '.css'
                }, {
                    expand: true, // 2
                    cwd: 'app/styles/scss/login/',
                    src: ['*.scss'],
                    dest: 'app/styles/sass-process/login',
                    ext: '.css'
                }]
            },
            debug: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: "app/styles/scss",
                    src: ["**/*.scss"],
                    dest: "app/styles/css",
                    ext: ".css"
                }]
            },
            prod: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: "app/styles/scss",
                    src: ["**/*.scss"],
                    dest: "app/styles/css",
                    ext: ".css"
                }]
            }
        },
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'app/index.html'
                }
            },
            debug: {
                files: {
                    'dist/index.html': 'app/index.html'
                }
            }
        },
        copy: {
            images: {
                files: [{
                    cwd: 'app/images/',
                    src: '**/*',
                    dest: 'dist/images',
                    expand: true
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['app/common/services/*.js', 'app/scripts/app/*.js', 'app/scripts/controllers/*.js', 'app/scripts/login/*.js',
                     'app/common/error/*.js'
                ],
                tasks: ['clean:script', 'uglify:dev', 'includeSource:dev']
            },
            css: {
                files: ['app/styles/scss/*/*.scss'],
                tasks: ['sass:dev', 'concat:main', 'concat:login', 'autoprefixer', 'cssmin:dev', 'clean:all']
            }
        },
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    bases: ['app/'],
                    livereload: true
                }
            }
        }, //The autoprefixer task
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'chrome 53', 'firefox 48', 'ie 11', 'ie 10', 'ie 9']
            },

            all: {
                files: {
                    'app/styles/css/prefix/login-prefix.css': 'app/styles/css/login/*.css',
                    'app/styles/css/prefix/main-prefix.css': 'app/styles/css/main/*.css',
               }
            }


        },
        clean: {
            all: {
                src: ['app/styles/css/login',  'app/styles/css/main', 'app/styles/css/prefix', 'app/styles/sass-process'],
            },
            script: {
                src: ['app/scripts/*.js']
            }
        },
        concat: {

            main: {
                src: ['app/styles/sass-process/main/*.css'],
                dest: 'app/styles/css/main/scss-css-main.css'
            },
            login: {
                src: ['app/styles/sass-process/login/*.css'],
                dest: 'app/styles/css/login/scss-css-login.css'
            }    

        },
        ngconstant: {
            options: {
                name: 'config',
                dest: 'app/scripts/config/config.js',
                constants: {
                    'CONFIG': grunt.file.readJSON('app/scripts/config/config.json'),
                    'MESSAGES': grunt.file.readJSON('app/scripts/config/messages.json')
                },
                values: {
                    debug: true
                }
            },
            build: {}
        },
        cacheBust: {
            dev: {
                options: {
                    baseDir: 'app/',
                    assets: ['scripts/*.js'],
                    deleteOriginals: true,
                    algorithm: 'md5'
                },
                src: ['app/index.html']
            }
        },
        includeSource: {
            options: {
                basePath: 'app',
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
                    }
                }
            },
            dev: {
                files: {
                    'app/index.html': 'app/index.tpl.html'
                }
            }
        },
        war: {
            target: {
                options: {
                    war_verbose: true,
                    war_dist_folder: 'dist',
                    war_name: 'connect',
                    webxml_welcome: 'index.html',
                    webxml_display_name: 'User Initiative'
                },
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['**'],
                    dest: ''
                }]
            }
        }
    });
    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-war');


    // Register task(s).
    grunt.registerTask("default", ['clean:script', 'uglify:dev', 'sass:dev', 'concat:main', 'concat:login', 'autoprefixer', 'cssmin:dev', 'clean:all', 'copy:images', 'ngconstant', 'cacheBust:dev', 'includeSource:dev', 'war']);
    grunt.registerTask("debug", ['uglify:debug', 'sass:debug', 'concat:all', 'autoprefixer', 'clean:all', 'cssmin:debug', 'htmlmin:debug', 'copy:images']);
    grunt.registerTask("build", ['uglify:prod', 'sass:prod', 'concat:all', 'autoprefixer', 'clean:all', 'cssmin:prod', 'htmlmin:prod', 'copy:images']);
    grunt.registerTask("serve", ['express', 'watch']);
};
