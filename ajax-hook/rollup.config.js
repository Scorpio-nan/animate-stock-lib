import BabelPlugin from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import TypescriptPlugin from '@rollup/plugin-typescript';

export default {
	input: 'lib/interceptor.ts',
	output: [
		{
			format: 'umd',
			name: 'library',
			file: 'dist/ajax.intercept.umd.min.js',
            plugins: [terser()],
            globals: { 'library': 'RequestIntercept' }
		},
        {
            format: 'umd',
			name: 'library',
			file: 'dist/ajax.intercept.umd.js',
            globals: { 'library': 'RequestIntercept' }
        },
        {
            format: 'iife',
            name: 'library',
            file: 'dist/ajax.interceptor.iife.min.js',
            plugins: [terser()]
        },
        {
            format: 'iife',
            name: 'library',
            file: 'dist/ajax.interceptor.iife.js',
        }
	],
    plugins: [
        BabelPlugin({
            presets: ['@babel/preset-env'],
            exclude: ['node_modules/**'],
            babelHelpers: 'inline'
        }),
        TypescriptPlugin()
    ]
};