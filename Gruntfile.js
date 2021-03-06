module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            vue: {
                options: {
                    process: function(content, srcpath) {
                        let componentName = srcpath.replace(/src\/components\/.*\//gm, '');
                        componentName = componentName.replace('.vue', '');
                        content = content.replace(/src=".*"/gm, '');
                        content = content.replace(/lang=".*"/gm, '');
                        content = content.replace(/ /gm, '');
                        content = content.replace("<template></template>", "<template>@@include('src/components/" + componentName + "/" + componentName + ".html')</template>")
                        content = content.replace("<script></script>", "<script>@@include('src/components/" + componentName + "/" + componentName + ".js')</script>")
                        content = content.replace("<style></style>", "<style>@@include('src/components/" + componentName + "/" + componentName + ".css')</style>")
                        content = content.replace("<stylescoped></style>", "<style scoped>@@include('src/components/" + componentName + "/" + componentName + ".css')</style>")

                        return content;
                    }
                },
                files: grunt.file.expand(['src/components/*/']).map(function(cwd) {
                    return {
                        expand: true,
                        cwd: cwd,
                        src: ['*.vue'],
                        dest: 'dist/src/components'
                    }
                })
            },
            plugin: {
                options: {
                    process: function(content, srcpath) {
                        return content.replace('skateui.js', 'skateui.min.js');
                    }
                },
                files: [
                    { expand: true, src: ['src/plugins/skateui.js'], dest: 'dist/'}
                ]
            },
            assets: {
                files: [
                    { expand: true, src: ['src/assets/normalize.css'], dest: 'dist/'}
                ]
            },
        },
        browserify: {
            lib: {
                files: [
                    { src: ['src/lib/skateui.js'], dest: 'dist/src/lib/skateui.min.js' }
                ],
                options: {
                    transform: [['babelify', {'presets': ['@babel/preset-env']}], 'uglifyify'],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        less: {
            component_less: {
                options: {
                    compress: true,
                },
                files: grunt.file.expand(['src/components/*/']).map(function(cwd) {
                    return {
                        expand: true,
                        cwd: cwd,
                        src: ['*.less'],
                        dest: cwd,
                        ext: '.css'
                    }
                }),
            },
        },
        pug: {
            component_pug: {
                options: {
                    doctype: "html"
                },
                files: grunt.file.expand(['src/components/*/']).map(function(cwd) {
                    return {
                        expand: true,
                        cwd: cwd,
                        src: ['*.pug'],
                        dest: cwd,
                        ext: '.html'
                    }
                })
            }
        },
        includereplace: {
            fileBuild: {
                options: {
                    includesDir: './'
                },
                files: grunt.file.expand(['dist/src/components/']).map(function(cwd) {
                    return {
                        cwd: cwd,
                        expand: true,
                        src: ['*.vue'],
                        dest: './' + cwd
                    }
                })
            }
        },
        replace: {
            assets: {
                src: ['dist/src/components/sui-app.vue'],
                overwrite: true,
                replacements: [{
                    from: '../../assets/normalize.css',
                    to: '../assets/normalize.css'
                }]
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-text-replace');
};