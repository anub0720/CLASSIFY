// webpack.config.js
import webpack from 'webpack';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default {
  // Other webpack configuration
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_API_KEY': JSON.stringify(window.process.env.REACT_APP_API_KEY),
    }),
  ],
};
