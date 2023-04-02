const {UserModel, BookModel} = require("../Models/localindex");

// Description: Get all users
exports.getAllUsers = async(req, res) => {
    const users = await UserModel.find();
    if (users.length === 0) {
        return res.status(404).json ({
            success: false,
            message: "No Users found in the Database"
        })
    }
    return res.status(200).json ({
        success: true,
        message: "User information Available",
        data: users
    })
}

// Description: Get a single user from the particular id
exports.getSingleUserById = async(req, res) => {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json ({
            success: false,
            message: "User does not exist!"
        })
    }
    return res.status(200).json ({
        success: true,
        message: "User found :)",
        data: user
    })
}

// Description: Creating a new user
exports.createNewUser = async(req, res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    const newUser = await UserModel.create ({
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    return res.status(200).json ({
        success: true,
        message: "User Added Sucessfully",
        data: newUser
    })
}

// Description: Updating a user by their id
exports.updateUserById = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updatedUserData = await UserModel.findOneAndUpdate(
        {_id: id},
        {$set: {...data}},
        {new: true}
    );
    return res.status(200).json ({
        success: true,
        message: "User Updated!!",
        data: this.updatedUserData
    })
}

// Description: Deleting a user by their id
exports.deleteUserById = async(req, res) => {
    const {id} = req.params;
    const user = await UserModel.deleteOne({_id: id});
    if (!user) {
        return res.status(404).json ({
            success: true,
            message: "User Does not exist :(" 
        })
    }
    return res.status(200).json ({
        success: true,
        message: "Deleted User",
        data: user
    })
}

// Description: Getting user subscription details
exports.userSubscriptionDetails = async(req, res) => {
    const {id} = req.params;
    const user = await UserModel.findById(id);

    if(!user) {
        return res.status(404).json ({
            success: false,
            message: "User with this Id does not exist"
        })
    }

    const getDateInDays = (data = "") => {
        let date;
        if (data = "") {
            date = new Date();
        }
        else {
            date = new Date(data);
        }
        let days = Math.floor(date / (1000*60*60*24));
        return days;
    }

    const subcscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        }
        if (user.subscriptionType === "Standard") {
            date = date + 180;
        }
        if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    }

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = getDateInDays(user.subscriptionDate);

    const data = {
        ...user,
        hasSubscriptionExpired : subscriptionExpiration < currentDate,
        daysLeftForExpiration : subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 100 : 50 : 0
    }
    return res.status(200).json ({
        success: true,
        message: "Subscription Details for the User is",
        data
    })
}