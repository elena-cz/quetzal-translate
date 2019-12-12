const WorkerPlugin = require('worker-plugin');
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new WorkerPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
  },
  transpileDependencies: ['vuetify'],
  pwa: {
    name: 'Quetzal',
    themeColor: '#00CEE6',
    msTileColor: '#00CEE6',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      excludeChunks: ['admin'],
      exclude: [/^\/_/, /^\/__/],
      // navigateFallbackBlacklist: [/^\/__/, /admin/],
      // navigateFallbackWhitelist: [/^(?!\/__).*/],
    },
  },
  css: {
    loaderOptions: {
      // sass: {
      //   // Here we can specify the older indent syntax formatted SASS
      //   // Note that there is *not* a semicolon at the end of the below line
      //   data: `@import "@/styles/_variables.sass"`
      // },
      scss: {
        // Here we can use the newer SCSS flavor of Sass.
        // Note that there *is* a semicolon at the end of the below line
        // data: `@import "@/styles/variables.scss";`
      },
    },
  },
};
