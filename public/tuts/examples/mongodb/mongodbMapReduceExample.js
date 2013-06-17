// > mongo mongodbMapReduceExample.js

db = db.getSiblingDB("sampleDB"); // select our database

db.avgAgeCollection.drop();
db.people.drop();

db.people.save({name: "Rouben Meschian", age: 32, gender: "male", 	nationality: "Armenian"});
db.people.save({name: "Michael Jackson", age: 42, gender: "male", 	nationality: "American"});
db.people.save({name: "Armina Meschian", age: 2,  gender: "female", nationality: "Armenian"});
db.people.save({name: "Brendan Eich",    age: 32, gender: "male", 	nationality: "American"});

// compute avg age of each nationality

var map = function() {
    emit(this.nationality, this.age);
}

var reduce = function(key, values) {
    var sum = 0, count = values.length;
    values.forEach(function(val) {
        sum += val;
    });
    return {nationality: key, avg_age: sum/count};
}

db.people.mapReduce(map, reduce, { out: "avgAgeCollection" });

db.avgAgeCollection.find().forEach(printjson);