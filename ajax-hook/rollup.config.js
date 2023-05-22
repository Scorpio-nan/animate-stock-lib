import BabelPlugin from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import TypescriptPlugin from '@rollup/plugin-typescript';

export default {
	input: 'lib/interceptor.ts',
	output: [
		{
			format: 'umd',
			name: 'file',
			file: 'dist/ajax.intercept.umd.min.js',
            plugins: [terser()]
		},
        {
            format: 'umd',
			name: 'file',
			file: 'dist/ajax.intercept.umd.js'
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