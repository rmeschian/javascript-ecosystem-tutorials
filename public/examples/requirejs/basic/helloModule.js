define(["/js/lib/jquery.js"], function() {
	return {
		hello: function() {
			$('#content').text("Hello World");
		}
	}
});