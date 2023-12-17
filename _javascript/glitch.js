import PowerGlitch from 'powerglitch';

const glitch = new PowerGlitch({
    selector: '.glitch',
    playMode: 'always',
    hideOverflow: true,
    timing: {
        duration: 1000,
        iterations: 15,
        easing: 'ease-in-out',
    },
    glitchTimeSpan: {
        start: 0.4,
        end: 0.7,
    },
    shake: {
        velocity: 10,
        amplitudeX: 0.4,
        amplitudeY: 0.4,
    },
    slice: {
        count: 4,
        velocity: 10,
        minHeight: 0.02,
        maxHeight: 0.40,
        hueRotate: true,
    },
});