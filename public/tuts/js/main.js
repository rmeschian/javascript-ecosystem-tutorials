"use strict";

require.config({
    paths : {
        text             : "lib/require/text",
        jquery           : "lib/jquery",
        hasher           : "lib/hasher",
        codemirror       : "lib/codemirror/lib/codemirror",
        xmlMod           : "lib/codemirror/mode/xml/xml",
        jsMod            : "lib/codemirror/mode/javascript/javascript",
        cssMod           : "lib/codemirror/mode/css/css",
        htmlmixedMod     : "lib/codemirror/mode/htmlmixed/htmlmixed",
        jqueryCodemirror : "lib/codemirror/jquery.codemirror"
    },
    shim  : {
        xmlMod           : {
            deps : ["codemirror"]
        },
        jsMod            : {
            deps : ["codemirror"]
        },
        cssMod           : {
            deps : ["codemirror"]
        },
        htmlmixedMod     : {
            deps : ["codemirror"]
        },
        jqueryCodemirror : {
            deps : ["codemirror", "jquery"]
        }

    }
});


require([
    "hasher",
    "jquery",
    "codemirror",
    "xmlMod",
    "jsMod",
    "cssMod",
    "htmlmixedMod",
    "jqueryCodemirror"
], function (hasher) {


    var doc = $(document),
        backBtns = $('.backBtn'),
        forwardBtns = $('.forwardBtn');

    doc.ready(function () {

        var curIndex,
            esp = function (e) {
                e.stopPropagation();
            },
            container = $('.deck-container'),
            pages = container.find('.slide').hide();

        $('.codeEditor').codemirror({
            mode           : "text/html",
            tabMode        : "indent",
            defaultStyles  : ['../css/main.css'],
            defaultScripts : ["../js/lib/jquery.js"],
            theme          : "vibrant-ink"
        });


        function transitionTo(newPage, oldPage) {
            if (oldPage)
                $(oldPage).hide();
            if (newPage)
                $(newPage).slideDown().codemirror('resize');
        }

        function handleChanges(newHash, oldHash) {

            if (newHash === '' || newHash === '/')
                newHash = 0;

            var oldIndex = curIndex;
            curIndex = parseInt(newHash);

            transitionTo(pages[curIndex], pages[oldIndex]);
            updateNavBtns();
        }

        function updateNavBtns() {
            backBtns.css('display', curIndex > 0 ? '' : 'none');
            forwardBtns.css('display', curIndex < pages.length-1 ? '' : 'none')
        }


        hasher.changed.add(handleChanges); // add hash change listener
        hasher.initialized.add(handleChanges); // add initialized listener (to grab initial value in case it is already set)
        hasher.init(); // initialize hasher (start listening for history changes)


        backBtns.click(function(e) {
            hasher.setHash(curIndex - 1);
            e.stopPropagation();
        });

        forwardBtns.click(function(e) {
            hasher.setHash(curIndex + 1);
            e.stopPropagation();
        });


        /* Remove any previous bindings, and rebind key events */
        doc.unbind('keydown.deck').bind('keydown.deck', function (e) {
            if (e.keyCode === 39) {
                if (pages.length > (curIndex + 1))
                    hasher.setHash(curIndex + 1);
                e.preventDefault();
            }
            else if (e.keyCode === 37) {
                if (curIndex > 0)
                    hasher.setHash(curIndex - 1);
                e.preventDefault();
            }
        })
            /* Stop propagation of key events within editable elements */
            .undelegate('input, textarea, select, button, meter, progress, [contentEditable]', 'keydown', esp)
            .delegate('input, textarea, select, button, meter, progress, [contentEditable]', 'keydown', esp);

    });


});
