module.exports = {
    devServer: {
        disableHostCheck: true
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                options.compilerOptions.whitespace = 'preserve'
            });
    }
};
