define(["text!../html/template.html", "js/jquery.js"], function(template) {
	return {
		hello: function() {
			$('#content').html(template);
		}
	}
});