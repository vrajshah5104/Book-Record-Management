// This file and the code remains same for every applications that you build using MongoDb and NodeJs

// Using the package that we imported to connect
const mongoose = require("mongoose");

// Creating the connection file (file remains same for any kinds of applications)
function DbConnection() {
    // Can't write url directly here, need to follow this process
    const DB_URL = process.env.MONGO_URL;

    mongoose.connect(DB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
}

const db = mongoose.connection;

// Checking if we have error
db.on("error", console.error.bind(console, "Connection Error")) // 'console.log' is also an acceptable alternative
// Checking if we do not have any error
db.once("open", function() {
    console.log("Database Connected!");
})

// Exporting the function that we created above
module.exports = DbConnection;