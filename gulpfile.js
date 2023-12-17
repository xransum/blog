const gulp = require('gulp');
const path = require('path');
const { rimraf } = require('rimraf');


/** When fixed, need to update build command with:
 * "build": "NODE_ENV=production gulp && npx rollup -c --bundleConfigAsCjs",
 */
// Define library configurations
const NODE_DIST = path.join(__dirname, 'node_modules');
const LIB_DIST = 'assets/lib';
const libraries = [
    {
        name: 'bootstrap',
        files: [
            {
                src: 'bootstrap/dist/js/bootstrap*.js',
                dest: '',
            },
            {
                src: 'bootstrap/dist/css/bootstrap*.css',
                dest: '',
            }
        ]
    },
    {
        name: 'clipboard',
        files: [
            {
                src: 'clipboard/dist/js/*.js',
                dest: '',
            }
        ]
    },
    {
        name: 'dayjs',
        files: [
            {
                src: 'dayjs/dayjs.min.js',
                dest: '',
            },
            {
                src: 'dayjs/locale/*.js',
                dest: 'locale',
            },
            {
                src: 'dayjs/plugin/*.js',
                dest: 'plugin',
            }
        ]
    },
    {
        name: 'fontawesome-free',
        files: [
            {
                src: '@fortawesome/fontawesome-free/css/*.css',
                dest: 'css',
            },
            {
                src: '@fontawesome/fontawesome-free/webfonts/*.{ttf,woff,woff2}',
                dest: 'webfonts',
            },
        ]
    },
    {
        name: 'jquery',
        files: [
            {
                src: 'jquery/dist/*.{js,map}',
                dest: '',
            }
        ]
    },
    {
        name: 'magnific-popup',
        files: [
            {
                src: 'magnific-popup/jquery*.js',
                dest: '',
            },
            {
                src: 'magnific-popup/magnific-*.css',
                dest: '',
            },
        ]
    },
    {
        name: 'mathjax',
        files: [
            {
                src: 'mathjax/es5/*.js',
                dest: ''
            },
            {
                src: 'mathjax/es5/a11y/*.js',
                dest: 'a11y'
            },
            {
                src: 'mathjax/es5/adaptors/*.js',
                dest: 'adaptors'
            },
            {
                src: 'mathjax/es5/input/*.js',
                dest: 'input'
            },
            {
                src: 'mathjax/es5/input/mml/*.js',
                dest: 'input/mml'
            },
            {
                src: 'mathjax/es5/input/tex/extensions/*.js',
                dest: 'input/tex/extensions'
            },
            {
                src: 'mathjax/es5/output/*.js',
                dest: 'output'
            },
            {
                src: 'mathjax/es5/output/svg/fonts/*.js',
                dest: 'output/svg/fonts'
            },
            {
                src: 'mathjax/es5/output/chtml/fonts/*.js',
                dest: 'output/chtml/fonts'
            },
            {
                src: 'mathjax/es5/output/chtml/fonts/woff-v2/*.woff',
                dest: 'output/chtml/fonts/woff-v2'
            },
            {
                src: 'mathjax/es5/sre/*.js',
                dest: 'sre'
            },
            {
                src: 'mathjax/es5/sre/mathmaps/*.js',
                dest: 'sre/mathmaps'
            },
            {
                src: 'mathjax/es5/ui/*.js',
                dest: 'ui'
            },
        ]
    },
    {
        name: 'mermaid',
        files: [
            {
                src: 'mermaid/dist/mermaid.min.js',
                dest: '',
            },
        ]
    },
    {
        name: 'simple-jekyll-search',
        files: [
            {
                src: 'simple-jekyll-search/dest/simple-jekyll-search*.js',
                dest: '',
            },
        ]
    }
];

// Task to clear LIB_DIST
function cleanLibDist() {
    const libDistPath = path.join(__dirname, LIB_DIST);
    const libraryPaths = libraries.map(library => path.join(libDistPath, library.name));
    
    // Similarly to the above, except now we will use libraryPaths to remove each library directory
    return new Promise((resolve, reject) => {
        // Use rimraf for recursive directory removal
        rimraf(libraryPaths)
            .then(() => {
                resolve();
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Task to copy library assets
function copyLibraryAssets(library) {
    const { name, files } = library;
    
    const dest = path.join(LIB_DIST, name);
    
    return gulp.parallel(
        ...files.map(file => {
            const srcPath = path.join(NODE_DIST, file.src);
            const destPath = path.join(dest, file.dest);
            return () => gulp.src(srcPath).pipe(gulp.dest(destPath));
        })
    );
}

// Create tasks for each library
libraries.forEach(library => {
    const taskName = `copy-${ library.name }`;
    gulp.task(taskName, copyLibraryAssets(library));
});

// Task to run all library copy tasks
gulp.task('copy-libraries', gulp.series(...libraries.map(library => `copy-${ library.name }`)));

// Default task
gulp.task('default', gulp.series(cleanLibDist, 'copy-libraries'));