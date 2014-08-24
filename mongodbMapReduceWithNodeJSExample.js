// node mongodbMapReduceWithNodeJSExample.js

var mongodb_db = require('mongodb').Db;
var mongodb_connection = require('mongodb').Connection;
var mongodb_server = require('mongodb').Server;

var host = 'localhost';
var port = mongodb_connection.DEFAULT_PORT;
var db = new mongodb_db('sampleDB', new mongodb_server(host, port, {}), {
    native_parser : false
});


// --------------


function init(callback) {
    db.open(function() {
        db.dropCollection('sample', function(err, result) {
            seedData(callback);
        });
    });
}

function seedData(callback) {
    db.collection('sample', function(err, collection) {
        if(err)
            throw err;

        var count = 4;
        var clbk = function() {
            if(--count === 0) {
                collection.find({}, function(err, cursor) {
                    cursor.toArray(function(err, items) {
                        console.log("\n\nSample values:")
                        console.log(JSON.stringify(items) + '\n\n');
                        callback();
                    });
                });
            }
        };

        collection.save({
            name        : "Rouben Meschian",
            age         : 32,
            gender      : "male",
            nationality : "Armenian"
        }, clbk);

        collection.save({
            name        : "Michael Jackson",
            age         : 42,
            gender      : "male",
            nationality : "American"
        }, clbk);

        collection.save({
            name        : "Armina Meschian",
            age         : 2,
            gender      : "female",
            nationality : "Armenian"
        }, clbk);

        collection.save({
            name        : "Brendan Eich",
            age         : 32,
            gender      : "male",
            nationality : "American"
        }, clbk);
    });
}

init(function() {

    // compute avg age of each nationality


//	db.close();
//	process.exit(0);

    var map = function() {
        emit(this.nationality, this.age);
    };

    var reduce = function(key, values) {
        var sum = 0, count = values.length;
        values.forEach(function(val) {
            sum += val;
        });
        return {
            nationality : key,
            avg_age     : sum / count
        };
    };

    var MR = {
        mapreduce : "sample",
        out       : "mapReduceResultCollection",
        map       : map.toString(),
        reduce    : reduce.toString()
    };

    console.log("\nexecuting mapreduce");
    db.executeDbCommand(MR, function(err, dbres) {

        db.collection('mapReduceResultCollection', function(err, collection) {
            collection.find({}, function(err, cursor) {
                cursor.toArray(function(err, items) {
                    console.log("\n\nresults of mapreduce:")
                    console.log(JSON.stringify(items));

                    db.close();
                    process.exit(0);
                });
            });
        });
    });


});
