// Polyfill for process and buffer
if (typeof window.global === 'undefined') {
    window.global = window;
}

if (typeof window.process === 'undefined') {
    window.process = {
        env: { NODE_ENV: 'development' },
        version: '',
        nextTick: function(callback) {
            setTimeout(callback, 0);
        },
        browser: true
    };
}

if (typeof window.Buffer === 'undefined') {
    window.Buffer = require('buffer').Buffer;
}