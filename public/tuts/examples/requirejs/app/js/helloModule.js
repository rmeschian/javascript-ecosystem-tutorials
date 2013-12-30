define(["text!../html/template.html", "jquery", "bootstrap"],
        function (template, $) {
    return {
        hello : function () {
            $('#content').html(template);
        }
    }
});