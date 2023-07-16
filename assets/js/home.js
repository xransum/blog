---
layout: null
---

(function() {
    'use strict';

    // Particle JS: https://www.npmjs.com/package/particlesjs
    // Sample: https://vincentgarreau.com/particles.js/#default
    /*var particles = Particles.init({
        selector: '.particles-js',
        backgroundColor: '#22242d',
        color: '#DA0463',
    });*/

    
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS('particles-js', JSON.parse('{{ site.data["home-particles"] | jsonify }}'));
    
    // Glitch: https://www.cssscript.com/image-power-glitch/
    // Usage: https://7ph.github.io/powerglitch/#/usage
    const glitchOptions = {
        playMode: "always",
        createContainers: true,
        hideOverflow: false,
        timing: {
            duration: 2000
        },
        glitchTimeSpan: {
            start: 0.7,
            end: 0.8
        },
        shake: {
            velocity: 10,
            amplitudeX: 0.6,
            amplitudeY: 1
        },
        slice: {
            count: 3,
            velocity: 15,
            minHeight: 0.02,
            maxHeight: 0.15,
            hueRotate: true
        },
        pulse: false
    };
    const { startGlitch, stopGlitch } = PowerGlitch.glitch('.glitch', glitchOptions);
    startGlitch();
    
    const consoleTyper = new ConsoleTyper({
        paragraphElement: document.querySelector(".console-text"),
        loop: false,
        loopAfterSeconds: 6,
        cursor: "I",
        stopCursorAfterBlinks: 2,
        cursorAnimationSpeedMs: 500,
        typingSpeedMs: 70,
        onStartTyping: () => null,
        onStopTyping: () => null,
        onStopCursorAnimation: function() {
            stopGlitch(); // Stop glitching
            PowerGlitch.glitch(document.querySelector(".console-text"), glitchOptions);
            startGlitch(); // Restart glitching
        },
    });
    
    consoleTyper.startTyping();
})();

