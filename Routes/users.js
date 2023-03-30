// Importing Express
const express = require("express");

// Importing users.json file
const {users} = require("../Data/users.json");

// Initializing it here
const router = express.Router();

/*
    Route: /
    Method: GET
    Description: Get all users
    Access: Public
    Parameters: None
*/
router.get("/", (req,res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})

/*
    Route: /:id
    Method: GET
    Description: Get a single user from the particular id
    Access: Public
    Parameters: id
*/
router.get("/:id", (req,res) => {
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
    Route: /
    Method: POST
    Description: Creating a new user
    Access: Public
    Parameters: None
*/
router.post("/", (req,res) => {
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
    Route: /:id
    Method: PUT
    Description: Updating a user by their id
    Access: Public
    Parameters: id
*/
router.put("/:id", (req,res) => {
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
    Route: /:id
    Method: DELETE
    Description: Deleting a user by their id
    Access: Public
    Parameters: id
*/
router.delete("/:id", (req,res) => {
    const {id} = req.params;

    const user = users.find((each)=>each.id === id);
    if (!user) {
        return res.status(404).json ({
            success: false,
            message: "User does not exist :("
        })
    }
    const index = users.indexOf(user);
    users.splice(index, 1)

    return res.status(200).json ({
        success: true,
        message: "User Deleted!",
        data: users // Ana thi cross check kari shako ke delete thaya pachi finally ketla users che
    })
})

// Exporting/Returning it back
module.exports = router;