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
};