// node js/lib/r.js -o build.js

({

    // Define our base URL - all module paths are relative to this
    // base directory.
    baseUrl        : "./js",

    // Define our build directory. All files in the base URL will be
    // COPIED OVER into the build directory as part of the
    // concatentation and optimization process. You should use this
    // so you don't override your raw source files.
    dir            : "./js-built",

    // Load the RequireJS config() definition from the main.js file.
    // Otherwise, we'd have to redefine all of our paths again here.
    mainConfigFile : "./js/main.js",


    // Define the modules to compile.
    modules        : [
        {
            name : "main"
        }
    ],

//    preserveLicenseComments : false,

    // Turn off UglifyJS so that we can view the compiled source
    // files (in order to make sure that we know that the compile
    // is working properly - for debugging only.)
    optimize                : "none"

})