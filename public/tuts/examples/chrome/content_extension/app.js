'use strict';


var actualCode = '(' + function() {
//    alert(window);
} + ')();';


jQuery(document).ready(function($) {
    $('body').css('background', 'red');
});
//
//$('img').css({
//    'width': '200px',
//    'height': '200px'
//});

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);