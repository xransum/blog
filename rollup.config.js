import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import license from 'rollup-plugin-license';
import path from 'path';
import inject from 'rollup-plugin-inject';


const isProd = process.env.NODE_ENV === 'production';

const JS_SRC = '_javascript';
const JS_DIST = 'assets/js/dist';

// TODO: This doesn't work, can try to fix later.
function resolveAssets() {
    return inject({
        // control which files this plugin applies to
        // with include/exclude
        include: '**/*.js',
        exclude: 'node_modules/**',
        // use the default – i.e. insert
        // import $ from 'jquery'
        $: 'jquery',
        powerglitch: 'powerglitch',
    });
}

function build(filename) {
    return {
        input: [`${ JS_SRC }/${ filename }.js`],
        output: {
            file: `${ JS_DIST }/${ filename }.min.js`,
            format: 'iife',
            name: 'Chirpy',
            sourcemap: !isProd
        },
        watch: {
            include: `${ JS_SRC }/**`
        },
        plugins: [
            babel({
                babelHelpers: 'bundled',
                presets: ['@babel/env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }),
            license({
                banner: {
                    commentStyle: 'ignored',
                    content: { file: path.join(__dirname, JS_SRC, '_copyright') }
                }
            }),
            isProd && terser(),
        ]
    };
}

// Build configurations
export default [
    // Inject external libraries.
    // resolveAssets(),
    // Build the primary assets.
    build('commons'),
    build('home'),
    build('categories'),
    build('page'),
    build('post'),
    build('misc'),
    // build('glitch'),
];