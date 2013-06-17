(function ($) {

    "use strict";

    $.fn.codemirror = function (options, o2) {

        var result = this;

        if (options === 'resize') {
            return this.each(function () {
                var jqContainer = $(this);
                var editorWrapper = jqContainer.find('.codeEditor_editor');
                var editor = editorWrapper.data('editor');
                if (editor) {
                    editor.refresh();
                }
            });
            return this;
        }


        var defaultScripts = [];
        var defaultStyles = [];
        var settings = $.extend({
            mode        : 'javascript',
            lineNumbers : false,
            runmode     : true
        }, options);

        if (settings.defaultScripts)
            defaultScripts = defaultScripts.concat(settings.defaultScripts);

        if (settings.defaultStyles)
            defaultStyles = defaultStyles.concat(settings.defaultStyles);

        this.each(function () {
            var jqContainer = $(this),
                editorTarget = jqContainer.find('.codeEditor_target');

            var tmr;
            var writeToIframe = function () {
                if (tmr)
                    window.clearTimeout(tmr);

                tmr = window.setTimeout(function () {

                    try {
                        var content = editor.getValue();
                        if (content.indexOf('<html' < 0)) {
                            var scripts = defaultScripts.length === 0 ? '' : '<script src="' + defaultScripts.join('"></script><script src="') + '"></script>';
                            scripts += "<script>console.log = function(val) { $('body').append('<p>' + val + '</p>'); } </script>";
                            var styles = defaultStyles.length === 0 ? '' : '<link rel="stylesheet" href="' + defaultStyles.join('" /><link rel="stylesheet" href="') + '"/>';
                            content = '<!doctype html><html><head> ' + styles + '<style>p, h1, h2, h3, h4, h5, h6 { padding: 0; margin: 0} </style> ' + scripts + '  </head><body>' + content + '</body></html>';
                        }

                        var iframe = $("<iframe style='min-height: 80em; width: 99%' ></html></iframe>")[0];
                        editorTarget.empty().append(iframe);

                        var f = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
                        f.document.open();
                        f.document.write(content);
                        f.document.close();
                    } catch (e) {
                    }
                }, 600);
            }

            var args = $.extend({
                onChange : function () {
                    writeToIframe();
                }
            }, settings);


            var editorWrapper = jqContainer.find('.codeEditor_editor');
            var textarea = editorWrapper.children('textarea')[0];
            if (!textarea) {
                textarea = $("<textarea style='height: auto; width: 99%' ></textarea>")[0];
                textarea.value = editorWrapper.html();
                editorWrapper.html('');
                editorWrapper.append(textarea);
            }

            var editor = CodeMirror.fromTextArea(textarea, args);

            editorWrapper.data('editor', editor);

            writeToIframe();

        });

        return result;
    };
})(jQuery);