module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'ie >= 11',
      ],
      grid: true,
    },  
  }
};