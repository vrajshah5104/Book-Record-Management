const express = require("express");

const {users} = require("./data/users.json");
const {books} = require("./Data/books.json");

const app = express();

const PORT = 8081;

app.use(express.json());

// Defining one basic "/" root
// (req,res) are the parameters to the callback function
app.get("/", (req, res) => {
    res.status(200).json ({
        message: "Server is up and running :)"
    })
})

/*
    Route: /users
    Method: GET
    Description: Get all users
    Access: Public
    Parameters: None
*/
app.get("/users", (req,res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})

/*
    Route: /users/:id
    Method: GET
    Description: Get a single user from the particular id
    Access: Public
    Parameters: id
*/
app.get("/users/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find((each)=>each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User does not exist :("
        })
    }
    // One method can have only one return statement
    return res.status(200).json ({
        success: true,
        message: "User found!",
        data: user
    })
})

/*
    Route: /users
    Method: POST
    Description: Creating a new user
    Access: Public
    Parameters: None
*/
app.post("/users", (req,res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    const user = users.find((each)=>each.id === id);

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User with this id already exists!"
        })
    }
    // Not including the issued and return fields because we are creating a new user here from scratch
    // To add those fields we'll use books.json file, primary key-foreign key concept of dbms
    users.push ({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    return res.status(201).json ({
        success: true,
        message: "User added successfully!!",
        data: users
    })
})

/*
    Route: /users/:id
    Method: PUT
    Description: Updating a user by their id
    Access: Public
    Parameters: id
*/
app.put("/users/:id", (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=>each.id === id);
    if (!user) {
        return res.status(404).json ({
            success: false,
            message: "User does not exist :("
        })
    }
    const updateUserData = users.map((each)=> {
        if (each.id === id) {
            return{
                ...each,
                ...data // Getting this keyword from our body, if key matches we update otherwise return the same info from 'each'
            }
        }
        return each;
    })
    return res.status(200).json ({
        success: true,
        message: "User Updated!",
        data: updateUserData
    })
})

/*
    Route: /users/:id
    Method: DELETE
    Description: Deleting a user by their id
    Access: Public
    Parameters: id
*/
app.delete("/users/:id", (req,res) => {
    const {id} = req.params;

    const user = users.find((each)=>each.id === id);
    if (!user) {
        return res.status(404).json ({
            success: false,
            message: "User does not exist :("
        })
    }
})

app.get("*", (req,res) => {
    res.status(404).json({
        message: "This route does not exist :("
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})