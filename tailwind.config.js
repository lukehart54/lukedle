module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-green': '#32a86f',
        'mygrey': '#808080',
      },
      animation: {
        'transform': 'rotateY(360deg)',
      },
    },
  },
  plugins: [],
};
