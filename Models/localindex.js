// Making this file soo we can import book the models together at the same time in the routes

// Importing the models
const UserModel = require("./user-model");
const BookModel = require("./book-model");

// Exporting the models
module.exports = {UserModel, BookModel};