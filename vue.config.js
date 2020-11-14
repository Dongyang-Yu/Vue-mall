module.exports = {
  configureWebpack: {
    resolve: { // 路径相关
      alias: {
        // 'assets': 'src/assets',
        // 'common': 'src/common',
        // 'components': 'src/components',
        // 'network': 'src/network',
        // 'views': 'src/views',
        'assets': '@/assets',
        'components': '@/components',
        'common': '@/common',
        'network': '@/network',
        'views': '@/views',
      },
    },
  },
}

