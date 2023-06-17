(function() {
    'use strict';
    
    $(document).ready(function() {
        $('pre.highlight').each(function() {
            let pre = $(this);
            let code = pre.find('code');
            var lang = [].slice.call(pre.parents().eq(1)[0].classList).find(c => c.match('language-'));
            
            if (!!lang && !code.hasClass(lang)) {
                code.addClass(lang);
            }
        });
        
        hljs.highlightAll();
    });
})();
