const express = require("express");

// Importing the .env file here
const dotenv = require("dotenv");

// Activating and Configuring the .env file here
dotenv.config();

// Importing the databaseConnection file here
const DbConnection = require("./databaseConnection");

// No need of this now cuz we have separate files for both
// const {users} = require("./data/users.json");
// const {books} = require("./Data/books.json");

const userRouter = require('./Routes/users');
const booksRouter = require('./Routes/books');

const app = express();

// Calling the function that is created in databaseConnection.js
DbConnection();

const PORT = 8081;

app.use(express.json());

// Defining one basic "/" root
// (req,res) are the parameters to the callback function
// Root url = http://localhost:8081/users/
app.get("/", (req, res) => {
    res.status(200).json ({
        message: "Server is up and running :)"
    })
})

// Redirecting the workflow to js files in 'Routes' folder when url has any of '/users' or '/books'
app.use("/users", userRouter);
app.use("/books", booksRouter);

app.get("*", (req,res) => {
    res.status(404).json({
        message: "This route does not exist :("
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})