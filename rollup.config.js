import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

var env = process.env.NODE_ENV;
var config = {
  output: {
    name: 'docComponents',
    globals: {
      react: 'React',
      '@babel/standalone': 'Babel',
      'react-markdown': 'ReactMarkdown',
      'react-lowlight': 'ReactLowlight',
    },
    format: 'umd'
  },
  external: [
    'react',
    '@babel/standalone',
    'react-markdown',
    'react-lowlight'
  ],
  context: 'this',
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

export default config;
