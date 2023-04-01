const mongoose = require("mongoose");

// Initializing a Schema
// Schema is a class name which is present in mongoose and we are initializing that to a const variable called Schema
const Schema = mongoose.Schema;

// Creating a Schema (Basic template of the table)
// Invoking our Constructor here
const bookSchema = new Schema ({
    // Id is auto-created by MongoDb when we enter something soo field is not required to mention here
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    genre : {
        type : String,
        required : true
    },
    price : {
        type : String, // Can be a number type as well
        required : true
    },
    publisher : {
        type : String,
        required : true
    }
},
// Adding a timestamp to get updates on the time of insertion/updation
{
    timestamps : true
});

// Exporting it back
// "Book" here is the table name, it is always taken in singular form
module.exports = mongoose.model("Book", bookSchema);