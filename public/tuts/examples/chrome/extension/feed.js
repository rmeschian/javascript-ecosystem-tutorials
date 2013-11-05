google.load("feeds", "1");

google.setOnLoadCallback(function() {
    var feed = new google.feeds.Feed("http://gdata.youtube.com/feeds/api/users/meschian/uploads");
    feed.setNumEntries(10);
    var count = 1;
    feed.load(function(result) {
        if(!result.error) {
            var container = document.getElementById("feed");
            var html = "";
            for(var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                html = "<h5>" + count++ + ". <a href='" + entry.link + "'>" + entry.title + "</a></h5>";
                var div = document.createElement("div");
                div.innerHTML = html;
                container.appendChild(div);
            }
            document.write(html);
        }
    });
});

