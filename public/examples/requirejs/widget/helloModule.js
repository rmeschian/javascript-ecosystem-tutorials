define(["text!template.html", "jquery"], function (template, $) {
    return {
        hello : function () {
            $('#content').html(template);
        }
    }
});