require.config({
    paths : {
        text      : "lib/text",
        jquery    : "lib/jquery",
        bootstrap : "lib/bootstrap"
    },
    shim  : {
        bootstrap   : {
            deps : ['jquery']
        },
        helloModule : {
            deps : ['text']
        }
    }
});

require(["helloModule"], function (helloObj) {
    helloObj.hello();
});