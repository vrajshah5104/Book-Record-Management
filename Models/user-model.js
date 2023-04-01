const mongoose = require("mongoose");
const bookModel = require("./book-model");

// Initializing a Schema
const Schema = mongoose.Schema;

// Creating a Schema (Basic template of the table)
const userSchema = new Schema (
    {
        name : {
            type : String,
            required : true
        },
        surname : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        // Rest fields are also present in the 'Book' table soo we need to follow Foreign Key Referential Integrity
        issuedBooks : {
            type : mongoose.Schema.Types.ObjectId,
            // Also need to refer the table from where it's from
            ref : "Book",
            // Not compulsory for a user to issue a book
            required : false
        },
        issuedDate : {
            type : Date,
            required : false
        },
        returnDate : {
            type : Date,
            required : false
        },
        subscriptionType : {
            type : String,
            required : true
        },
        subscriptionDate : {
            type : Date,
            required : true
        }
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model("User", userSchema);