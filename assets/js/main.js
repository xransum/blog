// Sets wrappers for Spaceship generated diagrams
(function() {[].slice.call(document.querySelectorAll('p')).filter(p => [].slice.call(p.childNodes).filter(e => e.nodeName === 'IMG' && e.classList.contains('mermaid')).length).forEach(p => p.classList.add('spaceship'))})();
(function() {
    'use strict';
    $(function() {
        $('.more-powered-by').on('click', function() {
            $(this).hide().next().show();
        });
    });
})();