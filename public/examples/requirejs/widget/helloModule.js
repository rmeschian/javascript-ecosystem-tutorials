define(["text!template.html", "/js/lib/jquery.js"], function(template) {
	return {
		hello: function() {
			$('#content').html(template);
		}
	}
});