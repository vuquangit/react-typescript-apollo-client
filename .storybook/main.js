const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: (config) => {
    config.resolve.modules = [
      ...config.resolve.modules,
      path.resolve(__dirname, '../src'),
    ]

    config.resolve.alias = {
      '@': path.resolve(__dirname, '../src'),
    }

    return config
  },
}
