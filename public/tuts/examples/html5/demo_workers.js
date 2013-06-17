this.onmessage=function(event){
	var i=0;
	var t = event.data.text;
	function timedCount() {
		i++;
		postMessage(i+t);
		setTimeout(function() {
			timedCount();
		}, 500);
	}

	timedCount();
//    postMessage("Starting");
//    for(var i = 0; i < 9999999999; i++) {
//
//    }
//    postMessage('All done!');
};